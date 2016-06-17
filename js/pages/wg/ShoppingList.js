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


export default class ShoppingList extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      elements: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
      })
    };

    this.onPressLogout = this.onPressLogout.bind(this);
    this.onPressBack = this.onPressBack.bind(this);
    this.onPressNew = this.onPressNew.bind(this);
    this.handleNewList = this.handleNewList.bind(this);
    this.renderElements = this.renderElements.bind(this);
  }

  onPressBack() {
    this.props.navigator.push({name: "Home"});
  }

  onPressLogout() {
    GLOBAL.USERID = ''
    GLOBAL.WGID = ''
    this.props.navigator.push({name: "Login"});
  }

  onPressNew() {
    this.props.navigator.push({name: "CreateShoppingList"});
  }

  handleNewList(){

  }

//TODO: need another datastructure for saving elements (searchwg)
  renderElements(element)
  {
    return (
      <Text>hello</Text>
    )
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
        <Button text="Create a new Shoppinglist" show={!haveShoppingList} onPress={this.onPressNew}></Button>

        <Button text="Insert Data" show={haveShoppingList} ></Button>
        <Button text="Delete Data" show={haveShoppingList} ></Button>
        <ListView dataSource={this.state.elements} renderRow={this.renderElements}/>
        <Button text="Back" onPress={this.onPressBack} show={true} type="back"></Button>
      </View>
    );
  }
}
