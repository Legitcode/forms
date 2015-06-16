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

var SelectInput = (function (_React$Component) {
  function SelectInput(props) {
    _classCallCheck(this, SelectInput);

    _get(Object.getPrototypeOf(SelectInput.prototype), 'constructor', this).call(this, props);

    this.isOpen = this.props.isOpen;
    this.debouncedSearch = _underscore2['default'].debounce(this.getNewValues, 500);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  _inherits(SelectInput, _React$Component);

  _createClass(SelectInput, [{
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
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      document.addEventListener('click', function (ev) {
        ev.stopPropagation();
        _this2.closeDropDown(ev);
      });

      _react2['default'].findDOMNode(this.refs.selected).addEventListener('click', function (ev) {
        ev.stopPropagation();
        _this2.toggleDropDown(ev);
      });

      _react2['default'].findDOMNode(this.refs.arrow).addEventListener('click', function (ev) {
        ev.stopPropagation();
        _this2.toggleDropDown(ev);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click');
      _react2['default'].findDOMNode(this.refs.selected).removeEventListener('click');
      _react2['default'].findDOMNode(this.refs.arrow).removeEventListener('click');
    }
  }, {
    key: 'getNewValues',
    value: function getNewValues() {
      this.setState({ inputState: 'select-face' });
      this.props.onChange(_react2['default'].findDOMNode(this.refs.selected).value);
    }
  }, {
    key: 'toggleDropDown',
    value: function toggleDropDown(ev) {
      this.isOpen = !this.isOpen;
      this.onChange(ev, this.serialize());
    }
  }, {
    key: 'openDropDown',
    value: function openDropDown(ev) {
      this.isOpen = true;
      this.onChange(ev, this.serialize());
    }
  }, {
    key: 'closeDropDown',
    value: function closeDropDown(ev) {
      if (this.isOpen) {
        this.isOpen = false;
        this.onChange(ev, this.serialize());
      }
    }
  }, {
    key: 'changeSelected',
    value: function changeSelected(event) {
      var valueElement = event.target;
      var selectedValue = valueElement.attributes.value.value;
      var selectedDisplay = valueElement.innerHTML;

      _react2['default'].findDOMNode(this.refs.selected).value = selectedDisplay;
      _react2['default'].findDOMNode(this.refs.valueInput).value = selectedValue;
      this.toggleDropDown(event);
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      var formValue = {};
      formValue['value'] = this.value();
      formValue['displayValue'] = this.displayValue();
      formValue['isOpen'] = this.isOpen;
      return formValue;
    }
  }, {
    key: 'onChange',
    value: function onChange(ev) {
      this.props.onChange(ev, this.serialize());
    }
  }, {
    key: 'value',
    value: function value() {
      if (this.refs.valueInput) {
        return _react2['default'].findDOMNode(this.refs.valueInput).value;
      } else {
        return null;
      }
    }
  }, {
    key: 'displayValue',
    value: function displayValue() {
      if (this.refs.selected) {
        return _react2['default'].findDOMNode(this.refs.selected).value;
      } else {
        return null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var showOptions = null,
          inputState = null;

      if (this.props.isOpen) {
        showOptions = 'option-box open';
        inputState = 'select-face open';
      } else {
        showOptions = 'option-box';
        inputState = 'select-face';
      }

      var options = this.props.options.map(function (option) {
        return _react2['default'].createElement(
          'a',
          { href: option.url,
            key: 'selectOption-' + option.value,
            onClick: _this3.changeSelected,
            className: 'select-option',
            value: option.value },
          option.displayValue
        );
      });

      var inputValue = _underscore2['default'].find(this.props.options, function (option) {
        return option.value == _this3.props.selected;
      }).displayValue;

      var input = this.props.editable ? _react2['default'].createElement('input', {
        ref: 'selected',
        type: 'text',
        className: inputState,
        defaultValue: inputValue,
        placeholder: this.props.placeholder,
        onClick: this.toggleDropDown,
        onChange: this.debouncedSearch.bind(this) }) : _react2['default'].createElement('input', {
        ref: 'selected',
        type: 'text',
        className: inputState,
        defaultValue: inputValue,
        placeholder: this.props.placeholder,
        onClick: this.toggleDropDown,
        readOnly: true });

      return _react2['default'].createElement(
        'div',
        { className: 'select' },
        _react2['default'].createElement('span', { className: 'arrow', ref: 'arrow' }),
        _react2['default'].createElement('input', { type: 'hidden', ref: 'valueInput', value: this.props.selected }),
        input,
        _react2['default'].createElement(
          'div',
          { className: showOptions },
          options
        )
      );
    }
  }]);

  return SelectInput;
})(_react2['default'].Component);

exports['default'] = SelectInput;
module.exports = exports['default'];