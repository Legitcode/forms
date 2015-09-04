"use strict";

import React from 'react';
import Property from '../property';
import Obj from '../utils/obj';
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

    let values = refKeys.map((refKey) => {
      return this.refs[refKey].serialize();
    });

    let serialized = {}

    values.forEach((value, index) => {
      serialized[refKeys[index]] = value;
    });

    return serialized;
  }

  onChange = (ev, value) => {
    this.props.onChange(ev, value);
  }

  onBlur = (ev, value) => {
    this.props.onBlur(ev, value);
  }

  removeChild = (ev) => {
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
    let children = React.Children.map(this.props.children, (child) => {
          if (!React.isValidElement(child)) {
            return child;
          }

          return React.cloneElement(child, {
            ref: child.props.name
          });
        });


    let removeButton = React.cloneElement(this.props.removeButton, {
      onClick: this.removeChild
    });

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
