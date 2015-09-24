import React from 'react';
import { Form, Schema, List, Property } from '../src/forms';

export default class Basic extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange(formAttrs) {
    console.log(formAttrs);
  }

  onBlur(formAttrs) {
    console.log(formAttrs);
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
        <Schema ref="schema"
          submitButton={submitButton}>

          <Property
            ref="title"
            inputType="select"
            name="title"
            label="Title"
            options={[
              { value: "1", displayValue: "Mr" },
              { value: "2", displayValue: "Mrs" }
            ]}
            value="1"
          />

          <Property
            ref="name"
            inputType="autosize"
            name="name"
            label="Name"
            placeholder="John Doe"
            containerClass="form-group"
            inputClass="form-control"
            validation={function(value) { return value.length > 0 }}
            errorMessage="Name is required"
          />

          <List
            ref="phone"
            name="phone"
            rowClass="my-row"
            addButton={addButton}
            removeButton={removeButton}>

            <Property
              inputType="Phone"
              name="phone"
              label="Phone Number"
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
