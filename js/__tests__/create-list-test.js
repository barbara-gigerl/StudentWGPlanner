jest.unmock('../pages/wg/CreateShoppinglist'); // unmock to use the actual implementation of sum

GLOBAL = require('../auth');

import axios from 'axios';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CreateShoppinglist from '../pages/wg/CreateShoppinglist';
import React, {ListView, Navigator} from 'react';

describe('ShoppingList test', () => {

  it('display correct and complete GUI', () => {
    const states = {
      name: ''
    };

    var renderer = TestUtils.createRenderer();
    renderer.render(<CreateShoppinglist />);
    var instance = renderer._instance._instance;
    instance.setState(states || {});
    var output = renderer.getRenderOutput();

    expect(output.props.children[0].type.name).toBe('Button');
    expect(output.props.children[0].props.type).toBe('logout');

    expect(output.props.children[1].type.name).toBe('View');
    expect(output.props.children[1].props.children.type.name).toBe('Text');
    expect(output.props.children[1].props.children.props.children).toBe('Shopping List')

    expect(output.props.children[2].type.name).toBe('Text');
    expect(output.props.children[2].props.children).toBe('Create a new Shoppinglist');

    expect(output.props.children[3].type.name).toBe('TextInput');

    expect(output.props.children[4].type.name).toBe('Button');
    expect(output.props.children[4].props.text).toBe('Create');
    expect(output.props.children[4].props.show).toBe(true);

    expect(output.props.children[5].type.name).toBe('Button');
    expect(output.props.children[5].props.text).toBe('Back');
    expect(output.props.children[5].props.show).toBe(true);
  });

  it('check create shoppinglist', () => {
    var states = {
      name: '',
      errormessage: ''
    };

    GLOBAL.WGID = "wg123";

    var renderer = TestUtils.createRenderer();
    renderer.render(<CreateShoppinglist />);
    var instance = renderer._instance._instance;
    instance.setState(states || {});
    var output = renderer.getRenderOutput();

    var textchangehandler = output.props.children[3].props.onChangeText;
    textchangehandler("newWG");
    output = renderer.getRenderOutput();
    expect(output.props.children[3].props.value).toBe("newWG");

    var createNew = output.props.children[4].props.onPress;
    createNew();
    expect(states.errormessage).toBe("");

  });

});
