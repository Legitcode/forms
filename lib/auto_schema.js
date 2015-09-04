'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _property = require('./property');

var _property2 = _interopRequireDefault(_property);

var _auto_list = require('./auto_list');

var _auto_list2 = _interopRequireDefault(_auto_list);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var AutoSchema = (function (_React$Component) {
  function AutoSchema() {
    var _this = this;

    _classCallCheck(this, AutoSchema);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }

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

  _inherits(AutoSchema, _React$Component);

  _createClass(AutoSchema, [{
    key: 'generate',
    value: function generate() {
      var _this2 = this;

      var _props$attributes = this.props.attributes;
      var formAttrs = _props$attributes.formAttrs;
      var containerClass = _props$attributes.containerClass;
      var inputClass = _props$attributes.inputClass;

      return _underscore2['default'].map(formAttrs, function (value, key) {
        if (!key.match(/list/i)) {
          return _react2['default'].createElement(_property2['default'], _extends({}, value, {
            name: key,
            key: 'property-' + key,
            ref: key,
            containerClass: value.containerClass || containerClass,
            inputClass: value.inputClass || inputClass,
            onBlur: _this2.onBlur,
            onChange: _this2.onChange
          }));
        } else {
          return _react2['default'].createElement(_auto_list2['default'], _extends({}, value, {
            listKey: key,
            key: 'list-' + value.name,
            ref: 'list-' + value.name,
            containerClass: value.containerClass || containerClass,
            inputClass: value.inputClass || inputClass,
            addButton: _this2.props.addButton,
            removeButton: _this2.props.removeButton,
            onChange: _this2.onChange,
            onBlur: _this2.onBlur,
            addChildToList: _this2.props.addChildToList
          }));
        }
      });
    }
  }, {
    key: 'validate',
    value: function validate() {
      var _this3 = this;

      var valid = true;

      Object.keys(this.refs).forEach(function (refKey) {
        if (!_this3.refs[refKey].valid()) {
          valid = false;
        }
      });

      return valid;
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.generate(),
          submitButton = _react2['default'].cloneElement(this.props.submitButton, {
        onClick: this.submitForm
      });

      return _react2['default'].createElement(
        'div',
        { key: this.props.schemaName },
        children,
        this.props.noSubmit ? null : submitButton
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      attributes: _react2['default'].PropTypes.object.isRequired,
      addButton: _react2['default'].PropTypes.object,
      removeButton: _react2['default'].PropTypes.object
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
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

  return AutoSchema;
})(_react2['default'].Component);

exports['default'] = AutoSchema;
module.exports = exports['default'];