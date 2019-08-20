import axios from '@/libs/api.request' // 引入 请求模块
import store from '@/store'
import qs from 'qs'
const user = store.state.user

// import { ObjectFormatFormData, ObjectFormatQueryString, ObjectEncodeBase64, getMethodRequestUrl } from '@/libs/util'

export const getData = (params, search) => { 
  return axios.request({
    url: `/User/index?page=${params.index}&pageSize=${params.size}&token=${user.token}&is_member=${search.is_member}&phone=${search.phone}`,
    method: 'get'
  })
}

export const createData = (params) => {
  return axios.request({
    url: `/users/create`,
    data: params,
    method: 'post'
  })
}

export const setPrice = (form) => {
  const params = qs.stringify({
    token: user.token,
    vip_price: form.vip_price
  })
  return axios.request({
    url: `/User/updateVipPrice`,
    data: params,
    method: 'post'
  })
}

export const changeworkData = (params) => {
  return axios.request({
    url: `/users/work/enable/${params.id}`,
    method: 'put'
  })
}

export const userscolumns = [
  {
    title: 'ID',
    key: 'uid_number',
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
    title: '年龄',
    key: 'age',
    tooltip: true
  },
  {
    title: '上级ID',
    key: 'recommended_uid',
    tooltip: true
  },
  {
    title: 'VIP到期时间',
    key: 'overtime',
    tooltip: true,
    width: 160
  },
  {
    title: '当前身份',
    key: 'identify',
    tooltip: true
  },
  {
    title: '操作',
    key: 'handle',
    fixed: 'right',
    align: 'center',
    width: 280,
    button: [
      (h, params, vm) => {
        return h('div', [
          h('i-button', {
            props: {
              type: 'primary',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                vm.$emit('on-integral', params)
              }
            }
          }, '查看积分信息'),
          h('i-button', {
            props: {
              type: 'primary',
              // icon: 'md-create',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                vm.$emit('on-showlower', params)
              }
            }
          }, '查看下级用户')
        ])
      }
    ]
  }
]