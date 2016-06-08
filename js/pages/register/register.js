import React, {
  AppRegistry,
  Component,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';

GLOBAL = require('../../auth');

const SERVER_URL = "http://172.20.10.5:1337/parse"

export default class Register extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      username: 'jan',
      password: 'jan',
      password2: 'jan',
      email: 'jan'
    };
  }

  onChange(text, key) {
    let newState = {};
    newState[key] = text;
    this.setState(newState);
  }

  onSubmit() {
    if (this.state.password !== this.state.password2) {
      alert("Passwords not equal");
      return;
    }

    fetch(SERVER_URL + '/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Parse-Application-Id': 'StudentWGPlanner'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          alert(response.error);
        } else {
          GLOBAL.USERID = response.objectId;
          this.props.navigator.push({
             name:"Register"
         });
       }
      })
      .catch(error => {
        console.log('error', error);
      })
  }

  render()
  {
    return (
      <View style={styles.container}>
        <Text>
          Register
        </Text>
        <Text>Username</Text>
        <TextInput style={styles.inputField}
          value={this.state.username}
          onChangeText={(text) => this.onChange(text, 'username')}></TextInput>
        <Text>Password</Text>
        <TextInput style={styles.inputField}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(text) => this.onChange(text, 'password')}></TextInput>
        <Text>repeat Password</Text>
        <TextInput style={styles.inputField}
          secureTextEntry={true}
          value={this.state.password2}
          onChangeText={(text) => this.onChange(text, 'password2')}></TextInput>
        <Text>Email</Text>
        <TextInput style={styles.inputField}
          value={this.state.email}
          onChangeText={(text) => this.onChange(text, 'email')}></TextInput>
        <TouchableHighlight onPress={this.onSubmit.bind(this)}><Text>Register</Text></TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
});
