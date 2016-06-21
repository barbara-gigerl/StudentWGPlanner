jest.unmock('../pages/wg/CreateWG'); // unmock to use the actual implementation of sum


GLOBAL = require('../auth');

import axios from 'axios';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CreateWG from '../pages/wg/CreateWG';


describe('Create WG Test', () => {

  let create_wg_test;

  function renderScreen(props, states) {
    var renderer = TestUtils.createRenderer();
    renderer.render(<CreateWG {...props || {}}/>);
    var instance = renderer._instance._instance;
    instance.setState(states || {});
    var output = renderer.getRenderOutput();

    return {
      output,
      instance,
    };
  }

  /*


    <View>
      <Button text="Logout" onPress={this.onPressLogout}
        show={true} type="logout" />
      <View style={styles.viewNavigation}>
        <Text style={styles.textNavigation}>Create WG</Text>
      </View>
      <Text style={styles.textMenuHeader}>Create a new WG</Text>
      <TextInput onChangeText={this.onWgTextChange}
        value={this.state.wgName} style={styles.basic} />
      <Text style={styles.errormessage}>{this.state.errormessage}</Text>

      <Button text="Create" onPress={this.onCreateWg}
        show={true} type="back" />
      <Button text="Back" onPress={this.onPressBack}
        show={true} type="back" />
    </View>

  */

  it('display correct and complete GUI', () => {
    const state = {
          wgName: '',
          errormessage: ''};

    wg_test = renderScreen({}, state);
    let { output } = wg_test;
    expect(output.type.name).toBe("View");
    let children = output.props.children;

    expect(children[0].type.name).toBe("Button");
    expect(children[0].props.text).toBe("Logout");

    expect(children[1].type.name).toBe("View");
    expect(children[1].props.children.type.name).toBe("Text");
    expect(children[1].props.children.props.children).toBe("Create WG");

    expect(children[2].type.name).toBe("Text");
    expect(children[2].props.children).toBe("Create a new WG");

    expect(children[3].type.name).toBe("TextInput");
    expect(children[3].props.value).toBe("");

    expect(children[4].type.name).toBe("Text");
    expect(children[4].props.children).toBe("");

    expect(children[5].type.name).toBe("Button");
    expect(children[5].props.text).toBe("Create");

    expect(children[6].type.name).toBe("Button");
    expect(children[6].props.text).toBe("Back");
  });

  it('checks for empty wg name', () => {
    const state = {
          wgName: '',
          errormessage: ''};

    wg_test = renderScreen({}, state);
    let { output, instance } = wg_test;

    expect(instance.state.errormessage).toBe('');
    expect(output.props.children[4].props.children).toBe('');

    output.props.children[5].props.onPress();
    expect(instance.state.errormessage).toBe('Please enter a wg name.');
    //expect(output.props.children[4].props.children).toBe('Please enter a wg name.');
  });
});
