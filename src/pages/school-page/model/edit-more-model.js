import FormModel from '@/libs/form-model'
// import moment from 'moment'

class PriceCreateModel extends FormModel {
  constructor() {
    super()
    // this.init()

    this.ruleInline = {
      cate_name: [
        { required: true, message: '请输入类型名称', trigger: 'blur' }
      ],
      is_code: [
        { required: true, message: '请输入类型名称', trigger: 'blur' }
      ]
    }
  }

  init(form) {
    this.formInline = {
      id: form.id,
      pid: form.pid,
      cate_name: form.cate_name,
      is_code: form.is_code,
      code_name: form.code_name
    }
    return this
  }

  converter(form) {
    return {
      id: form.id,
      create_name: form.create_name
    }
  }
}

export default new PriceCreateModel()
