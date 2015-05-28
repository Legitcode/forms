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

var _controlsText_input = require('./controls/text_input');

var _controlsText_input2 = _interopRequireDefault(_controlsText_input);

var _controlsNumber_input = require('./controls/number_input');

var _controlsNumber_input2 = _interopRequireDefault(_controlsNumber_input);

var _controlsSelect_input = require('./controls/select_input');

var _controlsSelect_input2 = _interopRequireDefault(_controlsSelect_input);

var _utilsCollection = require('./utils/collection');

var _utilsCollection2 = _interopRequireDefault(_utilsCollection);

var Property = (function (_React$Component) {
  function Property(props) {
    _classCallCheck(this, Property);

    _get(Object.getPrototypeOf(Property.prototype), 'constructor', this).call(this, props);

    this.state = { error: null, errorState: 'none' };

    this.validInputTypes = {
      'text': _controlsText_input2['default'],
      'number': _controlsNumber_input2['default'],
      'select': _controlsSelect_input2['default']
    };

    this.onChange = this.onChange.bind(this);
  }

  _inherits(Property, _React$Component);

  _createClass(Property, [{
    key: 'value',
    value: function value() {
      return this.refs[this.props.name].value();
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      return this.refs[this.props.name].serialize();
    }
  }, {
    key: 'valid',
    value: function valid() {
      if (!this.props.validation) return true;

      if (this.props.validation(this.value())) {
        this.setState({
          errorState: 'none'
        });
        return true;
      } else {
        this.setState({
          error: this.props.errorMessage,
          errorState: 'block'
        });
        return false;
      }
    }
  }, {
    key: 'inputProps',
    value: function inputProps() {
      return {
        ref: this.props.name,
        name: this.props.name,
        defaultValue: this.props.value,
        classes: this.props.inputClass,
        onChange: this.onChange,
        options: this.props.options
      };
    }
  }, {
    key: 'onChange',
    value: function onChange(value) {
      this.valid();
      this.props.onChange(value);
    }
  }, {
    key: 'inputType',
    value: function inputType() {
      var types = Object.keys(this.validInputTypes);

      if (_utilsCollection2['default'].include(types, this.props.inputType)) {
        return _react2['default'].createElement(this.validInputTypes[this.props.inputType], this.inputProps());
      } else {
        return _react2['default'].createElement(_controlsText_input2['default'], this.inputProps());
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: this.props.containerClass, key: this.props.value },
        _react2['default'].createElement(
          'label',
          null,
          this.props.label
        ),
        this.inputType(),
        _react2['default'].createElement(
          'div',
          { className: 'error', style: { display: this.state.errorState } },
          this.state.error
        )
      );
    }
  }], [{
    key: 'defaultProps',
    value: {
      onChange: function onChange(props) {
        console.log('On change was not defined for properties:' + JSON.stringify(props));
      },
      inputType: 'text',
      options: [],
      defaultValue: '',
      name: 'input',
      containerClass: 'input-area',
      inputClass: '',
      value: ''
    },
    enumerable: true
  }]);

  return Property;
})(_react2['default'].Component);

exports['default'] = Property;
module.exports = exports['default'];