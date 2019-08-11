import FormModel from '@/libs/form-model'
// import moment from 'moment'

class AdminEditModel extends FormModel {
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

  init(form) {
    this.formInline = {
      id: form.id,
      roleId: form.roleId,
      accountNo: form.accountNo,
      accountName: form.accountName,
    }
    return this
  }

  converter(form) {
    return {
      id: form.id,
      role_id: form.roleId,
      admin_name: form.accountNo,
      real_name: form.accountName,
    }
  }
}

export default new AdminEditModel()
