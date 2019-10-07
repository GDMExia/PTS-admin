import axios from '@/libs/api.request' // 引入 请求模块
import store from '@/store'
const user = store.state.user

// create_time: "2019-10-06 12:28"消费时间
// discount_price: "90"积分抵扣
// order_no: "HX9A06361065798232"订单编号
// order_price: "910.00"实际支付
// original_price: "1000.00"消费金额
// real_name: "Tony.儲⁶²³"会员姓名
// uid: "20"

export const shareColumn = [
  { title: '订单编号', key: 'order_no', tooltip: true },
  { title: '会员姓名', key: 'real_name', tooltip: true },
  { title: '消费时间', key: 'create_time', tooltip: true },
  { title: '消费金额', key: 'original_price', tooltip: true },
  { title: '积分抵扣', key: 'discount_price', tooltip: true },
  { title: '实际支付', key: 'order_price', tooltip: true },
]

export const getOfflineList = (page) => {
  return axios.request({
    url: `/Order/orderCancelConsumption?pageSize=${page.size}&page=${page.index}&token=${user.token}`,
    method: 'get'
  })
}

