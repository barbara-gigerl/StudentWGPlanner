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

  it('test states and errormessages', () =>{
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

    //only Passwort set
    changeUsername("")
    changePassword("Passwort")
    loginfunction()
    test = renderer.getRenderOutput();
    expect(test.props.children[4].props.children).toEqual("Please enter username and password");

    //only Username set
    changeUsername("MaxMuster")
    changePassword("")
    loginfunction()
    test = renderer.getRenderOutput();
    expect(test.props.children[4].props.children).toEqual("Please enter username and password");

    //TODO: change if server connection works
    //Passwort and Username
    changeUsername("MaxMuster")
    changePassword("Passwort")
    loginfunction()
    test = renderer.getRenderOutput();
    expect(test.props.children[4].props.children).toEqual("");
  });
});
