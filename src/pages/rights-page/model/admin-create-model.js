import FormModel from '@/libs/form-model'
// import moment from 'moment'

class AdminCreateModel extends FormModel {
  constructor() {
    super()
    // this.init()

    this.ruleInline = {
      roleId: [
        { required: true, message: '请选择角色', trigger: 'change' }
      ],
      accountNo: [
        {
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }
      ],
      accountName: [
        {
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }
      ],
    }
  }

  init() {
    this.formInline = {
      roleId: '',
      accountNo: '',
      accountName: ''
    }
    return this
  }

  converter(form) {
    return {
      roleId: form.roleId,
      account: form.accountNo,
      name: form.accountName
    }
  }
}

export default new AdminCreateModel()
