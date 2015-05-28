"use strict";

import React from 'react';
import debounce from 'debounce';

export default class SelectInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.selected,
      showOptions: "option-box",
      inputState: "select-face"
    };

    this.isOpen = false;
    this.debouncedSearch = debounce(this.getNewValues, 500);
    this.toggleDropDown = this.toggleDropDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", (ev) => {
      this.closeDropDown();
    });

    React.findDOMNode(this.refs.selected).addEventListener("click", (ev) => {
      ev.stopPropagation();
      this.openDropDown();
    })
  }

  getNewValues() {
    this.setState({ inputState: "select-face" });
    this.props.onChange(React.findDOMNode(this.refs.selected).value);
  }

  toggleDropDown() {
    this.isOpen = !this.isOpen;
    this.setDropDownState();
  }

  openDropDown() {
    this.isOpen = true;
    this.setDropDownState();
  }

  closeDropDown() {
    this.isOpen = false;
    this.setDropDownState();
  }

  setDropDownState() {
    this.setState({
      showOptions: this.isOpen ? "option-box open" : "option-box",
      inputState: this.isOpen ? "select-face open" : "select-face"
    });
  }

  changeSelected(event) {
    let valueElement = event.target.firstChild;
    let selectedValue = valueElement.attributes.value.value;
    let selectedDisplay = valueElement.innerHTML;

    React.findDOMNode(this.refs.selected).value = selectedDisplay;
    React.findDOMNode(this.refs.valueInput).value = selectedValue;
    this.toggleDropDown();
    this.handleChanged();
  }

  serialize() {
    let formValue = {}
    formValue[this.props.name] = this.value();
    return formValue;
  }

  handleChanged() {
    this.props.onChange(this.serialize());
  }

  value() {
    return React.findDOMNode(this.refs.selected).value;
  }

  render() {
    let options = this.props.options.map((option)=> {
      return (
        <a href={option.url} key={`selectOption-${option.value}`} onClick={this.changeSelected.bind(this)} className="select-option">
          <span className="select-value" value={option.value}>{option.displayValue}</span>
        </a>
      )
    });

    let input = this.props.editable ?
        <input
          ref="selected"
          type="text"
          className={this.state.inputState}
          defaultValue={this.state.selected}
          placeholder={this.props.placeholder}
          onClick={this.toggleDropDown}
          onChange={this.debouncedSearch.bind(this)} />

      :
        <input
          ref="selected"
          type="text"
          className={this.state.inputState}
          defaultValue={this.state.selected}
          placeholder={this.props.placeholder}
          onClick={this.toggleDropDown}
          readOnly />

    return (
      <div className="select">
        <input type="hidden" ref="valueInput" />
        { input }
        <div className={this.state.showOptions}>
          { options }
        </div>
      </div>
    )
  }
}
