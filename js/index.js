import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  Navigator,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';

import Login from './pages/login/login';
import Register from './pages/register/register';
import Home from './pages/home/home';
import CreateWG from './pages/wg/CreateWG';
import LeaveWG from './pages/wg/LeaveWG';
import SearchWG from './pages/wg/SearchWG';
import ShoppingList from './pages/wg/ShoppingList';
import Roommates from './pages/wg/Roommates';

export default class StudentWGPlanner extends Component {

  constructor(props)
  {
    super(props);
  }
  
  renderScene(route, navigator)
  {
    console.log("renderScene");
    console.log(route);

    switch(route.name)
    {
      case "Login": return <Login navigator={navigator}/>;
      case "Register": return <Register navigator={navigator}/>;
      case "Home": return <Home navigator={navigator}/>;
      case "CreateWG": return <CreateWG navigator={navigator}/>;
      case "LeaveWG": return <LeaveWG navigator={navigator}/>;
      case "SearchWG": return <SearchWG navigator={navigator}/>;
      case "ShoppingList": return <ShoppingList navigator={navigator}/>;
      case "Roommates": return <Roommates navigator={navigator}/>;
    }
  }

  render() {
    let render_value = (
       <View style={styles.container}>
       <Text style={styles.welcome}>
         Student WG Planner
       </Text>
       <Navigator initialRoute={{name:'Login'}}
       renderScene={this.renderScene.bind(this)}>
       </Navigator>
       </View>
    );
    return render_value;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /*justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',*/
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  inputlabel: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
  },
});
