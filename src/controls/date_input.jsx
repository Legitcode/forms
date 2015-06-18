"use strict";

import BaseInput from './base_input';
import React from 'react';
import _ from 'underscore';
import Pikaday from 'pikaday';

export default class DateInput extends BaseInput {
  constructor(props) {
    super(props);

    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount() {
    let target = React.findDOMNode(this.refs[this.props.name]);

    this.picker = new Pikaday({
      field: target,
      format: this.props.dateFormat || 'MM-DD-YYYY',
      defaultValue: this.props.defaultValue,
      setDefaultValue: true
    });
  }

  value() {
    return React.findDOMNode(this.refs[this.props.name]).value;
  }

  serialize(date) {
    let formValue = {};
    formValue['value'] = this.value();
    return formValue;
  }

  onBlur(date) {
    if (date) {
      this.props.onBlur(null, this.picker.toString());
    }
  }

  render() {
    return (
      <input
        className={this.props.classes}
        type="text"
        ref={this.props.name}
        name={this.props.name}
        defaultValue={this.props.defaultValue}
      />
    )
  }
}
