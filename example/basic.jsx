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

  onChange() {
    console.log("FOO!");
  }

  render() {
    return (
      <Form>
        <Schema ref="schema">
          <Property
            onChange={this.onChange}
            name="title"
            label="Title"
            inputType="select"
            options={["Mr", "Mrs", "Ms"]}
            containerClass="form-group"
            inputClass="form-control" />

          <Property
            onChange={this.onChange}
            label="Name"
            name="name"
            inputType="text"
            containerClass="form-group"
            inputClass="form-control" />

          <List>
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

console.log(document.getElementById('react'));
React.render(<Basic />, document.getElementById('react'));
