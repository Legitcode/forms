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

var _property = require('../property');

var _property2 = _interopRequireDefault(_property);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var ListItem = (function (_React$Component) {
  function ListItem(props) {
    _classCallCheck(this, ListItem);

    _get(Object.getPrototypeOf(ListItem.prototype), 'constructor', this).call(this, props);

    this.removeChild = this.removeChild.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  _inherits(ListItem, _React$Component);

  _createClass(ListItem, [{
    key: 'valid',
    value: function valid() {
      var _this = this;

      var valid = true;

      Object.keys(this.refs).forEach(function (refKey) {
        if (!_this.refs[refKey].valid()) {
          valid = false;
        }
      });

      return valid;
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      var _this2 = this;

      var refKeys = Object.keys(this.refs);

      var ary = refKeys.map(function (refKey) {
        return _this2.refs[refKey].serialize();
      });

      var obj = {};

      ary.forEach(function (value, index) {
        obj[refKeys[index]] = value;
      });

      return obj;
    }
  }, {
    key: 'onChange',
    value: function onChange(ev, value) {
      this.props.onChange(ev, value);
    }
  }, {
    key: 'onBlur',
    value: function onBlur(ev, value) {
      this.props.onBlur(ev, value);
    }
  }, {
    key: 'removeChild',
    value: function removeChild(ev) {
      this.props.removeChild(ev, this.props.name);
    }
  }, {
    key: 'buildValidation',
    value: function buildValidation(funcString) {
      if (funcString) {
        return new Function('value', 'return ' + funcString);
      } else {
        return null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var children = null;

      var removeButton = _react2['default'].cloneElement(this.props.removeButton, {
        onClick: this.removeChild
      });

      if (this.props.autoGenerate) {
        (function () {
          var properties = _this3.props.properties;

          children = Object.keys(properties).map(function (key) {
            return _react2['default'].createElement(_property2['default'], {
              key: key,
              name: key,
              ref: key,
              label: properties[key].label,
              validation: _this3.buildValidation(properties[key].validation),
              errorMessage: properties[key].errorMessage,
              inputType: properties[key].type,
              onBlur: _this3.onBlur,
              onChange: _this3.onChange,
              containerClass: properties[key].containerClass || _this3.props.containerClass,
              inputClass: properties[key].inputClass || _this3.props.inputClass,
              selected: properties[key].selected,
              options: properties[key].options,
              defaultValue: properties[key].defaultValue,
              value: properties[key].value,
              placeholder: properties[key].placeholder,
              invalid: properties[key].invalid,
              isOpen: properties[key].isOpen,
              hideLabel: _this3.props.hideLabel,
              editable: properties[key].editable
            });
          });
        })();
      } else {
        children = _react2['default'].Children.map(this.props.children, function (child) {
          if (!_react2['default'].isValidElement(child)) {
            return child;
          }

          return _react2['default'].cloneElement(child, {
            ref: child.props.name
          });
        });
      }

      return _react2['default'].createElement(
        'div',
        {
          key: this.props.name,
          name: this.props.name,
          className: this.props.rowClass },
        children,
        removeButton
      );
    }
  }], [{
    key: 'defaultProps',
    value: {
      onChange: function onChange(ev, value) {
        console.log(value);
      },
      onBlur: function onBlur(ev, value) {
        console.log(value);
      }
    },
    enumerable: true
  }]);

  return ListItem;
})(_react2['default'].Component);

exports['default'] = ListItem;
module.exports = exports['default'];