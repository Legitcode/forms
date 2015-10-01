import React from 'react'
import AutoSchema from './auto_schema'
import Schema from './schema'
import FormFlux from './flux'
import AltContainer from 'alt/AltContainer'


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

  constructor(props) {
    super(props)

    let flux = new FormFlux()
    this.formActions = flux.actions.formActions
    this.formStore = flux.stores.formStore
  }

  componentWillMount() {
    this.formActions.setInitialState(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.formActions.setInitialState(nextProps)
  }

  onBlur = (ev, attrs) => {
    if (this.props.onBlur) {
      this.props.onBlur(this.formStore.serialize())
    }
  }

  onChange = (ev, attrs) => {
    if (this.props.onChange) {
      this.props.onChange(this.formStore.serialize())
    }
  }

  submitForm = () => {
    this.props.onSubmit(this.formStore.serialize())
  }

  resetForm = () => {
    this.formActions.setInitialState(this.props)
  }

  render() {
    let schema,
        { formStore, formActions } = this

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
      <AltContainer 
        stores={{formStore}}
        actions={{formActions}}
        transform={({ formStore, formActions }) => {
          let { attributes } = formStore.toJS()
          
          return { attributes, formActions }
        }}> 
        { schema }
      </AltContainer>
    )
  }
}
