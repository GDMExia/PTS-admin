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
        trigger: 'blur',
        type: 'array'
      }],
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
