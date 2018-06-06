'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = function () {
  var allTypesDefs = _union2.default.apply(undefined, (0, _toConsumableArray3.default)(_store.allTypeDefs));
  var typeDefs = {};
  var scalars = [];
  var unions = [];

  /* Search for all types */
  allTypesDefs.forEach(function (def) {
    var regex = /([A-z0-9 ,]+){\n?(([^{}])+)}/g;
    var m = void 0;

    var _loop = function _loop() {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      var type = void 0;
      m.forEach(function (match, groupIndex) {
        if (groupIndex === 1) {
          type = match.trim();
          typeDefs[type] = typeDefs[type] || [];
        } else if (groupIndex === 2) {
          var fields = match;
          typeDefs[type].push(fields);
        }
      });
    };

    while ((m = regex.exec(def)) !== null) {
      _loop();
    }
  });

  /* Search scalars */
  allTypesDefs.forEach(function (def) {
    var regex = /scalar [\w]+/g;
    var m = void 0;

    while ((m = regex.exec(def)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      m.forEach(function (match, groupIndex) {
        scalars.push(match);
      });
    }
  });

  /* Search unions */
  allTypesDefs.forEach(function (def) {
    var regex = /union [\w ]+=[\w |]+/g;
    var m = void 0;

    while ((m = regex.exec(def)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      m.forEach(function (match, groupIndex) {
        unions.push(match);
      });
    }
  });

  var schema = '';

  (0, _keys2.default)(typeDefs).forEach(function (type) {
    var fields = typeDefs[type].join('\n');
    schema += '\n' + type + ' {\n' + fields + '\n}\n';
  });

  scalars.forEach(function (scalar) {
    schema += '\n' + scalar + '\n';
  });

  unions.forEach(function (union) {
    schema += '\n' + union + '\n';
  });

  return schema;
};

var _union = require('lodash/union');

var _union2 = _interopRequireDefault(_union);

var _keys = require('lodash/keys');

var _keys2 = _interopRequireDefault(_keys);

var _store = require('./store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }