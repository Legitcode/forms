"use strict";

import BaseInput from './base_input';
import React from 'react';
import _ from 'underscore';

export default class TextInput extends BaseInput {
  constructor(props) {
    super(props);
  }

  value() {
    return React.findDOMNode(this.refs[this.props.name]).checked;
  }

  render() {
    return (
      <label>
        <input
          className={this.props.inputClass}
          onChange={this.onChange}
          onBlur={this.onBlur}
          type="checkbox"
          ref={this.props.name}
          name={this.props.name}
          placeholder={this.props.placeholder}
          checked={this.props.defaultValue}
        />

        { this.props.label }
      </label>
    )
  }
}
