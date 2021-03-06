import BaseInput from './base_input';
import React from 'react';

export default class TextInput extends BaseInput {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        onChange={this.debouncedChange}
        onBlur={this.onBlur}
        onKeyPress={this.keyPressed}
        type="text"
        ref={this.props.name}
        name={this.props.name}
        className={this.props.inputClass}
        defaultValue={this.props.defaultValue}
        placeholder={this.props.placeholder}
      />
    )
  }
}
