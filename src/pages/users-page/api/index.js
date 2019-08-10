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

export const staffcolumns = [
  {
    title: '角色',
    key: 'roleName',
    tooltip: true
  },
  {
    title: '项目类型',
    key: 'projectType',
    tooltip: true
  },
  {
    title: '姓名',
    key: 'userName',
    tooltip: true
  },
  {
    title: '手机号',
    key: 'telephone',
    tooltip: true
  },
  {
    title: '状态',
    render: (h, params) => {
      return h('div', {
        domProps: {
          innerHTML: !params.row.isBlocked? '禁用' : '启用'
        }
      })
    },
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
                vm.$emit('on-handle', params)
              }
            }
          }, params.row.roleName.indexOf("检票员")!==-1?'检票管理':'出行管理'),
          h('i-button', {
            props: {
              type: !params.row.isBlocked?'success':'error',
              icon: 'md-create',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                vm.$emit('on-change', params)
              }
            }
          }, !params.row.isBlocked?'启用':'禁用')
        ])
      }
    ]
  }
]

export const touristcolumns = [
  {
    title: '用户名',
    key: 'userName',
    tooltip: true
  },
  {
    title: '手机号',
    key: 'telephone',
    tooltip: true
  },
  {
    title: '注册时间',
    key: 'regTime',
    tooltip: true
  },
  {
    title: '状态',
    render: (h, params) => {
      return h('div', {
        domProps: {
          innerHTML: !params.row.isBlocked? '禁用' : '启用'
        }
      })
    },
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
                vm.$emit('on-handle', params)
              }
            }
          }, '出行人信息'),
          h('i-button', {
            props: {
              type: !params.row.isBlocked?'success':'error',
              icon: 'md-create',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                vm.$emit('on-change', params)
              }
            }
          }, !params.row.isBlocked?'启用':'禁用')
        ])
      }
    ]
  }
]