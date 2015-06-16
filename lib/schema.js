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

var _property = require('./property');

var _property2 = _interopRequireDefault(_property);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _listList_item = require('./list/list_item');

var _listList_item2 = _interopRequireDefault(_listList_item);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _underscoreDeepExtend = require('underscore-deep-extend');

var _underscoreDeepExtend2 = _interopRequireDefault(_underscoreDeepExtend);

var Schema = (function (_React$Component) {
  function Schema(props) {
    _classCallCheck(this, Schema);

    _get(Object.getPrototypeOf(Schema.prototype), 'constructor', this).call(this, props);

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onListChange = this.onListChange.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
  }

  _inherits(Schema, _React$Component);

  _createClass(Schema, [{
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
    key: 'onChange',
    value: function onChange(ev, value, listKey) {
      var attrs = {
        formAttrs: value
      };

      this.props.onChange(ev, attrs, listKey);
    }
  }, {
    key: 'onListChange',
    value: function onListChange(ev, value, listKey) {
      var formAttrs = {};
      formAttrs[listKey] = {
        listItems: value
      };

      var attrs = {
        formAttrs: formAttrs
      };

      this.props.onChange(ev, attrs, listKey);
    }
  }, {
    key: 'onBlur',
    value: function onBlur(ev, value) {
      var attrs = {
        formAttrs: value
      };

      this.props.onBlur(ev, attrs);
    }
  }, {
    key: 'removeListItem',
    value: function removeListItem(ev, item, listItem) {
      this.refs[item].removeChild(listItem);
    }
  }, {
    key: 'validate',
    value: function validate() {
      var _this2 = this;

      var valid = true;

      Object.keys(this.refs).forEach(function (refKey) {
        if (!_this2.refs[refKey].valid()) {
          _this2.refs[refKey].addErrors();
          valid = false;
        }
      });

      return valid;
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      var _this3 = this;

      var ary = Object.keys(this.refs).map(function (refKey) {
        if (refKey.match(/list/i) || _this3.refs[refKey] instanceof _list2['default']) {
          var _ret = (function () {
            var obj = {},
                propertyName = refKey.split('-')[1] || _this3.refs[refKey].props.name;

            obj[propertyName] = _this3.refs[refKey].serialize();

            Object.keys(obj[propertyName]).forEach(function (itemKey) {
              Object.keys(obj[propertyName][itemKey]).forEach(function (propertyKey) {
                obj[propertyName][itemKey][propertyKey] = obj[propertyName][itemKey][propertyKey].value;
              });
            });
            return {
              v: obj
            };
          })();

          if (typeof _ret === 'object') return _ret.v;
        } else if ('isSelect' in _this3.refs[refKey] && _this3.refs[refKey].isSelect()) {
          var obj = {},
              value = _this3.refs[refKey].serialize();

          delete value.isOpen;
          obj[_this3.refs[refKey].props.name] = value;
          return obj;
        } else {
          var obj = {};
          obj[_this3.refs[refKey].props.name] = _this3.refs[refKey].serialize().value;
          return obj;
        }
      });

      return _underscore2['default'].object(ary.map(function (obj, index) {
        return [_underscore2['default'].keys(obj)[0], _underscore2['default'].values(obj)[0]];
      }));
    }
  }, {
    key: 'buildValidation',
    value: function buildValidation(funcString) {
      if (funcString) {
        return new Function('value', 'return ' + funcString);
      } else {
        return null;
      }
    }
  }, {
    key: 'generate',
    value: function generate(attributes) {
      var _this4 = this;

      var formAttributes = attributes.formAttrs;

      return Object.keys(formAttributes).map(function (key, index) {
        if (!_underscore2['default'].includes(Schema.ExcludedPropertyKeys, key) && !key.match(/list/i)) {
          return _react2['default'].createElement(_property2['default'], {
            name: key,
            key: 'property-' + key,
            ref: 'property-' + key,
            label: formAttributes[key].label,
            validation: _this4.buildValidation(formAttributes[key].validation),
            errorMessage: formAttributes[key].errorMessage,
            inputType: formAttributes[key].type,
            onBlur: _this4.onBlur,
            onChange: _this4.onChange,
            containerClass: attributes.containerClass,
            inputClass: formAttributes[key].inputClass || attributes.inputClass,
            selected: formAttributes[key].selected,
            options: formAttributes[key].options,
            defaultValue: formAttributes[key].defaultValue,
            value: formAttributes[key].value,
            placeholder: formAttributes[key].placeholder,
            invalid: formAttributes[key].invalid,
            isOpen: formAttributes[key].isOpen
          });
        } else if (key.match(/list/i)) {
          return _react2['default'].createElement(_list2['default'], {
            listKey: key,
            key: 'list-' + formAttributes[key].name,
            ref: 'list-' + formAttributes[key].name,
            rowClass: formAttributes[key].rowClass,
            addButton: _this4.props.addButton,
            removeButton: _this4.props.removeButton,
            name: formAttributes[key].name,
            formAttrs: formAttributes[key].formAttrs,
            onListChange: _this4.onListChange,
            onChange: _this4.onChange,
            onBlur: _this4.onBlur,
            listItems: formAttributes[key].listItems,
            autoGenerate: _this4.props.autoGenerate,
            containerClass: attributes.containerClass,
            inputClass: attributes.inputClass
          });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var children = null;

      if (this.props.autoGenerate) {
        children = this.generate(this.props.attributes);
      } else {
        children = _react2['default'].Children.map(this.props.children, function (child) {
          return _react2['default'].cloneElement(child, {
            ref: child.props.name
          });
        });
      }

      return _react2['default'].createElement(
        'div',
        { key: this.props.schemaName },
        children
      );
    }
  }], [{
    key: 'defaultProps',
    value: {
      onBlur: function onBlur(ev, value) {
        console.log(value);
      },
      onChange: function onChange(ev, value) {
        console.log(value);
      },
      attributes: {},
      addButton: _react2['default'].createElement(
        'button',
        null,
        'Add'
      ),
      removeButton: _react2['default'].createElement(
        'button',
        null,
        'Remove'
      )
    },
    enumerable: true
  }, {
    key: 'ExcludedPropertyKeys',
    value: ['propertyName', 'containerClass', 'inputClass', 'currentObjects', 'rowClass', 'listItem'],
    enumerable: true
  }]);

  return Schema;
})(_react2['default'].Component);

exports['default'] = Schema;
module.exports = exports['default'];