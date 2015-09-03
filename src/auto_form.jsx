import React from 'react';
import AutoSchema from './auto_schema';
import FormStore from './form_store';
import FormActions from './form_actions';
import AltContainer from 'alt/AltContainer';
import _ from 'underscore';

export default class AutoForm extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func,
    onChange: React.PropTypes.func,
    submitButton: React.PropTypes.object,
    noSubmit: React.PropTypes.bool
  }

  static defaultProps = {
    onChange: (ev, value) => {
      console.log(value);
    },
    submitButton: <button>Submit</button>,
    noSubmit: false
  }

  componentWillMount() {
    FormActions.setInitialState(this.props);
  }

  submitForm = (ev) => {
    if (this.valid()) {
      this.props.onSubmit(ev, this.refs.schema.serialize());
    }
  }

  valid() {
    return this.refs.schema.validate();
  }

  render() {
    let submitButton = React.cloneElement(this.props.submitButton, {
      onClick: this.submitForm
    });

    return (
      <AltContainer 
        stores={{FormStore}}
        actions={{FormActions}}
        transform={({ FormStore, FormActions }) => {
          var attributes = FormStore.toJS().attributes;
          var addChildToList = listId => FormActions.addChildToList(listId);
          var updateFormValue = props => FormActions.updateFormValue(props);
          return { attributes, addChildToList, updateFormValue }
        }}> 

        <AutoSchema
          ref="schema"
          addButton={this.props.addButton}
          removeButton={this.props.removeButton}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />

          { this.props.noSubmit ? null : submitButton }
      </AltContainer>
    );
  }
}
