"use strict";

import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.classes}>
        { this.props.children }
      </div>
    )
  }
}
