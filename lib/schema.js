"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var Schema = (function (_React$Component) {
  function Schema(props) {
    _classCallCheck(this, Schema);

    _get(Object.getPrototypeOf(Schema.prototype), "constructor", this).call(this, props);
  }

  _inherits(Schema, _React$Component);

  _createClass(Schema, [{
    key: "validate",
    value: function validate() {
      var _this = this;

      var valid = true;

      Object.keys(this.refs).forEach(function (refKey) {
        if (!_this.refs[refKey].valid()) {
          valid = false;
        }
      });

      return valid;
    }
  }, {
    key: "serialize",
    value: function serialize() {
      var _this2 = this;

      return Object.keys(this.refs).map(function (refKey) {
        return _this2.refs[refKey].serialize();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var children = _react2["default"].Children.map(this.props.children, function (child, index) {
        if (!_react2["default"].isValidElement(child)) {
          return child;
        }

        return _react2["default"].cloneElement(child, {
          ref: "property-" + index
        });
      });

      return _react2["default"].createElement(
        "div",
        { key: this.props.schemaName },
        children
      );
    }
  }]);

  return Schema;
})(_react2["default"].Component);

exports["default"] = Schema;
module.exports = exports["default"];