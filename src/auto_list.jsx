import React from 'react';
import AutoListItem from './list/auto_list_item';
import Property from './property';
import _ from 'underscore';

export default class AutoList extends React.Component {
  static propTypes = {
    removeButton: React.PropTypes.object,
    addButton: React.PropTypes.object,
    rowClass: React.PropTypes.string
  }

  static defaultProps = {
    removeButton: <a href="#" dangerouslySetInnerHTML={{__html: '&times;'}}></a>,
    addButton: <a href="#" dangerouslySetInnerHTML={{__html: '&plus;'}}></a>,
    rowClass: "row"
  }

  generateChildren() {
    let { listItems } = this.props,
        children;

    if (listItems) {
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
    let headerItems = _.map(this.props.formAttrs, (value, key) => {
      return (
        <li
          className={this.props.headerItemClass}
          key={key}
        >
          {value.label}
        </li>
      )
    });

    return (
      <ul className={this.props.headerClass}>
        { headerItems }
      </ul>
    )
  }

  addChild = (ev) => {
    this.props.addChildToList(this.props.name);
  }

  render() {
    let addButton = React.cloneElement(this.props.addButton, {
      onClick: this.addChild
    });

    let children = this.generateChildren(),
        header,
        heading;
      
    if (this.props.header) header = this.generateHeader();
    if (this.props.heading) heading = <h4>{this.props.heading}</h4>;

    return (
      <div className={this.props.listClass}>
        { heading }
        { header }
        { children }
        { addButton }
      </div>
    );
  }
}

