import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';

import axios from 'axios'
import * as dummy from './dummy.js';


const API_URL = 'http://localhost:1337/parse/';
const HEADERS = {
  'X-Parse-Application-Id': 'StudentWGPlanner',
  'X-Parse-Master-Key': 'asdf'
};

const OPTIONS = { headers: HEADERS };

export default class Login extends Component {



  constructor(props)
  {
    super(props);
    this.state = {
      username: '',
      password: '',
      errormessage: ' '
    };

    this.onPressLogin = this.onPressLogin.bind(this);
    this.onPressRegister = this.onPressRegister.bind(this);
  }

  onPressLogin()
  {
    console.log("YOUMADEIT");
    this.state.errormessage = ' ';

    if(this.state.username === '' || this.state.password === '')
      {
        console.log("error.");
        this.state.errormessage = 'Please enter username and password'
      }
      else {
        console.log("will now connect to server");

        dummy.startImport();

           axios.post("http://localhost:1337/parse/login/", {
            username: this.state.username,
            password: this.state.passsword,
          }, { headers: { 'X-Parse-Application-Id': 'StudentWGPlanner', 'X-Parse-Master-Key': 'asdf' }})
          .then(function (response) {
            console.log("aa");
            console.log(response);
          })
          .catch(function (response) {
            console.log("aa");

            console.log(response);
          });


          console.log("got result");
      }
      this.setState( { username: this.state.username,
                       password: this.state.password,
                       errormessage: this.state.errormessage
                      })
      console.log(this.state);

  }

  onPressRegister()
  {
    //TODO: implement function!
  }


  render()
  {
      console.log("render.");
      console.log(this.state);
    return (
      <View>
        <Text style={styles.inputlabel}>
          Username:
        </Text>
        <TextInput
          ref="username"
          onChangeText={(text) => this.setState({
            username: text
          })}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        />
        <Text style={styles.inputlabel}>
          Password:
        </Text>
        <TextInput
          ref="password"
          onChangeText={(text) => this.setState({
            password: text
          })}
          secureTextEntry={true}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        />
        <Text style={styles.errormessage}>{ this.state.errormessage }</Text>
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

module.exports = Login;
