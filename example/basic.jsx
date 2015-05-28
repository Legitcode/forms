"use strict";

import React from 'react';
import Form from '../lib/form';
import Schema from '../lib/schema';
import List from '../lib/list';
import Property from '../lib/property';

export default class Basic extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(newValue) {
    console.log(newValue);
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
            inputClass="form-control" />

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
      </Form>
    )
  }
}

require('./css/styles.scss');
React.render(<Basic />, document.getElementById('react'));
