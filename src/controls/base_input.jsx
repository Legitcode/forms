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

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  value() {
    if (this.mounted) {
      return React.findDOMNode(this.refs[this.props.name]).value;
    } else {
      return null;
    }
  }

  onChange = (ev) => {
    this.props.onChange(ev, this.value());
  }

  onBlur = (ev) => {
    this.props.onBlur(ev, this.value());
  }
}
