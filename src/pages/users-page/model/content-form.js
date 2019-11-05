
import FormModel from '@/libs/form-model'
class CreateForm extends FormModel {
  constructor () {
    super()
    this.ruleInline = {
      content: [ { required: true, message: '请输入内容', trigger: 'blur' } ],
    }
  }
  init (form) {
    this.formInline = {
      'content': form.content,
      'id': form.id
    }
    return this
  }
}
export default new CreateForm()
