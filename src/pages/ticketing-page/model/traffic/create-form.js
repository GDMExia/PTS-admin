
import FormModel from '@/libs/form-model'
class CreateForm extends FormModel {
  constructor () {
    super()
    this.ruleInline = {
      adultPrice: [ { required: true, message: '请输入标题', trigger: 'blur' } ]
      // childPrice: [ { required: true, message: '请输入简介', trigger: 'blur' } ]
    }
  }
  init () {
    this.formInline = {
      'childPrice': '',
      'adultPrice': ''
    }
    return this
  }
}
export default new CreateForm()
