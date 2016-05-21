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

export default class SearchWG extends Component {

  constructor(props)
  {
    super(props);

    this.onPressLogout = this.onPressLogout.bind(this);
  }

  onPressLogout(){
    GLOBAL.USERID = ''
    this.props.navigator.push({
       name: "Login"
    });
  }

  render()
  {
    return (
      <View>
        <Text>Todo implement Search WG</Text>
        <TouchableHighlight class="Logout" onPress={this.onPressLogout}>
          <Text>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }
}