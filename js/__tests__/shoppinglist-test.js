jest.unmock('../pages/wg/ShoppingList'); // unmock to use the actual implementation of sum

GLOBAL = require('../auth');

import axios from 'axios';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ShoppingList from '../pages/wg/ShoppingList';
import React, {ListView, Navigator} from 'react';

describe('ShoppingList test', () => {
  let list_test;

  function renderScreen(props, states) {
    var renderer = TestUtils.createRenderer();
    renderer.render(<ShoppingList {...props || {}}/>);
    var instance = renderer._instance._instance;
    instance.setState(states || {});
    var output = renderer.getRenderOutput();

    return {
      output,
      instance,
    };
  }

  it('display correct and complete GUI - no shopping list exists', () => {
    const states = {
      listElements: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      listItem: '',
      errormessage: ''
    };

    list_test = renderScreen({}, states);
    var {output} = list_test;

    expect(output.props.children[0].type.name).toBe('Button');
    expect(output.props.children[0].props.type).toBe('logout');

    expect(output.props.children[1].type.name).toBe('View');
    expect(output.props.children[1].props.children.type.name).toBe('Text');
    expect(output.props.children[1].props.children.props.children).toBe('Shopping List')

    expect(output.props.children[2].type.name).toBe('Button');
    expect(output.props.children[2].props.text).toBe('Create a new Shoppinglist');
    expect(output.props.children[2].props.show).toBe(true);

    expect(output.props.children[3].type.name).toBe('TextInput');

    expect(output.props.children[4].type.name).toBe('ListView');
    expect(output.props.children[4].props.dataSource).toBe(states.listElements);
    expect(output.props.children[4].props.show).toBe(false);

    expect(output.props.children[5].type.name).toBe('Button');
    expect(output.props.children[5].props.text).toBe('Insert Data');
    expect(output.props.children[5].props.show).toBe(false);

    expect(output.props.children[6].type.name).toBe('Button');
    expect(output.props.children[6].props.text).toBe('Back');
    expect(output.props.children[6].props.show).toBe(true);
  });

  it('display correct and complete GUI - shopping list exists', () => {
    const states = {
      listElements: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      listItem: '',
      errormessage: ''
    };

    GLOBAL.SHOPPINGLISTID = 'CorrectID';

    list_test = renderScreen({}, states);
    var {output} = list_test;

/*
    expect(output.props.children[0].type.name).toBe('Button');
    expect(output.props.children[0].props.type).toBe('logout');

    expect(output.props.children[1].type.name).toBe('View');
    expect(output.props.children[1].props.children.type.name).toBe('Text');
    expect(output.props.children[1].props.children.props.children).toBe('Shopping List')

    expect(output.props.children[2].type.name).toBe('Button');
    expect(output.props.children[2].props.text).toBe('Create a new Shoppinglist');
    expect(output.props.children[2].props.show).toBe(false);

    expect(output.props.children[3].type.name).toBe('TextInput');

    expect(output.props.children[4].type.name).toBe('ListView');
    expect(output.props.children[4].props.dataSource).toBe(states.listElements);
    expect(output.props.children[4].props.show).toBe(true);

    expect(output.props.children[5].type.name).toBe('Button');
    expect(output.props.children[5].props.text).toBe('Insert Data');
    expect(output.props.children[5].props.show).toBe(true);

    expect(output.props.children[6].type.name).toBe('Button');
    expect(output.props.children[6].props.text).toBe('Back');
    expect(output.props.children[6].props.show).toBe(true);*/
  });

});
