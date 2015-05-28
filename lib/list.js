'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _listList_item = require('./list/list_item');

var _listList_item2 = _interopRequireDefault(_listList_item);

var _utilsCollection = require('./utils/collection');

var _utilsCollection2 = _interopRequireDefault(_utilsCollection);

var List = (function (_React$Component) {
  function List(props) {
    _classCallCheck(this, List);

    _get(Object.getPrototypeOf(List.prototype), 'constructor', this).call(this, props);

    this.childCount = 0;
    this.removeChild = this.removeChild.bind(this);
    this.addChild = this.addChild.bind(this);
  }

  _inherits(List, _React$Component);

  _createClass(List, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.onChange) {
        this.props.onChange({
          children: [this.createChild()]
        });
      } else {
        this.setState({
          children: [this.createChild()]
        });
      }
    }
  }, {
    key: 'valid',
    value: function valid() {
      var _this = this;

      var valid = true;

      Object.keys(this.refs).forEach(function (refKey) {
        if (refKey != 'addButton') {
          if (!_this.refs[refKey].valid()) {
            valid = false;
          }
        }
      });

      return valid;
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      var _this2 = this;

      return Object.keys(this.refs).map(function (refKey) {
        if (refKey.match(/-[0-9]{1,100}/)) {
          return _this2.refs[refKey].serialize();
        }
      });
    }
  }, {
    key: 'createChild',
    value: function createChild() {
      var _this3 = this;

      this.childCount += 1;
      var removeButton = _react2['default'].cloneElement(this.props.removeButton, {
        value: this.childCount,
        onClick: this.removeChild
      });

      var children = _react2['default'].Children.map(this.props.children, function (child) {
        if (!_react2['default'].isValidElement(child)) {
          return child;
        }

        return _react2['default'].cloneElement(child, {
          name: '' + child.props.name + '-' + _this3.childCount
        });
      });

      return _react2['default'].createElement(_listList_item2['default'], {
        name: 'listItem-' + this.childCount,
        className: this.props.rowClass,
        children: children,
        removeButton: removeButton
      });
    }
  }, {
    key: 'addChild',
    value: function addChild() {
      if (this.props.onChange) {
        this.props.onChange({
          children: [].concat(_toConsumableArray(this.state.children), [this.createChild()])
        });
      } else {
        this.setState({
          children: [].concat(_toConsumableArray(this.state.children), [this.createChild()])
        });
      }
    }
  }, {
    key: 'findChild',
    value: function findChild(nodeValue) {
      var buttons = this.state.children.map(function (item) {
        return item.props.removeButton.props.value;
      });

      return _utilsCollection2['default'].find(buttons, nodeValue);
    }
  }, {
    key: 'removeChild',
    value: function removeChild(ev) {
      ev.preventDefault();
      var nodeValue = parseInt(ev.currentTarget.attributes.value.value);
      var idx = this.findChild(nodeValue);

      this.state.children.splice(idx, 1);

      if (this.props.onChange) {
        this.props.onChange({
          children: this.state.children });
      } else {
        this.setState({
          children: this.state.children
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var addButton = _react2['default'].cloneElement(this.props.addButton, {
        ref: 'addButton',
        onClick: this.addChild
      });

      var children = null;

      if (this.state) {
        children = _react2['default'].Children.map(this.state.children, function (child) {
          if (!_react2['default'].isValidElement(child)) {
            return child;
          }

          return _react2['default'].cloneElement(child, {
            ref: '' + child.props.name + '-' + _this4.childCount
          });
        });
      }

      return _react2['default'].createElement(
        'div',
        { className: this.props.classes },
        children,
        addButton
      );
    }
  }], [{
    key: 'defaultProps',
    value: {
      removeButton: _react2['default'].createElement('a', { href: 'javascript:void(0)', dangerouslySetInnerHTML: { __html: '&times;' } }),
      addButton: _react2['default'].createElement('a', { href: 'javascript:void(0)', dangerouslySetInnerHTML: { __html: '&plus;' } }),
      rowClass: 'row'
    },
    enumerable: true
  }]);

  return List;
})(_react2['default'].Component);

exports['default'] = List;
module.exports = exports['default'];