import FormModel from '@/libs/form-model'
// import moment from 'moment'

class GuideCreateModel extends FormModel {
  constructor() {
    super()
    // this.init()

    this.ruleInline = {
      title: [{
        required: true,
        message: '请输入标题',
        trigger: 'blur'
      }],
      content: [{
        required: true,
        message: '请输入详情',
        trigger: 'blur'
      }]

    }
  }

  init(form) {
    this.formInline = {
      title: form.title,
      content: form.content,
      id: form.id,
    }
    return this
  }

  converter(form) {
    return {
      title: form.title,
      content: form.content,
      id: form.id,
      gid: '2',
    }
  }
}

export default new GuideCreateModel()
