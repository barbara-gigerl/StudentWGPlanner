'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startImport = undefined;

var resetDb = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var dbUsers, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, user, dbWgs, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, wg;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _axios2.default.get(API_URL + 'users', OPTIONS).then(function (res) {
              return res.data.results;
            }).catch(function (res) {
              console.log('catch', res);
              return [];
            });

          case 2:
            dbUsers = _context.sent;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 6;
            _iterator = dbUsers[Symbol.iterator]();

          case 8:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 15;
              break;
            }

            user = _step.value;
            _context.next = 12;
            return _axios2.default.delete(API_URL + 'users/' + user.objectId, OPTIONS);

          case 12:
            _iteratorNormalCompletion = true;
            _context.next = 8;
            break;

          case 15:
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context['catch'](6);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 21:
            _context.prev = 21;
            _context.prev = 22;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 24:
            _context.prev = 24;

            if (!_didIteratorError) {
              _context.next = 27;
              break;
            }

            throw _iteratorError;

          case 27:
            return _context.finish(24);

          case 28:
            return _context.finish(21);

          case 29:
            dbUsers = [];

            _context.next = 32;
            return _axios2.default.get(API_URL + 'classes/wgs', OPTIONS).then(function (res) {
              return res.data.results;
            }).catch(function (res) {
              console.log('catch', res);
              return [];
            });

          case 32:
            dbWgs = _context.sent;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 36;
            _iterator2 = dbWgs[Symbol.iterator]();

          case 38:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 45;
              break;
            }

            wg = _step2.value;
            _context.next = 42;
            return _axios2.default.delete(API_URL + 'classes/wgs/' + wg.objectId, OPTIONS);

          case 42:
            _iteratorNormalCompletion2 = true;
            _context.next = 38;
            break;

          case 45:
            _context.next = 51;
            break;

          case 47:
            _context.prev = 47;
            _context.t1 = _context['catch'](36);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t1;

          case 51:
            _context.prev = 51;
            _context.prev = 52;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 54:
            _context.prev = 54;

            if (!_didIteratorError2) {
              _context.next = 57;
              break;
            }

            throw _iteratorError2;

          case 57:
            return _context.finish(54);

          case 58:
            return _context.finish(51);

          case 59:
            dbWgs = [];

          case 60:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[6, 17, 21, 29], [22,, 24, 28], [36, 47, 51, 59], [52,, 54, 58]]);
  }));

  return function resetDb() {
    return ref.apply(this, arguments);
  };
}();

var startImport = exports.startImport = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var _this = this;

    var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _loop, _iterator3, _step3, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _loop2, _iterator4, _step4;

    return regeneratorRuntime.wrap(function _callee2$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log(_colors2.default.green('Deleting db...'));
            console.time('delete');
            _context4.next = 4;
            return resetDb();

          case 4:
            console.timeEnd('delete');

            console.log(_colors2.default.green('\nImporting dummy data...'));
            console.log(_colors2.default.green('\nStart inserting users...\n'));
            console.time('users');
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context4.prev = 11;
            _loop = regeneratorRuntime.mark(function _loop() {
              var user;
              return regeneratorRuntime.wrap(function _loop$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      user = _step3.value;
                      _context2.next = 3;
                      return _axios2.default.post("http://localhost:1337/parse/users", {
                        username: user,
                        password: user
                      }, { headers: { 'X-Parse-Application-Id': 'StudentWGPlanner' } }).then(function (res) {
                        dbUsers[dbUsers.length] = { name: user, id: res.data.objectId };
                        console.log(user, 'inserted');
                      }).catch(function (res) {
                        console.log(user, res.data.error);
                      });

                    case 3:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _loop, _this);
            });
            _iterator3 = users[Symbol.iterator]();

          case 14:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context4.next = 19;
              break;
            }

            return _context4.delegateYield(_loop(), 't0', 16);

          case 16:
            _iteratorNormalCompletion3 = true;
            _context4.next = 14;
            break;

          case 19:
            _context4.next = 25;
            break;

          case 21:
            _context4.prev = 21;
            _context4.t1 = _context4['catch'](11);
            _didIteratorError3 = true;
            _iteratorError3 = _context4.t1;

          case 25:
            _context4.prev = 25;
            _context4.prev = 26;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 28:
            _context4.prev = 28;

            if (!_didIteratorError3) {
              _context4.next = 31;
              break;
            }

            throw _iteratorError3;

          case 31:
            return _context4.finish(28);

          case 32:
            return _context4.finish(25);

          case 33:
            console.timeEnd('users');

            console.log(_colors2.default.green('\nStart inserting wgs...\n'));
            console.time('wgs');
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context4.prev = 39;
            _loop2 = regeneratorRuntime.mark(function _loop2() {
              var wg, users, _user;

              return regeneratorRuntime.wrap(function _loop2$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      wg = _step4.value;
                      users = [];

                      while (users.length < 2 && dbUsers.length > 0) {
                        _user = dbUsers.pop();

                        users[users.length] = _user.id;
                      }
                      _context3.next = 5;
                      return _axios2.default.post("http://localhost:1337/parse/classes/wgs", {
                        name: wg,
                        users: users
                      }, { headers: { 'X-Parse-Application-Id': 'StudentWGPlanner' } }).then(function (res) {
                        console.log(wg, 'inserted');
                      }).catch(function (res) {
                        console.log(wg, res.data.error);
                      });

                    case 5:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, _loop2, _this);
            });
            _iterator4 = wgs[Symbol.iterator]();

          case 42:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              _context4.next = 47;
              break;
            }

            return _context4.delegateYield(_loop2(), 't2', 44);

          case 44:
            _iteratorNormalCompletion4 = true;
            _context4.next = 42;
            break;

          case 47:
            _context4.next = 53;
            break;

          case 49:
            _context4.prev = 49;
            _context4.t3 = _context4['catch'](39);
            _didIteratorError4 = true;
            _iteratorError4 = _context4.t3;

          case 53:
            _context4.prev = 53;
            _context4.prev = 54;

            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }

          case 56:
            _context4.prev = 56;

            if (!_didIteratorError4) {
              _context4.next = 59;
              break;
            }

            throw _iteratorError4;

          case 59:
            return _context4.finish(56);

          case 60:
            return _context4.finish(53);

          case 61:
            console.timeEnd('wgs');

          case 62:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee2, this, [[11, 21, 25, 33], [26,, 28, 32], [39, 49, 53, 61], [54,, 56, 60]]);
  }));

  return function startImport() {
    return ref.apply(this, arguments);
  };
}();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var users = ["Jan", "Camilla", "Marco", "Manuel", "Sandra", "Barbara"];

var dbUsers = [];

var wgs = ['Test'];

var API_URL = 'http://localhost:1337/parse/';
var HEADERS = {
  'X-Parse-Application-Id': 'StudentWGPlanner',
  'X-Parse-Master-Key': 'asdf1234'
};
var OPTIONS = { headers: HEADERS };