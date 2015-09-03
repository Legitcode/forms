"use strict";

import React from 'react';
import _ from 'underscore';
import underscoreDeepExtend from 'underscore-deep-extend';
import { AutoForm } from '../src/forms';

_.mixin({deepExtend: underscoreDeepExtend(_)});

var defaultData = {
  containerClass: "form-group",
  inputClass: "form-control",
  formAttrs: {
    id: {
      inputType: "hidden",
      value: "1"
    },
    title: {
      label: "Title",
      inputType: "select",
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
      inputType: "select",
      options: [{}],
      editable: true,
      value: null,
      placeholder: "Type to search...",
      inputClass: "foo"
    },
    name: {
      label: "Name",
      inputType: "text",
      errorMessage: "Name is required",
      validation: "value.length > 0",
      value: ""
    },
    'list-0': {
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
          inputType: "phone",
          value: ""
        },
        number: {
          label: "Number",
          inputType: "text",
          value: ""
        },
        thing: {
          label: "Thing",
          inputType: "select",
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
            inputType: "phone",
            value: "123"
          },
          'number-0': {
            label: "Number",
            inputType: "text",
            value: "456"
          },
          'thing-0': {
            label: "Thing",
            inputType: "select",
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
            inputType: "phone",
            value: "999"
          },
          'number-1': {
            label: "Number",
            inputType: "text",
            value: "20"
          },
          'thing-1': {
            label: "Thing",
            inputType: "select",
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
          inputType: "text",
          value: ""
        }
      },
      listItems: []
    },
    address: {
      label: "Street Address",
      inputType: "text",
      value: ""
    },
    age: {
      label: "Age",
      inputType: "number",
      errorMessage: "Age must be a positive number",
      validation: "parseInt(value) >= 0",
      value: ""
    },
    email: {
      label: "Email Address",
      inputType: "email",
      errorMessage: "Must be a valid email address",
      validation: "value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$/i)",
      value: ""
    },
    notes: {
      label: "Notes",
      inputType: "textarea"
    },
    valid: {
      label: "Valid",
      inputType: "checkbox",
      inputClass: "foo",
      value: true
    },
    date: {
      label: "Date",
      inputType: "date",
      value: "06-17-2015"
    }
  }
}

export default class AutoGenerate extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = (ev, attributes) => {
    console.log(attributes);
  }

  onBlur = (ev, attributes) => {
    console.log(attributes);
  }

  onSubmit = (formValues) => {
    console.log(formValues);
  }

  render() {
    let addButton = (
      <a href="#"
        dangerouslySetInnerHTML={{__html: '&plus;'}}
        className="btn btn-success">
      </a>
    );

    let removeButton = (
      <a href="#"
         dangerouslySetInnerHTML={{__html: '&times;'}}
         className="btn btn-danger pad-left">
      </a>
    );

    let submitButton = (
      <button className="btn btn-primary">Submit</button>
    );

    return (
      <AutoForm
        attributes={this.props}
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
React.render(<AutoGenerate {...defaultData} />, document.getElementById('react'));
