import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    margin: 30
  },
  inputlabel: {
    fontSize: 20,
    textAlign: 'left',
    color: '#333333',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30
  },
  button: {
    textAlign: 'center',
    color: "gray",
    backgroundColor: '#b3d9ff',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 75,
    marginRight: 75,
    borderStyle: "solid",
    borderWidth: 5,
    borderColor: "black"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  errormessage: {
    textAlign: 'center',
    color: '#B0171F'
  },
  basic: {
    height: 40,
    borderColor: 'black',
    marginLeft: 30,
    marginRight: 30
  },
  view: {
    marginTop: 60,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    flex: 1
  },
  logout: {
    textAlign: 'right',
    fontSize: 15

  }
});
