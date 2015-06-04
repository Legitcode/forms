"use strict";

import BaseInput from './base_input';
import React from 'react';
import _ from 'underscore';

export default class PasswordInput extends BaseInput {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        className={this.props.classes}
        type="password"
        ref={this.props.name}
        name={this.props.name}
        onChange={this.debouncedChange}
        onBlur={this.onBlur}
        defaultValue={this.props.defaultValue} />
    )
  }
}
