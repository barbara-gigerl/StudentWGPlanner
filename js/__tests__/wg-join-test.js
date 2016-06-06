jest.unmock('../pages/wg/SearchWG'); // unmock to use the actual implementation of sum

import axios from 'axios';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import SearchWG from '../pages/wg/SearchWG';

describe('JoinWG test', () => {

  it('display correct and complete GUI', () => {
    var renderer = TestUtils.createRenderer();
    renderer.render(<SearchWG />)
    var test = renderer.getRenderOutput();
  });

});
