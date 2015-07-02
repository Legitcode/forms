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

var _listList_item = require('./list/list_item');

var _listList_item2 = _interopRequireDefault(_listList_item);

var _property = require('./property');

var _property2 = _interopRequireDefault(_property);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _utilsObj = require('./utils/obj');

var _utilsObj2 = _interopRequireDefault(_utilsObj);

var List = (function (_React$Component) {
  function List(props) {
    var _this = this;

    _classCallCheck(this, List);

    _get(Object.getPrototypeOf(List.prototype), 'constructor', this).call(this, props);

    if (this.props.listItems) {
      this.childCount = Object.keys(this.props.listItems).length;
    } else {
      this.childCount = 0;
    }

    if (!this.props.formAttrs && this.props.autoGenerate) {
      console.log('Default form attributes were not given');
    } else if (!this.props.formAttrs) {
      this.formAttrs = {};

      var childrenMap = _react2['default'].Children.forEach(this.props.children, function (child) {
        _this.formAttrs[child.props.name] = {
          type: child.props.inputType,
          onChange: child.props.onChange,
          onBlur: child.props.onBlur,
          name: child.props.name,
          label: child.props.label,
          validation: child.props.validation,
          errorMessage: child.props.errorMessage,
          containerClass: child.props.containerClass,
          inputClass: child.props.inputClass,
          selected: child.props.selected,
          options: child.props.selected,
          defaultValue: child.props.defaultValue,
          value: child.props.value,
          placeholder: child.props.placeholder,
          invalid: child.props.invalid,
          isOpen: child.props.isOpen
        };
      });
    } else {
      this.formAttrs = this.props.formAttrs;
    }

    this.removeChild = this.removeChild.bind(this);
    this.addChild = this.addChild.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  _inherits(List, _React$Component);

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
        if (refKey != 'addButton') {
          if (!_this3.refs[refKey].valid()) {
            _this3.refs[refKey].addErrors();
            valid = false;
          }
        }
      });

      return valid;
    }
  }, {
    key: 'onChange',
    value: function onChange(ev, value) {
      this.props.onListChange(ev, this.serialize(true), this.props.listKey);
    }
  }, {
    key: 'onBlur',
    value: function onBlur(ev, value) {
      this.props.onListChange(ev, this.serialize(true), this.props.listKey);
    }
  }, {
    key: 'serialize',
    value: function serialize(withAttrs) {
      var _this4 = this;

      var currentObjects = Object.keys(this.refs).map(function (refKey) {
        if (refKey.match(/-[0-9]{1,100}/)) {
          return _this4.refs[refKey].serialize();
        }
      });

      return _underscore2['default'].compact(currentObjects);
    }
  }, {
    key: 'createChild',
    value: function createChild() {
      var _this5 = this;

      var currentObjects = {},
          newObject = {};

      if (this.props.listItems) {
        currentObjects = _utilsObj2['default'].clone(this.props.listItems);
      }

      newObject = _utilsObj2['default'].clone(this.formAttrs);

      Object.keys(newObject).forEach(function (key) {
        newObject['' + key + '-' + _this5.childCount] = _utilsObj2['default'].clone(_this5.formAttrs)[key];
        delete newObject[key];
      });

      currentObjects[this.childCount] = newObject;
      this.childCount += 1;
      return currentObjects;
    }
  }, {
    key: 'addChild',
    value: function addChild(ev) {
      this.props.onListChange('add', this.createChild(), this.props.listKey);
    }
  }, {
    key: 'removeChild',
    value: function removeChild(ev, listItem) {
      var object = _underscore2['default'].find(Object.keys(this.props.listItems), function (item) {
        return item == parseInt(listItem.split('-')[1]);
      });

      var currentObjects = _underscore2['default'].clone(this.props.listItems);
      delete currentObjects[object];

      this.props.onListChange('deleteListItem', currentObjects, this.props.listKey);
    }
  }, {
    key: 'generateChildren',
    value: function generateChildren() {
      var _this6 = this;

      var listItems = this.props.listItems,
          children = null;

      if (listItems) {
        var items = _underscore2['default'].compact(listItems);

        children = Object.keys(items).map(function (key) {
          return _react2['default'].createElement(_listList_item2['default'], {
            key: 'listItem-' + key,
            ref: 'listItem-' + key,
            name: 'listItem-' + key,
            itemIndex: key,
            properties: listItems[key],
            autoGenerate: true,
            removeButton: _this6.props.removeButton,
            containerClass: _this6.props.containerClass,
            inputClass: _this6.props.inputClass,
            rowClass: _this6.props.rowClass,
            removeChild: _this6.removeChild,
            onChange: _this6.onChange,
            onBlur: _this6.onBlur,
            hideLabel: _this6.props.header
          });
        });
      }

      return children;
    }
  }, {
    key: 'generateHeader',
    value: function generateHeader() {
      var _this7 = this;

      var headerItems = Object.keys(this.props.formAttrs).map(function (key) {
        return _react2['default'].createElement(
          'li',
          {
            className: _this7.props.headerItemClass,
            key: key
          },
          _this7.props.formAttrs[key].label
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
        ref: 'addButton',
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
      rowClass: 'row'
    },
    enumerable: true
  }]);

  return List;
})(_react2['default'].Component);

exports['default'] = List;
module.exports = exports['default'];