jest.unmock('../pages/login/login'); // unmock to use the actual implementation of sum
//const React = require('react');
/*import View from 'react'
import Text from 'react'
import TextInput from 'react'
import TouchableHighlight from 'react'*/

//const ReactDom = require('react-dom');
//const TestUtils = require('react-addons-test-utils');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Login from '../pages/login/login';
import {shallow} from 'enzyme'; //Install with: sudo npm i --save-dev enzyme

/*import TextInput from "../pages/login/login";
import Stylesheet from "../pages/login/login";
import TouchableHighlight from "../pages/login/login";
import Text from "../pages/login/login";*/


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

  it('should display correct and complete GUI', () => {
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
/*
    it('empty username', () => {
      const states = {
            username: '',
            password: '',
            errormessage: ''};
      login_test = renderScreen({}, states);
      const {output} = login_test;
      let onPressLogin_ = output.props.children[5].props.onPress;
      onPressLogin_();
      console.log("here in test.");
      login_test = renderScreen(output.props, output.states);
      console.log(output.states);
      //expect(outputnew.props.children[4].props.children).toBe('Please enter username and password');


});
*/


  it('click button', () =>{
    var states = {
          username: '',
          password: '',
          errormessage: ''};
    login_test = renderScreen({}, states);
    var wrapper = shallow(<Login />);
    var {output} = login_test;
    const loginfunction = output.props.children[5].props.onPress;
    loginfunction();

    TestUtils.Simulate.click(output.props.children[5].props);

    //console.log(output.props.children[4]);

    //doesn't update output but WHY?
    expect(wrapper.contains('Please enter username and password')).toBe(true)
    console.log(output.props.children[4].props);
  //  expect(this.state.errormessage).toEqual('Please enter username and password')
  });

/*
  it('control login button', () => {
    var controlloginbtntest = renderScreen();
    var {output} = controlloginbtntest;
    var renderer = TestUtils.createRenderer();

    var wrapper = shallow(<Login />);
    var loginbtn = output.props.children[5];
    var usernamefield = output.props.children[1].props;
    var passwordfield = output.props.children[3].props;
    var errormessage = output.props.children[4].props.children;

    //expect(output.props.children[4].props.children).toEqual('hello');
    expect(errormessage).toBe('');
  //  expect(wrapper.contains(<Text ref='ref'></Text>)).toEqual(true)
  //  expect(wrapper.contains(<Text ref='ref2'>Please enter username and password</Text>)).toEqual(false)

    //empty username and password field
    TestUtils.Simulate.click(output.props.children[1]);
    expect(wrapper.contains(<Text ref='ref'>Please enter username and password</Text>)).toEqual(true)
//    expect(output.props.children[4].props.children).toEqual('Please enter username and password');
//    expect(wrapper.contains(<Text ref='ref2'>Please enter username and password</Text>)).toEqual(true)

    //only username
    TestUtils.Simulate.change(usernamefield, 'MaxMuster');
    TestUtils.Simulate.click(loginbtn);
//    expect(wrapper.contains(<Text ref='ref2'>Please enter username and password</Text>)).toEqual(true)

    //only password
    TestUtils.Simulate.change(usernamefield, '');
    TestUtils.Simulate.change(passwordfield, 'Password');
    TestUtils.Simulate.click(loginbtn);
//    expect(wrapper.contains(<Text ref='ref2'>Please enter username and password</Text>)).toEqual(true)

    //TODO: change this test if database connection is working
    //successful login: username and password
    TestUtils.Simulate.change(usernamefield, 'MaxMuster');
    TestUtils.Simulate.change(passwordfield, 'Password');
    TestUtils.Simulate.click(loginbtn);
//    expect(wrapper.contains(<Text ref='ref2'>Please enter username and password</Text>)).toEqual(true)
  });*/




});
