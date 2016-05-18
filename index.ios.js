/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

/*import React, {
  AppRegistry,
  Component,
} from 'react-native';

import { Provider } from 'react-redux';

import reducers from './js/reducers';
import createStoreWithMiddleware from './js/store/configureStore';

import Test from './js/pages/wg/test';

class StudentWGPlanner extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Test />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('StudentWGPlanner', () => StudentWGPlanner);
*/

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry
} from 'react-native';

import StudentWGPlanner from './js/index';

AppRegistry.registerComponent('StudentWGPlanner', () => StudentWGPlanner);
