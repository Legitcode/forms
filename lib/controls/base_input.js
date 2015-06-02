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

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var BaseInput = (function (_React$Component) {
  function BaseInput(props) {
    _classCallCheck(this, BaseInput);

    _get(Object.getPrototypeOf(BaseInput.prototype), 'constructor', this).call(this, props);

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.debouncedChange = _underscore2['default'].debounce(this.onChange, 500);
  }

  _inherits(BaseInput, _React$Component);

  _createClass(BaseInput, [{
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
    key: 'value',
    value: function value() {
      return _react2['default'].findDOMNode(this.refs[this.props.name]).value;
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      var formValue = {};
      formValue['value'] = this.value();
      return formValue;
    }
  }, {
    key: 'onChange',
    value: function onChange(ev) {
      this.props.onChange(ev, this.serialize());
    }
  }, {
    key: 'onBlur',
    value: function onBlur(ev) {
      this.props.onBlur(ev, this.serialize());
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

  return BaseInput;
})(_react2['default'].Component);

exports['default'] = BaseInput;
module.exports = exports['default'];