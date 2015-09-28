import React from 'react';
import { Form } from '../src/forms';

var defaultData = {
  resourceName: "tests",
  id: "foo",
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
      inputClass: "foo",
      errorMessage: "Title is required",
      validation: "value.length > 0"
    },
    search: {
      label: "Search Example",
      inputType: "select",
      options: [{"value":40,"displayValue":"Briess2-RowBrewersMalt","detail":"5,205 Pounds on hand."},{"value":40,"displayValue":"Briess Chocolate Malt","detail":"380 Pounds on hand."},{"value":40,"displayValue":"Briess Goldpils Vienna","detail":"184 Pounds on hand."},{"value":40,"displayValue":"Briess Caramel 10","detail":"400 Pounds on hand."},{"value":40,"displayValue":"Briess 2-Row Brewers Malt","detail":"5,000 Pounds on hand."},{"value":3,"displayValue":"Briess Pilsen Malt","detail":"Not in stock"},{"value":2,"displayValue":"Briess 6-Row Brewers Malt","detail":"Not in stock"},{"value":4,"displayValue":"Briess Pale Ale Malt","detail":"Not in stock"},{"value":38,"displayValue":"Briess Caramel 40","detail":"Not in stock"}],
      value: null,
      placeholder: "Type to search...",
      inputClass: "foo",
      searchable: true
    },
    name: {
      label: "Name",
      inputType: "text",
      errorMessage: "Name is required",
      validation: "value.length > 0",
      value: "",
      postLabel: "Foo",
      postLabelClass: "Bar"
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
    married: {
      label: "Married",
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

  onSubmit = (formValues) => {
    console.log(formValues);
  }

  onBlur = (formValues) => {
    console.log(formValues);
  }

  onChange = (formValues) => {
    console.log(formValues);
  }

  clearForm = () => {
    this.refs.form.resetForm();
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
      <div>
        <Form
          ref='form'
          autoGenerate={true}
          attributes={this.props}
          addButton={addButton}
          removeButton={removeButton}
          onSubmit={this.onSubmit}
          onBlur={this.onBlur}
          onChange={this.onChange}
          submitButton={submitButton}
        />

        <button onClick={this.clearForm}>Clear Form</button>
      </div>
    )
  }
}

require('../src/css/default.scss');
React.render(<AutoGenerate {...defaultData} />, document.getElementById('react'));
