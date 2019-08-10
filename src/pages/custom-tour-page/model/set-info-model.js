import FormModel from '@/libs/form-model'
// import moment from 'moment'

class SetInfoModel extends FormModel {
  constructor() {
    super()
    // this.init()

    this.ruleInline = {
      type: [
        { required: true, message: '请输入类型名称', trigger: 'blur' }
      ],
      price: [
        { required: true, message: '请输入价格', trigger: 'blur' }
      ],
      child: [
        { required: true, message: '请输入儿童价', trigger: 'blur' }
      ],
      limit: [
        { required: true, message: '请输入每日上限', trigger: 'blur' }
      ],
      discount: [
        { required: true, message: '请输入单房价差', trigger: 'blur' }
      ]
    }
  }

  init(form) {
    this.formInline = {
      id: form.id,
      type: form.type,
      price: form.price,
      discount: form.discount,
      child: form.child,
      limit: form.limit,
    }
    return this
  }

  converter(form) {
    return {
      id: form.id,
      bannerTitle: form.title,
      bannerImage: form.photo,
      bannerContent: form.content,
    }
  }
}

export default new SetInfoModel()
