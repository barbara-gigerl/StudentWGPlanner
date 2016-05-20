jest.unmock('../pages/login/login'); // unmock to use the actual implementation of sum

import Login from '../pages/login/login';

module.exports = {
  get: function(a, b){
    return Promise.resolve({ "data" : { "results" : [] }})
  }
}
