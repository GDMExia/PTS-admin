import FormModel from '@/libs/form-model'
// import moment from 'moment'

class BnnerEditModel extends FormModel {
  constructor() {
    super()
    // this.init()

    this.ruleInline = {
      title: [
        { required: true, message: '请输入标题', trigger: 'blur' }
      ],
      photo: [
        { required: true, message: '请上传封面图', trigger: 'blur' }
      ],
      content: [
        { required: true, message: '请输入详情', trigger: 'blur' }
      ]
    }
  }

  init(form) {
    this.formInline = {
      id: form.id,
      title: form.bannerTitle,
      photo: form.bannerImage,
      content: form.bannerContent,
    }
    return this
  }

  converter(form) {
    return {
      id: form.id,
      bannerTitle: form.title,
      bannerImage: form.photo,
      bannerContent: form.content,
    }
  }
}

export default new BnnerEditModel()
