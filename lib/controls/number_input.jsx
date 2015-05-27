"use strict";

import React from 'react';

export default class NumberInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChanged = this.handleChanged.bind(this);
  }

  value() {
    return React.findDOMNode(this.refs[this.props.name]).value;
  }

  handleChanged() {
    let newState = {};
    newState[this.props.name] = this.value();

    this.props.onChange(newState);
  }

  render() {
    return (
      <input
        type="number"
        ref={this.props.name}
        name={this.props.name}
        onChange={this.handleChanged}
        defaultValue={this.props.value} />
    )
  }
}
