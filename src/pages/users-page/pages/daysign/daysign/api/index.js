import axios from '@/libs/api.request' // 引入 请求模块

export const getData = (id) => { 
  return axios.request({
    url: `/users/follow/${id}`,
    method: 'get'
  })
}

export const columns = [
  {
    title: '时间',
    key: 'name',
    tooltip: true
  },
  {
    title: '操作',
    key: 'userType',
    tooltip: true
  },
  {
    title: '积分数',
    key: 'telephone',
    tooltip: true
  }
]
