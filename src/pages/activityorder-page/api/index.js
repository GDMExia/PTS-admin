import axios from '@/libs/api.request' // 引入 请求模块
import config from '@/config/'

import { ObjectFormatFormData, ObjectFormatQueryString, ObjectEncodeBase64, getMethodRequestUrl } from '@/libs/util'

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

// entrance
export const entrancecolumns = [
  {
    title: '日期',
    key: 'createDate',
    tooltip: true
  },
  {
    title: '已预订数量',
    key: 'reserveAmount',
    tooltip: true
  },
  {
    title: '已核销',
    key: 'checkAmount',
    tooltip: true
  }
]

export const getentranceData = (params) => {
  console.log(params)
  return axios.request({
    url: `/tickets?type=3&token=${params.token}&pageNum=${params.page.index}&pageSize=${params.page.size}&search=${params.search?ObjectEncodeBase64(params.search):''}`,
    method: 'get'
  })
}

export const setentrancePrice = (params) => {
  return axios.request({
    url: `/ticket/price?type=3&token=${params.token}&adultPrice=${params.price.adultPrice}&childPrice=${params.price.childPrice}`,
    method: 'put'
  })
}

export const getentrancePrice = (params) => {
  return axios.request({
    url: `/ticket/price?type=3&token=${params.token}`,
    method: 'get'
  })
}

export const setentrancedate = (params) => {
  return axios.request({
    url: `/ticket?type=3&token=${params.token}&startDate=${params.date.startDate}&endDate=${params.date.endDate}`,
    method: 'post'
  })
}

export const getentrancedate = (params) => {
  return axios.request({
    url: `/tickets/creation?type=3&token=${params}`,
    method: 'get'
  })
}

// traffic
export const trafficcolumns = [
  {
    title: '日期',
    key: 'allowReserveDate',
    tooltip: true
  },
  {
    title: '已预订数量',
    key: 'reserveAmount',
    tooltip: true
  },
  {
    title: '已核销',
    key: 'checkAmount',
    tooltip: true
  }
]

export const gettrafficData = (params) => {
  console.log(params)
  return axios.request({
    url: `/tickets?type=4&token=${params.token}&pageNum=${params.page.index}&pageSize=${params.page.size}&search=${params.search?ObjectEncodeBase64(params.search):''}`,
    method: 'get'
  })
}

export const settrafficPrice = (params) => {
  return axios.request({
    url: `/ticket/price?type=4&token=${params.token}&adultPrice=${params.price.adultPrice}&childPrice=${params.price.childPrice}`,
    method: 'put'
  })
}

export const gettrafficPrice = (params) => {
  return axios.request({
    url: `/ticket/price?type=4&token=${params.token}`,
    method: 'get'
  })
}

export const settrafficdate = (params) => {
  return axios.request({
    url: `/ticket?type=4&token=${params.token}&startDate=${params.date.startDate}&endDate=${params.date.endDate}`,
    method: 'post'
  })
}

export const gettrafficdate = (params) => {
  return axios.request({
    url: `/tickets/creation?type=4&token=${params}`,
    method: 'get'
  })
}

// item
export const itemcolumns = [
  {
    title: '日期',
    key: 'openDate',
    tooltip: true
  },
  {
    title: '项目名称',
    key: 'projectName',
    tooltip: true
  },
  {
    title: '票务时间段',
    key: 'beginTime',
    render: (h, params) => {
      return h('div', {
        domProps: {
          innerHTML: params.row.beginTime + '-' + params.row.endTime
        }
      })
    },
    tooltip: true
  },
  {
    title: '已预订数量',
    key: 'reserveAmount',
    tooltip: true
  },
  {
    title: '状态',
    key: 'projectStatus',
    render: (h, params) => {
      return h('div', {
        domProps: {
          innerHTML: params.row.projectStatus == 1 ? '预定中' : params.row.projectStatus == 2 ? '已完成' : '已取消'
        }
      })
    },
    tooltip: true
  },
  {
    title: '预定情况',
    key: 'handle',
    button: (h, params, vm) => {
      return h('div', [
        h('i-button', {
          props: {
            type: 'success',
            size: 'small'
          },
          on: {
            click: () => {
              vm.$emit('on-view', params)
            }
          }
        }, '查看')
      ])
    }
  },
  {
    title: '操作',
    key: 'handle',
    fixed: 'right',
    align: 'center',
    button: (h, params, vm) => {
      return h('div', [
        h('i-button', {
          props: {
            type: 'warning',
            size: 'small'
          },
          style: {
            display: params.row.projectStatus == 1 ? '' : 'none'
          },
          on: {
            click: () => {
              vm.$emit('on-view', params)
            }
          }
        }, '取消')
      ])
    }
  }
]

export const getitemData = (params) => {
  console.log(params)
  return axios.request({
    url: `/tickets?type=5&token=${params.token}&pageNum=${params.page.index}&pageSize=${params.page.size}&search=${params.search?ObjectEncodeBase64(params.search):''}`,
    method: 'get'
  })
}

export const setitemdate = (params) => {
  return axios.request({
    url: `/ticket/amusement?type=5&token=${params.token}`,
    data: params,
    method: 'post'
  })
}

export const getitemdate = (params) => {
  return axios.request({
    url: `/tickets/creation?type=5&token=${params}`,
    method: 'get'
  })
}

export const getProjectList = (token) => {
  return axios.request({
    url: `/ticket/amusement/items?token=${token}`,
    method: 'get'
  })
}

export const setprojectDetail = (params) => {
  return axios.request({
    url: `/ticket/amusement/intro?token=${params.token}`,
    data: params,
    method: 'post'
  })
}

export const getprojectDetail = (params) => {
  return axios.request({
    url: `/ticket/amusement/intro?token=${params}`,
    method: 'get'
  })
}

// bus
export const buscolumns = [
  {
    title: '日期',
    key: 'allowReserveDate',
    tooltip: true
  },
  {
    title: '已预订数量',
    key: 'reserveAmount',
    tooltip: true
  },
  {
    title: '出发地',
    key: 'departureLocation',
    tooltip: true
  },
  {
    title: '预定情况',
    key: 'handle',
    button: (h, params, vm) => {
      return h('div', [
        h('i-button', {
          props: {
            type: 'success'
          }
        }, '查看')
      ])
    }
  }
]

export const getbusData = (params) => {
  console.log(params)
  return axios.request({
    url: `/tickets?type=2&token=${params.token}&pageNum=${params.page.index}&pageSize=${params.page.size}&search=${params.search?ObjectEncodeBase64(params.search):''}`,
    method: 'get'
  })
}

export const setbusPrice = (params) => {
  return axios.request({
    url: `/ticket/price?type=2&token=${params.token}&adultPrice=${params.price.adultPrice}&childPrice=${params.price.childPrice}`,
    method: 'put'
  })
}

export const getbusPrice = (params) => {
  return axios.request({
    url: `/ticket/price?type=2&token=${params.token}`,
    method: 'get'
  })
}

export const setbusdate = (params) => {
  return axios.request({
    url: `/ticket?type=2&token=${params.token}&startDate=${params.date.startDate}&endDate=${params.date.endDate}`,
    method: 'post'
  })
}

export const getbusdate = (params) => {
  return axios.request({
    url: `/tickets/creation?type=2&token=${params}`,
    method: 'get'
  })
}
