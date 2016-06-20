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
    console.log("setting username" + name);
    this.setState({username: name})
  }

  setPassword(pw) {
    this.setState({password: pw})
  }


  handleLoginResult(response) {
    console.log("handleLoginResult");
    console.log(response.data.results.length); //@jest: gives 0
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

    /*if (this.state.username === '' || this.state.password === '') {
      console.log("error.");
      this.state.errormessage = 'Please enter username and password'
    }*/
    //else {
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
          GLOBAL.USERID = response.data.objectId;

          console.log("id: " + GLOBAL.USER.id + " name: " +
        GLOBAL.USER.username + " email: " + GLOBAL.USER.email)


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
                console.log(response);
                if(response.data.results.length == 1 )
                {
                  GLOBAL.WGID = response.data.results[0].objectId;
                  GLOBAL.WGNAME = response.data.results[0].name;
                }
                else
                {
                  GLOBAL.WGID = "";
                  GLOBAL.WGNAME = "";

                }

                this.props.navigator.push({
                   name: "Home"});

              })
              .catch((error) => {
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
    console.log("going to register view...");
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
