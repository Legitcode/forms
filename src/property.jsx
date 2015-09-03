import React from 'react';
import TextInput from './controls/text_input';
import NumberInput from './controls/number_input';
import SelectInput from './controls/select_input';
import EmailInput from './controls/email_input';
import PhoneInput from './controls/phone_input';
import PasswordInput from './controls/password_input';
import HiddenInput from './controls/hidden_input';
import TextAreaInput from './controls/textarea_input';
import CheckboxInput from './controls/checkbox_input';
import DateInput from './controls/date_input';
import _ from 'underscore';

export default class Property extends React.Component {
  static defaultProps = {
    onBlur: function(ev, props) {
      console.log(props);
    },
    onChange: function(ev, props) {
      console.log(props);
    },
    inputType: "text",
    options: [],
    defaultValue: "",
    name: "input",
    containerClass: "input-area",
    inputClass: "",
    value: ""
  }

  static ValidInputTypes = {
    "text": TextInput,
    "number": NumberInput,
    "select": SelectInput,
    "email": EmailInput,
    "phone": PhoneInput,
    "password": PasswordInput,
    "hidden": HiddenInput,
    "textarea": TextAreaInput,
    "checkbox": CheckboxInput,
    "date": DateInput,
  }

  constructor(props) {
    super(props);

    this.state = { errorState: 'none' }
  }

  componentDidMount() {
    this.validate = this.buildValidation(this.props.validation);
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  buildValidation = (funcString) => {
    if (funcString) {
      return new Function('value', `return ${funcString}`);
    } else {
      return null;
    }
  }

  onBlur = (ev, value) => {
    if (this.mounted) {
      this.setState({
        errorState: this.valid() ? 'none' : 'block'
      });

      let newValue = {};
      newValue[this.props.name] = value;

      this.props.onBlur(ev, newValue);
    }
  }

  onChange = (ev, value) => {
    if (this.mounted) {
      this.setState({
        errorState: this.valid() ? 'none' : 'block'
      });

      let newValue = {};
      newValue[this.props.name] = value;
      
      this.props.onChange(ev, newValue);
    }
  }

  valid() {
    if(!this.validate) return true;
    return this.validate(this.value());
  }

  value() {
    return this.refs[this.props.name].value();
  }

  inputProps() {
    return {
      ...this.props,
      ref: this.props.name,
      name: this.props.name,
      defaultValue: this.props.value || this.props.defaultValue,
      onBlur: this.onBlur,
      onChange: this.onChange
    }
  }

  inputType() {
    let types = Object.keys(Property.ValidInputTypes);

    if (_.includes(types, this.props.inputType)) {
      return React.createElement(
        Property.ValidInputTypes[this.props.inputType],
        this.inputProps()
      );
    } else {
      return React.createElement(TextInput, this.inputProps());
    }
  }

  hideLabel() {
    return _.contains(["hidden", "checkbox"], this.props.inputType) || this.props.hideLabel;
  }

  render() {
    let errorState,
        label,
        containerClass;

    if (!this.hideLabel()) {
      label = <label>{this.props.label}</label>
    }

    return (
      <div className={this.props.containerClass} key={this.props.value}>
        { label }
        { this.inputType() }
        <div className="error" style={{display: this.state.errorState}}>{this.props.errorMessage}</div>
      </div>
    )
  }
}
