import React from 'react';
import Property from './property';
import List from './list';
import _ from 'underscore';

export default class Schema extends React.Component {
  static defaultProps = {
    onBlur: function(ev, value) {
      console.log(value);
    },
    onChange: function(ev, value) {
      console.log(value);
    },
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

  validate() {
    let valid = true;

    Object.keys(this.refs).forEach((refKey)=> {
      if(!this.refs[refKey].valid()) {
        this.refs[refKey].addErrors();
        valid = false;
      }
    });

    return valid;
  }

  submitForm = () => {
    if (this.validate()) this.props.submitForm();
  }

  render() {
    let children = React.Children.map(this.props.children, (child) => {
          return React.cloneElement(child, {
            ref: child.props.name
          });
        });

    return (
      <div key={this.props.schemaName} className={this.props.className}>
        { children }
      </div>
    )
  }
}
