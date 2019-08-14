import FormModel from '@/libs/form-model'
import moment from 'moment'

class TourCreateModel extends FormModel {
  constructor() {
    super()
    // this.init()

    this.ruleInline = {
      content: [{
        required: true,
        message: '请输入正文',
        trigger: 'blur'
      }],
      goods_name: [{
        required: true,
        message: '请输入标题',
        trigger: 'blur'
      }],
      date: [{
        required: true,
        message: '请选择参与日期',
        trigger: 'blur',
        type: 'array'
      }],
      goods_price: [{
        required: true,
        message: '请输入价格',
        trigger: 'blur'
      }],
      discount_point: [{
        required: true,
        message: '请输入积分抵扣',
        trigger: 'blur',
      }],
      create_name: [{
        required: true,
        message: '请输入发布者',
        trigger: 'blur',
      }],
    }
  }

  init(form) {
    this.formInline = {
      id: form.id,
      goods_name: form.goods_name,
      start_time: form.start_time,
      end_time: form.end_time,
      discount_point: form.discount_point,
      goods_price: form.goods_price,
      create_name: form.create_name,
      content: form.content,
      img_list: form.img_list,
      date: form.date
    }
    return this
  }

  converter(form) {
    const [start_time, end_time] = form.date
    return {
      id: form.id,
      goods_name: form.goods_name,
      start_time: start_time?moment(start_time).format("YYYY-MM-DD"):'',
      end_time: end_time?moment(end_time).format("YYYY-MM-DD"):'',
      discount_point: form.discount_point,
      goods_price: form.goods_price,
      create_name: form.create_name,
      content: form.content,
      img_list: form.img_list.map(item=>{
        return item.file_url
      }),
    }
  }
}

export default new TourCreateModel()
