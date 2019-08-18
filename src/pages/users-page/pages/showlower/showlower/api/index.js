import axios from '@/libs/api.request' // 引入 请求模块
import store from '@/store'
import qs from 'qs'
const user = store.state.user
export const getData = (page, id) => { 
  return axios.request({
    url: `/User/getLineUserlist?token=${user.token}&uid_number=${id}`,
    method: 'get'
  })
}

export const columns = [
  {
    title: 'ID',
    key: 'uid',
    tooltip: true
  },
  {
    title: '昵称',
    key: 'nickname',
    tooltip: true
  },
  {
    title: '手机号',
    key: 'phone',
    tooltip: true
  },
  {
    title: '性别',
    key: 'sexStr',
    tooltip: true
  },
  {
    title: '年龄',
    key: 'age',
    tooltip: true
  }
]