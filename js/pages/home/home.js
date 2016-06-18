import React, {
  AppRegistry,
  Component,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';

GLOBAL = require('../../auth');
import Button from '../../components/Button';
import styles from "../../styles/index";
import config from "../../../config";


export default class Home extends Component {

  constructor(props)
  {
    super(props);

    this.onPressCreateWG = this.onPressCreateWG.bind(this);
    this.onPressSearchWG = this.onPressSearchWG.bind(this);
    this.onPressShoppingList = this.onPressShoppingList.bind(this);
    this.onPressShowRoommates = this.onPressShowRoommates.bind(this);
    this.onPressLeaveWG = this.onPressLeaveWG.bind(this);
    this.onPressLogout = this.onPressLogout.bind(this);
    this.onPressJoinWG = this.onPressJoinWG.bind(this);


  }

  onPressCreateWG()
  {

     this.props.navigator.push({
        name:"CreateWG"    });
  }

  onPressSearchWG()
  {

     this.props.navigator.push({
        name:"SearchWG"    });
  }

  onPressShoppingList()
  {
     this.props.navigator.push({
        name:"ShoppingList"    });
  }

  onPressShowRoommates()
  {

     this.props.navigator.push({
        name:"Roommates"    });
  }

  onPressLeaveWG()
  {
     this.props.navigator.push({
        name:"LeaveWG"    });
  }

  onPressLogout(){
    GLOBAL.USERID = ''
    GLOBAL.WGID = ''
    GLOBAL.WGNAME = '';
    this.props.navigator.push({
       name: "Login"
    });
  }

  onPressJoinWG(){

  }
//<TouchableHighlight style={styles.touchableHighlight} onPress={this.onPressCreateWG}><Text>Create WG</Text></TouchableHighlight>
//<TouchableHighlight onPress={this.onPressJoinWG}><Text>Join WG (tmp should be in Search WG)</Text></TouchableHighlight>
//<TouchableHighlight onPress={this.onPressShoppingList}><Text>Shopping List</Text></TouchableHighlight>
//<TouchableHighlight onPress={this.onPressShowRoommates}><Text>Show Roommates</Text></TouchableHighlight>
//<TouchableHighlight onPress={this.onPressLeaveWG}><Text>Leave WG</Text></TouchableHighlight>
  render()
  {



    let text1 = "Welcome";
    let text2 = "You are member of the WG: ";
    text2 = text2.concat(GLOBAL.WGNAME);
    let inWG = true;
    if(GLOBAL.WGID === '')
    {
      text1 = "You are not member of a WG!"
      text2 = "Please create a new WG or search one to join!"
      inWG = false;
    }

    return (
      <View>
        <Button text="Logout" onPress={this.onPressLogout} show={true} type="logout"></Button>
        <View style={styles.viewNavigation}><Text style={styles.textNavigation}>Home</Text></View>
        <Text style={styles.textMenuHeader}>{text1}</Text>
        <Text style={styles.textMenuHeader}>{text2}</Text>
        <Button text="Create WG" onPress={this.onPressCreateWG} show={!inWG} type="menu"></Button>
        <Button text="Search WG" onPress={this.onPressSearchWG} show={!inWG} type="menu"></Button>

        <Button text="Shopping list" onPress={this.onPressShoppingList} show={inWG} type="menu"></Button>
        <Button text="Show roommates" onPress={this.onPressShowRoommates} show={inWG} type="menu"></Button>
        <Button text="Leave WG" onPress={this.onPressLeaveWG} show={inWG} type="menu"></Button>
      </View>
    );
  }
}
