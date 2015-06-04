"use strict";

import React from 'react';
import _ from 'underscore';
import underscoreDeepExtend from 'underscore-deep-extend';
import { Form } from '../src/forms';

_.mixin({deepExtend: underscoreDeepExtend(_)});

var defaultData = {
  containerClass: "form-group",
  inputClass: "form-control",
  formAttrs: {
    title: {
      label: "Title",
      type: "select",
      options: [
        { value: "1", displayValue: "Mr" },
        { value: "2", displayValue: "Mrs" },
        { value: "3", displayValue: "Ms" }
      ],
      value: "3",
      placeholder: "Select one..."
    },
    name: {
      label: "Name",
      type: "text",
      errorMessage: "Name is required",
      validation: "value.length > 0",
      value: ""
    },
    list: {
      rowClass: "my-row clearfix",
      name: "phone",
      formAttrs: {
        phone: {
          label: "Phone Number",
          type: "phone",
          value: ""
        },
        numberType: {
          label: "Number Type",
          type: "text",
          value: ""
        }
      },
      // listItems: {
      //   0: {
      //     'phone-0': {
      //       label: "Phone Number",
      //       type: "phone",
      //       value: ""
      //     },
      //     'numberType-0': {
      //       label: "Number Type",
      //       type: "text",
      //       value: ""
      //     }
      //   }
      // }
    },
    'list-1': {
      rowClass: "my-row clearfix",
      name: "Foo",
      formAttrs: {
        me: {
          label: "Me",
          type: "text",
          value: ""
        }
      }
    },
    address: {
      label: "Street Address",
      type: "text",
      value: ""
    },
    age: {
      label: "Age",
      type: "number",
      errorMessage: "Age must be a positive number",
      validation: "parseInt(value) >= 0",
      value: ""
    },
    email: {
      label: "Email Address",
      type: "email",
      errorMessage: "Must be a valid email address",
      validation: "value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$/i)",
      value: ""
    }
  }
}

export default class AutoGenerate extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = defaultData;
  }

  onChange(ev, attributes) {
    this.setState(attributes);
  }

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
      <Form
        autoGenerate={true}
        attributes={this.state}
        addButton={addButton}
        removeButton={removeButton}
        onBlur={this.onBlur}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        submitButton={submitButton}
        noSubmit={true}
      />
    )
  }
}

require('../src/css/default.scss');
React.render(<AutoGenerate />, document.getElementById('react'));
