"use strict";

import React from 'react';
import debounce from 'debounce';

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChanged = this.handleChanged.bind(this);
    this.debouncedChange = debounce(this.handleChanged, 500);
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
        className={this.props.classes}
        onChange={this.debouncedChange}
        type="text"
        ref={this.props.name}
        name={this.props.name}
        defaultValue={this.props.defaultValue} />
    )
  }
}
