"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _base_input = require('./base_input');

var _base_input2 = _interopRequireDefault(_base_input);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var TextInput = (function (_BaseInput) {
  _inherits(TextInput, _BaseInput);

  function TextInput(props) {
    _classCallCheck(this, TextInput);

    _get(Object.getPrototypeOf(TextInput.prototype), 'constructor', this).call(this, props);
  }

  _createClass(TextInput, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('input', {
        className: this.props.classes,
        onChange: this.debouncedChange,
        onBlur: this.onBlur,
        type: 'phone',
        ref: this.props.name,
        name: this.props.name,
        defaultValue: this.props.defaultValue,
        placeholder: this.props.placeholder });
    }
  }]);

  return TextInput;
})(_base_input2['default']);

exports['default'] = TextInput;
module.exports = exports['default'];