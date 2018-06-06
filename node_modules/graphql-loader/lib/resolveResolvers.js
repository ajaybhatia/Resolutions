'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = function () {
  var resolvers = {};

  _store.allResolvers.forEach(function (resolversGroup) {
    (0, _keys2.default)(resolversGroup).forEach(function (type) {
      resolvers[type] = (0, _extends3.default)({}, resolvers[type], resolversGroup[type]);
    });
  });

  return resolvers;
};

var _keys = require('lodash/keys');

var _keys2 = _interopRequireDefault(_keys);

var _store = require('./store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }