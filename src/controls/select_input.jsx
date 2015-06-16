"use strict";

import React from 'react';
import _ from 'underscore';

export default class SelectInput extends React.Component {
  constructor(props) {
    super(props);

    this.isOpen = this.props.isOpen;
    this.debouncedSearch = _.debounce(this.getNewValues, 500);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
    this.onChange = this.onChange.bind(this);
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

  componentDidMount() {
    document.addEventListener("click", (ev) => {
      ev.stopPropagation();
      this.closeDropDown(ev);
    });

    React.findDOMNode(this.refs.selected).addEventListener("click", (ev) => {
      ev.stopPropagation();
      this.toggleDropDown(ev);
    });

    React.findDOMNode(this.refs.arrow).addEventListener("click", (ev) => {
      ev.stopPropagation();
      this.toggleDropDown(ev);
    });
  }

  componentWillUnmount() {
    document.removeEventListener("click");
    React.findDOMNode(this.refs.selected).removeEventListener("click");
    React.findDOMNode(this.refs.arrow).removeEventListener("click");
  }

  getNewValues() {
    this.setState({ inputState: "select-face" });
    this.props.onChange(React.findDOMNode(this.refs.selected).value);
  }

  toggleDropDown(ev) {
    this.isOpen = !this.isOpen;
    this.onChange(ev, this.serialize());
  }

  openDropDown(ev) {
    this.isOpen = true;
    this.onChange(ev, this.serialize());
  }

  closeDropDown(ev) {
    if (this.isOpen) {
      this.isOpen = false;
      this.onChange(ev, this.serialize());
    }
  }

  changeSelected(event) {
    let valueElement = event.target;
    let selectedValue = valueElement.attributes.value.value;
    let selectedDisplay = valueElement.innerHTML;

    React.findDOMNode(this.refs.selected).value = selectedDisplay;
    React.findDOMNode(this.refs.valueInput).value = selectedValue;
    this.toggleDropDown(event);
  }

  serialize() {
    let formValue = {}
    formValue["value"] = this.value();
    formValue["displayValue"] = this.displayValue();
    formValue["isOpen"] = this.isOpen;
    return formValue;
  }

  onChange(ev) {
    this.props.onChange(ev, this.serialize());
  }

  value() {
    if (this.refs.valueInput) {
      return React.findDOMNode(this.refs.valueInput).value;
    } else {
      return null;
    }
  }

  displayValue() {
    if (this.refs.selected) {
      return React.findDOMNode(this.refs.selected).value;
    } else {
      return null;
    }
  }

  render() {
    let showOptions = null,
        inputState = null;

    if (this.props.isOpen) {
      showOptions = "option-box open";
      inputState = "select-face open";
    } else {
      showOptions = "option-box";
      inputState = "select-face";
    }

    let options = this.props.options.map((option)=> {
      return (
        <a href={option.url}
          key={`selectOption-${option.value}`}
          onClick={this.changeSelected}
          className="select-option"
          value={option.value} >
          {option.displayValue}
        </a>
      )
    });

    let inputValue = _.find(this.props.options, (option) => {
      return option.value == this.props.selected;
    }).displayValue;

    let input = this.props.editable ?
        <input
          ref="selected"
          type="text"
          className={inputState}
          defaultValue={inputValue}
          placeholder={this.props.placeholder}
          onClick={this.toggleDropDown}
          onChange={this.debouncedSearch.bind(this)} />

      :
        <input
          ref="selected"
          type="text"
          className={inputState}
          defaultValue={inputValue}
          placeholder={this.props.placeholder}
          onClick={this.toggleDropDown}
          readOnly />

    return (
      <div className="select">
        <span className="arrow" ref="arrow"></span>
        <input type="hidden" ref="valueInput" value={this.props.selected}/>
        { input }
        <div className={showOptions}>
          { options }
        </div>
      </div>
    )
  }
}
