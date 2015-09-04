import alt from './alt';

class FormActions {
  constructor() {
    this.generateActions(
      'addChildToList',
      'setInitialState',
      'removeChildFromList',
      'updateFormValue'
    );
  }
}

export default alt.createActions(FormActions);
