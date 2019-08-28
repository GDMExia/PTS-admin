import FormModel from '@/libs/form-model'
// import moment from 'moment'

class StoreCreateModel extends FormModel {
  constructor() {
    super()
    // this.init()

    this.ruleInline = {
      phone: [{
        required: true,
        message: '请输入联系方式',
        trigger: 'blur'
      }],
      real_name: [{
        required: true,
        message: '请输入商家名称',
        trigger: 'blur'
      }],
      contact: [{
        required: true,
        message: '请输入联系人',
        trigger: 'blur'
      }],
      admin_name: [{
        required: true,
        message: '请输入账号',
        trigger: 'blur'
      }],
      company: [{
        required: true,
        message: '请输入账号',
        trigger: 'blur'
      }],
      legal_person: [{
        required: true,
        message: '请输入账号',
        trigger: 'blur'
      }],
      discount: [{
        required: true,
        message: '请输入商家折扣',
        pattern: /^[0-9]{1}\.?[0-9]{0,2}$/,
        trigger: 'blur'
      }]
    }
  }

  init(form) {
    this.formInline = {
      phone: form.phone,
      contact: form.contact,
      real_name: form.real_name,
      admin_name: form.admin_name,
      mid: form.mid,
      legal_person: form.legal_person,
      company: form.company,
      discount: form.discount
    }
    return this
  }

  converter(form) {
    return {
      phone: form.phone,
      contact: form.contact,
      real_name: form.real_name,
      admin_name: form.admin_name,
      mid: form.mid,
      legal_person: form.legal_person,
      company: form.company,
      discount: form.discount
    }
  }
}

export default new StoreCreateModel()
