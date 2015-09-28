import React from 'react';
import _ from 'underscore';

export default class SelectInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      isOpen: false,
      filteredOptions: props.options
    };
  }

  componentWillMount() {
    let selected = _.find(this.props.options, (option) => option.value.toString() === (this.props.value ? this.props.value.toString() : ""));
    let displayValue = selected ? selected.displayValue : null
    this.setState({ displayValue: displayValue });
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
    document.removeEventListener("click", () => {});
    React.findDOMNode(this.refs.selected).removeEventListener("click", () => {});
    React.findDOMNode(this.refs.arrow).removeEventListener("click", () => {});
    this.mounted = false;
  }

  getNewValues = (ev) => {
    if (this.mounted) {
      let value = ev.target.value,
          regex = new RegExp(value, 'i'),
          values = _.select(this.props.options, (v) => {
            return v.displayValue.match(regex);
          }); 

      this.setState({ filteredOptions: values });
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
    let valueElement = event.currentTarget,
        selectedValue = valueElement.attributes.value.value,
        innerHTML = valueElement.firstChild.innerHTML;

    this.setState({ displayValue: innerHTML.toString() });
    this.toggleDropDown(event);
    this.onChange(event, selectedValue);
  }

  onChange(ev, value) {
    this.props.onChange(ev, value);
  }

  value() {
    return React.findDOMNode(this.refs.valueInput).value;
  }

  displayValue() {
    return React.findDOMNode(this.refs.selected).value;
  }

  renderOptions = () => {
    return this.state.filteredOptions.map((option)=> {
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
  }

  render() {
    let showOptions = `option-box ${this.state.isOpen ? 'open' : null}`,
        inputState = `select-face ${this.state.isOpen ? 'open' : null}`;

    let input = this.props.searchable ?
        <input
          ref="selected"
          type="text"
          className={inputState}
          value={this.state.displayValue}
          placeholder={this.props.placeholder}
          onClick={this.toggleDropDown}
          onKeyUp={this.getNewValues} />

      :
        <input
          ref="selected"
          type="text"
          className={inputState}
          value={this.state.displayValue}
          placeholder={this.props.placeholder}
          onClick={this.toggleDropDown}
          readOnly />

    let inputClass = `select ${this.props.inputClass}`

    return (
      <div className={inputClass}>
        <span className="arrow" ref="arrow"></span>
        <input name={this.props.name} type="hidden" ref="valueInput" value={this.props.value}/>
        { input }
        <div className={showOptions}>
          { this.renderOptions() }
        </div>
      </div>
    )
  }
}
