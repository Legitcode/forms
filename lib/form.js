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

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _underscoreDeepExtend = require('underscore-deep-extend');

var _underscoreDeepExtend2 = _interopRequireDefault(_underscoreDeepExtend);

_underscore2['default'].mixin({ deepExtend: (0, _underscoreDeepExtend2['default'])(_underscore2['default']) });

var Form = (function (_React$Component) {
  function Form(props) {
    _classCallCheck(this, Form);

    _get(Object.getPrototypeOf(Form.prototype), 'constructor', this).call(this, props);

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  _inherits(Form, _React$Component);

  _createClass(Form, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _this = this;

      var stateChanged = false;

      Object.keys(this.props).forEach(function (key) {
        if (_this.props[key] != nextProps[key]) {
          stateChanged = true;
        }
      });

      return stateChanged;
    }
  }, {
    key: 'onBlur',
    value: function onBlur(ev, attributes, listKey) {
      var mergedProps = _underscore2['default'].clone(this.props.attributes);

      if (ev == 'deleteListItem') {
        mergedProps.formAttrs[listKey].listItems = attributes.formAttrs[listKey].listItems;
      } else {
        mergedProps = _underscore2['default'].deepExtend(mergedProps, attributes);
      }

      this.props.onBlur(ev, mergedProps);
    }
  }, {
    key: 'onChange',
    value: function onChange(ev, attributes, listKey) {
      var mergedProps = _underscore2['default'].clone(this.props.attributes);

      if (ev == 'deleteListItem') {
        mergedProps.formAttrs[listKey].listItems = attributes.formAttrs[listKey].listItems;
      } else {
        mergedProps = _underscore2['default'].deepExtend(mergedProps, attributes);
      }

      this.props.onChange(ev, mergedProps);
    }
  }, {
    key: 'submitForm',
    value: function submitForm() {
      if (this.refs.schema.validate()) {
        this.props.onSubmit(this.refs.schema.serialize());
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var children = null;

      if (this.props.autoGenerate) {
        children = _react2['default'].createElement(_schema2['default'], {
          ref: 'schema',
          autoGenerate: true,
          attributes: this.props.attributes,
          addButton: this.props.addButton,
          removeButton: this.props.removeButton,
          onChange: this.onChange,
          onBlur: this.onBlur
        });
      } else {
        children = _react2['default'].Children.map(this.props.children, function (child) {
          return _react2['default'].cloneElement(child, {
            ref: 'schema'
          });
        });
      }

      var submitButton = _react2['default'].cloneElement(this.props.submitButton, {
        onClick: this.submitForm
      });

      return _react2['default'].createElement(
        'div',
        { className: this.props.classes },
        children,
        this.props.noSubmit ? null : submitButton
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
      },
      submitButton: _react2['default'].createElement(
        'button',
        null,
        'Submit'
      )
    },
    enumerable: true
  }]);

  return Form;
})(_react2['default'].Component);

exports['default'] = Form;
module.exports = exports['default'];