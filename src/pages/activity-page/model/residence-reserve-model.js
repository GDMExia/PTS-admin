import FormModel from '@/libs/form-model'
// import moment from 'moment'

class ResidenceReserveModel extends FormModel {
  constructor() {
    super()
    // this.init()

    this.ruleInline = {
      
    }
  }

  init(form) {
    this.formInline = {
      enable: form.enable,
    }
    return this
  }

  converter(form) {
    return {
      enable: form.enable,
    }
  }
}

export default new ResidenceReserveModel()
