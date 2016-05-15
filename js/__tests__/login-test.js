jest.unmock('../pages/login/login'); // unmock to use the actual implementation of sum
const React = require('react');
/*import View from 'react'
import Text from 'react'
import TextInput from 'react'
import TouchableHighlight from 'react'*/

const ReactDom = require('react-dom');
const TestUtils = require('react-addons-test-utils');
import Login from '../pages/login/login';
var TouchableHighlight = require('react')
/*import TextInput from "../pages/login/login";
import Stylesheet from "../pages/login/login";
import TouchableHighlight from "../pages/login/login";
import Text from "../pages/login/login";*/


describe('Login', () => {

  let login_test;

  function renderScreen(props, states) {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Login {...props || {}}/>);
    const instance = renderer._instance._instance;
    instance.setState(states || {});
    const output = renderer.getRenderOutput();

    return {
      output,
      instance,

    };
  }

  it('should display correct and complete GUI', () => {
    const states = {       username: '',
          password: '',
          errormessage: ''};
    login_test = renderScreen({}, states);
    const {output} = login_test;
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

});
