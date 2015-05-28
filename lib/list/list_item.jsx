"use strict";

import React from 'react';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
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
    return Object.keys(this.refs).map((refKey)=> {
      return this.refs[refKey].serialize();
    });
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

    return (
      <div
        key={this.props.name}
        name={this.props.name}
        className={this.props.className}>
        { children }
        { this.props.removeButton }
      </div>
    )
  }
}
