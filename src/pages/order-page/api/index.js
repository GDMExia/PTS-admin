import axios from '@/libs/api.request'
import {Base64} from 'js-base64'
export const allOrderColumn = [
    { title: '订单号', key: 'orderNum', tooltip: true },
    { title: '使用日期', key: 'useTime', tooltip: true },
    { title: '价格(元)', key: 'totalPrice', tooltip: true },
    { title: '下单游客用户名', key: 'orderUser', tooltip: true },
    { title: '下单游客手机号', key: 'orderMobile', tooltip: true },
    {
        title: '操作',
        key: 'handle',
        align: 'left',
        width: 260,
        fixed: 'right',
        button: [(h, params, vm) => {
            const status = params.row.status
            return h('div', [
                h(
                    'i-button', {
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
                    },
                    '查看详情'
                ),
                h(
                    'Poptip',
                    {
                        props: {
                            confirm: true,
                            title: '您是否确定取消该订单?取消后，订单金额将原路返还',
                            transfer: true,
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px',
                            display: status == 1 || status == 2?'inline-block':'none'
                        },
                        on: {
                            'on-ok': () => {
                                vm.$emit('on-cancel', params)
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
                            '取消订单'
                        )
                    ]
                ),
            ])
        }]
    }
]

export const evaluatedColumn = [
    { title: '订单号', key: 'orderId', tooltip: true },
    { title: '使用日期', key: 'useTime', tooltip: true },
    { title: '价格(元)', key: 'price', tooltip: true },
    { title: '下单游客用户名', key: 'userName', tooltip: true },
    { title: '下单游客手机号', key: 'userPhone', tooltip: true },
    { title: '评价状态', key: 'evaluated', tooltip: true },
    {
        title: '操作',
        key: 'handle',
        align: 'center',
        width: 360,
        fixed: 'right',
        button: [(h, params, vm) => {
            const status = params.row.status
            return h('div', [
                h(
                    'i-button', {
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
                    },
                    '查看详情'
                )
            ])
        }]
    }
]

export const cancelColumn = [
    { title: '订单号', key: 'orderNum', tooltip: true },
    { title: '使用日期', key: 'useTime', tooltip: true },
    { title: '价格(元)', key: 'totalPrice', tooltip: true },
    { title: '下单游客用户名', key: 'orderUser', tooltip: true },
    { title: '下单游客手机号', key: 'orderMobile', tooltip: true },
    { title: '取消时间', key: 'blockTime', tooltip: true },
    {
        title: '操作',
        key: 'handle',
        align: 'center',
        width: 360,
        fixed: 'right',
        button: [(h, params, vm) => {
            const status = params.row.status
            return h('div', [
                h(
                    'i-button', {
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
                    },
                    '查看详情'
                )
            ])
        }]
    }
]

export const orderColumn = [
    { title: '订单号', key: 'orderNum', tooltip: true },
    { title: '使用日期', key: 'useTime', tooltip: true },
    { title: '价格(元)', key: 'totalPrice', tooltip: true },
    { title: '下单游客用户名', key: 'orderUser', tooltip: true },
    { title: '下单游客手机号', key: 'orderMobile', tooltip: true },
    { title: '下单时间', key: 'createTime', tooltip: true },
]

export const pedestriansColumn = [
    { title: '姓名', key: 'orderId', tooltip: true },
    { title: '人员类型', key: 'useTime', tooltip: true },
    { title: '证件号', key: 'price', tooltip: true },
]

export const residenceColumn = [
    { title: '入住日期', key: 'orderId', tooltip: true },
    { title: '入住民宿', key: 'useTime', tooltip: true },
    { title: '房间名称', key: 'price', tooltip: true },
    { title: '数量', key: 'price', tooltip: true },
    { title: '总价', key: 'price', tooltip: true },
]

export const busTicketColumn = [
    { title: '出发时间', key: 'orderId', tooltip: true },
    { title: '返回时间', key: 'useTime', tooltip: true },
    { title: '总量', key: 'price', tooltip: true },
    { title: '总价(元)', key: 'price', tooltip: true },
]

export const routineTicketsColumn = [
    { title: '开航时间', key: 'orderId', tooltip: true },
    { title: '返航时间', key: 'useTime', tooltip: true },
    { title: '全价票量', key: 'price', tooltip: true },
    { title: '半价票量', key: 'price', tooltip: true },
    { title: '使用人', key: 'price', tooltip: true },
    { title: '总价(元)', key: 'price', tooltip: true },
]

export const temporaryTicketsColumn = [
    { title: '出发时间', key: 'orderId', tooltip: true },
    { title: '返航时间', key: 'useTime', tooltip: true },
    { title: '全价票量', key: 'price', tooltip: true },
    { title: '半价票量', key: 'price', tooltip: true },
    { title: '使用人', key: 'price', tooltip: true },
    { title: '总价(元)', key: 'price', tooltip: true },
]

export const entranceTicketsColumn = [
    { title: '使用日期', key: 'useTime', tooltip: true },
    { title: '全价票量', key: 'fullPriceTicketAmount', tooltip: true },
    { title: '半价票量', key: 'halfPriceTicketAmount', tooltip: true },
    { title: '总价(元)', key: 'totalPrice', tooltip: true },
]

export const trafficTicketsColumn = [
    { title: '使用日期', key: 'useTime', tooltip: true },
    { title: '每日票量', key: 'amount', tooltip: true },
    { title: '总价(元)', key: 'totalPrice', tooltip: true },
]

export const ItemTicketsColumn = [
    { title: '项目名称', key: 'amusementItemProjectName', tooltip: true },
    { title: '使用时间', key: 'useTime', tooltip: true },
    { title: '总量', key: 'amount', tooltip: true },
    { title: '总价(元)', key: 'totalPrice', tooltip: true },
]

export const evaluationsColumn = [
    { title: '评价时间', key: 'orderId', tooltip: true },
    { title: '总评', key: 'price', tooltip: true },
    { title: '位置评分', key: 'price', tooltip: true },
    { title: '服务评分', key: 'price', tooltip: true },
    { title: '卫生评分', key: 'price', tooltip: true },
    { title: '设施评分', key: 'price', tooltip: true },
    { title: '评价内容', key: 'price', tooltip: true },
    {
        title: '评价图片',
        key: 'handle',
        align: 'center',
        width: 120,
        button: [(h, params, vm) => {
            return h('div', [
                h(
                    'i-button', {
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
                    },
                    '查看'
                )
            ])
        }]
    },
    { title: '状态', key: 'price', tooltip: true },
]

export const auditColumn = [
    { title: '订单号', key: 'orderId', tooltip: true },
    { title: '评价时间', key: 'orderId', tooltip: true },
    { title: '总评', key: 'price', tooltip: true },
    { title: '位置评分', key: 'price', tooltip: true },
    { title: '服务评分', key: 'price', tooltip: true },
    { title: '卫生评分', key: 'price', tooltip: true },
    { title: '设施评分', key: 'price', tooltip: true },
    { title: '评价内容', key: 'price', tooltip: true },
    {
        title: '评价图片',
        key: 'handle',
        align: 'center',
        width: 120,
        button: [(h, params, vm) => {
            return h('div', [
                h(
                    'i-button', {
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
                    },
                    '查看'
                )
            ])
        }]
    },
    {
        title: '操作',
        key: 'handle',
        align: 'center',
        width: 360,
        fixed: 'right',
        button: [(h, params, vm) => {
            return h('div', [
                h(
                    'Poptip',
                    {
                        props: {
                            confirm: true,
                            title: '确定审核通过吗?',
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
                                    type: 'primary',
                                    icon: 'ios-checkmark-circle-outline',
                                    size: 'small'
                                }
                            },
                            '通过'
                        )
                    ]
                ),
                h(
                    'Poptip',
                    {
                        props: {
                            confirm: true,
                            title: '确定审核不通过吗?',
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
                                    icon: 'ios-close-circle-outline',
                                    size: 'small'
                                }
                            },
                            '不通过'
                        )
                    ]
                ),
            ])
        }]
    }
]

export const getOrderList = (page, type) => {
    let search = Base64.encode(page.search)
    return axios.request({
        url: `/orders?pageNum=${page.index}&pageSize=${page.size}&type=${type}&search=${search}`,    
        method: 'get'
    })
}

export const getOrderDetail = id => {
    return axios.request({
        url: `/order?orderId=${id}`,       
        method: 'get'
    })
}

export const setOrderCancel = id => {
    return axios.request({
        url: `/order?orderId=${id}`,
        method: 'delete'
    })
}