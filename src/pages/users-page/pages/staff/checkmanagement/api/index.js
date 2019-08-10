import axios from '@/libs/api.request' // 引入 请求模块

export const getData = (params) => { 
  return axios.request({
    url: `/tickets/record?token=${params.token}&pageNum=${params.index}&pageSize=${params.size}&userId=${params.userId}`,
    method: 'get'
  })
}

export const columns = [
  {
    title: '检票时间',
    key: 'checkTime',
    tooltip: true
  },
  {
    title: '订单编号',
    key: 'orderNum',
    tooltip: true
  },
  {
    title: '检票数量',
    key: 'checkAmount',
    tooltip: true
  },
  {
    title: '游客信息',
    key: 'userFollowList',
    render: (h, params) => {
      return h('div', {
        domProps: {
          // innerHTML: params.row.userFollowList.join(',')
          innerHTML: params.row.userFollowList.join(',')
        }
      })
    },
    tooltip: true
  }
]