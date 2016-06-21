jest.unmock('../pages/register/register'); // unmock to use the actual implementation of sum


GLOBAL = require('../auth');

import axios from 'axios';
import { ListView } from 'react-native';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Register from '../pages/register/register';


describe('Search WG Test', () => {

  let search_wg_test;

  function renderScreen(props, states) {
    var renderer = TestUtils.createRenderer();
    renderer.render(<Register {...props || {}}/>);
    var instance = renderer._instance._instance;
    instance.setState(states || {});
    var output = renderer.getRenderOutput();

    return {
      output,
      instance,
    };
  }

  it('display correct and complete GUI', () => {
    const state = {
      username: '',
      password: '',
      password2: '',
      email: '',
      errormessage: ''
    };

    search_wg_test = renderScreen({}, state);
    let { output } = search_wg_test;
    expect(output.type.name).toBe("View");
    let children = output.props.children;

    expect(children[0].type.name).toBe("View");
    expect(children[0].props.children.type.name).toBe("Text");
    expect(children[0].props.children.props.children).toBe("Register");

    expect(children[1].type.name).toBe("Text");
    expect(children[1].props.children).toBe("Username");

    expect(children[2].type.name).toBe("TextInput");
    expect(children[2].props.value).toBe("");

    expect(children[3].type.name).toBe("Text");
    expect(children[3].props.children).toBe("Password");

    expect(children[4].type.name).toBe("TextInput");
    expect(children[4].props.value).toBe("");
    expect(children[4].props.secureTextEntry).toBe(true);

    expect(children[5].type.name).toBe("Text");
    expect(children[5].props.children).toBe("Repeat password");

    expect(children[6].type.name).toBe("TextInput");
    expect(children[6].props.value).toBe("");
    expect(children[6].props.secureTextEntry).toBe(true);

    expect(children[7].type.name).toBe("Text");
    expect(children[7].props.children).toBe("Email");

    expect(children[8].type.name).toBe("TextInput");
    expect(children[8].props.value).toBe("");

    expect(children[9].type.name).toBe("Text");
    expect(children[9].props.children).toBe("");

    expect(children[10].type.name).toBe("Button");
    expect(children[10].props.text).toBe("Register");

    expect(children[11].type.name).toBe("Button");
    expect(children[11].props.text).toBe("Back");
  });

  it('no data', () => {
    var state = {
      username: '',
      password: '',
      password2: '',
      email: '',
      errormessage: ''
    };

    var renderer = TestUtils.createRenderer();
    renderer.render(<Register />);
    var instance = renderer._instance._instance;
    instance.setState(state);
    var output = renderer.getRenderOutput();

    var registerbutton = output.props.children[10].props.onPress;
    registerbutton();
    output = renderer.getRenderOutput();
    expect(output.props.children[9].props.children).toBe("Please fill in all data.");

  });

  it('no username', () => {
    var state = {
      username: '',
      password: '',
      password2: '',
      email: '',
      errormessage: ''
    };

    var renderer = TestUtils.createRenderer();
    renderer.render(<Register />);
    var instance = renderer._instance._instance;
    instance.setState(state);
    var output = renderer.getRenderOutput();

    var registerbutton = output.props.children[10].props.onPress;
    registerbutton();
    output = renderer.getRenderOutput();
    expect(output.props.children[9].props.children).toBe("Please fill in all data.");

  });

  it('no password', () => {
    var state = {
      username: '',
      password: '',
      password2: '',
      email: '',
      errormessage: ''
    };

    var renderer = TestUtils.createRenderer();
    renderer.render(<Register />);
    var instance = renderer._instance._instance;
    instance.setState(state);
    var output = renderer.getRenderOutput();

    var registerbutton = output.props.children[10].props.onPress;
    registerbutton();
    output = renderer.getRenderOutput();
    expect(output.props.children[9].props.children).toBe("Please fill in all data.");

    var textchange = output.props.children[2].props.onChangeText;
    textchange("CorrectUsername", 'username');
    output = renderer.getRenderOutput();
    expect(output.props.children[2].props.value).toBe("CorrectUsername");

    registerbutton();
    output = renderer.getRenderOutput();
    expect(output.props.children[9].props.children).toBe("Please fill in all data.");

  });

  it('passwords dont match', () => {
    var state = {
      username: '',
      password: '',
      password2: '',
      email: '',
      errormessage: ''
    };

    var renderer = TestUtils.createRenderer();
    renderer.render(<Register />);
    var instance = renderer._instance._instance;
    instance.setState(state);
    var output = renderer.getRenderOutput();

    var registerbutton = output.props.children[10].props.onPress;
    var textchange = output.props.children[2].props.onChangeText;
    textchange("CorrectUsername", 'username');

    textchange = output.props.children[4].props.onChangeText
    textchange("passw1", 'password');

    textchange = output.props.children[6].props.onChangeText
    textchange("passw2", 'password2');
    output = renderer.getRenderOutput();

    registerbutton();
    output = renderer.getRenderOutput();

    expect(output.props.children[2].props.value).toBe("CorrectUsername");
    expect(output.props.children[4].props.value).toBe("passw1");
    expect(output.props.children[6].props.value).toBe("passw2");
    expect(output.props.children[9].props.children).toBe("Passwords are not equal.");
  });

  it('no mail', () => {
    var state = {
      username: '',
      password: '',
      password2: '',
      email: '',
      errormessage: ''
    };

    var renderer = TestUtils.createRenderer();
    renderer.render(<Register />);
    var instance = renderer._instance._instance;
    instance.setState(state);
    var output = renderer.getRenderOutput();

    var registerbutton = output.props.children[10].props.onPress;
    var textchange = output.props.children[2].props.onChangeText;
    textchange("CorrectUsername", 'username');

    textchange = output.props.children[4].props.onChangeText
    textchange("passw1", 'password');

    textchange = output.props.children[6].props.onChangeText
    textchange("passw1", 'password2');

    registerbutton();
    output = renderer.getRenderOutput();

    expect(output.props.children[2].props.value).toBe("CorrectUsername");
    expect(output.props.children[4].props.value).toBe("passw1");
    expect(output.props.children[6].props.value).toBe("passw1");
    expect(output.props.children[9].props.children).toBe("Please fill in all data.");

  });

  it('register - no errors', () => {
    var state = {
      username: '',
      password: '',
      password2: '',
      email: '',
      errormessage: ''
    };

    var renderer = TestUtils.createRenderer();
    renderer.render(<Register />);
    var instance = renderer._instance._instance;
    instance.setState(state);
    var output = renderer.getRenderOutput();

    var registerbutton = output.props.children[10].props.onPress;
    var textchange = output.props.children[2].props.onChangeText;
    textchange("CorrectUsername", 'username');

    textchange = output.props.children[4].props.onChangeText
    textchange("passw1", 'password');

    textchange = output.props.children[6].props.onChangeText
    textchange("passw1", 'password2');

    textchange = output.props.children[8].props.onChangeText
    textchange("test@test.at", 'email');

    output = renderer.getRenderOutput();

    expect(output.props.children[2].props.value).toBe("CorrectUsername");
    expect(output.props.children[4].props.value).toBe("passw1");
    expect(output.props.children[6].props.value).toBe("passw1");
    expect(output.props.children[8].props.value).toBe("test@test.at");

  });

});
