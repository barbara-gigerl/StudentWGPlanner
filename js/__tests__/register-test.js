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

  /*


  <View>
    <View style={styles.viewNavigation}><Text style={styles.textNavigation}>Register</Text></View>
    <Text style={styles.inputLabelSmall}>Username</Text>
    <TextInput style={styles.basic}
      value={this.state.username}
      onChangeText={(text) => this.onChange(text, 'username')}></TextInput>
    <Text style={styles.inputLabelSmall}>Password</Text>
    <TextInput style={styles.basic}
      secureTextEntry={true}
      value={this.state.password}
      onChangeText={(text) => this.onChange(text, 'password')}></TextInput>
    <Text style={styles.inputLabelSmall}>Repeat password</Text>
    <TextInput style={styles.basic}
      secureTextEntry={true}
      value={this.state.password2}
      onChangeText={(text) => this.onChange(text, 'password2')}></TextInput>
    <Text style={styles.inputLabelSmall}>Email</Text>
    <TextInput style={styles.basic}
      value={this.state.email}
      onChangeText={(text) => this.onChange(text, 'email')}></TextInput>

    <Button text="Register" onPress={this.onSubmit.bind(this)} show={true} type="standard"></Button>
    <Button text="Back" onPress={this.onPressBack} show={true} type="back"></Button>
  </View>

  */

  it('display correct and complete GUI', () => {
    const state = {
          wgName: '',
          errormessage: ''};

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

    expect(children[9].type.name).toBe("Button");
    expect(children[9].props.text).toBe("Register");

    expect(children[10].type.name).toBe("Button");
    expect(children[10].props.text).toBe("Back");
  });
});
