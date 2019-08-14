import FormModel from '@/libs/form-model'
// import moment from 'moment'

class TourArticleModel extends FormModel {
  constructor() {
    super()
    // this.init()

    this.ruleInline = {
      article_id: [{
        required: true,
        message: '请选择旅游',
        trigger: 'change',
        type: 'array'
      },
      { type: 'array', max: 10, message: '最多选择10个', trigger: 'change' }
    ],
    }
  }

  init(form) {
    this.formInline = {
      article_id: form.article_id,
      cid: 2
    }
    return this
  }

  converter(form) {
    return {
      article_id: form.article_id.join(","),
      cid: 2
    }
  }
}

export default new TourArticleModel()
