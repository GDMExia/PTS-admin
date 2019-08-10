import FormModel from '@/libs/form-model'
// import moment from 'moment'

class ResidenceCreateModel extends FormModel {
  constructor() {
    super()
    this.init()

    this.ruleInline = {
      
    }
  }

  init() {
    this.formInline = {
      id: '',
    }
    return this
  }

  converter(form) {
    return {
      hotelId: form.id,
    }
  }
}

export default new ResidenceCreateModel()
