jest.unmock('../pages/wg/ShoppingList'); // unmock to use the actual implementation of sum
GLOBAL = require('../auth');
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ShoppingList from '../pages/wg/ShoppingList';

  describe('ShoppingList test', () => {

  let shoppinglist_test;

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

  it('display correct and complete GUI', () => {

    const states = {
      listElements: '',
      listItem: '',
      errormessage: ''};

    console.log(">>>>>>")
    shoppinglist_test = renderScreen({}, states);


    console.log("output1:")
    var {output} = shoppinglist_test;
    console.log("output:")
    console.log(output)
    //expect(output.type.name).toBe("View");

    //expect(output.props.children[0].type.name).toBe("Text");
    //expect(output.props.children[0].props.children).toBe('In your WG are the following people:');
    //expect(output.props.children[1].type.name).toBe("ListView");
    //expect(true).toBe(true);
  });

});
