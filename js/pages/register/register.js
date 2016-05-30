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

export default class Register extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      username: '',
      password: '',
      password2: '',
      email: ''
    };
  }

  onChange(text, key) {
    let newState = {};
    newState[key] = text;
    this.setState(newState);
  }

  onSubmit() {
    console.log(this.state);
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
          value={this.state.password}></TextInput>
        <TextInput style={styles.inputField}
          value={this.state.email}></TextInput>
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
