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
      joinbutton: '',
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
    this.props.navigator.push({name: "Login"});
  }



  textchangehandler(text)
  {
    this.setState({searchterm: text})
    axios.get(config.PARSE_SERVER_URL + 'classes/wgs', {
      headers: config.PARSE_SERVER_HEADERS,
      params: {
        "where": {
          "name": {
            "$regex": text
          }
        }
      }
    })
    //.then(response => response.data.results)
      .then(function(response) {
      var results = response.data.results;
      this.setState({
        wgs: this.state.wgs.cloneWithRows([...results])
      })
    }.bind(this)).catch((error) => {
      console.log(error)
    })

    //TODO: need to change this if searchWG is finally working
    if (this.state.searchterm !== "") {
      this.setState({joinbutton: "Join this WG"});
    } else {
      this.setState({joinbutton: ""});
    }

  }

  onJoinWG()
  {
    if (this.state.searchterm !== "") {
      axios.get(config.PARSE_SERVER_URL + "classes/wgs", {
        headers: config.PARSE_SERVER_HEADERS,
        params: {
          "where": {
            "name": this.state.searchterm
          }
        }
      }).then((response) => {
        console.log(response);

        if (response.data.results.length === 1)
          this.insertDatabase(response.data.results[0]);
        })
      .catch((error) => {
        console.log(error);
        this.setState({errormessage: "Couldn't connect to server."});
      });
    } else {
      this.setState({errormessage: 'Please enter a searchterm.'});
    }
  }

  insertDatabase(resultObject)
  {
    for (var i = 0; i < resultObject.users.length; i++) {
      if (resultObject.users[i] === GLOBAL.USERID) {
        this.setState({errormessage: 'You are already a member of this WG.'});
        return true;
      }
    }

    resultObject.users.push({
    "id": GLOBAL.USER.id,
    "username":GLOBAL.USER.username,
    "email":GLOBAL.USER.email});
    axios.put(config.PARSE_SERVER_URL + "classes/wgs/" + resultObject.objectId, {
      'users': resultObject.users
    }, {
      headers: config.PARSE_SERVER_HEADERS
    }).then(response => {
      console.log(response)
    }).catch(function(error) {
      this.setState({errormessage: "Couldn't connect to server."});
      console.log(error);
    });

  }


  renderWg(wg)
  {

     return <Text>{wg.name}</Text>
    /*console.log("2:" + this.state.selectedwg);
    if(wg.name === this.state.selectedwg)
    {
      console.log("infiffkl");
      return (<TouchableOpacity>
      <Text style={{color: 'red'}}>{wg.name}</Text>
      </TouchableOpacity>)
    }
    else{
    return (
      <TouchableOpacity onPress={() => this.setState({selectedwg: wg.name})} >
      <Text>{wg.name}</Text>
      </TouchableOpacity>
    )*/
  }
    /*return (
      <Text>{wg.name}</Text>
    )*/


  render()
  {

    return (
      <View>
        <Button text="Logout" onPress={this.onPressLogout} show={true} type="logout"></Button>
        <View style={styles.viewNavigation}><Text style={styles.textNavigation}>Search WG</Text></View>
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
