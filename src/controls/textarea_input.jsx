"use strict";

import BaseInput from './base_input';
import React from 'react';
import _ from 'underscore';

export default class TextAreaInput extends BaseInput {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <textarea
        className={this.props.inputClass}
        onKeyPress={this.keyPressed}
        onChange={this.debouncedChange}
        onBlur={this.onBlur}
        type="text"
        ref={this.props.name}
        name={this.props.name}
        defaultValue={this.props.defaultValue}
        placeholder={this.props.placeholder} 
      />
    )
  }
}
