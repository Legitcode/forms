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

var _listList_item = require('./list/list_item');

var _listList_item2 = _interopRequireDefault(_listList_item);

var _property = require('./property');

var _property2 = _interopRequireDefault(_property);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _utilsObj = require('./utils/obj');

var _utilsObj2 = _interopRequireDefault(_utilsObj);

var List = (function (_React$Component) {
  _inherits(List, _React$Component);

  function List() {
    var _this = this;

    _classCallCheck(this, List);

    _get(Object.getPrototypeOf(List.prototype), 'constructor', this).apply(this, arguments);

    this.addChild = function (ev) {
      _this.props.addChildToList(_this.props.name);
    };
  }

  _createClass(List, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _this2 = this;

      var stateChanged = false;

      Object.keys(this.props).forEach(function (key) {
        if (_this2.props[key] != nextProps[key]) {
          stateChanged = true;
        }
      });

      return stateChanged;
    }
  }, {
    key: 'valid',
    value: function valid() {
      var _this3 = this;

      var valid = true;

      Object.keys(this.refs).forEach(function (refKey) {
        if (refKey != "addButton") {
          if (!_this3.refs[refKey].valid()) {
            _this3.refs[refKey].addErrors();
            valid = false;
          }
        }
      });

      return valid;
    }
  }, {
    key: 'generateChildren',
    value: function generateChildren() {
      var _this4 = this;

      var listItems = this.props.listItems,
          children = null;

      if (listItems) {
        var items = _underscore2['default'].compact(listItems);

        children = listItems.map(function (item, index) {
          return _react2['default'].createElement(AutoListItem, _extends({}, _this4.props, {
            key: 'listItem-' + index,
            itemIndex: index,
            properties: item,
            onChange: _this4.props.onChange,
            onBlur: _this4.props.onBlur
          }));
        });
      }

      return children;
    }
  }, {
    key: 'generateHeader',
    value: function generateHeader() {
      var _this5 = this;

      var headerItems = Object.keys(this.props.formAttrs).map(function (key) {
        return _react2['default'].createElement(
          'li',
          {
            className: _this5.props.headerItemClass,
            key: key
          },
          _this5.props.formAttrs[key].label
        );
      });

      return _react2['default'].createElement(
        'ul',
        { className: this.props.headerClass },
        headerItems
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var addButton = _react2['default'].cloneElement(this.props.addButton, {
        ref: "addButton",
        onClick: this.addChild
      });

      var children = this.generateChildren(),
          header = null,
          heading = null;

      if (this.props.header) {
        header = this.generateHeader();
      }

      if (this.props.heading) {
        heading = _react2['default'].createElement(
          'h4',
          null,
          this.props.heading
        );
      }

      return _react2['default'].createElement(
        'div',
        { className: this.props.classes },
        heading,
        header,
        children,
        addButton
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
      onListChange: function onListChange(ev, value) {
        console.log(value);
      },
      removeButton: _react2['default'].createElement('a', { href: 'javascript:void(0)', dangerouslySetInnerHTML: { __html: '&times;' } }),
      addButton: _react2['default'].createElement('a', { href: 'javascript:void(0)', dangerouslySetInnerHTML: { __html: '&plus;' } }),
      rowClass: "row"
    },
    enumerable: true
  }]);

  return List;
})(_react2['default'].Component);

exports['default'] = List;
module.exports = exports['default'];