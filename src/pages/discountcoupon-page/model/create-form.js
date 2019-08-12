
import FormModel from '@/libs/form-model'
class CreateForm extends FormModel {
  constructor () {
    super()
    this.ruleInline = {
      title: [ { required: true, message: '请输入标题', trigger: 'blur' } ],
      intro: [ { required: true, message: '请输入简介', trigger: 'blur' } ],
      assets: [ { required: true, message: '请上传图片', trigger: 'blur' } ],
      avegmoney: [ { required: true, message: '请填写人均消费', trigger: 'blur' } ],
      address: [ { required: true, message: '请输入具体地址', trigger: 'blur' } ],
      phone: [ { required: true, message: '请输入电话号码', trigger: 'blur' } ],
      description: [ { required: true, message: '请输入详情', trigger: 'blur' } ],
      recommend: [ { required: true, type: 'boolean', message: '是否推荐', trigger: 'blur' } ]
    }
  }
  init () {
    this.formInline = {
      'title': '',
      'intro': '',
      'address': '',
      'phone': '',
      'description': '',
      'avegmoney': '',
      'assets': [],
      'recommend': false,
      'location': ''
    }
    return this
  }
}
export default new CreateForm()
