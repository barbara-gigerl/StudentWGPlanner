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
import Crypto from 'react-native-crypto';


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
      username: 'hello',
      password: '',
      errormessage: ' '
    };

    this.onPressLogin = this.onPressLogin.bind(this);
    this.onPressRegister = this.onPressRegister.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.testfunction = this.testfunction.bind(this);
  }

  setUsername(name){
    this.setState ( { username: name })
  }

  setPassword(pw){
    this.setState ( { password: pw })
  }

  testfunction() {
    var sha512 = Crypto.createHash('sha512');
    var h = sha512.update('abc', 'utf8').digest('hex');
    console.log(h);
    
    var instance = axios.create({
  baseURL: 'http://10.0.2.2:1337/parse/classes/Users/',
  headers: {'X-Parse-Application-Id': 'StudentWGPlanner',
            'X-Parse-Master-Key': 'asdf'}
});
      instance.get('', {
        params: {
          "where": {"username" : this.state.username,
                    "password" : this.state.password}
        }
      })
                .then(function (response) {
                  let myresult = JSON.parse(response.request.response);
                  console.log(myresult.results[0].teststr);
                })
                .catch(function (response) {
                  console.log(response);
                });

    console.log("got result");
    }

  /*testfunction2() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://10.0.2.2:1337/parse/classes/Test/');
    request.setRequestHeader('X-Parse-Application-Id', 'StudentWGPlanner');
    request.setRequestHeader('X-Parse-Master-Key', 'asdf');
    request.onreadystatechange = (e) => {
    if (request.readyState !== 4) {
        return;
    }

    if (request.status === 200) {
        console.log('success', request.responseText);
    } else {
        console.log("received error. " + request.status + request.responseText)
        console.warn('error');
    }
    };
    request.send();
}*/

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
        this.testfunction();
        console.log("ready.");
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
        <Text ref='ref' style={styles.errormessage}>{this.state.errormessage}</Text>

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
