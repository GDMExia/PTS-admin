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

export const setUserPrice = (form) => {
  const params = qs.stringify({
    token: user.token,
    integral: form.integral,
    note: form.note,
    uid: form.uid
  })
  return axios.request({
    url: `/User/createUserIntegral`,
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

export const getIntegralDetail = () => {
  return axios.request({
    url: `/User/getUserIntegralRules?token=${user.token}`,
    method: 'get'
  })
}

export const getContent = (params) => {
  return axios.request({
    url: `/Index/getSigninBase?id=2&token=${params}`,
    method: 'get'
  })
}

export const setContent = (params) => {
  return axios.request({
    url: `/Index/updateSigninBase?token=${params.token}&content=${params.content}&id=2`,
    data: params,
    method: 'post'
  })
}

export const setIntegralInfo = form => {
  let params = qs.stringify(Object.assign(form, {
    token: user.token
  }))
  return axios.request({
    url: `/User/updateUserIntegralRules`,
    method: 'post',
    data: params
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
    title: '生日',
    key: 'age',
    tooltip: true
  },
  {
    title: '上级ID',
    key: 'recommended_uid',
    tooltip: true
  },
  // {
  //   title: 'VIP到期时间',
  //   key: 'overtime',
  //   tooltip: true,
  //   width: 160
  // },
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
    width: 350,
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
          }, '查看下级用户'),
          h('i-button', {
            props: {
              type: 'primary',
              // icon: 'md-create',
              size: 'small'
            },
            style: {
              marginRight: '5px',
              display: params.row.identify=='VIP'?'':'none'
            },
            on: {
              click: () => {
                vm.$emit('on-set', params)
              }
            }
          }, '调整积分')
        ])
      }
    ]
  }
]
