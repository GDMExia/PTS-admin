
import FormModel from '@/libs/form-model'
class CreateForm extends FormModel {
  constructor () {
    super()
    this.ruleInline = {
      startDate: [ { required: true, type: 'date', message: '请选择开始时间', trigger: 'blur' } ],
      endDate: [ { required: true, type: 'date', message: '请选择结束时间', trigger: 'blur' } ]
    }
  }
  init () {
    this.formInline = {
      'startDate': '',
      'endDate': ''
    }
    return this
  }
}
export default new CreateForm()
