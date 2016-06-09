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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: "gray",
    backgroundColor: '#b3daff',
    padding: 5,
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 75,
    marginRight: 75,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#0069cc',
    borderRadius: 10
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
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    marginLeft: 325,
    padding: 5,
    backgroundColor: '#b3daff',
    borderColor: '#0069cc',
    borderWidth: 1,
    borderRadius: 10

  }
});
