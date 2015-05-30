'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _debounce = require('debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var TextInput = (function (_React$Component) {
  function TextInput(props) {
    _classCallCheck(this, TextInput);

    _get(Object.getPrototypeOf(TextInput.prototype), 'constructor', this).call(this, props);

    this.handleChanged = this.handleChanged.bind(this);
    this.debouncedChange = (0, _debounce2['default'])(this.handleChanged, 500);
  }

  _inherits(TextInput, _React$Component);

  _createClass(TextInput, [{
    key: 'value',
    value: function value() {
      return _react2['default'].findDOMNode(this.refs[this.props.name]).value;
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      var formValue = {};
      formValue[this.props.name] = this.value();
      return formValue;
    }
  }, {
    key: 'handleChanged',
    value: function handleChanged(ev) {
      this.props.onChange(ev, this.serialize());
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('input', {
        className: this.props.classes,
        onChange: this.debouncedChange,
        type: 'text',
        ref: this.props.name,
        name: this.props.name,
        defaultValue: this.props.defaultValue });
    }
  }]);

  return TextInput;
})(_react2['default'].Component);

exports['default'] = TextInput;
module.exports = exports['default'];