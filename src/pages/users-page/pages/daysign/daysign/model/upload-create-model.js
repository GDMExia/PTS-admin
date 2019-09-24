import FormModel from '@/libs/form-model'
// import moment from 'moment'

class UploadCreateModel extends FormModel {
  constructor() {
    super()
    this.init()

    this.ruleInline = {
      pic: [{
        required: true,
        message: '请上传图片',
        trigger: 'blur'
      }],
    }
  }

  init() {
    this.formInline = {
      pic: '',
    }
    return this
  }

  converter(form) {
    return {
        pic: form.pic,
    }
  }
}

export default new UploadCreateModel()
