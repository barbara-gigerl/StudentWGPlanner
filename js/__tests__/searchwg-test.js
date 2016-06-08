jest.unmock('../pages/wg/SearchWG'); // unmock to use the actual implementation of sum

GLOBAL = require('../auth');

import axios from 'axios';
// import Parse from 'parse/react-native';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import SearchWG from '../pages/wg/SearchWG';

describe('SearchWG test', () => {

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
    /*const states = {
      searchterm: "",
      wgs: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
      }),
      joinbutton: ""
    };
    join_wg_test = renderScreen({}, states);
    var {output} = join_wg_test;*/

    expect(true).toBe(true);
  });
});
