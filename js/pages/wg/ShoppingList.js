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

GLOBAL = require('../../auth');

import config from "../../../config";
import axios from 'axios';


export default class ShoppingList extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      listElements: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
      }),
      listItem: '',
      errormessage: ''
    };
    this.onPressLogout = this.onPressLogout.bind(this);
    this.onPressBack = this.onPressBack.bind(this);
    this.onInsertData = this.onInsertData.bind(this);
    this.onPressNew = this.onPressNew.bind(this);
    this.onNameChange = this.onNameChange.bind(this);

    this.showShoppingLists();
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
        console.log("in then: ")
        console.log(response)
        console.log(this.state.listItem)
        this.setState({
          listItem: ''
        })
        this.showShoppingLists();
      })
      .catch((error) => {
        console.log(error)
      })
    }
    else {
      this.setState({ errormessage: 'Please enter an element.' })
    }

    console.log(this.state.listElements);
    console.log(this.state.errormessage);
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
    //.then(response => response.data.results)
    .then(function(response) {
      var results = response.data.results;
      console.log("show Shoppinglist")
      console.log(results);
      this.setState({
        listElements: this.state.listElements.cloneWithRows([...results])
      })

    }.bind(this))
    .catch((error) => {
      console.log(error)
    })
  }

  renderElements(element)
  {
    return (
      <Text>{element.name}</Text>
    )
  }

  render()
  {
    let haveShoppingList = true;
    if(GLOBAL.SHOPPINGLISTID === '')
      haveShoppingList = false;

    //  <ListView dataSource={this.state.listElements} renderRow={this.renderElements} show={haveShoppingList}/>
    //<TextInput value={this.state.listItem} style={styles.basic} show={haveShoppingList}></TextInput>

//<TextInput onChangeText={this.onNameChange} value={this.state.name} style={styles.basic} />
/*<ListView
  dataSource={this.state.listElements}
  renderRow={(rowData) => <Text>{rowData}</Text>}
/>
<ListView dataSource={this.state.listElements} renderRow={this.renderElements} show={haveShoppingList}/>

<ScrollView dataSource={this.state.listElements} renderRow={this.renderElements.bind(this)} contentContainerStyle={styles.contentContainer}/>


*/
    return (
      <View>
        <Button text="Logout" onPress={this.onPressLogout} show={true} type="logout"></Button>
        <View style={styles.viewNavigation}><Text style={styles.textNavigation}>Shopping List</Text></View>
        <Text style={styles.textMenuHeader}></Text>
        <Button text="Create a new Shoppinglist" show={!haveShoppingList} onPress={this.onPressNew}></Button>

        <Text style={styles.textMenuHeader}>{this.state.shoppingList}</Text>

        <TextInput onChangeText={(text) => this.onNameChange(text)} value={this.state.listItem} style={styles.basic}></TextInput>

        <ListView dataSource={this.state.listElements} renderRow={this.renderElements.bind(this)}/>

        <Button text="Insert Data" onPress={this.onInsertData} show={haveShoppingList} ></Button>
        <Button text="Delete Data" show={haveShoppingList} ></Button>


        <Button text="Back" onPress={this.onPressBack} show={true} type="back"></Button>
      </View>
    );
  }
}
