import alt from './alt';
import immutable from 'alt/utils/ImmutableUtil';
import Immutable from 'immutable';
import FormActions from './form_actions';

@immutable

class FormStore {
  static displayName = 'FormStore';

  constructor() {
    this.bindActions(FormActions);
  }

  setInitialState(props) {
    this.setState(Immutable.fromJS(props));
  }
 
  lists() {
    return this.state.getIn(['attributes', 'formAttrs']).filter((value, key) => {
      return key.match(/list/i);
    });
  }

  getList(listId) {
    let list, listKey;

    list = this.state.getIn(['attributes', 'formAttrs']).find((value, key) => {
      if (value.get('name') === listId && key.match(/list/i)) {
        listKey = key;
        return true;
      }
    });

    return [list, listKey];
  }

  buildListItem(list, listIndex) {
    let newItem = {};

    list.get('formAttrs').forEach((value, key) => {
      newItem[`${key}-${listIndex}`] = value.toJS();
    });

    return Immutable.fromJS(newItem);
  }

  addChildToList(listId) {
    let [list, listKey] = this.getList(listId),
        listIndex = list.get('listItems').size,
        item = list.get('formAttrs'),
        newItem = this.buildListItem(list, listIndex),
        seqMap = ['attributes', 'formAttrs', listKey, 'listItems'],
        listItems = this.state.getIn(seqMap).push(newItem);

    this.setState(this.state.setIn(seqMap, listItems));
  }   

  removeChildFromList(props) {
    let { listId, itemIndex } = props,
        [list, listKey] = this.getList(listId),
        seqMap = ['attributes', 'formAttrs', listKey, 'listItems'],
        listItems = this.state.getIn(seqMap).delete(itemIndex);

    this.setState(this.state.setIn(seqMap, listItems));  
  }

  updateFormValue(props) {
    let key = Object.keys(props)[0],
        value = props[key],
        seqMap = ['attributes', 'formAttrs', key],
        item = this.state.getIn(seqMap);

    if (item) {
      let newItem = item.set('value', value);
      this.setState(this.state.setIn(seqMap, newItem));
    } else {
      let [listItem, item, listId] = this.findInLists(key),
          newItem = item.set('value', value),
          newListItem = listItem.set(key, newItem),
          [list, listKey] = this.getList(listId),
          seqMap = ['attributes', 'formAttrs', listKey, 'listItems'],
          listItems = this.state.getIn(seqMap),
          itemIndex = key.split("-")[1],
          newListItems = listItems.update(itemIndex, (value) => { return newListItem });
      this.setState(this.state.setIn(seqMap, newListItems));
    }
  }

  findInLists(key) {
    let lists = this.lists(),
        itemIndex = key.split("-")[1],
        item,
        listItem,
        listId;

    lists.forEach((list) => {
      listId = list.get('name');
      listItem = list.get('listItems').slice(itemIndex, itemIndex + 1).first();
      item = listItem.find((value, itemKey) => {
        return itemKey === key;
      });

      if (item) return false;
    });

    return [listItem, item, listId]; 
  }
}

export default alt.createStore(FormStore)
