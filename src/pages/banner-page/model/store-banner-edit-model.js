import FormModel from '@/libs/form-model'
// import moment from 'moment'

class BnnerEditModel extends FormModel {
  constructor() {
    super()
    // this.init()

    this.ruleInline = {
      content: [
        { required: true, message: '请输入标题', trigger: 'blur' }
      ],
      bookcover: [
        { required: true, message: '请上传宣传图', trigger: 'blur' }
      ],
      link_url: [
        { required: true, message: '请输入跳转ID或者跳转链接', trigger: 'blur' }
      ],
      jump_type: [
        { required: true, message: '请选择跳转类型', trigger: 'change' }
      ]
    }
  }

  init(form) {
    this.formInline = {
      id: form.id,
      link_url: form.link_url,
      jump_type: form.jump_type,
      bookcover: form.bookcover,
      content: form.content,
      sort: form.sort,
    }
    return this
  }

  converter(form) {
    const jump_type = form.jump_type == '活动'?'1':form.jump_type == '商家'?'5':'2'
    return {
      id: form.id,
      link_url: form.link_url,
      jump_type: jump_type,
      bookcover: form.bookcover,
      content: form.content,
    }
  }
}

export default new BnnerEditModel()
