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

var _controlsText_input = require('./controls/text_input');

var _controlsText_input2 = _interopRequireDefault(_controlsText_input);

var _controlsNumber_input = require('./controls/number_input');

var _controlsNumber_input2 = _interopRequireDefault(_controlsNumber_input);

var _controlsSelect_input = require('./controls/select_input');

var _controlsSelect_input2 = _interopRequireDefault(_controlsSelect_input);

var _controlsEmail_input = require('./controls/email_input');

var _controlsEmail_input2 = _interopRequireDefault(_controlsEmail_input);

var _controlsPhone_input = require('./controls/phone_input');

var _controlsPhone_input2 = _interopRequireDefault(_controlsPhone_input);

var _controlsPassword_input = require('./controls/password_input');

var _controlsPassword_input2 = _interopRequireDefault(_controlsPassword_input);

var _controlsHidden_input = require('./controls/hidden_input');

var _controlsHidden_input2 = _interopRequireDefault(_controlsHidden_input);

var _controlsTextarea_input = require('./controls/textarea_input');

var _controlsTextarea_input2 = _interopRequireDefault(_controlsTextarea_input);

var _controlsCheckbox_input = require('./controls/checkbox_input');

var _controlsCheckbox_input2 = _interopRequireDefault(_controlsCheckbox_input);

var _controlsDate_input = require('./controls/date_input');

var _controlsDate_input2 = _interopRequireDefault(_controlsDate_input);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var Property = (function (_React$Component) {
  _inherits(Property, _React$Component);

  _createClass(Property, null, [{
    key: 'defaultProps',
    value: {
      onBlur: function onBlur(ev, props) {
        console.log(props);
      },
      onChange: function onChange(ev, props) {
        console.log(props);
      },
      inputType: "text",
      options: [],
      defaultValue: "",
      name: "input",
      containerClass: "input-area",
      inputClass: "",
      value: ""
    },
    enumerable: true
  }, {
    key: 'ValidInputTypes',
    value: {
      "text": _controlsText_input2['default'],
      "number": _controlsNumber_input2['default'],
      "select": _controlsSelect_input2['default'],
      "email": _controlsEmail_input2['default'],
      "phone": _controlsPhone_input2['default'],
      "password": _controlsPassword_input2['default'],
      "hidden": _controlsHidden_input2['default'],
      "textarea": _controlsTextarea_input2['default'],
      "checkbox": _controlsCheckbox_input2['default'],
      "date": _controlsDate_input2['default']
    },
    enumerable: true
  }]);

  function Property(props) {
    var _this = this;

    _classCallCheck(this, Property);

    _get(Object.getPrototypeOf(Property.prototype), 'constructor', this).call(this, props);

    this.buildValidation = function (funcString) {
      if (funcString) {
        return new Function('value', 'return ' + funcString);
      } else {
        return null;
      }
    };

    this.setErrorState = function (valid) {
      _this.setState({
        errorState: valid ? 'none' : 'block'
      });
    };

    this.onBlur = function (ev, value) {
      if (_this.mounted) {
        var newValue = {};
        newValue[_this.props.name] = value;

        _this.valid();
        _this.props.onBlur(ev, newValue);
      }
    };

    this.onChange = function (ev, value) {
      if (_this.mounted && (_this.props.inputType === "select" || _this.props.inputType === "checkbox")) {
        var newValue = {};
        newValue[_this.props.name] = value;

        _this.props.onChange(ev, newValue);
      }
    };

    this.state = { errorState: 'none' };
  }

  _createClass(Property, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.validate = this.buildValidation(this.props.validation);
      this.mounted = true;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.value != this.props.value) {
        this.valid();
      }
    }
  }, {
    key: 'valid',
    value: function valid() {
      if (!this.validate) return true;

      var valid = this.validate(this.value());

      this.setErrorState(valid);

      return valid;
    }
  }, {
    key: 'value',
    value: function value() {
      return this.refs[this.props.name].value();
    }
  }, {
    key: 'inputProps',
    value: function inputProps() {
      return _extends({}, this.props, {
        ref: this.props.name,
        name: this.props.name,
        defaultValue: this.props.value || this.props.defaultValue,
        onBlur: this.onBlur,
        onChange: this.onChange
      });
    }
  }, {
    key: 'inputType',
    value: function inputType() {
      var types = Object.keys(Property.ValidInputTypes);

      if (_underscore2['default'].includes(types, this.props.inputType)) {
        return _react2['default'].createElement(Property.ValidInputTypes[this.props.inputType], this.inputProps());
      } else {
        return _react2['default'].createElement(_controlsText_input2['default'], this.inputProps());
      }
    }
  }, {
    key: 'hideLabel',
    value: function hideLabel() {
      return _underscore2['default'].contains(["hidden", "checkbox"], this.props.inputType) || this.props.hideLabel;
    }
  }, {
    key: 'render',
    value: function render() {
      var errorState = undefined,
          label = undefined,
          containerClass = undefined;

      if (this.props.invalid === true) {
        errorState = 'block';
      } else {
        errorState = this.state.errorState;
      }

      if (!this.hideLabel()) {
        label = _react2['default'].createElement(
          'label',
          null,
          this.props.label
        );
      }

      return _react2['default'].createElement(
        'div',
        { className: this.props.containerClass, key: this.props.value },
        label,
        this.inputType(),
        this.props.postLabel ? _react2['default'].createElement(
          'span',
          { className: this.props.postLabelClass },
          this.props.postLabel
        ) : null,
        _react2['default'].createElement(
          'div',
          { className: 'error', style: { display: errorState } },
          this.props.errorMessage
        )
      );
    }
  }]);

  return Property;
})(_react2['default'].Component);

exports['default'] = Property;
module.exports = exports['default'];