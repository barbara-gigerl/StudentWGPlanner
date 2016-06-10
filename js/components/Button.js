import React, {
  Component,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import styles from '../styles';

export default class Button extends Component {
  render()
  {
    if (!this.props.show) {
      return <View/>
    }

    let style = styles.button;

    if (this.props.logout) {
      style = styles.buttonLogout;
    }

    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={style}>
          <Text>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
