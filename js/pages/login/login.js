import React, {
  Component,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

GLOBAL = require('../../auth');

import styles from "../../styles/index";

import Button from "../../components/Button.js";

import config from "../../../config";
import axios from 'axios';
import * as dummy from './dummy.js';

const API_URL = 'http://localhost:1337/parse/';

const HEADERS = {
  'X-Parse-Application-Id': 'StudentWGPlanner',
  'X-Parse-Master-Key': 'asdf'
};

const OPTIONS = {
  headers: HEADERS
};

export default class Login extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      username: '',
      password: '',
      errormessage: ''
    };

    this.onPressLogin = this.onPressLogin.bind(this);
    this.onPressRegister = this.onPressRegister.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.handleLoginResult = this.handleLoginResult.bind(this);
  }

  setUsername(name) {
    this.setState({username: name})
  }

  setPassword(pw) {
    this.setState({password: pw})
  }


  handleLoginResult(response) {
    if(response.data.results.length == 1) {
      GLOBAL.USERID = response.data.results[0].objectId;
      this.props.navigator.push({
         name: "Home"});
    }
    else {
      this.setState({errormessage: 'Wrong username or password.'});
    }
    return true;
  }

  onPressLogin()
  {
    this.state.errormessage = '';

      return axios.get(config.PARSE_SERVER_URL + "login/", {
        headers: config.PARSE_SERVER_HEADERS,
        params: {
                   "username" : this.state.username,
                    "password" : this.state.password
                }
      })
      .then((response) => {
          GLOBAL.USER = {
            id: response.data.objectId,
            username: response.data.username,
            email: response.data.email
          };
          console.log(GLOBAL.USER.id + GLOBAL.USER.username + GLOBAL.USER.email);
          GLOBAL.USERID = response.data.objectId;
          axios.get(config.PARSE_SERVER_URL + "classes/wgs/", {
              headers: config.PARSE_SERVER_HEADERS,
              params:
              {
              "where":{"users":{"$all": [{
              "id": GLOBAL.USER.id,
              "username":GLOBAL.USER.username,
              "email":GLOBAL.USER.email}]}}
            }})
              .then((response) => {
                if(response.data.results.length >= 1 )
                {
                  GLOBAL.WGID = response.data.results[0].objectId;
                  GLOBAL.WGNAME = response.data.results[0].name;

                  axios.get(config.PARSE_SERVER_URL + 'classes/shoppinglist/', {
                    headers: config.PARSE_SERVER_HEADERS,
                    params:
                    {
                      "where": {"wgid":GLOBAL.WGID }
                    }
                  })
                  .then((response) => {

                    if(response.data.results.length == 1)
                    {
                      GLOBAL.SHOPPINGLISTID = response.data.results[0].objectId;

                    }
                    else
                    {
                      GLOBAL.SHOPPINGLISTID = "";
                    }


                    this.props.navigator.push({
                       name: "Home"});
                  })

                }
                else
                {
                  GLOBAL.WGID = "";
                  GLOBAL.WGNAME = "";

                  this.props.navigator.push({
                     name: "Home"});

                }



              })
              .catch((error) => {
                //console.log(error);
              })



         return Promise.resolve(true);
        }
      )
      .catch((response) => {
        this.setState({errormessage: response.data.error});
        return Promise.resolve(false);
      });

  }

  onPressRegister()
  {
    this.props.navigator.push({name: "Register"});
  }
  //<Image source={require('../../../assets/login_bg.jpg')}  style={styles.backgroundImage} />
  render()
  {
    return (


        <View>
          <Text style={styles.inputlabel}>
            Username:
          </Text>
          <TextInput ref="username" autoCapitalize="none" autoCorrect={false} onChangeText={(text) => this.setUsername(text)} style={styles.basic}/>
          <Text style={styles.inputlabel}>
            Password:
          </Text>
          <TextInput ref="password" onChangeText={(text) => this.setPassword(text)} secureTextEntry={true} style={styles.basic}/>
          <Text style={styles.errormessage}>{this.state.errormessage}</Text>
          <Button text="Login" onPress={this.onPressLogin} show={true}></Button>
          <Button text="Register" onPress={this.onPressRegister} show={true}></Button>
        </View>

    );
  }
}
