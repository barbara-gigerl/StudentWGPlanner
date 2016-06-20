jest.unmock('../pages/wg/LeaveWG'); // unmock to use the actual implementation of sum
GLOBAL = require('../auth');
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import LeaveWG from '../pages/wg/LeaveWG';

describe('Leave delete wg test', () => {

  let login_test;

  function renderScreen(props, states) {
    var renderer = TestUtils.createRenderer();
    renderer.render(<LeaveWG {...props || {}}/>);
    var instance = renderer._instance._instance;
    instance.setState(states || {});

    var output = renderer.getRenderOutput();

    return {
      output,
      instance,
    };
  }
  /*<View>
    <Button text="Logout" onPress={this.onPressLogout} show={true} type="logout"></Button>
    <View style={styles.viewNavigation}><Text style={styles.textNavigation}>Leave WG</Text></View>
    <Text style={styles.textMenuHeader}>Do you really want to leave the WG?</Text>
    <Button text="Yes" onPress={this.onPressLeaveWG} show={true}></Button>
    <Button text="No" onPress={this.onPressBack} show={true} type="back"></Button>
  </View>*/

  it('leave wg simple', () => {
    const states = {
          username: '',
          password: '',
          errormessage: ''};
    login_test = renderScreen({}, states);
    var {output} = login_test;
    expect(output.type.name).toBe("View");
    expect(output.props.children[0].type.name).toBe("Button");
    expect(output.props.children[0].props.text).toBe("Logout");
    expect(output.props.children[1].type.name).toBe("View");
    expect(output.props.children[2].type.name).toBe("Text");
    expect(output.props.children[3].type.name).toBe("Button");
    expect(output.props.children[3].props.text).toBe("Yes");
    expect(output.props.children[4].type.name).toBe("Button");
    expect(output.props.children[4].props.text).toBe("No");

  });
});
