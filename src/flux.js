import Alt from 'alt'
import FormActions from './form_actions'
import FormStore from './form_store'

class FormFlux extends Alt {
  constructor(config = {}) {
    super(config)

    this.addActions('FormActions', FormActions)
    this.addStore('FormStore', FormStore, this.actions.FormActions)
  }
}

const flux = new FormFlux()
export default flux
