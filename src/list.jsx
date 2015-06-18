"use strict";

import React from 'react';
import ListItem from './list/list_item';
import Property from './property';
import _ from 'underscore';
import Obj from './utils/obj';

export default class List extends React.Component {
  static defaultProps = {
    onChange: function(ev, value) {
      console.log(value);
    },
    onBlur: function(ev, value) {
      console.log(value);
    },
    onListChange: function(ev, value) {
      console.log(value);
    },
    removeButton: ( <a href="javascript:void(0)" dangerouslySetInnerHTML={{__html: '&times;'}}></a> ),
    addButton: ( <a href="javascript:void(0)" dangerouslySetInnerHTML={{__html: '&plus;'}}></a> ),
    rowClass: "row"
  }

  constructor(props) {
    super(props);

    if (this.props.listItems) {
      this.childCount = Object.keys(this.props.listItems).length;
    } else {
      this.childCount = 0;
    }

    if (!this.props.formAttrs && this.props.autoGenerate) {
      console.log("Default form attributes were not given");
    } else if (!this.props.formAttrs) {
      this.formAttrs = {};

      let childrenMap = React.Children.forEach(this.props.children, (child) => {
        this.formAttrs[child.props.name] = {
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
        }
      });
    } else {
      this.formAttrs = this.props.formAttrs;
    }

    this.removeChild = this.removeChild.bind(this);
    this.addChild = this.addChild.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let stateChanged = false;

    Object.keys(this.props).forEach((key) => {
      if (this.props[key] != nextProps[key]) {
        stateChanged = true;
      }
    });

    return stateChanged;
  }

  valid() {
    let valid = true;

    Object.keys(this.refs).forEach((refKey) => {
      if (refKey != "addButton") {
        if (!this.refs[refKey].valid()) {
          this.refs[refKey].addErrors();
          valid = false;
        }
      }
    });

    return valid;
  }

  onChange(ev, value) {
    this.props.onListChange(ev, this.serialize(true), this.props.listKey);
  }

  onBlur(ev, value) {
    this.props.onListChange(ev, this.serialize(true), this.props.listKey);
  }

  serialize(withAttrs) {
    let currentObjects = {};

    let ary = Object.keys(this.refs).map((refKey) => {
      if (refKey.match(/-[0-9]{1,100}/)) {
        return this.refs[refKey].serialize();
      }
    });

    ary = _.compact(ary);

    if (_.size(ary) > 0) {
      currentObjects = Obj.clone(this.props.listItems);

      Object.keys(currentObjects).forEach((values, index) => {
        Object.keys(ary[index]).forEach((key) => {
          currentObjects[values][key] = ary[index][key];

          if (withAttrs) {
            let mergeableAttrs = {};
            mergeableAttrs[key] = this.formAttrs[`${key.split("-")[0]}`];
            currentObjects[values][key] = _.extend(currentObjects[values][key], mergeableAttrs[key]);
          }
        });
      });
    }

    return currentObjects;
  }

  createChild() {
    let currentObjects = {},
        newObject = {};

    if (this.props.listItems) {
      currentObjects = Obj.clone(this.props.listItems);
    }

    newObject = Obj.clone(this.formAttrs);

    Object.keys(newObject).forEach((key) => {
      newObject[`${key}-${this.childCount}`] = Obj.clone(this.formAttrs)[key];
      delete newObject[key];
    });

    currentObjects[this.childCount] = newObject;
    this.childCount += 1;
    return currentObjects;
  }

  addChild(ev) {
    this.props.onListChange("add", this.createChild(), this.props.listKey);
  }

  removeChild(ev, listItem) {
    let object = _.find(Object.keys(this.props.listItems), (item) => {
      return item == parseInt(listItem.split("-")[1]);
    });

    let currentObjects = _.clone(this.props.listItems);
    delete currentObjects[object];

    this.props.onListChange("deleteListItem", currentObjects, this.props.listKey);
  }

  generateChildren() {
    let listItems = this.props.listItems,
        children = null;

    if (listItems) {
      children = Object.keys(listItems).map((key) => {
        return React.createElement(ListItem, {
          key: `listItem-${key}`,
          ref: `listItem-${key}`,
          name: `listItem-${key}`,
          itemIndex: key,
          properties: listItems[key],
          autoGenerate: true,
          removeButton: this.props.removeButton,
          containerClass: this.props.containerClass,
          inputClass: this.props.inputClass,
          rowClass: this.props.rowClass,
          removeChild: this.removeChild,
          onChange: this.onChange,
          onBlur: this.onBlur,
          hideLabel: this.props.header
        });
      });
    }

    return children;
  }

  generateHeader() {
    let headerItems = Object.keys(this.props.formAttrs).map((key) => {
      return (
        <li
          className={this.props.headerItemClass}
          key={key}
        >
          {this.props.formAttrs[key].label}
        </li>
      )
    });

    return (
      <ul className={this.props.headerClass}>
        { headerItems }
      </ul>
    )
  }

  render() {
    let addButton = React.cloneElement(this.props.addButton, {
      ref: "addButton",
      onClick: this.addChild
    });

    let children = this.generateChildren(),
        header = null,
        heading = null;

    if (this.props.header) {
      header = this.generateHeader();
    }

    if (this.props.heading) {
      heading = <h4>{this.props.heading}</h4>;
    }

    return (
      <div className={this.props.classes}>
        { heading }
        { header }
        { children }
        { addButton }
      </div>
    )
  }
}
