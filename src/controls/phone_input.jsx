"use strict";

import BaseInput from './base_input';
import React from 'react';
import _ from 'underscore';

export default class PhoneInput extends BaseInput {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        className={this.props.inputClass}
        onChange={this.debouncedChange}
        onBlur={this.onBlur}
        type="phone"
        ref={this.props.name}
        name={this.props.name}
        defaultValue={this.props.defaultValue}
      />
    )
  }
}
