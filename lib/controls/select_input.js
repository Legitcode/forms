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

var _debounce = require('debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var SelectInput = (function (_React$Component) {
  function SelectInput(props) {
    _classCallCheck(this, SelectInput);

    _get(Object.getPrototypeOf(SelectInput.prototype), 'constructor', this).call(this, props);

    this.state = {
      selected: this.props.selected,
      showOptions: 'option-box',
      inputState: 'select-face'
    };

    this.isOpen = false;
    this.debouncedSearch = (0, _debounce2['default'])(this.getNewValues, 500);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
  }

  _inherits(SelectInput, _React$Component);

  _createClass(SelectInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      document.addEventListener('click', function (ev) {
        _this.closeDropDown();
      });

      _react2['default'].findDOMNode(this.refs.selected).addEventListener('click', function (ev) {
        ev.stopPropagation();
        _this.toggleDropDown();
      });

      _react2['default'].findDOMNode(this.refs.arrow).addEventListener('click', function (ev) {
        ev.stopPropagation();
        _this.toggleDropDown();
      });
    }
  }, {
    key: 'getNewValues',
    value: function getNewValues() {
      this.setState({ inputState: 'select-face' });
      this.props.onChange(_react2['default'].findDOMNode(this.refs.selected).value);
    }
  }, {
    key: 'toggleDropDown',
    value: function toggleDropDown() {
      this.isOpen = !this.isOpen;
      this.setDropDownState();
    }
  }, {
    key: 'openDropDown',
    value: function openDropDown() {
      this.isOpen = true;
      this.setDropDownState();
    }
  }, {
    key: 'closeDropDown',
    value: function closeDropDown() {
      this.isOpen = false;
      this.setDropDownState();
    }
  }, {
    key: 'setDropDownState',
    value: function setDropDownState() {
      this.setState({
        showOptions: this.isOpen ? 'option-box open' : 'option-box',
        inputState: this.isOpen ? 'select-face open' : 'select-face'
      });
    }
  }, {
    key: 'changeSelected',
    value: function changeSelected(event) {
      var valueElement = event.target;
      var selectedValue = valueElement.attributes.value.value;
      var selectedDisplay = valueElement.innerHTML;

      _react2['default'].findDOMNode(this.refs.selected).value = selectedDisplay;
      _react2['default'].findDOMNode(this.refs.valueInput).value = selectedValue;
      this.toggleDropDown();
      this.handleChanged();
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      var formValue = {};
      formValue[this.props.name] = this.value();
      return formValue;
    }
  }, {
    key: 'handleChanged',
    value: function handleChanged() {
      this.props.onChange(this.serialize());
    }
  }, {
    key: 'value',
    value: function value() {
      return _react2['default'].findDOMNode(this.refs.selected).value;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var options = this.props.options.map(function (option) {
        return _react2['default'].createElement(
          'a',
          { href: option.url,
            key: 'selectOption-' + option.value,
            onClick: _this2.changeSelected,
            className: 'select-option',
            value: option.value },
          option.displayValue
        );
      });

      var input = this.props.editable ? _react2['default'].createElement('input', {
        ref: 'selected',
        type: 'text',
        className: this.state.inputState,
        defaultValue: this.state.selected,
        placeholder: this.props.placeholder,
        onClick: this.toggleDropDown,
        onChange: this.debouncedSearch.bind(this) }) : _react2['default'].createElement('input', {
        ref: 'selected',
        type: 'text',
        className: this.state.inputState,
        defaultValue: this.state.selected,
        placeholder: this.props.placeholder,
        onClick: this.toggleDropDown,
        readOnly: true });

      return _react2['default'].createElement(
        'div',
        { className: 'select' },
        _react2['default'].createElement('span', { className: 'arrow', ref: 'arrow' }),
        _react2['default'].createElement('input', { type: 'hidden', ref: 'valueInput' }),
        input,
        _react2['default'].createElement(
          'div',
          { className: this.state.showOptions },
          options
        )
      );
    }
  }]);

  return SelectInput;
})(_react2['default'].Component);

exports['default'] = SelectInput;
module.exports = exports['default'];