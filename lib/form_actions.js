'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('./alt');

var _alt2 = _interopRequireDefault(_alt);

var FormActions = function FormActions() {
  _classCallCheck(this, FormActions);

  this.generateActions('addChildToList', 'setInitialState', 'removeChildFromList', 'updateFormValue');
};

exports['default'] = _alt2['default'].createActions(FormActions);
module.exports = exports['default'];