import axios from '@/libs/api.request'
import qs from 'qs'
import store from '@/store'
const user = store.state.user
export const storeColumn = [
    { title: '账号', key: 'admin_name', tooltip: true },
    { title: '商家名称', key: 'real_name', tooltip: true },
    { title: '联系人', key: 'contact', tooltip: true },
    { title: '联系方式', key: 'phone', tooltip: true },
    { title: '状态', key: 'status', tooltip: true },
    {
        title: '操作',
        key: 'handle',
        align: 'center',
        width: 460,
        fixed: 'right',
        button: [(h, params, vm) => {
            return h('div', [
                h(
                    'i-button', {
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
                    'i-button', {
                        props: {
                            type: 'info',
                            icon: 'md-create',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                vm.$emit('on-info', params)
                            }
                        }
                    },
                    '编辑商家信息'
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
                            marginRight: '5px'
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
                    'i-button', {
                        props: {
                            type: 'success',
                            icon: 'md-lock',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
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
                            marginRight: '5px'
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
                ),
            ])
        }]
    }
]

export const getStoreList = page => {
    return axios.request({
        url: `/Merchants/getMerchantsList?page=${page.index}&pageSize=${page.size}&token=${user.token}`,
        method: 'get'
    })
}

export const setStoreCreate = form => {
    let params = qs.stringify(Object.assign(form, {
        token: user.token
    }))
    return axios.request({
        url: `/Merchants/create?${params}`,
        method: 'post'
    })
}

export const setStoreDelete = id => {
    const params = qs.stringify({
        mid: id,
        token: user.token
    })
    return axios.request({
        url: `/Merchants/delete?${params}`,
        method: 'get'
    })
}

export const getStoreInfo = id => {
    const params = qs.stringify({
        mid: id,
        token: user.token
    })
    return axios.request({
        url: `/Merchants/getMerchantsInfo?${params}`,
        method: 'get'
    })
}

export const setStoreInfo = form => {
    let params = qs.stringify(Object.assign(form, {
        token: user.token
    }))
    return axios.request({
        url: `/Merchants/updateMerchantsInfo?${params}`,
        method: 'post'
    })
}

export const getType = () => {
    return axios.request({
        url: `/Category/getMerchantsCatetree?token=${user.token}`,
        method: 'get'
    })
}