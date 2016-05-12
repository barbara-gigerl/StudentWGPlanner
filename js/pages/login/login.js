import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';


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
  }

  onPressLogin()
  {
    console.log("YOUMADEIT");
    console.log(this.state);
    this.state.errormessage = '';
    if(this.state.username === '' || this.state.password === '')
    {
      console.log("error.");
      this.state.errormessage = 'Please enter username and password'
    }
    else {
      console.log("will now connect to server");
    }
    this.setState( { username: this.state.username,
                     password: this.state.password,
                     errormessage: this.state.errormessage
    })
  }

  onPressRegister()
  {
    //TODO: implement function!
  }


    sum(a, b) {
      return a + b;
    }

  render()
  {
    console.log("render.");

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
        <Text ref='ref2' style={styles.errormessage}>{this.state.errormessage}</Text>
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
