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
      image: [{
        required: true,
        message: '请上传封面图',
        trigger: 'blur'
      }],
      details: [{
        required: true,
        message: '请输入正文',
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
      content: form.details,
      id: form.id,
      gid: '1',
      pic: form.image,
      goods_id: form.activity,
    }
  }
}

export default new ShareCreateModel()
