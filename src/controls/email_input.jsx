"use strict";

import BaseInput from './base_input';
import React from 'react';
import _ from 'underscore';

export default class EmailInput extends BaseInput {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        className={this.props.inputClass}
        onChange={this.debouncedChange}
        onBlur={this.onBlur}
        type="email"
        ref={this.props.name}
        name={this.props.name}
        defaultValue={this.props.defaultValue}
        placeholder={this.props.placeholder} 
      />
    )
  }
}
