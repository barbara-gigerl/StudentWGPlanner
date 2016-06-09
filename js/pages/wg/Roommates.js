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

GLOBAL = require('../../auth');

export default class Roommate extends Component {

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
        <Text>Todo implement Roommates</Text>
        <TouchableHighlight class="Logout" onPress={this.onPressLogout}>
          <View style={styles.logout}>
            <Text>Logout</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
