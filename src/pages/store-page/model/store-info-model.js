import FormModel from '@/libs/form-model'
// import moment from 'moment'

class StoreInfoModel extends FormModel {
  constructor() {
    super()
    // this.init()

    this.ruleInline = {
      content: [{
        required: true,
        message: '请输入简介',
        trigger: 'blur'
      }],
      real_name: [{
        required: true,
        message: '请输入商家名称',
        trigger: 'blur'
      }],
      address: [{
        required: true,
        message: '请输入地址',
        trigger: 'blur'
      }],
      phone: [{
        required: true,
        message: '请输入电话',
        trigger: 'blur'
      }],
      merchants_cid: [{
        required: true,
        message: '请选择分类',
        trigger: 'blur',
      }],
      pic: [{
        required: true,
        message: '请上传图片',
        trigger: 'blur'
      }],
      announcement: [{
        required: true,
        message: '请填写商户公告',
        trigger: 'blur'
      }]
    }
  }

  init(form) {
    this.formInline = {
      mid: form.mid,
      content: form.content,
      address: form.address,
      phone: form.phone,
      pic: form.pic,
      real_name: form.real_name,
      merchants_cid: form.merchants_cid,
      contact: form.contact,
      announcement: form.announcement,
      workers: form.workers
    }
    return this
  }

  converter(form) {
    return {
      mid: form.mid,
      content: form.content,
      address: form.address,
      phone: form.phone,
      pic: form.pic,
      real_name: form.real_name,
      merchants_cid: form.merchants_cid,
      contact: form.contact,
      announcement: form.announcement,
      workers: form.workers,
    }
  }
}

export default new StoreInfoModel()
