import FormModel from '@/libs/form-model'
// import moment from 'moment'

class UploadEditModel extends FormModel {
  constructor() {
    super()
    // this.init()

    this.ruleInline = {
      pic: [{
        required: true,
        message: '请上传图片',
        trigger: 'blur'
      }],
    }
  }

  init(form) {
    this.formInline = {
      id: form.id,
      pic: form.pic,
    }
    return this
  }

  converter(form) {
    return {
        id: form.id,
        pic: form.pic,
    }
  }
}

export default new UploadEditModel()
