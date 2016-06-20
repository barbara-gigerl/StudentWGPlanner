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
import styles from "../../styles/index";

GLOBAL = require('../../auth');

export default class Roommate extends Component {

  constructor(props)
  {
    super(props);

    this.onPressLogout = this.onPressLogout.bind(this);
    this.onPressBack = this.onPressBack.bind(this);
    this.showroommates = this.showroommates.bind(this);
    this.renderRoommate = this.renderRoommate.bind(this);
    this.state = {
      roommates: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
      }),
    }
    this.showroommates();
  }


    renderRoommate(userdata)
    {
      return (
        <Text style={styles.listViewItem} >{userdata.username}</Text>
      )

    }

showroommates()
{
    console.log("will now connect to server");
    return axios.get('http://10.0.2.2:1337/parse/classes/wgs/', {
      headers: {'X-Parse-Application-Id': 'StudentWGPlanner',
                'X-Parse-Master-Key': 'asdf'},
        params: {
        "where": {"objectId" : GLOBAL.WGID } //TODO replace Global.WGID
        }
    })
    .then((response) => {
        this.setState({roommates: this.state.roommates.cloneWithRows([...response.data.results[0].users])});
        return Promise.resolve(true);
      })
    .catch((error) => {
      console.log(error);
    });

}
  onPressBack() {
    this.props.navigator.push({name: "Home"});
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
        <Button text="Logout" onPress={this.onPressLogout} show={true} type="logout"></Button>
        <View style={styles.viewNavigation}><Text style={styles.textNavigation}>Roommates</Text></View>
        <Text style={styles.textMenuHeader}>In your WG are the following people:</Text>
        <ListView dataSource={this.state.roommates} renderRow={this.renderRoommate.bind(this)}/>
        <Button text="Back" onPress={this.onPressBack} show={true} type="back"></Button>
      </View>
    );
  }
}
