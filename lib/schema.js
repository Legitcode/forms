'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _property = require('./property');

var _property2 = _interopRequireDefault(_property);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var Schema = (function (_React$Component) {
  _inherits(Schema, _React$Component);

  function Schema() {
    var _this = this;

    _classCallCheck(this, Schema);

    _get(Object.getPrototypeOf(Schema.prototype), 'constructor', this).apply(this, arguments);

    this.onChange = function (ev, attrs) {
      _this.props.updateFormValue(attrs);
    };

    this.onBlur = function (ev, attrs) {
      _this.props.updateFormValue(attrs);
    };

    this.submitForm = function () {
      if (_this.validate()) _this.props.submitForm();
    };
  }

  _createClass(Schema, [{
    key: 'validate',
    value: function validate() {
      var _this2 = this;

      var valid = true;

      Object.keys(this.refs).forEach(function (refKey) {
        if (!_this2.refs[refKey].valid()) {
          _this2.refs[refKey].addErrors();
          valid = false;
        }
      });

      return valid;
    }
  }, {
    key: 'render',
    value: function render() {
      var submitButton = _react2['default'].cloneElement(this.props.submitButton, {
        onClick: this.submitForm
      });

      return _react2['default'].createElement(
        'div',
        { key: this.props.schemaName, className: this.props.className },
        this.props.children,
        submitButton
      );
    }
  }], [{
    key: 'defaultProps',
    value: {
      onBlur: function onBlur(ev, value) {
        console.log(value);
      },
      onChange: function onChange(ev, value) {
        console.log(value);
      },
      attributes: {},
      addButton: _react2['default'].createElement(
        'button',
        null,
        'Add'
      ),
      removeButton: _react2['default'].createElement(
        'button',
        null,
        'Remove'
      )
    },
    enumerable: true
  }]);

  return Schema;
})(_react2['default'].Component);

exports['default'] = Schema;
module.exports = exports['default'];