"use strict";

import React from 'react';
import _ from 'underscore';
import underscoreDeepExtend from 'underscore-deep-extend';
import { Form, Schema, List, Property } from '../src/forms';

_.mixin({deepExtend: underscoreDeepExtend(_)});

export default class Basic extends React.Component {
  constructor(props) {
    super(props);

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onListChange = this.onListChange.bind(this);

    this.state = {};
  }

  onChange(ev, attributes) {
    this.setState(attributes);
  }

  onListChange(ev, attributes) {
    this.setState({
      listItems: attributes
    });
  };

  onBlur(ev, attributes) {
    this.setState(attributes);
  }

  onSubmit(formValues) {
    console.log(formValues);
  }

  render() {
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

    let submitButton = (
      <button className="btn btn-primary">Submit</button>
    );

    return (
      <Form onChange={this.onChange}
            onBlur={this.onBlur}
            onSubmit={this.onSubmit}
            submitButton={submitButton}>
        <Schema ref="schema">
          <Property
            inputType="select"
            name="title"
            label="Title"
            onChange={this.onChange}
            options={[
              { value: "1", displayValue: "Mr" },
              { value: "2", displayValue: "Mrs" }
            ]}
            value="1"
            isOpen={this.state.title ? this.state.title.isOpen : false}
          />

          <Property
            inputType="autosize"
            name="name"
            label="Name"
            onBlur={this.onBlur}
            onChange={this.onChange}
            placeholder="John Doe"
            containerClass="form-group"
            inputClass="form-control"
            validation={function(value) { return value.length > 0 }}
            errorMessage="Name is required"
            invalid={this.state.name ? this.state.name.invalid : false}
          />

          <List
            name="phone"
            rowClass="my-row"
            addButton={addButton}
            removeButton={removeButton}
            onListChange={this.onListChange}
            listItems={this.state.listItems}>

            <Property
              inputType="Phone"
              name="phone"
              label="Phone Number"
              onBlur={this.onBlur}
              onChange={this.onChange}
              placeholder="555-555-5555"
              inputClass="form-control"
              containerClass="form-group"
            />
          </List>
        </Schema>
      </Form>
    )
  }
}

require('../src/css/default.scss');
React.render(<Basic />, document.getElementById('react'));
