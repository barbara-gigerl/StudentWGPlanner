/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

class StudentWGPlanner extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Student WG Planner
        </Text>
        <Text style={styles.inputlabel}>
        Username:
        </Text>
        <TextInput  style={styles.inputfield}
    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
/>
<Text style={styles.inputlabel}>
Passwort:
</Text>
<TextInput  style={styles.inputfield}
style={{height: 40, borderColor: 'gray', borderWidth: 1}}
/>
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
  inputfield: {

  },
});

AppRegistry.registerComponent('StudentWGPlanner', () => StudentWGPlanner);
