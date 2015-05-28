"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Collection = (function () {
  function Collection() {
    _classCallCheck(this, Collection);
  }

  _createClass(Collection, null, [{
    key: "include",
    value: function include(coll, value) {
      return coll.indexOf(value) != -1;
    }
  }, {
    key: "find",
    value: function find(coll, value, def) {
      var idx = coll.indexOf(value);

      if (idx != -1) {
        return idx;
      } else {
        return def;
      }
    }
  }]);

  return Collection;
})();

exports["default"] = Collection;
module.exports = exports["default"];