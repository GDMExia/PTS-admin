import FormModel from '@/libs/form-model'
// import moment from 'moment'

class PriceCreateModel extends FormModel {
  constructor() {
    super()
    // this.init()

    this.ruleInline = {
      title: [
        { required: true, message: '请输入类型名称', trigger: 'blur' }
      ],
      cid: [
        { required: true, type: 'array', message: '请输入价格', trigger: 'blur' }
      ],
      create_name: [
        { required: true, message: '请输入儿童价', trigger: 'blur' }
      ],
      content: [
        { required: true, message: '请输入每日上限', trigger: 'blur' }
      ],
      cover: [
        { required: true, message: '请输入单房价差', trigger: 'blur' }
      ],
      is_top: [
        { required: true, message: '请输入单房价差', trigger: 'blur' }
      ]
    }
  }

  init(form) {
    this.formInline = {
      id: form.id,
      title: form.title,
      cid: form.cid,
      create_name: form.create_name,
      vedio_url: form.vedio_url,
      content: form.content,
      is_top: form.is_top,
      cover: form.cover
    }
    return this
  }

  converter(form) {
    return {
      id: form.id,
      title: form.title,
      cid: form.cid,
      create_name: form.create_name,
      vedio_url: form.vedio_url,
      content: form.content,
      is_top: form.is_top,
      cover: form.cover
    }
  }
}

export default new PriceCreateModel()
