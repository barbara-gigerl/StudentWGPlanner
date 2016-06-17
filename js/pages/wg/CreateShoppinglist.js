import React, {
  AppRegistry,
  Component,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ListView
} from 'react-native';

import styles from "../../styles/index";
import Button from "../../components/Button.js";

GLOBAL = require('../../auth');

import config from "../../../config";
import axios from 'axios';


export default class CreateShoppingList extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      name: ''
    };

    this.onPressLogout = this.onPressLogout.bind(this);
    this.onPressBack = this.onPressBack.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onCreateNew = this.onCreateNew.bind(this);
  }

  onPressBack() {
    this.props.navigator.push({name: "Home"});
  }

  onPressLogout() {
    GLOBAL.USERID = ''
    GLOBAL.WGID = ''
    this.props.navigator.push({name: "Login"});
  }

  onNameChange(text) {
    this.setState({ name: text });
  }

  onCreateNew() {
    if (this.state.name !== '' && this.state.name) {
      axios.post(config.PARSE_SERVER_URL + 'classes/shoppinglist', {
          name: this.state.name,
          wgid: GLOBAL.WGID}, {
          headers: config.PARSE_SERVER_HEADERS
      })
      .then((response) => {
        console.log(response);
        GLOBAL.SHOPPINGLISTID = response.data.objectId;
        this.props.navigator.pop();
      })
      .catch((error) => {
        this.setState({ errormessage: "Couldn't connect to server." })
      })
    }
    else {
      this.setState({ errormessage: 'Please enter a wg name.' })
    }

  }


  render()
  {
    let haveShoppingList = true;
    if(GLOBAL.SHOPPINGLISTID === '')
      haveShoppingList = false;


    return (
      <View>
        <Button text="Logout" onPress={this.onPressLogout} show={true} type="logout"></Button>
        <View style={styles.viewNavigation}><Text style={styles.textNavigation}>Shopping List</Text></View>
        <Text style={styles.textMenuHeader}></Text>
        <Text style={styles.textMenuHeader}>Create a new Shoppinglist</Text>
        <TextInput onChangeText={this.onNameChange} value={this.state.name} style={styles.basic} />
        <Text style={styles.errormessage}>{this.state.errormessage}</Text>
        <Button text="Create" onPress={this.onCreateNew} show={true} type="back"></Button>
        <Button text="Back" onPress={this.onPressBack} show={true} type="back"></Button>
      </View>
    );
  }
}
