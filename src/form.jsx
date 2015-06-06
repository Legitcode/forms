"use strict";

import React from 'react';
import Schema from './schema';
import _ from 'underscore';
import underscoreDeepExtend from 'underscore-deep-extend';

_.mixin({deepExtend: underscoreDeepExtend(_)});

export default class Form extends React.Component {
  static defaultProps = {
    onChange: function(ev, value) {
      console.log(value);
    },
    onBlur: function(ev, value) {
      console.log(value);
    },
    submitButton: <button>Submit</button>
  }

  constructor(props) {
    super(props);

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
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

  onBlur(ev, attributes, listKey) {
    let mergedProps = _.clone(this.props.attributes);

    if (ev == "deleteListItem") {
      mergedProps.formAttrs[listKey].listItems = attributes.formAttrs[listKey].listItems;
    } else {
      mergedProps = _.deepExtend(mergedProps, attributes);
    }

    this.props.onBlur(ev, mergedProps);
  }

  onChange(ev, attributes, listKey) {
    let mergedProps = _.clone(this.props.attributes);

    if (ev == "deleteListItem") {
      mergedProps.formAttrs[listKey].listItems = attributes.formAttrs[listKey].listItems;
    } else {
      mergedProps = _.deepExtend(mergedProps, attributes);
    }

    this.props.onChange(ev, mergedProps);
  }

  serialize() {
    if (this.refs.schema.validate()) {
      return this.refs.schema.serialize();
    }
  }

  submitForm() {
    if (this.refs.schema.validate()) {
      this.props.onSubmit(this.refs.schema.serialize());
    }
  }

  render() {
    let children = null;

    if (this.props.autoGenerate) {
      children = (
        <Schema
          ref="schema"
          autoGenerate={true}
          attributes={this.props.attributes}
          addButton={this.props.addButton}
          removeButton={this.props.removeButton}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
      );
    } else {
      children = React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {
          ref: "schema"
        });
      });
    }

    let submitButton = React.cloneElement(this.props.submitButton, {
      onClick: this.submitForm
    });

    return (
      <div className={this.props.classes}>
        { children }
        { this.props.noSubmit ? null : submitButton }
      </div>
    )
  }
}
