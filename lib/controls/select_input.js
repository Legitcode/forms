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

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var SelectInput = (function (_React$Component) {
  _inherits(SelectInput, _React$Component);

  function SelectInput(props) {
    var _this = this;

    _classCallCheck(this, SelectInput);

    _get(Object.getPrototypeOf(SelectInput.prototype), 'constructor', this).call(this, props);

    this.getNewValues = function (ev) {
      if (_this.mounted) {
        (function () {
          var value = ev.target.value,
              regex = new RegExp(value),
              values = _underscore2['default'].select(_this.props.options, function (v) {
            return v.displayValue.match(regex);
          });

          _this.setState({ filteredOptions: values });
        })();
      }
    };

    this.toggleDropDown = function (ev) {
      if (_this.mounted) {
        _this.setState({ isOpen: !_this.state.isOpen });
      }
    };

    this.openDropDown = function (ev) {
      if (_this.mounted) {
        _this.setState({ isOpen: true });
      }
    };

    this.closeDropDown = function (ev) {
      if (_this.mounted) {
        _this.setState({ isOpen: false });
      }
    };

    this.changeSelected = function (event) {
      var valueElement = event.currentTarget,
          selectedValue = valueElement.attributes.value.value,
          innerHTML = valueElement.firstChild.innerHTML;

      _this.setState({ displayValue: innerHTML.toString() });
      _this.toggleDropDown(event);
      _this.onChange(event, selectedValue);
    };

    this.renderOptions = function () {
      return _this.state.filteredOptions.map(function (option) {
        return _react2['default'].createElement(
          'a',
          { href: option.url,
            key: 'selectOption-' + option.value,
            onClick: _this.changeSelected,
            className: 'select-option',
            value: option.value },
          _react2['default'].createElement(
            'span',
            { className: 'option' },
            option.displayValue
          ),
          option.detail ? _react2['default'].createElement(
            'span',
            { className: 'option-detail' },
            option.detail
          ) : null
        );
      });
    };

    this.state = {
      isOpen: false,
      filteredOptions: props.options
    };
  }

  _createClass(SelectInput, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var selected = _underscore2['default'].find(this.props.options, function (option) {
        return option.value.toString() === (_this2.props.value ? _this2.props.value.toString() : "");
      });
      var displayValue = selected ? selected.displayValue : null;
      this.setState({ displayValue: displayValue });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      document.addEventListener("click", function (ev) {
        ev.stopPropagation();
        _this3.closeDropDown(ev);
      });

      _react2['default'].findDOMNode(this.refs.selected).addEventListener("click", function (ev) {
        ev.stopPropagation();
        _this3.toggleDropDown(ev);
      });

      _react2['default'].findDOMNode(this.refs.arrow).addEventListener("click", function (ev) {
        ev.stopPropagation();
        _this3.toggleDropDown(ev);
      });

      this.mounted = true;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener("click", function () {});
      _react2['default'].findDOMNode(this.refs.selected).removeEventListener("click", function () {});
      _react2['default'].findDOMNode(this.refs.arrow).removeEventListener("click", function () {});
      this.mounted = false;
    }
  }, {
    key: 'onChange',
    value: function onChange(ev, value) {
      this.props.onChange(ev, value);
    }
  }, {
    key: 'value',
    value: function value() {
      return _react2['default'].findDOMNode(this.refs.valueInput).value;
    }
  }, {
    key: 'displayValue',
    value: function displayValue() {
      return _react2['default'].findDOMNode(this.refs.selected).value;
    }
  }, {
    key: 'render',
    value: function render() {
      var showOptions = 'option-box ' + (this.state.isOpen ? 'open' : null),
          inputState = 'select-face ' + (this.state.isOpen ? 'open' : null);

      var input = this.props.searchable ? _react2['default'].createElement('input', {
        ref: 'selected',
        type: 'text',
        className: inputState,
        value: this.state.displayValue,
        placeholder: this.props.placeholder,
        onClick: this.toggleDropDown,
        onKeyUp: this.getNewValues }) : _react2['default'].createElement('input', {
        ref: 'selected',
        type: 'text',
        className: inputState,
        value: this.state.displayValue,
        placeholder: this.props.placeholder,
        onClick: this.toggleDropDown,
        readOnly: true });

      var inputClass = 'select ' + this.props.inputClass;

      return _react2['default'].createElement(
        'div',
        { className: inputClass },
        _react2['default'].createElement('span', { className: 'arrow', ref: 'arrow' }),
        _react2['default'].createElement('input', { name: this.props.name, type: 'hidden', ref: 'valueInput', value: this.props.value }),
        input,
        _react2['default'].createElement(
          'div',
          { className: showOptions },
          this.renderOptions()
        )
      );
    }
  }]);

  return SelectInput;
})(_react2['default'].Component);

exports['default'] = SelectInput;
module.exports = exports['default'];