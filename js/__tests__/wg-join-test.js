jest.unmock('../pages/wg/SearchWG'); // unmock to use the actual implementation of sum

GLOBAL = require('../auth');

import config from "../../config";
import axios from 'axios';
import React, {ListView, Navigator} from 'react';
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
      joinbutton: false
    }

    joinwg_test = renderScreen({}, states);
    var {output} = joinwg_test;


    expect(output.type.name).toBe("View");

    //this is how you check the correct Logout button
    expect(output.props.children[0].type.name).toBe('Button');
    expect(output.props.children[0].props.text).toBe('Logout');

    expect(output.props.children[1].type.name).toBe("View");
    expect(output.props.children[1].props.children.type.name).toBe('Text');
    expect(output.props.children[1].props.children.props.children).toBe('Search WG');

    expect(output.props.children[2].type.name).toBe("Text");
    expect(output.props.children[2].props.children).toBe("Search the WG you want to join");

    expect(output.props.children[3].type.name).toBe("TextInput");
    expect(output.props.children[3].props.value).toBe('');

    expect(output.props.children[4].type.name).toBe("Text");
    expect(output.props.children[4].props.children).toBe("");

    expect(output.props.children[5].type.name).toBe("ListView");

    expect(output.props.children[6].type.name).toBe("Button");
    expect(output.props.children[6].props.text).toBe("Join WG");
    expect(output.props.children[6].props.show).toBe(false);

    expect(output.props.children[7].type.name).toBe('Button');
    expect(output.props.children[7].props.text).toBe('Back');
    expect(output.props.children[7].props.show).toBe(true);

  });

  it('check join button', () => {
    const states = {
      searchterm: "",
      wgs: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
      }),
      joinbutton: false
    }

    GLOBAL.USERID = "123testing123";

    var renderer = TestUtils.createRenderer();
    renderer.render(<SearchWG />);
    var instance = renderer._instance._instance;
    instance.setState(states || {});
    var output = renderer.getRenderOutput();
    expect(output.props.children[6].props.show).toBe(false);

    var textchangehandler = output.props.children[3].props.onChangeText;
    textchangehandler("correctName");
    output = renderer.getRenderOutput();
    expect(output.props.children[6].props.show).toBe(true);

    textchangehandler("");
    output = renderer.getRenderOutput();
    expect(output.props.children[6].props.show).toBe(false);

  });

  it('check join button', () => {
    const states = {
      searchterm: "correctName",
      wgs: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
      }),
      joinbutton: false
    }

    GLOBAL.USERID = "123testing123";

    var renderer = TestUtils.createRenderer();
    renderer.render(<SearchWG />);
    var instance = renderer._instance._instance;
    instance.setState(states || {});
    var output = renderer.getRenderOutput();

    var textchangehandler = output.props.children[3].props.onChangeText;
    textchangehandler("correctName");
    output = renderer.getRenderOutput();
    expect(output.props.children[6].props.show).toBe(true);

    textchangehandler("");
    output = renderer.getRenderOutput();
    expect(output.props.children[6].props.show).toBe(false);

  });


  it('check listview data', () => {
    var states = {
      searchterm: "correctName",
      wgs: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
      }),
      joinbutton: false
    }

    GLOBAL.USERID = "123testing123";

    var renderer = TestUtils.createRenderer();
    renderer.render(<SearchWG />);
    var instance = renderer._instance._instance;
    instance.setState(states || {});
    var output = renderer.getRenderOutput();

    var textchangehandler = output.props.children[3].props.onChangeText;
    var renderRow = output.props.children[5].props.renderRow;
    textchangehandler("correctName");
    states.wgs.name = "mywg"

    renderRow(states.wgs);
    output = renderer.getRenderOutput();
    expect(output.props.children[5].props.dataSource.name).toBe("mywg");
    expect(output.props.children[6].props.show).toBe(true);

    states.wgs.name = "";
    textchangehandler("");
    renderRow(states.wgs);
    output = renderer.getRenderOutput();
    expect(output.props.children[5].props.dataSource.name).toBe("");
    expect(output.props.children[6].props.show).toBe(false);
  })

});
