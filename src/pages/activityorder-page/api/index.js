import axios from '@/libs/api.request' // 引入 请求模块
import config from '@/config/'

import { ObjectFormatFormData, ObjectFormatQueryString, ObjectEncodeBase64, getMethodRequestUrl } from '@/libs/util'

export const getOrderList = (params) => {
  return axios.request({
    url: `/Order/orderList?token=${params.token}&page=${params.page.index}&pageSize=${params.page.size}&order_status=${params.order_status}&phone=${params.search.phone}&goods_name=${params.search.goods_name}&order_no=${params.search.order_no}`,
    method: 'get'
  })
}

export const check = (params,token) => {
  return axios.request({
    url: `/Order/updateOrderAudit?token=${token}`,
    data: params,
    method: 'post'
  })
}

// waiting
export const waitingcolumns = [
  {
    title: '订单编号',
    key: 'order_no',
    tooltip: true,
    width: 150
  },
  {
    title: '活动所属',
    key: 'merchants_id',
    render: (h, params)=>{
      return h('div', params.row.merchants_id==0?'官方活动':params.row.pid_name)
    },
    tooltip: true,
    width: 150
  },
  {
    title: '活动标题',
    key: 'goods_name',
    tooltip: true,
    width: 150
  },
  {
    title: '会员姓名',
    // key: 'real_name',
    key: 'order_real_name',
    tooltip: true,
    width: 150
  },
  {
    title: '联系电话',
    key: 'phone',
    tooltip: true,
    width: 150
  },
  {
    title: '报名人数',
    key: 'goods_number',
    tooltip: true,
    width: 150
  },
  {
    title: '现金支付',
    key: 'order_price',
    tooltip: true,
    width: 150
  },
  {
    title: '积分抵扣',
    key: 'deduction_price',
    tooltip: true,
    width: 150
  },
  {
    title: '下单时间',
    key: 'create_time',
    tooltip: true,
    width: 150
  }
]

export const evaluatecolumns = [
  {
    title: '订单编号',
    key: 'order_no',
    tooltip: true,
    width: 150
  },
  {
    title: '活动所属',
    key: 'merchants_id',
    render: (h, params)=>{
      return h('div', params.row.merchants_id==0?'官方活动':params.row.pid_name)
    },
    tooltip: true,
    width: 150
  },
  {
    title: '活动标题',
    key: 'goods_name',
    tooltip: true,
    width: 150
  },
  {
    title: '会员姓名',
    // key: 'real_name',
    key: 'order_real_name',
    tooltip: true,
    width: 150
  },
  {
    title: '联系电话',
    key: 'phone',
    tooltip: true,
    width: 150
  },
  {
    title: '报名人数',
    key: 'goods_number',
    tooltip: true,
    width: 150
  },
  {
    title: '现金支付',
    key: 'order_price',
    tooltip: true,
    width: 150
  },
  {
    title: '积分抵扣',
    key: 'deduction_price',
    tooltip: true,
    width: 150
  },
  {
    title: '下单时间',
    key: 'create_time',
    tooltip: true,
    width: 150
  },
  {
    title: '操作',
    key: 'handle',
    tooltop: true,
    fixed: 'right',
    width: 150,
    align: 'center',
    button: [(h,params,vm)=>{
      return h('div',[
        h('i-button',{
          props:{
            type:'primary',
            size: 'small'
          },
          on:{
            click:()=>{
              vm.$emit('on-view',params)
            }
          }
        },'查看评价')
      ])
    }]
  }
]

export const ubsubscribecolumns = [
  {
    title: '订单编号',
    key: 'order_no',
    tooltip: true,
    width: 150
  },
  {
    title: '活动所属',
    key: 'merchants_id',
    render: (h, params)=>{
      return h('div', params.row.merchants_id==0?'官方活动':params.row.pid_name)
    },
    tooltip: true,
    width: 150
  },
  {
    title: '活动标题',
    key: 'goods_name',
    tooltip: true,
    width: 150
  },
  {
    title: '会员姓名',
    // key: 'real_name',
    key: 'order_real_name',
    tooltip: true,
    width: 150
  },
  {
    title: '联系电话',
    key: 'phone',
    tooltip: true,
    width: 150
  },
  {
    title: '报名人数',
    key: 'goods_number',
    tooltip: true,
    width: 150
  },
  {
    title: '现金支付',
    key: 'order_price',
    tooltip: true,
    width: 150
  },
  {
    title: '积分抵扣',
    key: 'deduction_price',
    tooltip: true,
    width: 150
  },
  {
    title: '下单时间',
    key: 'create_time',
    tooltip: true,
    width: 150
  },
  {
    title: '操作',
    key: 'handle',
    tooltop: true,
    fixed: 'right',
    width: 150,
    align: 'center',
    button: [(h,params,vm)=>{
      return h('div',[
        h('Poptip',{
          props:{
            title:'是否审核通过？',
            confirm:true,
            okText: '通过',
            cancelText: '不通过',
            transfer:true
          },
          on:{
            "on-ok":()=>{
              vm.$emit('on-ok',params)
            },
            "on-cancel":()=>{
              vm.$emit('on-cancel',params)
            }
          }
        },[
        h('i-button',{
          props:{
            type:'primary',
            size: 'small'
          }
        },'审核')
        ])
      ])
    }]
  }
]
