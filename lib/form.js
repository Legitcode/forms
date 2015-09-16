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

var _auto_schema = require('./auto_schema');

var _auto_schema2 = _interopRequireDefault(_auto_schema);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _form_store = require('./form_store');

var _form_store2 = _interopRequireDefault(_form_store);

var _form_actions = require('./form_actions');

var _form_actions2 = _interopRequireDefault(_form_actions);

var _altAltContainer = require('alt/AltContainer');

var _altAltContainer2 = _interopRequireDefault(_altAltContainer);

var _alt = require('./alt');

var _alt2 = _interopRequireDefault(_alt);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var Form = (function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form() {
    var _this = this;

    _classCallCheck(this, Form);

    _get(Object.getPrototypeOf(Form.prototype), 'constructor', this).apply(this, arguments);

    this.onBlur = function (ev, attrs) {
      if (_this.props.onBlur) {
        _this.props.onBlur(_form_store2['default'].serialize());
      }
    };

    this.submitForm = function () {
      _this.props.onSubmit(_form_store2['default'].serialize());
    };

    this.resetForm = function () {
      _form_actions2['default'].setInitialState(_this.props);
    };
  }

  _createClass(Form, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _form_actions2['default'].setInitialState(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      _form_actions2['default'].setInitialState(nextProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var schema = undefined;

      if (this.props.autoGenerate) {
        schema = _react2['default'].createElement(_auto_schema2['default'], {
          addButton: this.props.addButton,
          removeButton: this.props.removeButton,
          onChange: this.onChange,
          onBlur: this.onBlur,
          noSubmit: this.props.noSubmit,
          submitButton: this.props.submitButton,
          submitForm: this.submitForm
        });
      } else {
        schema = _react2['default'].Children.map(this.props.children, function (child) {
          return _react2['default'].cloneElement(child, {
            submitButton: _this2.props.submitButton
          });
        });;
      }

      return _react2['default'].createElement(
        _altAltContainer2['default'],
        {
          stores: { FormStore: _form_store2['default'] },
          actions: { FormActions: _form_actions2['default'] },
          transform: function (_ref) {
            var FormStore = _ref.FormStore;
            var FormActions = _ref.FormActions;

            var attributes = FormStore.toJS().attributes;
            var addChildToList = function addChildToList(listId) {
              return FormActions.addChildToList(listId);
            };
            var updateFormValue = function updateFormValue(props) {
              return FormActions.updateFormValue(props);
            };
            return { attributes: attributes, addChildToList: addChildToList, updateFormValue: updateFormValue };
          } },
        schema
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      onSubmit: _react2['default'].PropTypes.func,
      onChange: _react2['default'].PropTypes.func,
      submitButton: _react2['default'].PropTypes.object,
      noSubmit: _react2['default'].PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      onChange: function onChange(ev, value) {
        console.log(value);
      },
      submitButton: _react2['default'].createElement(
        'button',
        null,
        'Submit'
      ),
      noSubmit: false
    },
    enumerable: true
  }]);

  return Form;
})(_react2['default'].Component);

exports['default'] = Form;
module.exports = exports['default'];