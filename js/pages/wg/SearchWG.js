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


import axios from 'axios';

GLOBAL = require('../../auth');

const API_URL = 'http://10.0.2.2:1337/parse/classes/wgs/';

export default class SearchWG extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      searchterm: "",
      wgs: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
      }),
      joinbutton: ""
    }

    this.onPressLogout = this.onPressLogout.bind(this);
    this.onJoinWG = this.onJoinWG.bind(this);
    this.insertDatabase = this.insertDatabase.bind(this);
    this.textchangehandler = this.textchangehandler.bind(this)
  }

  onPressLogout(){
    GLOBAL.USERID = ''
    this.props.navigator.push({
       name: "Login"
    });
  }


  textchangehandler(text)
  {
    console.log("will now connect to server");
    this.setState({searchterm: text})
    axios.get(API_URL, {
      headers: {'X-Parse-Application-Id': 'StudentWGPlanner',
                'X-Parse-Master-Key': 'asdf'},
      params: {
        "where": {"name": {"$regex": text}}
      }
    })
    //.then(response => response.data.results)
    .then(function(response) {
      var results = response.data.results;
      console.log(results);
      this.setState({
        wgs: this.state.wgs.cloneWithRows([...results]),
      })
    }.bind(this))
    .catch((error) => {
      console.log(error)
    })

    //TODO: need to change this if searchWG is finally working
    if(this.state.searchterm !== ""){
      this.setState({joinbutton: "Join this WG"});
    }
    else {
      this.setState({joinbutton: ""});
    }

  }

  onJoinWG()
  {
    if(this.state.searchterm !== ""){
      console.log("will now connect to server");
      axios.get(API_URL, {
        headers: {'X-Parse-Application-Id': 'StudentWGPlanner',
                  'X-Parse-Master-Key': 'asdf'},
          params: {
          "where": {"name" : this.state.searchterm, "$options": 'i' }
          }
      })
      .then(function (response) {
        console.log(response)
        if(response.data.results.length === 1)
          this.insertDatabase(response.data.results[0]);
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  insertDatabase(resultObject)
  {
    console.log("insert new user");
    console.log(resultObject);

    for(var i = 0; i < resultObject.users.length; i++)
    {
      if(resultObject.users[i] === GLOBAL.USERID){
        console.log("Datensatz vorhanden")
        return true;
      }
    }

    //not joined this specific wg: now update database
    /*var query = new Parse.Query(WGObject);
    query.equalTo("objectId", resultObject.objectId);
    query.each(function(obj) {
      resultObject.users.push(GLOBAL.USERID);
      obj.set("users", resultObject.users);
      return obj.save();
    }).then(function() {
      console.log("update");
      GLOBAL.WGID = resultObject.objectId;
      console.log(GLOBAL.WGID);
    }, function(err) {
      console.log(err);
    });*/


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
          <Text>Logout</Text>
        </TouchableHighlight>
        <TextInput onChangeText={(text) => this.textchangehandler(text)} value={this.state.searchterm}></TextInput>
        <ListView dataSource={this.state.wgs} renderRow={this.renderWg.bind(this)}/>
        <TouchableHighlight onPress={(this.onJoinWG)}>
          <Text>{this.state.joinbutton}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
