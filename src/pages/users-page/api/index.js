import axios from '@/libs/api.request' // 引入 请求模块
import config from '@/config/'

// import { ObjectFormatFormData, ObjectFormatQueryString, ObjectEncodeBase64, getMethodRequestUrl } from '@/libs/util'

export const getData = (params) => { 
  return axios.request({
    url: `/users?pageIndex=${params.index}&pageSize=${params.size}&userType=${params.character==='全部'?'':params.character}`,
    method: 'get'
  })
}

export const getCharacterList = () => {
  return axios.request({
    url: `/users/type`,
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

export const getProjectList = (params) => {
  return axios.request({
    url: `/project/list`,
    method: 'get'
  })
}

export const changeData = (params) => {
  return axios.request({
    url: `/users/enable/${params.id}`,
    method: 'put'
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
    key: 'id',
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
    key: 'upperID',
    tooltip: true
  },
  {
    title: 'VIP到期时间',
    key: 'overtime',
    tooltip: true
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
    width: 300,
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