import BaseInput from './base_input';
import React from 'react';
import _ from 'underscore';

export default class NumberInput extends BaseInput {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        className={this.props.inputClass}
        onKeyPress={this.keyPressed}
        type="number"
        ref={this.props.name}
        name={this.props.name}
        onChange={this.debouncedChange}
        onBlur={this.onBlur}
        defaultValue={this.props.defaultValue}
        placeholder={this.props.placeholder} 
        min={this.props.min}
        max={this.props.max}
        step={this.props.step}
      />
    )
  }
}
