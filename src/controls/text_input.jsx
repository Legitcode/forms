"use strict";

import BaseInput from './base_input';
import React from 'react';
import _ from 'underscore';

export default class TextInput extends BaseInput {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        onChange={this.debouncedChange}
        onBlur={this.onBlur}
        type="text"
        ref={this.props.name}
        name={this.props.name}
        className={this.props.inputClass}
        defaultValue={this.props.defaultValue}
      />
    )
  }
}
