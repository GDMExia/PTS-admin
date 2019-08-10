import FormModel from '@/libs/form-model'

class RoleCreateModel extends FormModel {
  constructor() {
    super()
    this.init()

    this.ruleInline = {
      name: [
        {
          required: true,
          message: '请输入系统角色类型',
          trigger: 'blur'
        }
      ],
      permission: [
        {
          required: true,
          message: '请选择功能权限',
          trigger: 'blur'
        },
        { type: 'string', min: 1, message: '请至少选择一个功能', trigger: 'blur' }
      ]
    }
  }

  init() {
    this.formInline = {
      name: '',
      permission: ''
    }
    return this
  }

  converter(form) {
    return {
      roleName: form.name,
      functionIdList: form.permission
    }
  }
}

export default new RoleCreateModel()
