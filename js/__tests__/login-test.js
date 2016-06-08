jest.unmock('../pages/login/login'); // unmock to use the actual implementation of sum


GLOBAL = require('../auth');

import axios from 'axios';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Login from '../pages/login/login';

describe('Login test', () => {

  let login_test;

  function renderScreen(props, states) {
    var renderer = TestUtils.createRenderer();
    renderer.render(<Login {...props || {}}/>);
    var instance = renderer._instance._instance;
    instance.setState(states || {});
    var output = renderer.getRenderOutput();

    return {
      output,
      instance,
    };
  }

  it('display correct and complete GUI', () => {
    const states = {
          username: '',
          password: '',
          errormessage: ''};
    login_test = renderScreen({}, states);
    var {output} = login_test;
    expect(output.type.name).toBe("View");

    expect(output.props.children[0].type.name).toBe("Text");
    expect(output.props.children[0].props.children).toBe('Username:');
    expect(output.props.children[1].type.name).toBe("TextInput");

    expect(output.props.children[2].type.name).toBe("Text");
    expect(output.props.children[2].props.children).toBe('Password:');
    expect(output.props.children[3].type.name).toBe("TextInput");

    expect(output.props.children[4].type.name).toBe("Text");
    expect(output.props.children[4].props.children).toBe('');

    expect(output.props.children[5].type.name).toBe("TouchableHighlight");
    expect(output.props.children[5].props.children.props.children).toBe('Login');

    expect(output.props.children[6].type.name).toBe("TouchableHighlight");
    expect(output.props.children[6].props.children.props.children).toBe('Register');

  });

  it('empty username', () => {
    const states = {       username: '',
          password: '',
          errormessage: ''};
    //
    login_test = renderScreen({}, states);
    const {output} = login_test;
    let onPressLogin_ = output.props.children[5].props.onPress;
    onPressLogin_();
    console.log("here in test.");
    login_test = renderScreen(output.props, output.states);
    console.log(output.states);
    //expect(outputnew.props.children[4].props.children).toBe('Please enter username and password');
  });

  it('test only username', () =>{
    var renderer = TestUtils.createRenderer();
    renderer.render(<Login />)
    var test = renderer.getRenderOutput();

    // test.props.children[4] -> errormessage text
    var loginfunction = test.props.children[5].props.onPress;
    var registerfunction = test.props.children[6].props.onPress;

    var changeUsername = test.props.children[1].props.onChangeText;
    var changePassword = test.props.children[3].props.onChangeText;

    expect(test.props.children[4].props.children).toEqual("");

    loginfunction();
    test = renderer.getRenderOutput();
    expect(test.props.children[4].props.children).toEqual("Please enter username and password");

    //only Username set
    changeUsername("MaxMuster")
    loginfunction()
    test = renderer.getRenderOutput();
    expect(test.props.children[4].props.children).toEqual("Please enter username and password");
  });

  it('test only password', () =>{
    var renderer = TestUtils.createRenderer();
    renderer.render(<Login />)
    var test = renderer.getRenderOutput();

    // test.props.children[4] -> errormessage text
    var loginfunction = test.props.children[5].props.onPress;
    var registerfunction = test.props.children[6].props.onPress;

    var changeUsername = test.props.children[1].props.onChangeText;
    var changePassword = test.props.children[3].props.onChangeText;

    expect(test.props.children[4].props.children).toEqual("");

    //only Passwort set
    changeUsername("")
    changePassword("Passwort")
    loginfunction()
    test = renderer.getRenderOutput();
    expect(test.props.children[4].props.children).toEqual("Please enter username and password");
  });

});

describe("Testing with Serverconnection (asynctest)", () => {
  var renderer = TestUtils.createRenderer();
  renderer.render(<Login />)
  var test = renderer.getRenderOutput();

  beforeEach(function (done) {
    // test.props.children[4] -> errormessage text
    var loginfunction = test.props.children[5].props.onPress;
    var registerfunction = test.props.children[6].props.onPress;

    var changeUsername = test.props.children[1].props.onChangeText;
    var changePassword = test.props.children[3].props.onChangeText;

    expect(test.props.children[4].props.children).toEqual("");


    //Passwort and Username
    changeUsername("MaxMuster")
    changePassword("Passwort")

    loginfunction(); //still need something that waits for the result of login

    //invoke special done callback
    done();
  })
  it('testing server connection', () =>{
    axios.get('http://10.0.2.2:1337/parse/classes/UserData/', {
      headers: {'X-Parse-Application-Id': 'StudentWGPlanner',
                'X-Parse-Master-Key': 'asdf'}
    })
    .catch(function (err) {
      throw err;
    });
  })

  /*
  it('test wrong username and password', () =>{
    console.log("begin wrong test--------------------")
    test = renderer.getRenderOutput()
    expect(test.props.children[4].props.children).toEqual("Wrong username or password.");

  });
  */
});
