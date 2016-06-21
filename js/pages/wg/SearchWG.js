import React, {
  AppRegistry,
  Component,
  BackAndroid,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ListView
} from 'react-native';

import Button from '../../components/Button';

import styles from "../../styles/index";

import axios from 'axios';

GLOBAL = require('../../auth');

import config from "../../../config";

export default class SearchWG extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      searchterm: '',
      wgs: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
      }),
      //selectedwg: '',
      joinbutton: false,
      errormessage: ''
    }

    this.onPressLogout = this.onPressLogout.bind(this);
    this.onPressBack = this.onPressBack.bind(this);
    this.onJoinWG = this.onJoinWG.bind(this);
    this.insertDatabase = this.insertDatabase.bind(this);
    this.textchangehandler = this.textchangehandler.bind(this);
  }
  onPressBack() {
    this.props.navigator.push({name: "Home"});
  }

  onPressLogout() {
    GLOBAL.USERID = ''
    GLOBAL.WGID = ''
    this.props.navigator.push({name: "Login"});
  }


  textchangehandler(text)
  {
    console.log('textchangehandler: ' + text);
    this.setState({searchterm: text})
    axios.get(config.PARSE_SERVER_URL + 'classes/wgs/', {
      headers: config.PARSE_SERVER_HEADERS,
      testCase: 'SEARCHWG',
      params: {
        "where": {
          "name": {
            "$regex": text
          }
        }
      }
    })
    //.then(response => response.data.results)
    .then((response) => {
      var results = response.data.results;
      console.log(results);
      this.setState({
        wgs: this.state.wgs.cloneWithRows([...results])
      })
      return Promise.resolve(true);
    })
    .catch((error) => {
      console.log(error)
      return Promise.resolve(false);
    })

    if (this.state.searchterm !== "") {
      this.setState({joinbutton: true});
    } else {
      this.setState({joinbutton: false});
    }

  }

  onJoinWG()
  {
    if (this.state.searchterm !== "") {
      axios.get(config.PARSE_SERVER_URL + "classes/wgs/", {
        headers: config.PARSE_SERVER_HEADERS,
        testCase: 'JOINWG',
        params: {
          "where": {
            "name": this.state.searchterm
          }
        }
      })
      .then((response) => {
        if (response.data.results.length === 1)
        {
          this.insertDatabase(response.data.results[0]);
        }
        else
        {
          this.setState({errormessage: "Couldn't find wg"});
        }
        return Promise.resolve(true);

      })
      .catch((error) => {
        console.log(error);
        this.setState({errormessage: "Couldn't connect to server."});
        return Promise.resolve(false);
      });
    } else {
      this.setState({errormessage: 'Please enter a searchterm.'});
    }
  }

  insertDatabase(resultObject)
  {
    for (var i = 0; i < resultObject.users.length; i++) {
      if (resultObject.users[i].id === GLOBAL.USERID) {
        this.setState({errormessage: 'You are already a member of this WG.'});
        return true;
      }
    }

    console.log("insert db: id = " + GLOBAL.USER.id +
  "username = " + GLOBAL.USER.username + "email = " +
GLOBAL.USER.email);
    resultObject.users.push({
    "id": GLOBAL.USER.id,
    "username":GLOBAL.USER.username,
    "email":GLOBAL.USER.email});
    axios.put(config.PARSE_SERVER_URL + "classes/wgs/" + resultObject.objectId, {
        'users': resultObject.users
      }, {
        headers: config.PARSE_SERVER_HEADERS
    })
    .then(response => {
      console.log(response)
      GLOBAL.WGID = resultObject.objectId
      GLOBAL.WGNAME = resultObject.name
      this.props.navigator.push({
         name: "Home"});
      return Promise.resolve(true);
    })
    .catch(function(error) {
      this.setState({errormessage: "Couldn't connect to server."});
      console.log(error);
      return Promise.resolve(false);
    });

  }


  renderWg(wg)
  {
    return <Text>{wg.name}</Text>
  }


  render()
  {
    console.log(this.state.wgs)
    return (
      <View>
        <Button text="Logout" onPress={this.onPressLogout} show={true} type="logout"></Button>
        <View style={styles.viewNavigation}>
          <Text style={styles.textNavigation}>Search WG</Text>
        </View>
        <Text style={styles.textMenuHeader}>Search the WG you want to join</Text>
        <TextInput onChangeText={(text) => this.textchangehandler(text)} value={this.state.searchterm} style={styles.basic}></TextInput>
        <Text style={styles.errormessage}>{this.state.errormessage}</Text>
        <ListView dataSource={this.state.wgs} renderRow={this.renderWg.bind(this)}/>
        <Button text="Join WG" onPress={this.onJoinWG} show={this.state.joinbutton}/>
        <Button text="Back" onPress={this.onPressBack} show={true} type="back"></Button>
      </View>
    );
  }
}
