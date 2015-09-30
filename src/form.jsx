import React from 'react'
import AutoSchema from './auto_schema'
import Schema from './schema'
import FormFlux from './flux'
import AltContainer from 'alt/AltContainer'

const formActions = FormFlux.actions.FormActions,
      formStore = FormFlux.stores.FormStore

export default class Form extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func,
    onChange: React.PropTypes.func,
    submitButton: React.PropTypes.object,
    noSubmit: React.PropTypes.bool
  }

  static defaultProps = {
    submitButton: <button>Submit</button>,
    noSubmit: false,
    className: ""
  }

  componentWillMount() {
    formActions.setInitialState(this.props)
  }

  componentWillReceiveProps(nextProps) {
    formActions.setInitialState(nextProps)
  }

  onBlur = (ev, attrs) => {
    if (this.props.onBlur) {
      this.props.onBlur(formStore.serialize())
    }
  }

  onChange = (ev, attrs) => {
    if (this.props.onChange) {
      this.props.onChange(formStore.serialize())
    }
  }

  submitForm = () => {
    this.props.onSubmit(formStore.serialize())
  }

  resetForm = () => {
    formActions.setInitialState(this.props)
  }

  render() {
    let schema

    if (this.props.autoGenerate) {
      schema = (
        <AutoSchema
          addButton={this.props.addButton}
          removeButton={this.props.removeButton}
          onChange={this.onChange}
          onBlur={this.onBlur}
          noSubmit={this.props.noSubmit}
          submitButton={this.props.submitButton}
          submitForm={this.submitForm}
          className={this.props.className}
        />
      )
    } else {
      schema = React.cloneElement(this.props.children, {
        submitForm: this.submitForm
      })
    }

    return (
      <AltContainer flux={FormFlux} > 
        { schema }
      </AltContainer>
    )
  }
}
