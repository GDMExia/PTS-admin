import axios from '@/libs/api.request' // 引入 请求模块
import store from '@/store'
import qs from 'qs'
const user = store.state.user
export const getData = (page, id) => { 
  return axios.request({
    url: `/User/getUserPaymentLog?uid=${id}&token=${user.token}&page=${page.index}&pageSize=${page.size}`,
    method: 'get'
  })
}

export const columns = [
  {
    title: '时间',
    key: 'create_time',
    tooltip: true
  },
  {
    title: '操作',
    key: 'note',
    tooltip: true
  },
  {
    title: '积分数',
    key: 'order_price',
    tooltip: true
  }
]
