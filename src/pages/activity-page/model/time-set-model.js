import FormModel from '@/libs/form-model'
// import moment from 'moment'

class TimeSetModel extends FormModel {
  constructor() {
    super()
    // this.init()

    this.ruleInline = {
      date: [
        { required: true, message: '请输入天数', trigger: 'blur' },
        {
          validator: (rule, value, callback) => {
            if (!/^[1-9]\d*$/.test(value)&&value!='') {
              callback(new Error('只能输入数字'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }
      ]
    }
  }

  init(form) {
    this.formInline = {
      date: form.date,
    }
    return this
  }

  converter(form) {
    return {
      date: form.date,
    }
  }
}

export default new TimeSetModel()
