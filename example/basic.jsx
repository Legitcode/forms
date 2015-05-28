"use strict";

import React from 'react';
import { Form, Schema, List, Property } from '../src/forms';

export default class Basic extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(newValue) {
    console.log(newValue);
  }

  submitForm() {
    if (this.refs.schema.validate()) {
      console.log(this.refs.schema.serialize());
    }
  }

  render() {
    let selectOptions = [
      { value: "mr", displayValue: "Mr" },
      { value: "mrs", displayValue: "Mrs" },
      { value: "ms", displayValue: "Ms" }
    ]

    let addButton = (
      <a href="javascript:void(0)"
        dangerouslySetInnerHTML={{__html: '&plus;'}}
        className="btn btn-success">
      </a>
    );

    let removeButton = (
      <a href="javascript:void(0)"
         dangerouslySetInnerHTML={{__html: '&times;'}}
         className="btn btn-danger pad-left">
      </a>
    );

    return (
      <Form>
        <Schema ref="schema">
          <Property
            onChange={this.onChange}
            name="title"
            label="Title"
            inputType="select"
            options={selectOptions}
            containerClass="form-group"
            inputClass="form-control" />

          <Property
            onChange={this.onChange}
            label="Name"
            name="name"
            inputType="text"
            containerClass="form-group"
            inputClass="form-control"
            validation={ function(v) { return v.length > 0; } }
            errorMessage="Name is required" />

          <List
            rowClass="my-row"
            addButton={addButton}
            removeButton={removeButton}>
            <Property
              onChange={this.onChange}
              label="Phone"
              name="phone"
              inputType="text"
              containerClass="form-group"
              inputClass="form-control" />
          </List>

          <Property
            onChange={this.onChange}
            label="Address"
            name="address"
            inputType="text"
            containerClass="form-group"
            inputClass="form-control" />

          <Property
            onChange={this.onChange}
            label="Age"
            name="age"
            inputType="number"
            containerClass="form-group"
            inputClass="form-control" />
        </Schema>

        <button className="btn btn-primary" onClick={this.submitForm}>Submit</button>
      </Form>
    )
  }
}

require('../src/css/default.scss');
React.render(<Basic />, document.getElementById('react'));
