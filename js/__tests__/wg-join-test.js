jest.unmock('../pages/wg/SearchWG'); // unmock to use the actual implementation of sum

GLOBAL = require('../auth');

import axios from 'axios';
// import Parse from 'parse/react-native';

import React, {ListView} from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import SearchWG from '../pages/wg/SearchWG';

describe('JoinWG test', () => {

  let join_wg_test;

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

  it('display correct and complete GUI', () => {
    const states = {
      searchterm: "",
      wgs: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
      }),
      joinbutton: ""
    }

    joinwg_test = renderScreen({}, states);
    var {output} = joinwg_test;
    expect(output.type.name).toBe("View");

    //this is how you check the correct Logout button
    expect(output.props.children[0].type.name).toBe('TouchableHighlight');
    expect(output.props.children[0].props.class).toBe('Logout');
    expect(output.props.children[0].props.children.type.name).toBe('Text');
    expect(output.props.children[0].props.children.props.children).toBe('Logout');

    expect(output.props.children[1].type.name).toBe('TextInput');
    expect(output.props.children[1].props.value).toBe('');

    expect(output.props.children[2].type.name).toBe('ListView');
    expect(output.props.children[2].props.dataSource).toBe(states.wgs);

    expect(output.props.children[3].type.name).toBe('TouchableHighlight');
    expect(output.props.children[3].props.children.type.name).toBe('Text');
    expect(output.props.children[3].props.children.props.children).toBe('');
  });

  it('check if logout button is working', () => {
    const states = {
      searchterm: "",
      wgs: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
      }),
      joinbutton: ""
    }
    var renderer = TestUtils.createRenderer();
    renderer.render(<SearchWG />);
    var instance = renderer._instance._instance;
    instance.setState(states || {});
    var output = renderer.getRenderOutput();

    var logoutfunction = output.props.children[0].props.onPress;
    //logoutfunction();
    output = renderer.getRenderOutput();

  });

});
