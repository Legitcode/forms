import React from 'react';
import Property from '../property';
import FormActions from '../form_actions';
import _ from 'underscore';

export default class AutoListItem extends React.Component {

  removeChild = (ev) => {
    FormActions.removeChildFromList({ listId: this.props.name, itemIndex: this.props.itemIndex });
  }
  
  render() {
    let children,
        { properties, name, rowClass } = this.props,
        removeButton = React.cloneElement(this.props.removeButton, {
          onClick: this.removeChild
        });

    children = _.map(properties, (value, key) => {
      return React.createElement(Property, {
        ...this.props,
        ...value,
        key: key,
        name: key,
        onBlur: this.props.onBlur,
        onChange: this.props.onChange,
        hideLabel: this.props.header
      });
    });

    return (
      <div key={name} name={name} className={rowClass}>
        { children }
        { removeButton }
      </div>
    );
  }
}
