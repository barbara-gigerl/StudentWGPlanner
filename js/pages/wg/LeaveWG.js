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
import styles from "../../styles/index";
import Button from "../../components/Button.js";
import config from "../../../config";

GLOBAL = require('../../auth');

export default class LeaveWG extends Component {

  constructor(props)
  {
    super(props);

    this.onPressLogout = this.onPressLogout.bind(this);
    this.onPressBack = this.onPressBack.bind(this);
    this.onPressLeaveWG = this.onPressLeaveWG.bind(this);
  }
  onPressBack() {
    this.props.navigator.push({name: "Home"});
  }
  onPressLogout() {
    GLOBAL.USERID = ''
    GLOBAL.WGID = ''
    this.props.navigator.push({name: "Login"});
  }

  onPressLeaveWG() {
    console.log("inonpressleavewg");
    return axios.get(config.PARSE_SERVER_URL + "classes/wgs/" + GLOBAL.WGID, {
      headers: config.PARSE_SERVER_HEADERS})
      .then((response) => {
        var userarray = response.data.users;
        var index = userarray.findIndex((elem) => {
            return elem.id === GLOBAL.USER.id;
          });
        userarray.splice(index, 1);

        if(userarray.length == 0){
          axios.delete(config.PARSE_SERVER_URL + "classes/wgs/" + GLOBAL.WGID,
          {
            headers: config.PARSE_SERVER_HEADERS
          }).then(response => {
            console.log(response)
          }).catch(function(error) {
            console.log(error);
          });
        }
        else {
          axios.put(config.PARSE_SERVER_URL + "classes/wgs/" + GLOBAL.WGID, {
            'users': userarray
          }, {
            headers: config.PARSE_SERVER_HEADERS
          }).then(response => {
            console.log(response)
          }).catch(function(error) {
            console.log(error);
          });
        }



        GLOBAL.WGID = '';
        this.props.navigator.push({name: "Home"})
    }
  )

  }

  render()
  {
    return (
      <View>
        <Button text="Logout" onPress={this.onPressLogout} show={true} type="logout"></Button>
        <View style={styles.viewNavigation}><Text style={styles.textNavigation}>Leave WG</Text></View>
        <Text style={styles.textMenuHeader}>Do you really want to leave the WG?</Text>
        <Button text="Yes" onPress={this.onPressLeaveWG} show={true}></Button>
        <Button text="No" onPress={this.onPressBack} show={true} type="back"></Button>
      </View>
    );
  }
}
