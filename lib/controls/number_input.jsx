"use strict";

import React from 'react';

export default class NumberInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        type="number"
        ref={this.props.name}
        name={this.props.name}
        defaultValue={this.props.value} />
    )
  }
}
