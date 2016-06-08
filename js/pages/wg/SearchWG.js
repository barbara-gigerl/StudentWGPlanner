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

  }

  onPressLogout(){
    GLOBAL.USERID = ''
    this.props.navigator.push({
       name: "Login"
    });
  }


  textchangehandler(text)
  {
    //console.log(text);
    this.setState({searchterm: text})
    axios.get('http://172.20.10.8:1337/parse/classes/wgs/', {
      headers: {'X-Parse-Application-Id': 'StudentWGPlanner',
                'X-Parse-Master-Key': 'asdf'},
      params: {
        "where": {"name": {"$regex": text}}
      }
    })
    .then(response => response.data.results)
    .then(results => {
      console.log(results);
      this.setState({
        wgs: this.state.wgs.cloneWithRows([...results]),
      })
    }).catch((error) => {
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
      axios.get('http://172.20.10.8:1337/parse/classes/wgs/', {
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
        <TextInput style={{backgroundColor: 'red', height: 20}} onChangeText={this.textchangehandler.bind(this)} value={this.state.searchterm}></TextInput>
        <ListView dataSource={this.state.wgs} renderRow={this.renderWg.bind(this)}/>
        <TouchableHighlight onPress={(this.onJoinWG)}>
          <Text>{this.state.joinbutton}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
