'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _property = require('../property');

var _property2 = _interopRequireDefault(_property);

var _form_actions = require('../form_actions');

var _form_actions2 = _interopRequireDefault(_form_actions);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var AutoListItem = (function (_React$Component) {
  _inherits(AutoListItem, _React$Component);

  function AutoListItem() {
    var _this = this;

    _classCallCheck(this, AutoListItem);

    _get(Object.getPrototypeOf(AutoListItem.prototype), 'constructor', this).apply(this, arguments);

    this.removeChild = function (ev) {
      _form_actions2['default'].removeChildFromList({ listId: _this.props.name, itemIndex: _this.props.itemIndex });
    };
  }

  _createClass(AutoListItem, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var children = undefined;
      var _props = this.props;
      var properties = _props.properties;
      var name = _props.name;
      var rowClass = _props.rowClass;
      var removeButton = _react2['default'].cloneElement(this.props.removeButton, {
        onClick: this.removeChild
      });

      children = _underscore2['default'].map(properties, function (value, key) {
        return _react2['default'].createElement(_property2['default'], _extends({}, _this2.props, value, {
          key: key,
          name: key,
          onBlur: _this2.props.onBlur,
          onChange: _this2.props.onChange,
          hideLabel: _this2.props.header
        }));
      });

      return _react2['default'].createElement(
        'div',
        { key: name, name: name, className: rowClass },
        children,
        removeButton
      );
    }
  }]);

  return AutoListItem;
})(_react2['default'].Component);

exports['default'] = AutoListItem;
module.exports = exports['default'];