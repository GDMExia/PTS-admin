import FormModel from '@/libs/form-model'
// import moment from 'moment'

class CategoryCreateModel extends FormModel {
  constructor() {
    super()
    // this.init()

    this.ruleInline = {
      cate_name: [
        { required: true, message: '请输入分类名称', trigger: 'blur' }
      ],
    }
  }

  init(form) {
    this.formInline = {
      cate_name: form.cate_name,
      id: form.id,
    }
    return this
  }

  converter(form) {
    return {
      cate_name: form.cate_name,
      id: form.id,
    }
  }
}

export default new CategoryCreateModel()
