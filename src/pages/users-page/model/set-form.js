
import FormModel from '@/libs/form-model'
class CreateForm extends FormModel {
  constructor () {
    super()
    this.ruleInline = {
      vip_price: [ { required: true, message: '请输入年费', trigger: 'blur' } ],
    }
  }
  init () {
    this.formInline = {
      'vip_price': ''
    }
    return this
  }
}
export default new CreateForm()
