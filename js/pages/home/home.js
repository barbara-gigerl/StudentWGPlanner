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



export default class Home extends Component {



  constructor(props)
  {
    super(props);

        this.onPressCreateWG = this.onPressCreateWG.bind(this);
        this.onPressSearchWG = this.onPressSearchWG.bind(this);
        this.onPressShoppingList = this.onPressSearchWG.bind(this);
        this.onPressShowRoommates = this.onPressSearchWG.bind(this);
        this.onPressLeaveWG = this.onPressSearchWG.bind(this);
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

  render()
  {
    return (
      <View>
        <Text>Your WG</Text>
        <Text>[[Display this when user does not yet belong to WG: ]]</Text>
        <TouchableHighlight  onPress={this.onPressCreateWG}><Text>Create WG</Text></TouchableHighlight>
        <TouchableHighlight  onPress={this.onPressSearchWG}><Text>Search WG</Text></TouchableHighlight>
        <Text>[[Display this when user does belong to WG: ]]</Text>
        <TouchableHighlight  onPress={this.onPressShoppingList}><Text>Shopping List</Text></TouchableHighlight>
        <TouchableHighlight onPress={this.onPressShowRoommates}><Text>Show Roommates</Text></TouchableHighlight>
        <TouchableHighlight onPress={this.onPressLeaveWG}><Text>Leave WG</Text></TouchableHighlight>
      </View>
    );
  }
}
