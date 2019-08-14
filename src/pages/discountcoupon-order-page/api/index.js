import axios from '@/libs/api.request' // 引入 请求模块
import getlocation from '@/libs/getlocation' // 引入 请求模块
import config from '@/config/'

// import { ObjectFormatFormData, ObjectFormatQueryString, ObjectEncodeBase64, getMethodRequestUrl } from '@/libs/util'

export const getData = (params) => { 
  return axios.request({
    url: `/repasts?pageIndex=${params.index}&pageSize=${params.size}`,
    method: 'get'
  })
}

export const createData = (params) => {
  return axios.request({
    url: `/repasts`,
    data: params,
    method: 'post'
  })
}

export const updateData = (params) => {
  return axios.request({
    url: `/repasts/${params.id}`,
    data: params,
    method: 'put'
  })
}

export const changeData = (params) => {
  return axios.request({
    url: `/repasts/enable/${params}`,
    method: 'put'
  })
}

export const deleteData = (params) => {
  return axios.request({
    url: `/repasts/${params}`,
    method: 'delete'
  })
}

export const getLocal = (params) => {
  return getlocation.request({
    url: `?address=浙江省舟山市嵊泗县花鸟岛${params}&key=EFIBZ-L4HWV-NMRPP-UVJ2F-K2MHQ-GIFD5`,
    method: 'get'
  })
}

// export const columns = [
//   {
//     title: '商家名称',
//     key: 'title',
//     tooltip: true
//   },
//   {
//     title: '优惠券名称',
//     key: 'address',
//     tooltip: true
//   },
//   {
//     title: '价格（元）',
//     key: 'address',
//     tooltip: true
//   },
//   {
//     title: '积分兑换',
//     key: 'releaseTime',
//     tooltip: true
//   },
//   {
//     title: '已兑换',
//     key: 'releaseTime',
//     tooltip: true
//   },
//   {
//     title: '库存',
//     key: 'releaseTime',
//     tooltip: true
//   },
//   {
//     title: '可使用日期',
//     key: 'releaseTime',
//     tooltip: true
//   },
//   {
//     title: '状态',
//     key: 'releaseTime',
//     tooltip: true
//   },
//   {
//     title: '发布时间',
//     key: 'releaseTime',
//     tooltip: true
//   },
//   // {
//   //   title: '状态',
//   //   render: (h, params) => {
//   //     return h('div', {
//   //       domProps: {
//   //         innerHTML: !params.row.isDisplayed ? '下线' : '展示'
//   //       },
//   //       style: {
//   //         color: !params.row.isDisplayed ? 'red' : 'green'
//   //       }
//   //     })
//   //   },
//   //   tooltip: true
//   // },
//   {
//     title: '操作',
//     key: 'handle',
//     fixed: 'right',
//     align: 'center',
//     width: 300,
//     button: [
//       (h, params, vm) => {
//         return h('div', [
//           h('i-button', {
//             props: {
//               type: 'primary',
//               icon: 'md-create',
//               size: 'small'
//             },
//             style: {
//               marginRight: '5px'
//             },
//             on: {
//               click: () => {
//                 vm.$emit('on-edit', params)
//               }
//             }
//           }, '编辑'),
//           h('i-button', {
//             props: {
//               type: !params.row.isDisplayed ?'success':'error',
//               icon: 'md-create',
//               size: 'small'
//             },
//             style: {
//               marginRight: '5px'
//             },
//             on: {
//               click: () => {
//                 vm.$emit('on-change', params)
//               }
//             }
//           }, !params.row.isDisplayed?'上线':'下线'),
//           h('i-button', {
//             props: {
//               type: 'error',
//               icon: 'ios-trash-outline',
//               size: 'small'
//             },
//             style: {
//               marginRight: '5px'
//             },
//             on: {
//               click: () => {
//                 vm.$emit('on-show', params)
//               }
//             }
//           }, '查看购买')
//         ])
//       }
//     ]
//   }
// ]

// waiting
export const waitingcolumns = [
  {
    title: '订单号',
    key: 'orderNo',
    tooltip: true
  },
  {
    title: '活动所属',
    key: 'standby',
    tooltip: true
  },
  {
    title: '活动标题',
    key: 'title',
    tooltip: true
  },
  {
    title: '联系人',
    key: 'content',
    tooltip: true
  },
  {
    title: '联系电话',
    key: 'phone',
    tooltip: true
  },
  {
    title: '报名人数',
    key: 'number',
    tooltip: true
  },
  {
    title: '线下需支付（元）',
    key: 'price',
    tooltip: true
  },
  {
    title: '积分抵扣',
    key: 'integral',
    tooltip: true
  },
  {
    title: '下单时间',
    key: 'ordertime',
    tooltip: true
  }
]
