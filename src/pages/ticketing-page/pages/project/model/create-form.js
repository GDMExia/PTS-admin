
import FormModel from '@/libs/form-model'
class CreateForm extends FormModel {
  constructor () {
    super()
    this.ruleInline = {
      projectName: [ { required: true, message: '请输入项目名称', trigger: 'blur' } ],
      price: [ { required: true, message: '请输入价格', trigger: 'blur' } ],
      amusementItemTimeRequestList: [ { required: true, type: 'array', message: '请选择时间', trigger: 'blur' } ]
    }
  }
  init () {
    this.formInline = {
      'price': '',
      'projectName': '',
      'amusementItemTimeRequestList': [ { beginTime: '', endTime: '' } ]
    }
    return this
  }
}
export default new CreateForm()
