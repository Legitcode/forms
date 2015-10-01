import Alt from 'alt'
import FormActions from './form_actions'
import FormStore from './form_store'

export default class FormFlux extends Alt {
  constructor(config = {}) {
    super(config)

    this.addActions('formActions', FormActions)
    this.addStore('formStore', FormStore, this.actions.formActions)
  }
}

