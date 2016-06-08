jest.unmock('../pages/wg/SearchWG'); // unmock to use the actual implementation of sum


GLOBAL = require('../auth');
//var TestUtils = require('react-addons-test-utils');
//var SearchWG = require('../pages/wg/SearchWG');
//var Parse = require('parse/react-native');

import axios from 'axios';

import React from 'react';
import ReactDOM from 'react-dom';
//import Parse from "parse/react-native"
import TestUtils from 'react-addons-test-utils';
import SearchWG from '../pages/wg/SearchWG';

describe('JoinWG test', () => {

  it('display correct and complete GUI', () => {
    var renderer = TestUtils.createRenderer();
  //  renderer.render(<SearchWG {...props || {}}/>);
  //  var test = renderer.getRenderOutput();
  });

});
