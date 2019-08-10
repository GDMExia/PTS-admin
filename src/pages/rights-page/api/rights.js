import axios from '@/libs/api.request'
import store from '@/store'
const account = store.state.user.userName
// export const rightsType = [
//   { id: 1, name: '权限管理' },
//   { id: 2, name: '患者管理' },
//   { id: 3, name: '医生管理' },
//   { id: 4, name: '设备管理' },
//   { id: 5, name: '统计管理' },
//   { id: 6, name: '通知管理' },
//   { id: 7, name: '商城管理' }
// ]

export const roleColumns = [
  { title: '系统角色类别', key: 'roleName' },
  { title: '功能权限', key: 'functionStr', tooltip: true },
  {
    title: '操作',
    key: 'handle',
    fixed: 'right',
    align: 'center',
    width: 180,
    button: [
      (h, params, vm) => {
        return h('div', [
          h(
            'i-button',
            {
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
            },
            '编辑'
          ),
          h(
            'Poptip',
            {
              props: {
                confirm: true,
                title: '确定要删除吗?',
                transfer: true,
                size: 'small'
              },
              on: {
                'on-ok': () => {
                  vm.$emit('on-delete', params)
                }
              }
            },
            [
              h(
                'i-button',
                {
                  props: {
                    type: 'error',
                    icon: 'ios-trash-outline',
                    size: 'small'
                  }
                },
                '删除'
              )
            ]
          )
        ])
      }
    ]
  }
]

export const getRoleIndex = (page) => {
  return axios.request({
    url: `/role`,
    headers: {
      functionId: 1
    },
    method: 'get'
  })
}

export const setRoleCreate = form => {
  return axios.request({
    url: '/role/create',
    headers: {
      functionId: 1
    },
    data: form,
    method: 'post'
  })
}

export const setRoleUpdate = form => {
  return axios.request({
    url:  `/role/update`,
    data: form,
    headers: {
      functionId: 1
    },
    method: 'put'
  })
}

export const setRoleDelete = id => {
  return axios.request({
    url: `/role/delete/${id}`,
    headers: {
      functionId: 1
    },
    method: 'delete'
  })
}

export const adminColumns = [
  { title: 'ID', key: 'adminUserId', width: 80 },
  { title: '帐号', key: 'account' },
  { title: '姓名', key: 'name' },
  { title: '角色', key: 'roleName' },
  { title: '状态', key: 'enabledStr' },
  {
    title: '操作',
    key: 'handle',
    fixed: 'right',
    align: 'left',
    width: 360,
    button: [
      (h, params, vm) => {
        return h('div', [
          h(
            'i-button',
            {
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
            },
            '编辑'
          ),
          h(
            'Poptip',
            {
              props: {
                confirm: true,
                title: '确定要删除吗?',
                transfer: true,
                size: 'small'
              },
              style: {
                marginRight: '5px',
                display: params.row.account === account ? 'none' : 'inline-block'
              },
              on: {
                'on-ok': () => {
                  vm.$emit('on-delete', params)
                }
              }
            },
            [
              h(
                'i-button',
                {
                  props: {
                    type: 'error',
                    icon: 'ios-trash-outline',
                    size: 'small'
                  }
                },
                '删除'
              )
            ]
          ),
          h(
            'i-button',
            {
              props: {
                type: 'success',
                icon: 'md-lock',
                size: 'small'
              },
              style: {
                marginRight: '5px',
                display: params.row.account === account ? 'none' : 'inline-block'
              },
              on: {
                click: () => {
                  vm.$emit('on-forbid', params)
                }
              }
            },
            !params.row.enabled ? '启用' : '禁用'
          ),
          h(
            'Poptip',
            {
              props: {
                confirm: true,
                title: '确定要重置密码吗?',
                transfer: true,
                size: 'small'
              },
              style: {
                display: params.row.account === account ? 'none' : 'inline-block'
              },
              on: {
                'on-ok': () => {
                  vm.$emit('on-reset', params)
                }
              }
            },
            [
              h(
                'i-button',
                {
                  props: {
                    type: 'warning',
                    icon: 'ios-redo',
                    size: 'small'
                  }
                },
                '重置密码'
              )
            ]
          )
        ])
      }
    ]
  }
]

export const getAdminIndex = page => {
  return axios.request({
    url: `/admin?pageIndex=${page.index}&pageSize=${page.size}`,
    headers: {
      functionId: 1
    },
    method: 'get'
  })
}

export const setAdminCreate = form => {
  return axios.request({
    url: '/admin/create',
    headers: {
      functionId: 1
    },
    data: form,
    method: 'post'
  })
}

export const setAdminUpdate = form => {
  return axios.request({
    url: `/admin/update`,
    headers: {
      functionId: 1
    },
    data: form,
    method: 'put'
  })
}

export const setAdminDelete = id => {
  return axios.request({
    url: `/admin/delete/${id}`,
    headers: {
      functionId: 1
    },
    method: 'delete'
  })
}

export const setAdminForbit = id => {
  return axios.request({
    url: `/admin/enable/${id}`,
    headers: {
      functionId: 1
    },
    method: 'put'
  })
}

export const setAdminReset = id => {
  return axios.request({
    url: `/admin/rest/${id}`,
    headers: {
      functionId: 1
    },
    method: 'put'
  })
}

export const getRightsType = () => {
  return axios.request({
    url: `/function`,
    method: 'get',
    headers: {
      functionId: 1
    }
  })
}