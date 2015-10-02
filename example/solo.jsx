import React from 'react';
import { Property } from '../src/forms';

export default class Solo extends React.Component {
  constructor(props) {
    super(props)

    this.state = { value: "1" }
  }

  onChange = (ev, val) => {
    console.log(val)
    this.setState({ value: val.title })
  }

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
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}

require('../src/css/default.scss');
React.render(<Solo />, document.getElementById('react'));
