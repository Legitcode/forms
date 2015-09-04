'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _auto_schema = require('./auto_schema');

var _auto_schema2 = _interopRequireDefault(_auto_schema);

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

var AutoForm = (function (_React$Component) {
  function AutoForm() {
    var _this = this;

    _classCallCheck(this, AutoForm);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }

    this.submitForm = function () {
      return _this.props.onSubmit(_form_store2['default'].serialize());
    };

    this.resetForm = function () {
      _form_actions2['default'].setInitialState(_this.props);
    };
  }

  _inherits(AutoForm, _React$Component);

  _createClass(AutoForm, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _form_actions2['default'].setInitialState(this.props);
    }
  }, {
    key: 'render',
    value: function render() {
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
        _react2['default'].createElement(_auto_schema2['default'], {
          addButton: this.props.addButton,
          removeButton: this.props.removeButton,
          onChange: this.onChange,
          onBlur: this.onBlur,
          noSubmit: this.props.noSubmit,
          submitButton: this.props.submitButton,
          submitForm: this.submitForm
        })
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

  return AutoForm;
})(_react2['default'].Component);

exports['default'] = AutoForm;
module.exports = exports['default'];