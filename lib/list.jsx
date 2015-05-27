"use strict";

import React from 'react';

export default class List extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      children: [this.createChild()]
    });
  }

  childCount() {
    this.state ? this.state.children.length() : 1
  }

  listElements() {
    items = []

    this.props.children.forEach((child) => {
      items.push(child);
    });

    items.push(this.props.removeButton);

    return items;
  }

  createChild() {
    return (
      <div key="foo" className={this.props.rowClass}>
        { this.props.children }
        { this.props.removeButton }
      </div>
    )
  }

  addChild() {
    this.setState({
      children: this.state.children.push(this.createChild())
    });
  }

  removeChild(ev) {
    let node = React.findDOMNode(ev.target);

    this.setState({
      children: this.state.children.splice(1, ev.target.index)
    });
  }

  render() {
    return (
      <div className={this.props.classes}>
        { this.state ? this.state.children : null }
        { this.props.addButton }
      </div>
    )
  }
}

List.defaultProps = {
  removeButton: ( <a href="javascript:void(0)">&times;</a> ),
  rowClass: "row"
}
