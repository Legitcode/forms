import BaseInput from './base_input';
import React from 'react';
import _ from 'underscore';
import Pikaday from 'pikaday';

export default class DateInput extends BaseInput {
  constructor(props) {
    super(props);
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

  onBlur = (ev) => {
    this.props.onBlur(ev, this.picker.toString());
  }

  onChange = (ev) => {
    this.props.onChange(ev, this.picker.toString());
  }

  render() {
    return (
      <input
        className={this.props.inputClass}
        type="text"
        ref={this.props.name}
        name={this.props.name}
        defaultValue={this.props.defaultValue}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    )
  }
}
