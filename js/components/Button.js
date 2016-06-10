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

    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.button} >
          <Text>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
