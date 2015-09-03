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

    this.debouncedChange = _.debounce(this.onChange, 500);
  }

  value() {
    return React.findDOMNode(this.refs[this.props.name]).value;
  }

  onChange = (ev) => {
    this.props.onChange(ev, this.value());
  }

  onBlur = (ev) => {
    this.props.onBlur(ev, this.value());
  }
}
