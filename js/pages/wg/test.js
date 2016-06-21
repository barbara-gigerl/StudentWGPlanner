import React, {AppRegistry, Component, StyleSheet, Text, View} from 'react-native';

import styles from "../../styles/index";

import {connect} from 'react-redux';
import {createWG} from '../../actions';

class Test extends Component {
  componentWillMount() {
    this.props.createWG('Test');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {wg: state.wg};
}

export default connect(mapStateToProps, {createWG})(Test);
