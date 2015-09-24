import React from 'react';
import { Property } from '../src/forms';

export default class Solo extends React.Component {
  render() {
    return (
      <Property
        inputType="select"
        name="title"
        label="Title"
        options={[
          { value: "1", displayValue: "Mr" },
          { value: "2", displayValue: "Mrs" }
        ]}
        value="1"
      />
    );
  }
}

require('../src/css/default.scss');
React.render(<Solo />, document.getElementById('react'));
