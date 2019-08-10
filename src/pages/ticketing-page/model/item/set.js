
import FormModel from '@/libs/form-model'
class CreateForm extends FormModel {
  constructor () {
    super()
    this.ruleInline = {
      startDate: [ { required: true, type: 'date', message: '请选择开始时间', trigger: 'blur' } ],
      endDate: [ { required: true, type: 'date', message: '请选择结束时间', trigger: 'blur' } ],
      amusementItemList: [ { required: true, type: 'array', message: '请选择项目', trigger: 'blur' } ]
    }
  }
  init () {
    this.formInline = {
      'startDate': '',
      'endDate': '',
      'amusementItemList': []
    }
    return this
  }
}
export default new CreateForm()
