"use strict";

import React from 'react';
import TextInput from './controls/text_input';
import NumberInput from './controls/number_input';
import SelectInput from './controls/select_input';
import Strings from './utils/strings';
import Collection from './utils/collection';

export default class Property extends React.Component {
  constructor(props) {
    super(props);

    this.state = { error: null, errorState: 'none' };

    this.validInputTypes = {
      "text": TextInput,
      "number": NumberInput,
      "select": SelectInput
    };
  }

  value() {
    return this.refs[this.props.name].value();
  }

  valid() {
    if(!this.props.validation) return true;

    window.eval(this.props.validation);

    if(validate(this.value())) {
      return true;
    } else {
      this.props.stateAction({ error: this.props.errorMessage, errorState: 'block' });
      return false;
    }
  }

  inputProps() {
    return {
      ref: this.props.name,
      name: this.props.name,
      defaultValue: this.props.value,
      classes: this.props.inputClass,
      stateAction: this.props.stateAction
    }
  }

  inputType() {
    let types = Object.keys(this.validInputTypes);

    if (Collection.include(types, this.props.inputType)) {
      return React.createElement(
        this.validInputTypes[this.props.inputType],
        this.inputProps()
      );
    } else {
      return React.createElement(TextInput, this.inputProps());
    }
  }

  render() {
    return (
      <div className={this.props.containerClass} key={this.props.value}>
        <label>{this.props.label}</label>
        { this.inputType() }
        <div className="error" style={{display: this.state.errorState}}>{this.state.error}</div>
      </div>
    )
  }
}

Property.defaultProps = {
  stateAction: function(props) {
    console.log("State action was not defined for properties:" + JSON.stringify(props));
  },
  inputType: "text",
  options: [],
  defaultValue: "",
  name: "input",
  containerClass: "input-area",
  inputClass: "",
  value: ""
}
