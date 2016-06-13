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
    let textstyle = styles.buttonText;

    if (this.props.type === "logout") {
      style = styles.buttonLogout;
    }
    else if (this.props.type === "back") {
      style = styles.buttonBack;
    }
    else if (this.props.type === "menu") {
      style = styles.buttonMenu;
      textstyle = styles.textButtonMenu;
    }

    return (
      <TouchableHighlight underlayColor="transparent" onPress={this.props.onPress}>
        <View style={style}>
          <Text style={textstyle}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
