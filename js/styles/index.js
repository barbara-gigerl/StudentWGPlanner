import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    //fontSize: 25,
    textAlign: 'center',
    margin: 30
  },
  inputlabel: {
    fontSize: 20,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    color:'#CCCCCC'
    //fontWeight: 'bold'
  },
  inputLabelSmall: {
    fontSize: 15,
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 30,
    color:'#CCCCCC'
    //fontWeight: 'bold'
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#b3daff',
    padding: 5,
    marginBottom: 10,
    marginTop: 15,
    marginLeft: 75,
    marginRight: 75,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 5
  },
  errormessage: {
    textAlign: 'center'
  },
  basic: {
    height: 40,
    //borderBottomWidth: 2,
    color: '#0096C8',
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
  textMenuHeader: {
    fontSize: 15,
    margin: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#CCCCCC'
  },
  textButtonMenu: {
    fontSize: 20,
    color: '#0096C8'
  },
  textButton: {
    fontSize: 15,
    color: '#0096C8'
  },
  textLogout: {
    fontSize: 15,
    color: '#CCCCCC'
  },
  viewNavigation: {
    margin: 15,
    marginTop: 30,
    //borderWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    //borderTopColor: '#0069cc'
    borderColor: '#0096C8'
    //borderRadius: 4
  },
  textNavigation: {
    margin: 5,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#CCCCCC'
    //color: '#0069cc'
  },
  buttonLogout: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 250,
    padding: 2,
    backgroundColor: '#0096C8',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 4
  },
  buttonBack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#0096C8',
    padding: 5,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 75,
    marginRight: 75,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10
  },
  buttonMenu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 2,
    borderColor: 'black',
    //borderTopWidth: 2,
    //borderBottomWidth: 2,
    borderRadius: 6,
    //backgroundColor: '#DDDDDD',
    //backgroundColor: '#0096C8',
    padding: 7,
    marginVertical: 10,
    marginHorizontal: 15
  },
  backgroundImage: {
   flex: 1,
   width: null,
   height: null
   //resizeMode: 'stretch'
 },
 listViewItem: {
   fontSize: 17,
   color: '#CCCCCC'
 },
 contentContainer: {
   paddingVertical: 20
 },
 normal:{
   color: '#DDDDDD'
 },
 tobedeleted: {
   color: '#FFFFFF'
 }
});
