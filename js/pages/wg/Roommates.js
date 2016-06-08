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

GLOBAL = require('../../auth');

import Parse from "parse/react-native"

Parse.initialize("StudentWGPlanner")
Parse.serverURL = "http://10.0.2.2:1337/parse"
const WGObject = Parse.Object.extend("wgs")


export default class Roommate extends Component {

  constructor(props)
  {
    super(props);

    this.onPressLogout = this.onPressLogout.bind(this);
    this.showroommates = this.showroommates.bind(this);

    this.state = {
      //TODO: rename roommates
      wgs: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
      }),
    }

  }

showroommates(text)
{
  //console.log(text);

  let query = new Parse.Query(WGObject)
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

  onPressLogout(){
    GLOBAL.USERID = ''
    this.props.navigator.push({
       name: "Login"
    });
  }

  render()
  {
    return (
      <View>
        <Text>Your Roommates</Text>
        <ListView dataSource={this.state.wgs} renderRow={this.renderWg.bind(this)}/>
        </View>
    );
  }
}
