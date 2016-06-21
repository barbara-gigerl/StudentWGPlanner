jest.unmock('../pages/wg/Roommates'); // unmock to use the actual implementation of sum
GLOBAL = require('../auth');
import axios from 'axios';
import React, {ListView, Navigator} from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Roommates from '../pages/wg/Roommates';

describe('Show roommates test', () => {

  let login_test;

  function renderScreen(props, states) {
    var renderer = TestUtils.createRenderer();
    renderer.render(<Roommates {...props || {}}/>);
    var instance = renderer._instance._instance;
    instance.setState(states || {});

    var output = renderer.getRenderOutput();

    return {
      output,
      instance,
    };
  }

  it('existing roommates', () => {
    const states = {
      roommates: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
      }),
    };
    GLOBAL.WGID = 'roommates_ABC';

    login_test = renderScreen({}, states);

    var {instance} = login_test;
    instance.showroommates().then((worked) =>
  {
      var {output} = login_test;
      expect(output.type.name).toBe("View");
      expect(output.props.children[0].type.name).toBe("Text");
      expect(output.props.children[0].props.children).toBe('In your WG are the following people:');
      expect(output.props.children[1].type.name).toBe("ListView");
      var listview = output.props.children[1];
  });

  });

  it('alone in WG', () => {
    GLOBAL.WGID = 'roommates_DEF';
    const states = {
      roommates: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
      }),
    };
    login_test = renderScreen({}, states);

    var {instance} = login_test;
    instance.showroommates().then((worked) =>
  {
      var {output} = login_test;
      expect(output.type.name).toBe("View");
      expect(output.props.children[0].type.name).toBe("Text");
      expect(output.props.children[0].props.children).toBe('In your WG are the following people:');
      expect(output.props.children[1].type.name).toBe("ListView");
  });

  });
});
