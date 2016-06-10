import React, {
  AppRegistry,
  Component,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight
} from 'react-native';

import styles from "../../styles/index";
import Button from "../../components/Button.js";

GLOBAL = require('../../auth');

export default class LeaveWG extends Component {

  constructor(props)
  {
    super(props);

    this.onPressLogout = this.onPressLogout.bind(this);
  }

  onPressLogout() {
    GLOBAL.USERID = ''
    this.props.navigator.push({name: "Login"});
  }

  render()
  {
    return (
      <View>
        <Button text="Logout" onPress={this.onPressLogout} show={true} logout={true}></Button>
        <Text>Todo implement Leave WG</Text>

      </View>
    );
  }
}
