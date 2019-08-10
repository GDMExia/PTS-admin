
import FormModel from '@/libs/form-model'
class CreateForm extends FormModel {
  constructor () {
    super()
    this.ruleInline = {
      richText: [ { required: true, message: '请输入项目说明', trigger: 'blur' } ]
    }
  }
  init () {
    this.formInline = {
      'richText': ''
    }
    return this
  }
}
export default new CreateForm()
