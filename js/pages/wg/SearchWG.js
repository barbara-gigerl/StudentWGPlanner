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
import styles from '../../styles';
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
      })
    }
    this.onPressLogout = this.onPressLogout.bind(this);
  }

  textchangehandler(text)
  {
    console.log(text);

    let query = new Parse.Query(WGObject)

    this.setState({searchterm: text})
    query.matches("name", new RegExp(`${text}`, "ig"));
    query.find().then((results) => {
      this.setState({
        wgs: this.state.wgs.cloneWithRows([...results])
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  renderWg(wg)
  {
    return (
      <Text>{wg.get("name")}</Text>
    )
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
        <TextInput onChangeText={this.textchangehandler.bind(this)} value={this.state.searchterm}></TextInput>
        <ListView dataSource={this.state.wgs} renderRow={this.renderWg.bind(this)}/>
        <TouchableHighlight class="Logout" onPress={this.onPressLogout}>
          <Text>Logout</Text>
        </TouchableHighlight>
</View>
    );
  }
}
