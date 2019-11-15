
import FormModel from '@/libs/form-model'
class CreateForm extends FormModel {
  constructor () {
    super()
    this.ruleInline = {
      integral: [ { required: true,type:'number', message: '请输入积分调整额', trigger: 'blur' } ],
      note: [ { required: true, message: '请输入备注', trigger: 'blur' } ]
    }
  }
  init (form) {
    this.formInline = {
      'integral': 1,
      'note': '',
      uid: form.uid,
      token: form.token
    }
    return this
  }
}
export default new CreateForm()
