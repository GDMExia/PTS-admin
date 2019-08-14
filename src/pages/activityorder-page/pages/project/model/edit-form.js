
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
  init (form) {
    this.formInline = form ? {
      'price': form.price.toString(),
      'projectName': form.projectName,
      'amusementItemTimeRequestList': form.amusementItemTimeList,
      'id': form.id
    } : {
      'price': '',
      'projectName': '',
      'amusementItemTimeRequestList': [],
      'id': ''
    }
    return this
  }
}
export default new CreateForm()
