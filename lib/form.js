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

var _flux = require('./flux');

var _flux2 = _interopRequireDefault(_flux);

var _altAltContainer = require('alt/AltContainer');

var _altAltContainer2 = _interopRequireDefault(_altAltContainer);

var Form = (function (_React$Component) {
  _inherits(Form, _React$Component);

  _createClass(Form, null, [{
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
      submitButton: _react2['default'].createElement(
        'button',
        null,
        'Submit'
      ),
      noSubmit: false,
      className: ""
    },
    enumerable: true
  }]);

  function Form(props) {
    var _this = this;

    _classCallCheck(this, Form);

    _get(Object.getPrototypeOf(Form.prototype), 'constructor', this).call(this, props);

    this.onBlur = function (ev, attrs) {
      if (_this.props.onBlur) {
        _this.props.onBlur(_this.formStore.serialize());
      }
    };

    this.onChange = function (ev, attrs) {
      if (_this.props.onChange) {
        _this.props.onChange(_this.formStore.serialize());
      }
    };

    this.submitForm = function () {
      _this.props.onSubmit(_this.formStore.serialize());
    };

    this.resetForm = function () {
      _this.formActions.setInitialState(_this.props);
    };

    var flux = new _flux2['default']();
    this.formActions = flux.actions.formActions;
    this.formStore = flux.stores.formStore;
  }

  _createClass(Form, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.formActions.setInitialState(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.formActions.setInitialState(nextProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var schema = undefined;
      var formStore = this.formStore;
      var formActions = this.formActions;

      if (this.props.autoGenerate) {
        schema = _react2['default'].createElement(_auto_schema2['default'], {
          addButton: this.props.addButton,
          removeButton: this.props.removeButton,
          onChange: this.onChange,
          onBlur: this.onBlur,
          noSubmit: this.props.noSubmit,
          submitButton: this.props.submitButton,
          submitForm: this.submitForm,
          className: this.props.className
        });
      } else {
        schema = _react2['default'].cloneElement(this.props.children, {
          submitForm: this.submitForm
        });
      }

      return _react2['default'].createElement(
        _altAltContainer2['default'],
        {
          stores: { formStore: formStore },
          actions: { formActions: formActions },
          transform: function (_ref) {
            var formStore = _ref.formStore;
            var formActions = _ref.formActions;

            var _formStore$toJS = formStore.toJS();

            var attributes = _formStore$toJS.attributes;

            return { attributes: attributes, formActions: formActions };
          } },
        schema
      );
    }
  }]);

  return Form;
})(_react2['default'].Component);

exports['default'] = Form;
module.exports = exports['default'];