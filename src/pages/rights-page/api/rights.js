import axios from '@/libs/api.request'
import qs from 'qs'
import store from '@/store'
const account = store.state.user.userName
const user = store.state.user
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
  { title: '系统角色类别', key: 'permissions_name' },
  { title: '功能权限', key: 'permissions_group', tooltip: true },
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

export const getRoleIndex = () => {
  return axios.request({
    url: `/admin.php/Permissions/roleList?token=${user.token}`,
    method: 'get'
  })
}

export const setRoleCreate = form => {
  let params = qs.stringify(Object.assign(form, {token: user.token}))
  return axios.request({
    url: `/admin.php/Permissions/createRoleSave?${params}`,
    data: form,
    method: 'post'
  })
}

export const setRoleDelete = id => {
  const params = qs.stringify({
    token: user.token,
    role_id:id
  })
  return axios.request({
    url: `/admin.php/Permissions/deleteRole?${params}`,
    headers: {
      functionId: 1
    },
    method: 'delete'
  })
}

export const adminColumns = [
  { title: 'ID', key: 'uid', width: 80 },
  { title: '帐号', key: 'admin_name' },
  { title: '姓名', key: 'real_name' },
  { title: '角色', key: 'permissions_name' },
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
            params.row.is_disable!='0' ? '启用' : '禁用'
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
    url: `/admin.php/Permissions/userList?page=${page.index}&pageSize=${page.size}&token=${user.token}`,
    method: 'get'
  })
}

export const setAdminCreate = form => {
  let params = qs.stringify(Object.assign(form, {token: user.token}))
  return axios.request({
    url: `/admin.php/Permissions/createUserSave?${params}`,
    method: 'post'
  })
}

export const setAdminDelete = id => {
  let params = qs.stringify({
    token: user.token,
    uid: id
  })
  return axios.request({
    url: `/admin.php/Permissions/deleteUser?${params}`,
    headers: {
      functionId: 1
    },
    method: 'delete'
  })
}

export const setAdminForbit = form => {
  let params = qs.stringify(Object.assign(form, {token: user.token}))
  return axios.request({
    url: `/admin.php/Permissions/stopUser?${params}`,
    headers: {
      functionId: 1
    },
    method: 'put'
  })
}

export const setAdminReset = id => {
  let params = qs.stringify({
    token: user.token,
    uid: id
  })
  return axios.request({
    url: `/admin.php/Permissions/restPassUser?${params}`,
    headers: {
      functionId: 1
    },
    method: 'put'
  })
}

export const getRightsType = () => {
  return axios.request({
    url: `/admin.php/Permissions/getMenuList?token=${user.token}`,
    method: 'get',
  })
}