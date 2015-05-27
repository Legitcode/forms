"use strict";

import React from 'react';
import Collection from './utils/collection';

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.childCount = 0;
  }

  componentDidMount() {
    if (this.props.onChange) {
      this.props.onChange({
        children: [this.createChild()]
      });
    } else {
      this.setState({
        children: [this.createChild()]
      });
    }
  }

  createChild() {
    this.childCount += 1;
    let removeButton = React.cloneElement(this.props.removeButton, {
      value: this.childCount,
      onClick: this.removeChild.bind(this)
    });

    return (
      <div
        key={`listItem-${this.childCount}`}
        className={this.props.rowClass}>
        { this.props.children }
        { removeButton }
      </div>
    )
  }

  addChild() {
    if (this.props.onChange) {
      this.props.onChange({
        children: [...this.state.children, this.createChild()]
      });
    } else {
      this.setState({
        children: [...this.state.children, this.createChild()]
      });
    }
  }

  findChild(nodeValue) {
    let buttons = this.state.children.map((item)=> {
      return item.props.children[1].props.value;
    });

    return Collection.find(buttons, nodeValue);
  }

  removeChild(ev) {
    ev.preventDefault();
    let nodeValue = parseInt(ev.currentTarget.attributes.value.value);
    let idx = this.findChild(nodeValue);

    this.state.children.splice(idx, 1);

    if (this.props.onChange) {
      this.props.onChange({
        children: this.state.children
      });
    } else {
      this.setState({
        children: this.state.children
      });
    }
  }

  render() {
    let addButton = React.cloneElement(this.props.addButton, {
      ref: "addButton",
      onClick: this.addChild.bind(this)
    });

    return (
      <div className={this.props.classes}>
        { this.state ? this.state.children : null }
        { addButton }
      </div>
    )
  }
}

List.defaultProps = {
  removeButton: ( <a href="javascript:void(0)" dangerouslySetInnerHTML={{__html: '&times;'}}></a> ),
  addButton: ( <a href="javascript:void(0)" dangerouslySetInnerHTML={{__html: '&plus;'}}></a> ),
  rowClass: "row"
}
