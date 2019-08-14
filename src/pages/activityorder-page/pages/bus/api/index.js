import axios from '@/libs/api.request' // 引入 请求模块

export const getData = (id) => { 
  return axios.request({
    url: `/users/follow/${id}`,
    method: 'get'
  })
}

export const columns = [
  {
    title: '姓名',
    key: 'name',
    tooltip: true
  },
  {
    title: '人员类型',
    key: 'userType',
    tooltip: true
  },
  {
    title: '手机号',
    key: 'telephone',
    tooltip: true
  },
  {
    title: '证件类型',
    key: 'certificateType',
    tooltip: true
  },
  {
    title: '证件号',
    key: 'cardNum',
    tooltip: true
  }
]