import axios from '@/libs/api.request'
import qs from 'qs'
export const storeColumn = [
    { title: '账号', key: 'title', tooltip: true },
    { title: '商家名称', key: 'status', tooltip: true },
    { title: '联系人', key: 'updateTime', tooltip: true },
    { title: '联系方式', key: 'updateTime', tooltip: true },
    { title: '状态', key: 'updateTime', tooltip: true },
    {
        title: '操作',
        key: 'handle',
        align: 'center',
        width: 360,
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
                            type: 'success',
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
                            type: 'warning',
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
                    '禁用'
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
                                vm.$emit('on-delete', params)
                            }
                        }
                    },
                    [
                        h(
                            'i-button',
                            {
                                props: {
                                    type: 'info',
                                    icon: 'ios-trash-outline',
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

export const getGuideList = page => {
    return axios.request({
        url: `/guides/list?pageIndex=${page.index}&pageSize=${page.size}`,
        headers: {
          functionId: 9
        },
        method: 'get'
    })
}

export const setGuideCreate = form => {
    let params = {
        intro: form.intro,
        title: form.title
    }
    return axios.request({
        url: `/guides/add`,
        headers: {
          functionId: 9
        },
        data: params,
        method: 'post'
    })
}

export const getGuideDetail = id => {
    return axios.request({
        url: `/guides/list/${id}`,
        headers: {
          functionId: 9
        },
        method: 'get'
    })
}

export const setGuideEdit = form => {
    return axios.request({
        url: `/guides/editorGuides`,
        headers: {
          functionId: 9
        },
        data: form,
        method: 'put'
    })
}

export const setGuideChange = id => {
    return axios.request({
        url: `/guides/editorStatus/${id}`,
        headers: {
          functionId: 9
        },
        method: 'put'
    })
}

export const setGuideDelete = id => {
    return axios.request({
        url: `/guides/deleteInfo/${id}`,
        headers: {
          functionId: 9
        },
        method: 'delete'
    })
}

export const getImage = () => {
    return axios.request({
        url: `/guides/getPicture`,
        headers: {
          functionId: 9
        },
        method: 'get'
    })
}

export const setImage = form => {
    return axios.request({
        url: `/guides/addPicture`,
        headers: {
          functionId: 9
        },
        data: form,
        method: 'put'
    })
}
