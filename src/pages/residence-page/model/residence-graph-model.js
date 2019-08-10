import FormModel from '@/libs/form-model'
// import moment from 'moment'

class ResidenceGraphModel extends FormModel {
  constructor() {
    super()
    // this.init()

    this.ruleInline = {
      
    }
  }

  init(form) {
    this.formInline = {
      id: form.id,
      image: form.recommendImg,
    }
    return this
  }

  converter(form) {
    return {
      id: form.id,
      recommendImg: form.image,
    }
  }
}

export default new ResidenceGraphModel()
