"use strict";

import React from 'react';
import _ from 'underscore';

export default class BaseInput extends React.Component {
  static defaultProps = {
    onChange: function(ev, value) {
      console.log(value);
    },
    onBlur: function(ev, value) {
      console.log(value);
    }
  }

  constructor(props) {
    super(props);

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.debouncedChange = _.debounce(this.onChange, 500);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let stateChanged = false;

    Object.keys(this.props).forEach((key) => {
      if (this.props[key] != nextProps[key]) {
        stateChanged = true;
      }
    });

    return stateChanged;
  }

  value() {
    return React.findDOMNode(this.refs[this.props.name]).value;
  }

  serialize() {
    let formValue = {};
    formValue['value'] = this.value();
    return formValue;
  }

  onChange(ev) {
    this.props.onChange(ev, this.serialize());
  }

  onBlur(ev) {
    this.props.onBlur(ev, this.serialize());
  }
}
