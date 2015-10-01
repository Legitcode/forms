'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _altUtilsImmutableUtil = require('alt/utils/ImmutableUtil');

var _altUtilsImmutableUtil2 = _interopRequireDefault(_altUtilsImmutableUtil);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var FormStore = (function () {
  function FormStore(FormActions) {
    var _this = this;

    _classCallCheck(this, _FormStore);

    this.serialize = function () {
      var formAttributes = _this.state.getIn(['attributes', 'formAttrs']),
          serializedForm = {
        data: {
          type: _this.state.getIn(['attributes', 'resourceName']),
          attributes: {}
        }
      },
          id = _this.state.getIn(['attributes', 'id']);

      if (id) serializedForm.data['id'] = id;

      formAttributes.forEach(function (value, key) {
        if (key.match(/list/i)) {
          var _getListAttributes = _this.getListAttributes(value);

          var _getListAttributes2 = _slicedToArray(_getListAttributes, 2);

          var listKey = _getListAttributes2[0];
          var list = _getListAttributes2[1];

          serializedForm.data.relationships = serializedForm.data.relationships || {};
          serializedForm.data.relationships[listKey] = list;
        } else {
          serializedForm.data.attributes[key] = value.get('value');
        }
      });

      return serializedForm;
    };

    this.bindActions(FormActions);

    this.exportPublicMethods({
      serialize: this.serialize
    });
  }

  _createClass(FormStore, [{
    key: 'setInitialState',
    value: function setInitialState(props) {
      this.setState(_immutable2['default'].fromJS(props));
    }
  }, {
    key: 'getImmutState',
    value: function getImmutState() {
      return this.getState().toJS();
    }
  }, {
    key: 'lists',
    value: function lists() {
      return this.state.getIn(['attributes', 'formAttrs']).filter(function (value, key) {
        return key.match(/list/i);
      });
    }
  }, {
    key: 'getList',
    value: function getList(listId) {
      var list = undefined,
          listKey = undefined;

      list = this.state.getIn(['attributes', 'formAttrs']).find(function (value, key) {
        if (value.get('name') === listId && key.match(/list/i)) {
          listKey = key;
          return true;
        }
      });

      return [list, listKey];
    }
  }, {
    key: 'buildListItem',
    value: function buildListItem(list, listIndex) {
      var newItem = {};

      list.get('formAttrs').forEach(function (value, key) {
        newItem[key + '-' + listIndex] = value.toJS();
      });

      return _immutable2['default'].fromJS(newItem);
    }
  }, {
    key: 'addChildToList',
    value: function addChildToList(listId) {
      var _getList = this.getList(listId);

      var _getList2 = _slicedToArray(_getList, 2);

      var list = _getList2[0];
      var listKey = _getList2[1];
      var listIndex = list.get('listItems').size;
      var newItem = this.buildListItem(list, listIndex);
      var seqMap = ['attributes', 'formAttrs', listKey, 'listItems'];

      this.setState(this.state.updateIn(seqMap, function (listItems) {
        return listItems.push(newItem);
      }));
    }
  }, {
    key: 'removeChildFromList',
    value: function removeChildFromList(props) {
      var listId = props.listId;
      var itemIndex = props.itemIndex;

      var _getList3 = this.getList(listId);

      var _getList32 = _slicedToArray(_getList3, 2);

      var list = _getList32[0];
      var listKey = _getList32[1];
      var seqMap = ['attributes', 'formAttrs', listKey, 'listItems'];
      var listItems = this.state.getIn(seqMap)['delete'](itemIndex);

      this.setState(this.state.setIn(seqMap, listItems));
    }
  }, {
    key: 'updateFormValue',
    value: function updateFormValue(props) {
      var _this2 = this;

      var key = Object.keys(props)[0],
          value = props[key],
          seqMap = ['attributes', 'formAttrs', key],
          item = this.state.getIn(seqMap);

      if (item) {
        var newItem = item.set('value', value);
        this.setState(this.state.setIn(seqMap, newItem));
      } else {
        (function () {
          var _findInLists = _this2.findInLists(key);

          var _findInLists2 = _slicedToArray(_findInLists, 3);

          var listItem = _findInLists2[0];
          var item = _findInLists2[1];
          var listId = _findInLists2[2];
          var newItem = item.set('value', value);
          var newListItem = listItem.set(key, newItem);

          var _getList4 = _this2.getList(listId);

          var _getList42 = _slicedToArray(_getList4, 2);

          var list = _getList42[0];
          var listKey = _getList42[1];
          var seqMap = ['attributes', 'formAttrs', listKey, 'listItems'];
          var listItems = _this2.state.getIn(seqMap);
          var itemIndex = key.split("-")[1];
          var newListItems = listItems.update(itemIndex, function (value) {
            return newListItem;
          });

          _this2.setState(_this2.state.setIn(seqMap, newListItems));
        })();
      }
    }
  }, {
    key: 'findInLists',
    value: function findInLists(key) {
      var lists = this.lists(),
          itemIndex = key.split("-")[1],
          item = undefined,
          listItem = undefined,
          listId = undefined;

      lists.forEach(function (list) {
        listId = list.get('name');
        listItem = list.get('listItems').slice(itemIndex, itemIndex + 1).first();
        item = listItem.find(function (value, itemKey) {
          return itemKey === key;
        });

        if (item) return false;
      });

      return [listItem, item, listId];
    }
  }, {
    key: 'getListAttributes',
    value: function getListAttributes(list) {
      var listKey = list.get('name'),
          items = { data: [] };

      list.get('listItems').forEach(function (item) {
        var newItem = {};
        newItem['type'] = listKey;

        item.forEach(function (value, key) {
          newItem[key.split("-")[0]] = value.get('value');
        });

        items.data.push(newItem);
      });

      return [listKey, items];
    }
  }]);

  var _FormStore = FormStore;
  FormStore = (0, _altUtilsImmutableUtil2['default'])(FormStore) || FormStore;
  return FormStore;
})();

exports['default'] = FormStore;
module.exports = exports['default'];