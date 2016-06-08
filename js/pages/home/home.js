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

export default class Home extends Component {



  constructor(props)
  {
    super(props);

        this.onPressCreateWG = this.onPressCreateWG.bind(this);
        this.onPressSearchWG = this.onPressSearchWG.bind(this);
        this.onPressShoppingList = this.onPressShoppingList.bind(this);
        this.onPressShowRoommates = this.onPressSearchWG.bind(this);
        this.onPressLeaveWG = this.onPressSearchWG.bind(this);
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
        name:"ShowRoommates"    });
  }

  onPressLeaveWG()
  {
     this.props.navigator.push({
        name:"LeaveWG"    });
  }

  onPressLogout(){
    GLOBAL.USERID = ''
    this.props.navigator.push({
       name: "Login"
    });
  }

  onPressJoinWG(){

  }

  render()
  {
    return (
      <View>
        <Text>Your WG</Text>
        <Text>[[Display this when user does not yet belong to WG: ]]</Text>
        <TouchableHighlight onPress={this.onPressCreateWG}><Text>Create WG</Text></TouchableHighlight>
        <TouchableHighlight onPress={this.onPressSearchWG}><Text>Search WG</Text></TouchableHighlight>
        <Text>[[Display this when user does belong to WG: ]]</Text>
        <TouchableHighlight onPress={this.onPressJoinWG}><Text>Join WG (tmp should be in Search WG)</Text></TouchableHighlight>
        <TouchableHighlight onPress={this.onPressShoppingList}><Text>Shopping List</Text></TouchableHighlight>
        <TouchableHighlight onPress={this.onPressShowRoommates}><Text>Show Roommates</Text></TouchableHighlight>
        <TouchableHighlight onPress={this.onPressLeaveWG}><Text>Leave WG</Text></TouchableHighlight>
        <TouchableHighlight class="Logout" onPress={this.onPressLogout}>
          <Text>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
