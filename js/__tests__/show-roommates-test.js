jest.unmock('../pages/wg/Roommates'); // unmock to use the actual implementation of sum
GLOBAL = require('../auth');
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Roommates from '../pages/wg/Roommates';

describe('Show roommates test', () => {

  let login_test;

  function renderScreen(props, states) {
    var renderer = TestUtils.createRenderer();
    console.log("1");
    renderer.render(<Roommates {...props || {}}/>).then((worked) => {
      console.log("ready.");
      done();
    });
    console.log("2");
    var instance = renderer._instance._instance;
    instance.setState(states || {});

    console.log("3");
    var output = renderer.getRenderOutput();
    console.log("4");

    return {
      output,
      instance,
    };
  }

  it('existing roommates', () => {
    const states = {
          };
    login_test = renderScreen({}, states).then((worked) => {
      console.log("yep.2)");
      done();
    });
    var {output} = login_text;
      expect(output.type.name).toBe("View");
      expect(output.props.children[0].type.name).toBe("Text");
      expect(output.props.children[0].props.children).toBe('In your WG are the following people:');
      expect(output.props.children[1].type.name).toBe("ListView");



  });

  it('alone in WG', () => {
    const states = {
          };
    login_test = renderScreen({}, states).then((worked) => {
      console.log("yep.2)");
      done();
    });
    var {output} = login_text;
      expect(output.type.name).toBe("View");
      expect(output.props.children[0].type.name).toBe("Text");
      expect(output.props.children[0].props.children).toBe('In your WG are the following people:');
      expect(output.props.children[1].type.name).toBe("ListView");



  });
});
