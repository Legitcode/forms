"use strict";

import React from 'react';
import Property from '../property';
import _ from 'underscore';

export default class ListItem extends React.Component {
  static defaultProps = {
    onChange: function(ev, value) {
      console.log(value);
    },
    onBlur: function(ev, value) {
      console.log(value);
    }
  }

  constructor(props) {
    super(props);

    this.removeChild = this.removeChild.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  valid() {
    let valid = true;

    Object.keys(this.refs).forEach((refKey)=> {
      if(!this.refs[refKey].valid()) {
        valid = false;
      }
    });

    return valid;
  }

  serialize() {
    let refKeys = Object.keys(this.refs);

    let ary = refKeys.map((refKey)=> {
      return this.refs[refKey].serialize();
    });

    let obj = {}

    ary.forEach((value, index) => {
      obj[refKeys[index]] = value;
    });

    return obj;
  }

  onChange(ev, value) {
    this.props.onChange(ev, value);
  }

  onBlur(ev, value) {
    this.props.onBlur(ev, value);
  }

  removeChild(ev) {
    this.props.removeChild(ev, this.props.name);
  }

  buildValidation(funcString) {
    if (funcString) {
      return new Function('value', `return ${funcString}`);
    } else {
      return null;
    }
  }

  render() {
    let children = null;

    let removeButton = React.cloneElement(this.props.removeButton, {
      onClick: this.removeChild
    });

    if (this.props.autoGenerate) {
      let properties = this.props.properties;

      children = Object.keys(properties).map((key) => {
        return React.createElement(Property, {
          key: key,
          name: key,
          ref: key,
          label: properties[key].label,
          validation: this.buildValidation(properties[key].validation),
          errorMessage: properties[key].errorMessage,
          inputType: properties[key].type,
          onBlur: this.onBlur,
          onChange: this.onChange,
          containerClass: properties[key].containerClass || this.props.containerClass,
          inputClass: properties[key].inputClass || this.props.inputClass,
          selected: properties[key].selected,
          options: properties[key].options,
          defaultValue: properties[key].defaultValue,
          value: properties[key].value,
          placeholder: properties[key].placeholder,
          invalid: properties[key].invalid,
          isOpen: properties[key].isOpen,
          hideLabel: this.props.hideLabel,
          editable: properties[key].editable
        });
      });
    } else {
      children = React.Children.map(this.props.children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        return React.cloneElement(child, {
          ref: child.props.name
        });
      });
    }

    return (
      <div
        key={this.props.name}
        name={this.props.name}
        className={this.props.rowClass}>
        { children }
        { removeButton }
      </div>
    )
  }
}
