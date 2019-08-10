import FormModel from '@/libs/form-model'
// import moment from 'moment'

class GroupCreateModel extends FormModel {
  constructor() {
    super()
    // this.init()

    this.ruleInline = {
      name: [
        { required: true, message: '请输入分组名称', trigger: 'blur' }
      ],
      rules: [
        { required: true, type: 'string', message: '请选择分票规则', trigger: 'change' }
      ],
      residences: [
        { required: true, type: 'string', message: '请选择民宿', trigger: 'change' }
      ],
    }
  }

  init(form) {
    this.formInline = {
      name: form.name,
      id: form.id,
      rules: form.rules,
      residences: form.residences,
    }
    return this
  }

  converter(form) {
    return {
      name: form.name,
      id: form.id,
      rules: form.rules,
      residences: form.residences,
    }
  }
}

export default new GroupCreateModel()
