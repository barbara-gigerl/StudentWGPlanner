import React, {
  Component,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight
} from 'react-native';

GLOBAL = require('../../auth');

import styles from "../../styles/index";

import axios from 'axios';
import * as dummy from './dummy.js';

const API_URL = 'http://localhost:1337/parse/';
const HEADERS = {
  'X-Parse-Application-Id': 'StudentWGPlanner',
  'X-Parse-Master-Key': 'asdf'};

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

    if (this.state.username === '' || this.state.password === '') {
      console.log("error.");
      this.state.errormessage = 'Please enter username and password'
    } else {
      //console.log("will now connect to server");
    }
    this.setState({username: this.state.username, password: this.state.password, errormessage: this.state.errormessage})
    //  console.log(this.state);
  }

  onPressRegister()
  {
    console.log("going to register view...");
    this.props.navigator.push({name: "Register"});
  }

  render()
  {
    console.log("render: " + this.state.errormessage);
    return (
      <View>
        <Text style={styles.inputlabel}>
          Username:
        </Text>
        <TextInput ref="username" onChangeText={(text) => this.setUsername(text)} style={styles.basic}/>
        <Text style={styles.inputlabel}>
          Password:
        </Text>
        <TextInput
          ref="password"
          onChangeText={(text) => this.setPassword(text)}
          secureTextEntry={true}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        />
        <Text style={styles.errormessage}>{this.state.errormessage}</Text>
        <TouchableHighlight onPress={this.onPressLogin}>
          <Text>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.onPressRegister}>
          <Text>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
