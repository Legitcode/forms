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

  serialize() {
    let formValue = {}
    formValue[this.props.name] = this.value();
    return formValue;
  }

  handleChanged(ev) {
    this.props.onChange(ev, this.serialize());
  }

  render() {
    return (
      <input
        className={this.props.classes}
        onChange={this.debouncedChange}
        type="email"
        ref={this.props.name}
        name={this.props.name}
        defaultValue={this.props.defaultValue} />
    )
  }
}
