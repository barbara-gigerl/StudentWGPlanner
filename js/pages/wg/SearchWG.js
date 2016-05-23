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



export default class SearchWG extends Component {

  constructor(props)
  {
    super(props);

    this.state = {searchterm: ""}
  }

  textchangehandler(text)
  {
    console.log(text);
    this.setState({searchterm: text})
    const requesturl = `http://10.0.2.2:1337/parse/classes/wgs?where={"name": {"$regex":".*${text}.*"}}`
    console.log(requesturl)
      fetch( requesturl,
      { method: "GET",
        headers: { "X-Parse-Application-Id": "StudentWGPlanner" },
      })
      .then((res) => res.json())
      .then((response) => {console.log(response)})
      .catch((error) => {console.log(error)})

  }

  render()
  {
    return (
      <View>
        <TextInput onChangeText={this.textchangehandler.bind(this)}
        value={this.state.searchterm}></TextInput>
      </View>
    );
  }
}
