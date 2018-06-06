'use strict';

var _resolveResolvers = require('./resolveResolvers');

var _resolveResolvers2 = _interopRequireDefault(_resolveResolvers);

var _keys = require('lodash/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global describe */
/* global it */
/* global expect */
describe('Resolve resolvers function', function () {
  it('should return one object with types', function () {
    global.allResolvers = [{ Query: { hello: function hello() {
          return 'world';
        } } }, { Query: { world: function world() {
          return 'hello';
        } } }, { Mutation: { save: function save() {
          return 'ad';
        } } }, { Type: { field: function field() {
          return 'afdfdfd';
        } } }, { Type: { field2: function field2() {
          return 'afdfdffd';
        } } }];
    var result = (0, _resolveResolvers2.default)();
    expect((0, _keys2.default)(result)).toEqual(['Query', 'Mutation', 'Type']);
  });

  it('should join same type fields', function () {
    global.allResolvers = [{ Query: { hello: function hello() {
          return 'world';
        }, hola: function hola() {
          return 'mundo';
        } } }, { Query: { world: function world() {
          return 'hello';
        } } }];
    var result = (0, _resolveResolvers2.default)();
    expect((0, _keys2.default)(result.Query)).toEqual(['hello', 'hola', 'world']);
  });
});