import FormModel from '@/libs/form-model'
// import moment from 'moment'

class CancelSetModel extends FormModel {
  constructor() {
    super()
    // this.init()

    this.ruleInline = {
        date: [
            {}
        ]
    }
  }

  init(form) {
    this.formInline = {
      date: form.date,
    }
    return this
  }

  converter(form) {
    return {
        date: form.date,
    }
  }
}

export default new CancelSetModel()
