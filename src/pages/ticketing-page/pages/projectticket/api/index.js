import axios from '@/libs/api.request' // 引入 请求模块
import { Switch } from 'iview';

export const getData = (params) => { 
  return axios.request({
    url: `/orders/ticket/amusement?token=${params.token}&amusementTicketId=${params.id}`,
    method: 'get'
  })
}

function getStatus(val){
  let statusname=''
  switch(val){
    case(1): statusname ='待出票'
    break;
    case(2): statusname ='待使用'
    break;
    case(3): statusname ='使用中'
    break;
    case(4): statusname ='待评价'
    break;
    case(5): statusname ='已评价'
    break;
    case(6): statusname ='已取消'
    break;
    case(7): statusname ='全部'
    break;
  }
  return statusname
}

export const columns = [
  {
    title: '订单号',
    key: 'orderNum',
    tooltip: true
  },
  {
    title: '下单游客用户名',
    render: (h, params) => {
      return h('div', {
        domProps: {
          innerHTML: params.row.simpleOrderVo.user
        }
      })
    },
    tooltip: true
  },
  {
    title: '下单游客手机号',
    // key: 'simpleOrderVo',
    render: (h, params) => {
      return h('div', {
        domProps: {
          innerHTML: params.row.simpleOrderVo.mobile
        }
      })
    },
    tooltip: true
  },
  {
    title: '预定数量',
    key: 'amount',
    tooltip: true
  },
  {
    title: '状态',
    // key: 'cardNum',
    render: (h, params) => {
      return h('div', {
        domProps: {
          innerHTML: getStatus(params.row.simpleOrderVo.status)
        }
      })
    },
    tooltip: true
  }
]
