import axios from '@/libs/api.request'
import qs from 'qs'
import store from '@/store'
const user = store.state.user
import { Base64 } from 'js-base64'
export const residenceColumns = [
    { title: 'ID', key: 'id', tooltip: true,width: 80 },
    { title: '活动所属', key: 'pidStr', tooltip: true,width: 120 },
    { title: '标题', key: 'goods_name', tooltip: true,width: 120 },
    { title: '分类', key: 'cate_name', tooltip: true,width: 120 },
    { title: '截止时间', key: 'registration_time', tooltip: true,width: 120 },
    { title: '人数上限', key: 'registration_number', tooltip: true,width: 120 },
    { title: '剩余数量', key: 'remaining_number', tooltip: true,width: 120 },
    { title: '参与时间', key: 'join_time', tooltip: true,width: 120 },
    { title: '支付金额(元)', key: 'goods_price', tooltip: true,width: 120 },
    { title: '积分抵扣', key: 'discount_price', tooltip: true,width: 120 },
    { title: '状态', key: 'status', tooltip: true,width: 120 },
    { title: '发布时间', key: 'create_time', tooltip: true,width: 120 },
    {
        title: '操作',
        key: 'handle',
        align: 'left',
        width: 320,
        fixed: 'right',
        button: [(h, params, vm) => {
            return h('div', [
                h(
                    'Poptip',
                    {
                      props: {
                        confirm: true,
                        title: '请审核该活动?',
                        transfer: true,
                        size: 'small',
                        okText: '通过',
                        cancelText: '不通过'
                      },
                      style: {
                        marginRight: '5px',
                        display: params.row.goods_status == 3?'inline-block':'none'
                      },
                      on: {
                        'on-ok': () => {
                          vm.$emit('on-audit', {data: params, goods_status: 1})
                        },
                        'on-cancel': () => {
                            vm.$emit('on-audit', {data: params, goods_status: 4})
                        }
                      }
                    },
                    [
                      h(
                        'i-button',
                        {
                            props: {
                                type: 'warning',
                                icon: 'ios-ribbon',
                                size: 'small'
                            },
                        },
                        '审核'
                      )
                    ]
                ),
                h(
                    'i-button', {
                        props: {
                            type: 'primary',
                            icon: 'ios-create',
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
                    '查看报名'
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
            ])
        }]
    },
]

export const usersColumns = [
    { title: '券号', key: 'coupons_number', tooltip: true },
    { title: '所属订单号', key: 'order_no', tooltip: true },
    { title: '当前状态', key: 'status', tooltip: true },
    { title: '核销时间', key: 'update_time', tooltip: true },
]

export const categoryColumn = [
    { title: '分类名称', key: 'cate_name', tooltip: true },
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
            ])
        }]
    }
]

export const getResidenceList = page => {
    let search = page.search.replace(/\_/g, "/").replace(/\-/g, "+")
    search = search!=''?JSON.parse(Base64.decode(search)):{search: '',cid:'',goods_status: ''}
    return axios.request({
        url: `/Goods/goodslist?page=${page.index}&pageSize=${page.size}&goods_name=${search.search}&cid=${search.cid}&goods_status=${search.goods_status}&token=${user.token}`,       
        method: 'get'
    })
}

export const getResidenceSearchList = page => {
    return axios.request({
        url: `/Goods/goodslist?page=${page.index}&pageSize=${page.size}&goods_name=${page.search}&cid=&goods_status=1&token=${user.token}`,       
        method: 'get'
    })
}
export const setActivityChange = form => {
    let params = qs.stringify(Object.assign(form, {
        token: user.token
    }))
    return axios.request({
        url: `/Goods/updateAudit`,       
        data: params,
        method: 'post'
    })
}

export const setActivityDelete = id => {
    return axios.request({
        url: `/Goods/deleteGoods?token=${user.token}&id=${id}`,       
        method: 'get'
    })
}

export const setResidenceCreate = form => {
    let params = qs.stringify(Object.assign(form, {
        token: user.token
    }))
    return axios.request({
        url: `/Goods/createGoods`,       
        data: params,
        method: 'post'
    })
}

export const getActivityUsers = id => {
    return axios.request({
        url: `/Goods/getGoodsSiginList?token=${user.token}&goods_id=${id}`,
        
        method: 'get'
    })
}

export const getCategoryList = () => {
    return axios.request({
        url: `/Goods/getGoodsCategory?token=${user.token}`,       
        method: 'get'
    })
}

export const setCategoryDelete = id => {
    return axios.request({
        url: `/Goods/deleteGoodsCategory?id=${id}&token=${user.token}`,       
        method: 'get'
    })
}

export const setCategoryUpdate = form => {
    const params = qs.stringify(Object.assign(form, {
        token: user.token
    }))
    return axios.request({
        url: `/Goods/createGoodsCategory`,
        data: params,
        method: 'post'
    })
}

export const setTimeInfo = form => {
    return axios.request({
        url: `/Goods/updateDateTime?date_time=${form.date}&token=${user.token}`,
        method: 'post'
    })
}