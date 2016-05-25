jest.unmock('../pages/wg/SearchWG'); // unmock to use the actual implementation of sum
const React = require('react');
/*import View from 'react'
import Text from 'react'
import TextInput from 'react'
import TouchableHighlight from 'react'*/

const ReactDom = require('react-dom');
const TestUtils = require('react-addons-test-utils');
import SearchWG from '../pages/wg/SearchWG';
var TouchableHighlight = require('react')
/*import TextInput from "../pages/login/login";
import Stylesheet from "../pages/login/login";
import TouchableHighlight from "../pages/login/login";
import Text from "../pages/login/login";*/

describe('SearchWG', () => {

  let searchwg_test;

  function renderScreen(props, states) {
    const renderer = TestUtils.createRenderer();
    renderer.render(<SearchWG {...props || {}}/>);
    const instance = renderer._instance._instance;
    instance.setState(states || {});
    const output = renderer.getRenderOutput();

    return {output, instance};
  }

  it('should display correct and complete GUI', () => {
    const states = {
      searchterm: ''
    };
    searchwg_test = renderScreen({}, states);
    const {output} = searchwg_test;
    expect(output.type.name).toBe("View");

    expect(output.props.children[0].type.name).toBe("TextInput");
    expect(output.props.children[0].value).toBe("");
  });
  it('empty username', () => {
    const states = {
      username: '',
      password: '',
      errormessage: ''
    };
    //
    searchwg_test = renderScreen({}, states);
    const {output} = searchwg_test;
    /*let onPressLogin_ = output.props.children[5].props.onPress;
    onPressLogin_();
    console.log("here in test.");
    searchwg_test = renderScreen(output.props, output.states);
    console.log(output.states);*/
    //expect(outputnew.props.children[4].props.children).toBe('Please enter username and password');
  });
});
