import React from 'react';
import AutoSchema from './auto_schema';
import Schema from './schema';
import FormStore from './form_store';
import FormActions from './form_actions';
import AltContainer from 'alt/AltContainer';
import alt from './alt';
import _ from 'underscore';

export default class Form extends React.Component {
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

  componentWillReceiveProps(nextProps) {
    FormActions.setInitialState(nextProps);
  }

  submitForm = () => {
    return this.props.onSubmit(FormStore.serialize());
  }

  resetForm = () => {
    FormActions.setInitialState(this.props);
  }

  render() {
    let schema;

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
        />
      );
    } else {
      schema = React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {
          submitButton: this.props.submitButton
        });
      });;
    }

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
  
        { schema }
      </AltContainer>
    );
  }
}
