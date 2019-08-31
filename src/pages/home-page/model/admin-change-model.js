import FormModel from '@/libs/form-model'
// import moment from 'moment'

class AdminChangeModel extends FormModel {
  constructor() {
    super()
    // this.init()

    this.ruleInline = {
      oldpass: [
        {
          required: true,
          message: '请输入旧密码',
          trigger: 'blur'
        },
        {
          type: 'string',
          min: 6,
          max: 20,
          message: '密码长度6-20',
          trigger: 'blur'
        }
      ],
      newpass: [
        {
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        },
        {
          type: 'string',
          min: 6,
          max: 20,
          message: '密码长度6-20',
          trigger: 'blur'
        }
      ],
      target2: [
        {
          required: true,
          message: '请确认密码',
          trigger: 'blur'
        },
        {
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入新密码'))
            } else if (value !== this.formInline.newpass) {
              callback(new Error('新密码不一致'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }
      ]
    }
  }

  init() {
    this.formInline = {
      oldpass: '',
      newpass: '',
      target2: '',
    }
    return this
  }

  converter(form) {
    return {
      oldpassword: form.oldpass,
      password: form.newpass
    }
  }
}

export default new AdminChangeModel()
