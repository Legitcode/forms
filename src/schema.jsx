"use strict";

import React from 'react';

export default class Schema extends React.Component {
  constructor(props) {
    super(props);
  }

  validate() {
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
    let children = React.Children.map(this.props.children, (child, index)=> {
      if (!React.isValidElement(child)) {
        return child;
      }

      return React.cloneElement(child, {
        ref: `property-${index}`
      });
    });

    return (
      <div key={this.props.schemaName}>
        { children }
      </div>
    )
  }
}
