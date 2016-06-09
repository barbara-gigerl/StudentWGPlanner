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
      joinbutton: '',
      errormessage: ''
    }

    this.onPressLogout = this.onPressLogout.bind(this);
    this.onJoinWG = this.onJoinWG.bind(this);
    this.insertDatabase = this.insertDatabase.bind(this);
    this.textchangehandler = this.textchangehandler.bind(this)
  }

  onPressLogout() {
    GLOBAL.USERID = ''
    this.props.navigator.push({name: "Login"});
  }

  textchangehandler(text)
  {
    this.setState({searchterm: text})
    axios.get(config.PARSE_SERVER_URL, {
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
      axios.get(config.PARSE_SERVER_URL, {
        headers: config.PARSE_SERVER_HEADERS,
        params: {
          "where": {
            "name": this.state.searchterm
          }
        }
      }).then(function(response) {
        if (response.data.results.length === 1)
          this.insertDatabase(response.data.results[0]);
        }
      .bind(this)).catch(function(error) {
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
    resultObject.users.push(GLOBAL.USERID);

    axios.put(config.PARSE_SERVER_URL + resultObject.objectId, {
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
    return (
      <Text>{wg.name}</Text>
    )
  }

  render()
  {
    console.log(this.state.searchterm);

    return (
      <View>
        <TouchableHighlight class="Logout" onPress={this.onPressLogout}>
          <View style={styles.logout}>
            <Text>Logout</Text>
          </View>
        </TouchableHighlight>
        <TextInput onChangeText={(text) => this.textchangehandler(text)} value={this.state.searchterm}></TextInput>
        <Text style={styles.errormessage}>{this.state.errormessage}</Text>
        <ListView dataSource={this.state.wgs} renderRow={this.renderWg.bind(this)}/>
        <Button text="Join WG" onPress={this.onJoinWG} show={this.state.joinbutton}/>
      </View>
    );
  }
}
