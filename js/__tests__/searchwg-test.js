jest.unmock('../pages/wg/SearchWG'); // unmock to use the actual implementation of sum


GLOBAL = require('../auth');

import axios from 'axios';
import { ListView } from 'react-native';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import SearchWG from '../pages/wg/SearchWG';


describe('Search WG Test', () => {

  let search_wg_test;

  function renderScreen(props, states) {
    var renderer = TestUtils.createRenderer();
    renderer.render(<SearchWG {...props || {}}/>);
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
    <Button text="Logout" onPress={this.onPressLogout} show={true} type="logout"></Button>
    <View style={styles.viewNavigation}><Text style={styles.textNavigation}>Search WG</Text></View>
    <Text style={styles.textMenuHeader}>Search the WG you want to join</Text>
    <TextInput onChangeText={(text) => this.textchangehandler(text)} value={this.state.searchterm} style={styles.basic}></TextInput>
    <Text style={styles.errormessage}>{this.state.errormessage}</Text>
    <ListView dataSource={this.state.wgs} renderRow={this.renderWg.bind(this)}/>
    <Button text="Join WG" onPress={this.onJoinWG} show={this.state.joinbutton}/>
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

    expect(children[0].type.name).toBe("Button");
    expect(children[0].props.text).toBe("Logout");

    expect(children[1].type.name).toBe("View");
    expect(children[1].props.children.type.name).toBe("Text");
    expect(children[1].props.children.props.children).toBe("Search WG");

    expect(children[2].type.name).toBe("Text");
    expect(children[2].props.children).toBe("Search the WG you want to join");

    expect(children[3].type.name).toBe("TextInput");
    expect(children[3].props.value).toBe("");

    expect(children[4].type.name).toBe("Text");
    expect(children[4].props.children).toBe("");

    expect(children[5].type.name).toBe("ListView");

    expect(children[6].type.name).toBe("Button");
    expect(children[6].props.text).toBe("Join WG");

    expect(children[7].type.name).toBe("Button");
    expect(children[7].props.text).toBe("Back");
  });

  it('checks for empty wg name', () => {
    const state = {
      searchterm: '',
      wgs: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
      }),
      //selectedwg: '',
      joinbutton: '',
      errormessage: ''
    };

    search_wg_test = renderScreen({}, state);
    let { output, instance } = search_wg_test;

    expect(instance.state.errormessage).toBe('');
    expect(output.props.children[4].props.children).toBe('');

    output.props.children[6].props.onPress();
    expect(instance.state.errormessage).toBe('Please enter a searchterm.');
    //expect(output.props.children[4].props.children).toBe('Please enter a wg name.');
  });

  it('loads result from server after keyinput', () => {
    const state = {
      searchterm: '',
      wgs: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
      }),
      //selectedwg: '',
      joinbutton: '',
      errormessage: ''
    }

    search_wg_test = renderScreen({}, state);
    let { output, instance } = search_wg_test;

    output.props.children[3].props.onChangeText('ABC');
    console.log(instance.state);
    console.log(instance.state.wgs);
    expect(instance.state.wgs[0].name).toBe('ABCD');
  })
});
