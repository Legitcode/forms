"use strict";

import React from 'react';
import _ from 'underscore';
import { Form } from '../src/forms';

var defaultData = {
  containerClass: "form-group",
  inputClass: "form-control",
  formAttrs: {
    id: {
      type: "hidden",
      value: "1"
    },
    title: {
      label: "Title",
      type: "select",
      options: [
        { value: "1", displayValue: "Mr", detail: "Little things" },
        { value: "2", displayValue: "Mrs" },
        { value: "3", displayValue: "Ms" }
      ],
      value: null,
      placeholder: "Select one...",
      inputClass: "foo"
    },
    search: {
      label: "Search Example",
      type: "select",
      options: [{}],
      editable: true,
      value: null,
      placeholder: "Type to search...",
      inputClass: "foo"
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
      header: true,
      heading: "Phone Numbers",
      headerClass: "list-header",
      headerItemClass: "list-header-item",
      containerClass: "form-group inline",
      listClass: "list-group",
      formAttrs: {
        phone: {
          label: "Phone Number",
          type: "phone",
          value: ""
        },
        number: {
          label: "Number",
          type: "text",
          value: ""
        },
        thing: {
          label: "Thing",
          type: "select",
          options: [
            { value: "1", displayValue: "1" },
            { value: "2", displayValue: "2" }
          ],
          inputClass: "foo",
          value: "1"
        }
      },
      listItems: [
        {
          'phone-0': {
            label: "Phone Number",
            type: "phone",
            value: "123"
          },
          'number-0': {
            label: "Number",
            type: "text",
            value: "456"
          },
          'thing-0': {
            label: "Thing",
            type: "select",
            options: [
              { value: "1", displayValue: "1" },
              { value: "2", displayValue: "2" }
            ],
            inputClass: "foo",
            value: "1"
          }
        },
        {
          'phone-1': {
            label: "Phone Number",
            type: "phone",
            value: "123"
          },
          'number-1': {
            label: "Number",
            type: "text",
            value: "456"
          },
          'thing-1': {
            label: "Thing",
            type: "select",
            options: [
              { value: "1", displayValue: "1" },
              { value: "2", displayValue: "2" }
            ],
            inputClass: "foo",
            value: "1"
          }
        }
      ]
    },
    'list-1': {
      rowClass: "my-row clearfix",
      name: "Foo",
      listClass: "list-group",
      heading: "Stuff",
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
    },
    notes: {
      label: "Notes",
      type: "textarea"
    },
    valid: {
      label: "Valid",
      type: "checkbox",
      inputClass: "foo",
      value: true
    },
    date: {
      label: "Date",
      type: "date",
      value: "06-17-2015"
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
      />
    )
  }
}

require('../src/css/default.scss');
React.render(<AutoGenerate />, document.getElementById('react'));
