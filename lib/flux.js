'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _alt = require('alt');

var _alt2 = _interopRequireDefault(_alt);

var _form_actions = require('./form_actions');

var _form_actions2 = _interopRequireDefault(_form_actions);

var _form_store = require('./form_store');

var _form_store2 = _interopRequireDefault(_form_store);

var FormFlux = (function (_Alt) {
  _inherits(FormFlux, _Alt);

  function FormFlux() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, FormFlux);

    _get(Object.getPrototypeOf(FormFlux.prototype), 'constructor', this).call(this, config);

    this.addActions('formActions', _form_actions2['default']);
    this.addStore('formStore', _form_store2['default'], this.actions.formActions);
  }

  return FormFlux;
})(_alt2['default']);

exports['default'] = FormFlux;
module.exports = exports['default'];