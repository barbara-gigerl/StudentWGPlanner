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
import Button from "../../components/Button.js";

GLOBAL = require('../../auth');

export default class Roommate extends Component {

  constructor(props)
  {
    super(props);

    this.onPressLogout = this.onPressLogout.bind(this);
    this.showroommates = this.showroommates.bind(this);
    this.renderRoommate = this.renderRoommate.bind(this);
    this.state = {
      //TODO: rename roommates
      roommates: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
      }),
    }
    this.showroommates();
    console.log(this.state.roommates);
  }


    renderRoommate(userdata)
    {
      console.log(userdata);
      return (
        <Text>{userdata.username}</Text>
      )
    }
showroommates(text)
{
  if(this.state.searchterm !== ""){
    console.log("will now connect to server");
    axios.get('http://10.0.2.2:1337/parse/classes/wgs/', {
      headers: {'X-Parse-Application-Id': 'StudentWGPlanner',
                'X-Parse-Master-Key': 'asdf'},
        params: {
        "where": {"objectId" : "ONqbROBUg9" } //TODO replace Global.WGID
        }
    })
    .then(function (response) {
        console.log("fkfdk");
        console.log(response.data.results[0].userarray);
        this.setState({roommates: this.state.roommates.cloneWithRows([...response.data.results[0].userarray])});

      }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
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
    console.log(this.state.roommates[0])
    return (
      <View>
        <Button text="Logout" onPress={this.onPressLogout} show={true} logout={true}></Button>
        <Text>In your WG are the following people:</Text>
        <ListView dataSource={this.state.roommates} renderRow={this.renderRoommate.bind(this)}/>

      </View>
    );
  }
}
