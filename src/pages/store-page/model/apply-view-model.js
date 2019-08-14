import FormModel from '@/libs/form-model'
// import moment from 'moment'

class ApplyViewModel extends FormModel {
  constructor(){
    super()
    // this.init()
    this.ruleInline = {
      
    }
  }
  init(form) {
    this.formInline = {
      phone: '',
      contact: '',
      real_name: '',
      admin_name: '',
      mid: ''
    }
    return this
  }
}

export default new ApplyViewModel()
