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


import axios from 'axios';

GLOBAL = require('../../auth');
import Parse from "parse/react-native"

Parse.initialize("StudentWGPlanner")
Parse.serverURL = "http://10.0.2.2:1337/parse"
const WGObject = Parse.Object.extend("wgs")

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

    let query = new Parse.Query(WGObject)

    this.setState({searchterm: text})
    query.matches("name", new RegExp(`${text}`, "ig"));
    query.find().then((results) => {
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
      axios.get('http://10.0.2.2:1337/parse/classes/wgs/', {
        headers: {'X-Parse-Application-Id': 'StudentWGPlanner',
                  'X-Parse-Master-Key': 'asdf'},
          params: {
          "where": {"name" : this.state.searchterm }
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

    for(var i = 0; i < resultObject.users.length; i++)
    {
      if(resultObject.users[i] === GLOBAL.USERID){
        console.log("Datensatz vorhanden")
        return true;
      }
    }

    //not joined this specific wg: now update database
    var query = new Parse.Query(WGObject);
    query.equalTo("objectId", resultObject.objectId);
    query.each(function(obj) {
      obj.set("users", resultObject.users.push(GLOBAL.USERID));
      obj.save();
    }).then(function() {
      // All objects updated.
      console.log("update");
    }, function(err) {
      console.log(err);
    });


  }


  renderWg(wg)
  {
    return (
      <Text>{wg.get("name")}</Text>
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
        <TextInput onChangeText={this.textchangehandler.bind(this)} value={this.state.searchterm}></TextInput>
        <ListView dataSource={this.state.wgs} renderRow={this.renderWg.bind(this)}/>
        <TouchableHighlight onPress={(this.onJoinWG)}>
          <Text>{this.state.joinbutton}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
