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

  keyPressed = (ev) => {
    if (!ev) return;

    let { keyCode, nativeEvent } = ev;

    if (keyCode === 13 || (nativeEvent && nativeEvent.keyCode === 13)) {
      this.onBlur(ev);
    }
  }

  onChange = (ev) => {
    this.props.onChange(ev, this.value());
  }

  onBlur = (ev) => {
    this.props.onBlur(ev, this.value());
  }
}
