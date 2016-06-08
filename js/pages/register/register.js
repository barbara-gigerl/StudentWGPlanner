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

import axios from 'axios';

GLOBAL = require('../../auth');

const SERVER_URL = "http://172.20.10.8:1337/parse"

export default class Register extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      username: 'jan',
      password: 'jan',
      password2: 'jan',
      email: 'jan',
      error: ''
    };
  }

  onChange(text, key) {
    let newState = {};
    newState[key] = text;
    this.setState(newState);
  }

  onSubmit() {
    if (this.state.password !== this.state.password2) {
      this.setState({ error: 'Passwords are not equal' });
      return;
    } else {
      this.setState({ error: '' });
    }

    axios.post(SERVER_URL + '/users', {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        }, { headers: { 'X-Parse-Application-Id': 'StudentWGPlanner' }}
      )
      .then(response => {
        GLOBAL.USERID = response.data.objectId;
        this.props.navigator.push({
           name:"SearchWG"
        });
      })
      .catch(error => {
        if (error.data.error) {
          this.setState({ error: error.data.error });
        }
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
        <Text>{this.state.error}</Text>
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
