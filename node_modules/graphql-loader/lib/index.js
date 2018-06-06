'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSchema = exports.loadSchema = undefined;

var _resolveTypeDefs = require('./resolveTypeDefs');

var _resolveTypeDefs2 = _interopRequireDefault(_resolveTypeDefs);

var _resolveResolvers = require('./resolveResolvers');

var _resolveResolvers2 = _interopRequireDefault(_resolveResolvers);

var _store = require('./store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!global.gqlLoader) {
  var _loadSchema = function _loadSchema(_ref, origin) {
    var typeDefs = _ref.typeDefs,
        resolvers = _ref.resolvers;

    _store.allTypeDefs.push(typeDefs);
    _store.allResolvers.push(resolvers);
  };

  var _getSchema = function _getSchema() {
    return {
      typeDefs: (0, _resolveTypeDefs2.default)(),
      resolvers: (0, _resolveResolvers2.default)()
    };
  };
  global.gqlLoader = { loadSchema: _loadSchema, getSchema: _getSchema };
}

var loadSchema = exports.loadSchema = global.gqlLoader.loadSchema;
var getSchema = exports.getSchema = global.gqlLoader.getSchema;