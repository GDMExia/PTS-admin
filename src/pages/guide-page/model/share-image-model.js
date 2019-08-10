import FormModel from '@/libs/form-model'
// import moment from 'moment'

class ShareImageModel extends FormModel {
  constructor() {
    super()
    // this.init()

    this.ruleInline = {
      
    }
  }

  init(form) {
    this.formInline = {
      image: form.image,
    }
    return this
  }

  converter(form) {
    return {
      assets: form.image,
    }
  }
}

export default new ShareImageModel()
