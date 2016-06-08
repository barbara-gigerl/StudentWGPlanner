import React, {
  AppRegistry,
  Component,
  BackAndroid,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';

GLOBAL = require('../../auth');

import axios from 'axios';

const API_URL = 'http://localhost:1337/parse/';
const HEADERS = {
  'X-Parse-Application-Id': 'StudentWGPlanner',
  'X-Parse-Master-Key': 'asdf'};

const OPTIONS = { headers: HEADERS };

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

  setUsername(name){
    this.setState ( { username: name })
  }

  setPassword(pw){
    this.setState ( { password: pw })
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

/*
    if(this.state.username === '' || this.state.password === '')
      {
        this.state.errormessage = 'Please enter username and password'
      }*/
      //else {
        console.log("will now connect to server");
        axios.get('http://10.0.2.2:1337/parse/login', {
          headers: {'X-Parse-Application-Id': 'StudentWGPlanner',
                    'X-Parse-Master-Key': 'asdf'},
            params: {
            "username" : this.state.username,
            "password" : this.state.password
            }
        })
        .then((response) => {
            console.log("in then.");
            GLOBAL.USERID = response.data.objectId;
            this.props.navigator.push({
               name:"Home"
            });

          })
        .catch((response) => {
          this.setState({errormessage: response.data.error});
        });

      //}
      this.setState( { username: this.state.username,
                       password: this.state.password,
                       errormessage: this.state.errormessage
                     })
  }

  onPressRegister()
  {
     console.log("going to register view...");
     this.props.navigator.push({
        name:"Register"
    });
  }


  render()
  {
    console.log("render: " + this.state.errormessage);
    return (
      <View>
        <Text style={styles.inputlabel}>
          Username:
        </Text>
        <TextInput
          ref="username"
          onChangeText={(text) => this.setUsername(text)}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        />
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
          <Text >Register</Text>
        </TouchableHighlight>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  inputlabel: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
  },
  errormessage: {
    textAlign: 'center',
    color: '#B0171F'
  }

});
