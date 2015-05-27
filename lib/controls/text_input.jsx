"use strict";

import React from 'react';

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
  }

  value() {
    return React.findDOMNode(this.refs[this.props.name]).value;
  }

  handleChanged() {
    this.props.stateAction(this.value());
  }

  render() {
    return (
      <input
        className={this.props.classes}
        onChange={this.handleChanged.bind(this)}
        type="text"
        ref={this.props.name}
        name={this.props.name}
        defaultValue={this.props.defaultValue} />
    )
  }
}
