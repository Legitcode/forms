"use strict";

import React from 'react';
import Property from './property';
import List from './list';
import ListItem from './list/list_item';
import _ from 'underscore';
import underscoreDeepExtend from 'underscore-deep-extend';

export default class Schema extends React.Component {
  static defaultProps = {
    onBlur: function(ev, value) {
      console.log(value);
    },
    onChange: function(ev, value) {
      console.log(value);
    },
    attributes: {},
    addButton: <button>Add</button>,
    removeButton: <button>Remove</button>
  }

  static ExcludedPropertyKeys = [
    "propertyName",
    "containerClass",
    "inputClass",
    "currentObjects",
    "rowClass",
    "listItem"
  ]

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onListChange = this.onListChange.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
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

  onChange(ev, value, listKey) {
    let attrs = {
      formAttrs: value
    };

    this.props.onChange(ev, attrs, listKey);
  }

  onListChange(ev, value, listKey) {
    let formAttrs = {};
    formAttrs[listKey] = {
      listItems: value
    };

    let attrs = {
      formAttrs: formAttrs
    };

    this.props.onChange(ev, attrs, listKey);
  }

  onBlur(ev, value) {
    let attrs = {
      formAttrs: value
    };

    this.props.onBlur(ev, attrs);
  }

  removeListItem(ev, item, listItem) {
    this.refs[item].removeChild(listItem);
  }

  validate() {
    let valid = true;

    Object.keys(this.refs).forEach((refKey)=> {
      if(!this.refs[refKey].valid()) {
        this.refs[refKey].addErrors();
        valid = false;
      }
    });

    return valid;
  }

  serialize() {
    let ary = Object.keys(this.refs).map((refKey) => {
      if (refKey.match(/list/i) || this.refs[refKey] instanceof List) {
        let obj = {},
            propertyName = refKey.split("-")[1] || this.refs[refKey].props.name

        obj[propertyName] = this.refs[refKey].serialize();

        Object.keys(obj[propertyName]).forEach((itemKey) => {
          Object.keys(obj[propertyName][itemKey]).forEach((propertyKey) => {
            obj[propertyName][itemKey][propertyKey] = obj[propertyName][itemKey][propertyKey].value;
          })
        })
        return obj;
      } else if ('isSelect' in this.refs[refKey] && this.refs[refKey].isSelect()) {
        let obj = {},
            value = this.refs[refKey].serialize();

        delete value.isOpen;
        obj[this.refs[refKey].props.name] = value;
        return obj;
      } else {
        let obj = {};
        obj[this.refs[refKey].props.name] = this.refs[refKey].serialize().value;
        return obj;
      }
    });

    return _.object(ary.map((obj, index) => {
      return [_.keys(obj)[0], _.values(obj)[0]]
    }));
  }

  buildValidation(funcString) {
    if (funcString) {
      return new Function('value', `return ${funcString}`);
    } else {
      return null;
    }
  }

  generate(attributes) {
    let formAttributes = attributes.formAttrs;

    return Object.keys(formAttributes).map((key, index) => {
      if (!_.includes(Schema.ExcludedPropertyKeys, key) && !key.match(/list/i)) {
        return (
          <Property
            name={key}
            key={`property-${key}`}
            ref={`property-${key}`}
            label={formAttributes[key].label}
            validation={this.buildValidation(formAttributes[key].validation)}
            errorMessage={formAttributes[key].errorMessage}
            inputType={formAttributes[key].type}
            onBlur={this.onBlur}
            onChange={this.onChange}
            containerClass={formAttributes[key].containerClass || attributes.containerClass}
            inputClass={formAttributes[key].inputClass || attributes.inputClass}
            selected={formAttributes[key].selected}
            options={formAttributes[key].options}
            defaultValue={formAttributes[key].defaultValue}
            value={formAttributes[key].value}
            placeholder={formAttributes[key].placeholder}
            invalid={formAttributes[key].invalid}
            isOpen={formAttributes[key].isOpen}
          />
        )
      } else if (key.match(/list/i)) {
        return (
          <List
            listKey={key}
            key={`list-${formAttributes[key].name}`}
            ref={`list-${formAttributes[key].name}`}
            rowClass={formAttributes[key].rowClass}
            addButton={this.props.addButton}
            removeButton={this.props.removeButton}
            name={formAttributes[key].name}
            formAttrs={formAttributes[key].formAttrs}
            onListChange={this.onListChange}
            onChange={this.onChange}
            onBlur={this.onBlur}
            listItems={formAttributes[key].listItems}
            autoGenerate={this.props.autoGenerate}
            containerClass={attributes.containerClass}
            inputClass={attributes.inputClass}
          >
        </List>
        )
      }
    });
  }

  render() {
    let children = null;

    if (this.props.autoGenerate) {
      children = this.generate(this.props.attributes);
    } else {
      children = React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {
          ref: child.props.name
        });
      });
    }

    return (
      <div key={this.props.schemaName}>
        { children }
      </div>
    )
  }
}
