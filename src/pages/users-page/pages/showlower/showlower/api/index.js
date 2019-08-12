import axios from '@/libs/api.request' // 引入 请求模块

export const getData = (id) => { 
  return axios.request({
    url: `/users/follow/${id}`,
    method: 'get'
  })
}

export const columns = [
  {
    title: 'ID',
    key: 'name',
    tooltip: true
  },
  {
    title: '昵称',
    key: 'userType',
    tooltip: true
  },
  {
    title: '手机号',
    key: 'telephone',
    tooltip: true
  },
  {
    title: '性别',
    key: 'certificateType',
    tooltip: true
  },
  {
    title: '年龄',
    key: 'cardNum',
    tooltip: true
  }
]