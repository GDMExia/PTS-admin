import axios from '@/libs/api.request' // 引入 请求模块
import config from '@/config/'

import { ObjectFormatFormData, ObjectFormatQueryString, ObjectEncodeBase64, getMethodRequestUrl } from '@/libs/util'

export const getOrderList = (params) => {
  return axios.request({
    url: `/Order/orderList?token=${params.token}&page=${params.page.index}&pageSize=${params.page.size}&order_status=${params.order_status}&phone=${params.search.phone}&goods_name=${params.search.goods_name}`,
    method: 'get'
  })
}

// waiting
export const waitingcolumns = [
  {
    title: '订单号',
    key: 'order_no',
    tooltip: true
  },
  {
    title: '活动所属',
    key: 'pid_name',
    tooltip: true
  },
  {
    title: '活动标题',
    key: 'goods_name',
    tooltip: true
  },
  {
    title: '联系人',
    key: 'real_name',
    tooltip: true
  },
  {
    title: '联系电话',
    key: 'phone',
    tooltip: true
  },
  {
    title: '报名人数',
    key: 'goods_number',
    tooltip: true
  },
  {
    title: '线下需支付（元）',
    key: 'order_price',
    tooltip: true
  },
  {
    title: '积分抵扣',
    key: 'deduction_price',
    tooltip: true
  },
  {
    title: '下单时间',
    key: 'create_time',
    tooltip: true
  }
]
