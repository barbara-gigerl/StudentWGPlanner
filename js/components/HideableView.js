import React, {
  Component,
  View
} from 'react-native';

export default class HideableView extends Component {
  render()
  {
    if (this.props.hidden) {
      return <View/>
    }

    return (
      <View>{this.props.children}</View>
    );
  }
}
