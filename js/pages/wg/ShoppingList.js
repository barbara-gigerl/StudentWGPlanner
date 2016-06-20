import React, {
  AppRegistry,
  Component,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ListView,
  ScrollView
} from 'react-native';

import styles from "../../styles/index";
import Button from "../../components/Button.js";
import HideableView from "../../components/HideableView.js";

GLOBAL = require('../../auth');

import config from "../../../config";
import axios from 'axios';


export default class ShoppingList extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      listElements: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      listItem: '',
      errormessage: ''
    };

    this.onPressLogout = this.onPressLogout.bind(this);
    this.onPressBack = this.onPressBack.bind(this);
    this.onInsertData = this.onInsertData.bind(this);
    this.onDeleteData = this.onDeleteData.bind(this);
    this.onPressNew = this.onPressNew.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.showShoppingLists = this.showShoppingLists.bind(this);
    this.onPressElement = this.onPressElement.bind(this);
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

  onInsertData()
  {
    console.log(this.state.listItem);
    if (this.state.listItem !== '' && this.state.listItem) {
    axios.post(config.PARSE_SERVER_URL + 'classes/shoppinglistitem', {
          name: this.state.listItem,
          state: 0,         //0: active, 1: to delete, 2: deleted
          shoppinglistid: GLOBAL.SHOPPINGLISTID}, {
          headers: config.PARSE_SERVER_HEADERS
      })
      .then((response) => {
        this.setState({
          listItem: ''
        })
        return Promise.resolve(true);

      })
      .catch((error) => {
        console.log(error)
        return Promise.resolve(false);
      })
    }
    else {
      this.setState({ errormessage: 'Please enter an element.' })
    }
  }

  onDeleteData()
  {
    console.log(this.state.listElements);
    console.log(this.state.listElements._dataBlob.s1);

    console.log(this.state.listElements._dataBlob.s1[0].objectId);

    for (let i = 0; i < this.state.listElements._dataBlob.s1.length; i++)
    {
      if(this.state.listElements._dataBlob.s1[i].state === 1)
      {
        let objectid = this.state.listElements._dataBlob.s1[i].objectId;
        axios.delete(config.PARSE_SERVER_URL + "classes/shoppinglistitem/" + objectid,
          {
              headers: config.PARSE_SERVER_HEADERS
          })
          .then((response) => {
            this.showShoppingLists();
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }

  onNameChange(text) {
    this.setState({listItem: text});

  }

  showShoppingLists()
  {
    axios.get(config.PARSE_SERVER_URL + 'classes/shoppinglistitem', {
      headers: config.PARSE_SERVER_HEADERS,
      params: {
        "where": {
          "shoppinglistid": GLOBAL.SHOPPINGLISTID
        }
      }
    })
    .then(function(response) {
      var results = response.data.results;
      this.setState({
        listElements: this.state.listElements.cloneWithRows([...results])
      })
      return Promise.resolve(true);
    })
    .catch((error) => {
      console.log(error + "SEARCH LIST")
      return Promise.resolve(false);
    })
  }

  renderElements(element)
  {
    if(element.state == 0){
      return (
          <TouchableHighlight onPress={(text) => this.onPressElement(element)}><Text style={styles.normal}>{element.name}</Text></TouchableHighlight>
      )
    }
    else{
      return (
          <TouchableHighlight onPress={(text) => this.onPressElement(element)}><Text>{element.name}</Text></TouchableHighlight>
      )
    }
  }

  onPressElement(element)
  {

    var elementstate = element.state;
    if(elementstate === 0){
      elementstate = 1;
    }
    else {
      elementstate = 0;
    }
    console.log(elementstate);

    axios.put(config.PARSE_SERVER_URL + "classes/shoppinglistitem/" + element.objectId, {
      'state': elementstate
    }, {
      headers: config.PARSE_SERVER_HEADERS
    }).then(response => {
      console.log(response)
    }).catch(function(error) {
      console.log(error);
    });

    this.showShoppingLists();
    console.log(this.state.listElements)

  }

  render()
  {
    let haveShoppingList = true;
    if(GLOBAL.SHOPPINGLISTID === ''){
      haveShoppingList = false;
    }
    else{
      this.showShoppingLists();
    }
    return (
      <View>
        <Button text="Logout" onPress={this.onPressLogout} show={true} type="logout"></Button>
        <View style={styles.viewNavigation}><Text style={styles.textNavigation}>Shopping List</Text></View>

        <Button text="Create a new Shoppinglist" show={!haveShoppingList} onPress={this.onPressNew}></Button>

        <HideableView hidden={!haveShoppingList}><TextInput onChangeText={(text) => this.onNameChange(text)} value={this.state.listItem} style={styles.basic}></TextInput>
        </HideableView>
        <Button text="Insert Data" onPress={this.onInsertData} show={haveShoppingList} ></Button>

        <ListView show={haveShoppingList} dataSource={this.state.listElements} renderRow={this.renderElements.bind(this)}/>

        <Button text="Delete selected items" onPress={this.onDeleteData} show={haveShoppingList} ></Button>
        <Button text="Back" onPress={this.onPressBack} show={true} type="back"></Button>
      </View>
    );
  }
}
