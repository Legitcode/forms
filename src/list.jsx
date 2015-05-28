"use strict";

import React from 'react';
import ListItem from './list/list_item';
import Collection from './utils/collection';

export default class List extends React.Component {
  static defaultProps = {
    removeButton: ( <a href="javascript:void(0)" dangerouslySetInnerHTML={{__html: '&times;'}}></a> ),
    addButton: ( <a href="javascript:void(0)" dangerouslySetInnerHTML={{__html: '&plus;'}}></a> ),
    rowClass: "row"
  }

  constructor(props) {
    super(props);

    this.childCount = 0;
    this.removeChild = this.removeChild.bind(this);
    this.addChild = this.addChild.bind(this);
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

  valid() {
    let valid = true;

    Object.keys(this.refs).forEach((refKey)=> {
      if (refKey != "addButton") {
        if (!this.refs[refKey].valid()) {
          valid = false;
        }
      }
    });

    return valid;
  }

  serialize() {
    return Object.keys(this.refs).map((refKey)=> {
      if (refKey.match(/-[0-9]{1,100}/)) {
        return this.refs[refKey].serialize();
      }
    });
  }

  createChild() {
    this.childCount += 1;
    let removeButton = React.cloneElement(this.props.removeButton, {
      value: this.childCount,
      onClick: this.removeChild
    });

    let children = React.Children.map(this.props.children, (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      return React.cloneElement(child, {
        name: `${child.props.name}-${this.childCount}`
      });
    });

    return React.createElement(ListItem, {
      name: `listItem-${this.childCount}`,
      className: this.props.rowClass,
      children: children,
      removeButton: removeButton
    });
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
      return item.props.removeButton.props.value;
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
        children: this.state.children,
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
      onClick: this.addChild
    });

    let children = null;

    if (this.state) {
      children = React.Children.map(this.state.children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        return React.cloneElement(child, {
          ref: `${child.props.name}-${this.childCount}`
        });
      });
    }

    return (
      <div className={this.props.classes}>
        { children }
        { addButton }
      </div>
    )
  }
}
