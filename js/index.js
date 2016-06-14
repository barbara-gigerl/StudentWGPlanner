import React, {
  Component,
  StyleSheet,
  Text,
  Navigator,
  TextInput,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

import styles from "./styles/index";
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

    switch (route.name) {
      case "Login":
        return <Login navigator={navigator}/>;
      case "Register":
        return <Register navigator={navigator}/>;
      case "Home":
        return <Home navigator={navigator}/>;
      case "CreateWG":
        return <CreateWG navigator={navigator}/>;
      case "LeaveWG":
        return <LeaveWG navigator={navigator}/>;
      case "SearchWG":
        return <SearchWG navigator={navigator}/>;
      case "ShoppingList":
        return <ShoppingList navigator={navigator}/>;
      case "Roommates":
        return <Roommates navigator={navigator}/>;
    }
  }
//<Image source={require('../assets/login_bg.jpg')}  style={styles.backgroundImage}></Image>
//<Image source={require('../assets/darkgrey.png')}  style={styles.backgroundImage}>
  render() {
    return (
        <Image source={require('../assets/darkgrey.png')}  style={styles.backgroundImage}>
        <View style={styles.view}>
        <Navigator initialRoute={{
          name: 'Login'
        }} renderScene={this.renderScene.bind(this)}></Navigator>

        </View></Image>
    );
  }
}
