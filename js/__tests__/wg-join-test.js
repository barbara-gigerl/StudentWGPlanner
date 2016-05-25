jest.unmock('../pages/wg/SearchWG'); // unmock to use the actual implementation of sum


GLOBAL = require('../auth');

import axios from 'axios';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Login from '../pages/login/login';


describe('JoinWG test', () => {

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
  });

});
