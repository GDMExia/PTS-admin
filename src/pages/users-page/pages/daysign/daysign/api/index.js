import axios from '@/libs/api.request' // 引入 请求模块
import qs from 'qs'
import store from '@/store'
const account = store.state.user.userName
const user = store.state.user

export const getData = page => { 
  return axios.request({
    url: `/User/getSignFiles?token=${user.token}&page=${page.index}&pageSize=${page.size}`,
    method: 'get'
  })
}

export const setCreat = form => {
  const params = qs.stringify(Object.assign(form, {
    token: user.token
  }))
  return axios.request({
    url: `/User/createSignFiles`,
    data: params,
    method: 'post'
  })
}

export const columns = [
  {
    title: '日期',
    key: 'create_time',
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
              type: 'success',
              icon: 'md-eye',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                vm.$emit('on-view', params)
              }
            }
          }, '查看'),
          h('i-button', {
            props: {
              type: 'primary',
              icon: 'md-create',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                vm.$emit('on-edit', params)
              }
            }
          }, '更改')
        ])
      }
    ]
  }
]
