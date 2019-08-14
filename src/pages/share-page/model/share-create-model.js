import FormModel from '@/libs/form-model'
// import moment from 'moment'

class ShareCreateModel extends FormModel {
  constructor() {
    super()
    // this.init()

    this.ruleInline = {
      title: [{
        required: true,
        message: '请输入标题',
        trigger: 'blur'
      }],
      details: [{
        required: true,
        message: '请输入详情',
        trigger: 'blur'
      }]

    }
  }

  init(form) {
    this.formInline = {
      title: form.title,
      details: form.details,
      id: form.id,
      activity: form.activity,
      image: form.image,
    }
    return this
  }

  converter(form) {
    return {
      title: form.title,
      intro: form.details,
      id: form.id,
    }
  }
}

export default new ShareCreateModel()
