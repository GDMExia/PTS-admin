
import FormModel from '@/libs/form-model'
class CreateForm extends FormModel {
  constructor () {
    super()
    
    this.ruleInline = {
      userType: [ { required: true, message: '请选择类型', trigger: 'blur' } ],
      userName: [ { required: true, message: '请输入姓名', trigger: 'blur' } ],
      telephone: [ { required: true, message: '请输入手机号', trigger: 'blur' } , { type: 'string', pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' } ]
    }
  }
  init (form) {
    this.formInline = {
      'vip_integral': form.vip_integral,
      'index_vip_integral': form.index_vip_integral,
      'activity_integral': form.activity_integral,
      'signin_time_number': form.signin_time_number,
      'signin_time_number_integral': form.signin_time_number_integral,
      'note': form.note,
      'signin_time_integral': form.signin_time_integral
    }
    return this
  }
}
export default new CreateForm()
