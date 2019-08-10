import axios from '@/libs/api.request'
import qs from 'qs'
export const residenceColumns = [
    { title: 'ID', key: 'id', tooltip: true },
    { title: '名称', key: 'hotelName', tooltip: true },
    { title: '是否推荐', key: 'isrecommendStr', tooltip: true },
    {
        title: '操作',
        key: 'handle',
        align: 'center',
        width: 120,
        fixed: 'right',
        button: [(h, params, vm) => {
            return h('div', [
                h(
                    'i-button', {
                        props: {
                            type: 'warning',
                            icon: 'ios-ribbon',
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
                    },
                    params.row.isrecommend?'不推荐':'推荐'
                )
            ])
        }]
    },
]

import expandRow from '@/mock/table-expand.vue'
export const groupColumns = [
    { title: '名称', key: 'name', tooltip: true },
    { title: '分票规则', key: 'rules', tooltip: true },
    {
        title: '民宿',
        key: 'residenceArray',
        align: 'center',
        type: 'expand',
        render: (h, params) => {
            return h(expandRow, {
                props: {
                    row: params.row.residenceArray
                },
            })
        }
    },
    { title: '状态', key: 'enableStr', tooltip: true },
    {
        title: '操作',
        key: 'handle',
        align: 'center',
        width: 360,
        // fixed: 'right',
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
                            type: 'warning',
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
                    },
                    params.row.enable?'禁用':'启用'
                ),
            ])
        }]
    }
]

export const residenceNameColumn = [
    { title: '民宿名称', key: 'name', tooltip: true },
]

export const ticketsColumn = [
    { title: '名称', key: 'title', tooltip: true },
    {
        title: '操作',
        key: 'handle',
        align: 'center',
        button: [(h, params, vm) => {
            return h('div', [
                h(
                    'i-button', {
                        props: {
                            type: 'primary',
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
                    },
                    '查看'
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
                   '编辑'
                ),
            ])
        }]
    }
]

export const ticketsRecidenceColumn = [
    { title: '名称', key: 'name', tooltip: true },
    { 
        title: '日船票数量', 
        key: 'handle',
        button: [(h, params, vm) => {
            if (params.row.isEdit) {
                return h('Input', {
                    props: {
                        type: 'text',
                        value: params.row.shipNum, // 此处如何让数据双向绑定
                        placeholder: '请输入'
                    },
                    on: {
                        'on-blur': (event) => {
                            params.row.shipNum = event.target.value
                            vm.$emit('on-blur', params)
                        }
                    }
                })
            } else {
                return h('div', {
                }, params.row.shipNum)
            }
        }]
    },
]

export const getResidenceList = page => {
    return axios.request({
        url: `/pms/list?pageIndex=${page.index}&pageSize=${page.size}&key=${page.search}`,
        headers: {
          functionId: 3
        },
        method: 'get'
    })
}

export const setResidenceCreate = form => {
    let params = qs.stringify(form)
    return axios.request({
        url: `/pms/add/${form.hotelId}`,
        headers: {
          functionId: 3
        },
        method: 'post'
    })
}

export const setResidenceChange = form => {
    return axios.request({
        url: `/pms/recommend/${form.id}?recommendImg=${form.recommendImg}`,
        headers: {
          functionId: 3
        },
        method: 'put'
    })
}

export const getTicketsList = page => {
    return axios.request({
        url: `/pms/sortTicket/list?pageIndex=${page.index}&pageSize=${page.size}`,
        headers: {
          functionId: 3
        },
        method: 'get'
    })
}

export const getTicketsInfo = page => {
    return axios.request({
        url: `/pms/sortTicket/blank?pageIndex=${page.index}&pageSize=${page.size}`,
        headers: {
          functionId: 3
        },
        method: 'get'
    })
}

export const getTicketsDetail = (id, page) => {
    return axios.request({
        url: `/pms/sortTicket/info?id=${id}&pageIndex=${page.index}&pageSize=${page.size}`,
        headers: {
          functionId: 3
        },
        method: 'get'
    })
}

export const setTicketsInfo = form => {
    return axios.request({
        url: `/pms/sortTicket/add`,
        headers: {
          functionId: 3
        },
        data: form,
        method: 'post'
    })
}

export const setTicketsInfoEdit = form => {
    return axios.request({
        url: `/pms/sortTicket/editor?id=${form.id}`,
        headers: {
          functionId: 3
        },
        data: form,
        method: 'put'
    })
}