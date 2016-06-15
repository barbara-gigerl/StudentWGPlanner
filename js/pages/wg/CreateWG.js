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

import axios from 'axios';

import config from '../../../config';
import styles from "../../styles/index";
import Button from "../../components/Button.js";

GLOBAL = require('../../auth');

export default class CreateWG extends Component {

  constructor(props)
  {
    super(props);

    this.onPressLogout = this.onPressLogout.bind(this);
    this.onPressBack = this.onPressBack.bind(this);
    this.onWgTextChange = this.onWgTextChange.bind(this);
    this.onCreateWg = this.onCreateWg.bind(this);

    this.state = {
      wgName: '',
      errormessage: ''
    };
  }

  onPressBack() {
    this.props.navigator.push({name: "Home"});
  }

  onPressLogout() {
    GLOBAL.USERID = '';
    this.props.navigator.push({name: "Login"});
  }

  onWgTextChange(text) {
    console.log(text);
    this.setState({ wgName: text });
  }

  onCreateWg() {
    if (this.state.wgName !== '' && this.state.wgName) {
      axios.get(config.PARSE_SERVER_URL + 'classes/wgs', {
        headers: config.PARSE_SERVER_HEADERS,
        params: {
          "where": {
            "name": {
              "$regex": this.state.wgName
            }
          }
        }
      })
      .then((response) => {
        var results = response.data.results;
        console.log(results);
        if (results.length === 0) {
          axios.post(config.PARSE_SERVER_URL + 'classes/wgs', {
            name: this.state.wgName,
            users: [GLOBAL.USER]
          }, {
            headers: config.PARSE_SERVER_HEADERS
          })
          .then((response) => {
            console.log(response);
            GLOBAL.WGID = response.data.objectId;
            this.props.navigator.pop();
          })
          .catch((error) => {
            this.setState({ errormessage: "Couldn't connect to server." })
          })
        } else {
          this.setState({ errormessage: 'WG already exists.' })
        }
      }).catch((error) => {
      this.setState({ errormessage: "Couldn't connect to server." })
      })
    } else {
      this.setState({ errormessage: 'Please enter a wg name.' })
    }
  }

  render()
  {
    return (
      <View>
        <Button text="Logout" onPress={this.onPressLogout} show={true} type="logout"></Button>
        <View style={styles.viewNavigation}><Text style={styles.textNavigation}>Create WG</Text></View>
        <Text style={styles.textMenuHeader}>Create a new WG</Text>
        <TextInput onChangeText={this.onWgTextChange} value={this.state.wgName} style={styles.basic} />
        <Text style={styles.errormessage}>{this.state.errormessage}</Text>
        <Button text="Create" onPress={this.onCreateWg} show={true} type="back"></Button>
        <Button text="Back" onPress={this.onPressBack} show={true} type="back"></Button>
      </View>
    );
  }
}
