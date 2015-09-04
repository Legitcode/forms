import React from 'react';
import ListItem from './list/list_item';
import Property from './property';
import _ from 'underscore';
import Obj from './utils/obj';

export default class List extends React.Component {
  static defaultProps = {
    onChange: function(ev, value) {
      console.log(value);
    },
    onBlur: function(ev, value) {
      console.log(value);
    },
    onListChange: function(ev, value) {
      console.log(value);
    },
    removeButton: ( <a href="javascript:void(0)" dangerouslySetInnerHTML={{__html: '&times;'}}></a> ),
    addButton: ( <a href="javascript:void(0)" dangerouslySetInnerHTML={{__html: '&plus;'}}></a> ),
    rowClass: "row"
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

  valid() {
    let valid = true;

    Object.keys(this.refs).forEach((refKey) => {
      if (refKey != "addButton") {
        if (!this.refs[refKey].valid()) {
          this.refs[refKey].addErrors();
          valid = false;
        }
      }
    });

    return valid;
  }


  addChild = (ev) => {
    this.props.addChildToList(this.props.name);
  }

  generateChildren() {
    let listItems = this.props.listItems,
        children = null;

    if (listItems) {
      let items = _.compact(listItems);

      children = listItems.map((item, index) => {
        return React.createElement(AutoListItem, {
          ...this.props,
          key: `listItem-${index}`,
          itemIndex: index,
          properties: item,
          onChange: this.props.onChange,
          onBlur: this.props.onBlur
        });
      });
    }

    return children;
  }

  generateHeader() {
    let headerItems = Object.keys(this.props.formAttrs).map((key) => {
      return (
        <li
          className={this.props.headerItemClass}
          key={key}
        >
          {this.props.formAttrs[key].label}
        </li>
      )
    });

    return (
      <ul className={this.props.headerClass}>
        { headerItems }
      </ul>
    )
  }

  render() {
    let addButton = React.cloneElement(this.props.addButton, {
      ref: "addButton",
      onClick: this.addChild
    });

    let children = this.generateChildren(),
        header = null,
        heading = null;

    if (this.props.header) {
      header = this.generateHeader();
    }

    if (this.props.heading) {
      heading = <h4>{this.props.heading}</h4>;
    }

    return (
      <div className={this.props.classes}>
        { heading }
        { header }
        { children }
        { addButton }
      </div>
    )
  }
}
