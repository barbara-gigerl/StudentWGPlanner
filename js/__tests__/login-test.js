jest.unmock('../pages/login/login'); // unmock to use the actual implementation of sum
const React = require('react-native');
const { View } = React;
const ReactDom = require('react-dom');
const utils = require('react-addons-test-utils');
const Login = require('../pages/login/login');
import TextInput from "../pages/login/login";
import Stylesheet from "../pages/login/login";
import TouchableHighlight from "../pages/login/login";
import Text from "../pages/login/login";



describe('all components exist', () => {

  let login_test;

  function renderScreen(props, states) {
    const renderer = utils.createRenderer();
    renderer.render(<Login {...props || {}}/>);
    const instance = renderer._instance._instance;
    instance.setState(states || {});
    const output = renderer.getRenderOutput();

    return {
      output,
      instance
    };
  }

  it('should display view if data was loaded', () => {
    const states = {       username: '',
          password: '',
          errormessage: ''};
    login_test = renderScreen({}, states);
    const {output} = login_test;
    expect(output.type.name).toBe("View");
    //expect(output).toContainReactNodeInTreeLike(<Text>Password:</Text>)
  });
});
