"use strict";

import React from 'react';
import _ from 'underscore';

export default class SelectInput extends React.Component {
  constructor(props) {
    super(props);

    this.debouncedSearch = _.debounce(this.getNewValues, 500);

    this.state = { isOpen: false }
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

    this.mounted = true;
  }

  componentWillUnmount() {
    document.removeEventListener("click");
    React.findDOMNode(this.refs.selected).removeEventListener("click");
    React.findDOMNode(this.refs.arrow).removeEventListener("click");

    this.mounted = false;
  }

  getNewValues() {
    if (this.mounted) {
      this.setState({ inputState: "select-face" });
    }
  }

  toggleDropDown = (ev) => {
    if (this.mounted) {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }

  openDropDown = (ev) => {
    if (this.mounted) {
      this.setState({ isOpen: true });
    }
  }

  closeDropDown = (ev) => {
    if (this.mounted) {
      this.setState({ isOpen: false });
    }
  }

  changeSelected = (event) => {
    let valueElement = event.currentTarget;
    let selectedValue = valueElement.attributes.value.value;
    let selectedDisplay = valueElement.querySelector(".option").innerHTML;

    React.findDOMNode(this.refs.selected).value = selectedDisplay;
    React.findDOMNode(this.refs.valueInput).value = selectedValue;
    this.toggleDropDown(event);
    this.onChange(event);
  }

  onChange(ev) {
    this.props.onChange(ev, this.value());
  }

  value() {
    return React.findDOMNode(this.refs.valueInput).value;
  }

  displayValue() {
    return React.findDOMNode(this.refs.selected).value;
  }

  render() {
    let showOptions = `option-box ${this.state.isOpen ? 'open' : null}`,
        inputState = `select-face ${this.state.isOpen ? 'open' : null}`;

    let options = this.props.options.map((option)=> {
      return (
        <a href={option.url}
          key={`selectOption-${option.value}`}
          onClick={this.changeSelected}
          className="select-option"
          value={option.value}>
          <span className="option">{option.displayValue}</span>

          {
            option.detail ?
              <span className="option-detail">{option.detail}</span>
            :
              null
          }
        </a>
      )
    });

    let inputValue = _.find(this.props.options, (option) => {
      return option.value == this.props.selected;
    });

    inputValue = inputValue ? inputValue.displayValue : '';

    let input = this.props.editable ?
        <input
          ref="selected"
          type="text"
          className={inputState}
          defaultValue={inputValue}
          placeholder={this.props.placeholder}
          onClick={this.toggleDropDown}
          onChange={this.debouncedSearch} />

      :
        <input
          ref="selected"
          type="text"
          className={inputState}
          defaultValue={inputValue}
          placeholder={this.props.placeholder}
          onClick={this.toggleDropDown}
          readOnly />

        let inputClass = `select ${this.props.classes}`

    return (
      <div className={inputClass}>
        <span className="arrow" ref="arrow"></span>
        <input name={this.props.name} type="hidden" ref="valueInput" value={this.props.selected}/>
        { input }
        <div className={showOptions}>
          { options }
        </div>
      </div>
    )
  }
}
