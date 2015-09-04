import React from 'react';
import Property from './property';
import AutoList from './auto_list';
import _ from 'underscore';

export default class AutoSchema extends React.Component {
  static propTypes = {
    attributes: React.PropTypes.object.isRequired,
    addButton: React.PropTypes.object,
    removeButton: React.PropTypes.object
  }

  static defaultProps = {
    attributes: {},
    addButton: <button>Add</button>,
    removeButton: <button>Remove</button>
  }

  onChange = (ev, attrs) => {
    this.props.updateFormValue(attrs);
  }

  onBlur = (ev, attrs) => {
    this.props.updateFormValue(attrs);
  }

  generate() {
    let { formAttrs, containerClass, inputClass } = this.props.attributes;

    return _.map(formAttrs, (value, key) => {
      if (!key.match(/list/i)) {
        return (
          <Property
            {...value}
            name={key}
            key={`property-${key}`}
            ref={key}
            containerClass={value.containerClass || containerClass}
            inputClass={value.inputClass || inputClass}
            onBlur={this.onBlur}
            onChange={this.onChange}
          />
        )
      } else {
        return (
          <AutoList
            {...value}
            listKey={key}
            key={`list-${value.name}`}
            ref={`list-${value.name}`}
            containerClass={value.containerClass || containerClass}
            inputClass={value.inputClass || inputClass}
            addButton={this.props.addButton}
            removeButton={this.props.removeButton}
            onChange={this.onChange}
            onBlur={this.onBlur}
            addChildToList={this.props.addChildToList}
          >
        </AutoList>
        )
      }
    });
  }

  validate() {
    let valid = true;

    Object.keys(this.refs).forEach((refKey)=> {
      if(!this.refs[refKey].valid()) {
        valid = false;
      }
    });

    return valid;
  }

  submitForm = () => {
    if (this.validate()) this.props.submitForm();
  }

  render() {
    let children = this.generate(),
        submitButton = React.cloneElement(this.props.submitButton, {
          onClick: this.submitForm
        });

    return (
      <div key={this.props.schemaName}>
        { children }
        { this.props.noSubmit ? null : submitButton }
      </div>
    )
  }
}
