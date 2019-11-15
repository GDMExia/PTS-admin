import axios from '@/libs/api.request'
import qs from 'qs'
import store from '@/store'
const user = store.state.user
export const storeColumn = [
    // { title: '账号', key: 'admin_name', tooltip: true },
    { title: '商家ID', key: 'm_number', tooltip: true,width: 120 },
    { title: '商家名称', key: 'real_name', tooltip: true,width: 120, },
    { title: '联系人', key: 'contact', tooltip: true,width: 120 },
    { title: '联系方式', key: 'phone', tooltip: true,width: 120 },
    { title: '启用状态', key: 'status', tooltip: true,width: 120 },
    { title: '签约状态', key: 'sign', tooltip: true,width: 120 },
    {
        title: '是否上架',
        key: 'handle',
        align: 'center',
        width: 90,
        button: [(h, params, vm) => {
            return h('Poptip', {
                    props: {
                        title: `确认${params.row.is_show == '1' ? '下' : '上'}架吗？`,
                        confirm: true,
                        transfer: true
                    },
                    on: {
                        'on-ok': () => {
                            vm.$emit('on-change', params)
                        },
                        'on-cancel': () => {
                            vm.$emit('on-cancelchange', params)
                        }
                    }
                },[
                    h('i-switch', {
                        props: {
                            value:params.row.is_show=='1'?true:false,
                        }
                    }
                    )
                ]
                )

        }],
    },
    {
        title: '操作',
        key: 'handle',
        align: 'center',
        width: 400,
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
                // h(
                //     'Poptip',
                //     {
                //         props: {
                //             confirm: true,
                //             title: '确定要删除吗?',
                //             transfer: true,
                //             size: 'small'
                //         },
                //         style: {
                //             marginRight: '5px'
                //         },
                //         on: {
                //             'on-ok': () => {
                //                 vm.$emit('on-delete', params)
                //             }
                //         }
                //     },
                //     [
                //         h(
                //             'i-button',
                //             {
                //                 props: {
                //                     type: 'error',
                //                     icon: 'ios-trash-outline',
                //                     size: 'small'
                //                 }
                //             },
                //             '删除'
                //         )
                //     ]
                // ),
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

export const getStoreList = (page, form) => {
    if(form){

    }else{
      form={
        phone:'',
        goods_name:''
      }
    }
    return axios.request({
        url: `/Merchants/getMerchantsList?page=${page.index}&pageSize=${page.size}&token=${user.token}&phone=${form.phone}&real_name=${form.goods_name}`,
        method: 'get'
    })
}

export const setStoreCreate = form => {
    let params = qs.stringify(Object.assign(form, {
        token: user.token
    }))
    return axios.request({
        url: `/Merchants/create`,
        data: params,
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
        url: `/Merchants/updateMerchantsInfo`,
        data: params,
        method: 'post'
    })
}

export const getType = () => {
    return axios.request({
        url: `/Category/getMerchantsCatetree?token=${user.token}`,
        method: 'get'
    })
}

export const applyColumn = [
    // { title: '商家ID', key: 'id', tooltip: true },
    { title: '商家名称', key: 'merchants_name', tooltip: true },
    // { title: '联系人', key: 'merchant_applicant', tooltip: true },
    // { title: '联系方式', key: 'merchant_applicant_phone', tooltip: true },
    // { title: '地址', key: 'address', tooltip: true },
    // { title: '服务热线', key: 'hotline_phone', tooltip: true },
    { title: '推介人姓名', key: 'recommended_real_name', tooltip: true },
    { title: '推介人手机号', key: 'recommended_phone', tooltip: true },
    { title: '提交时间', key: 'create_time', tooltip: true },
    {
        title: '状态',
        key: 'is_audit',
        render: (h, params) => {
            return h('div', {
                domProps: {
                    innerHTML: params.row.is_audit==0?'待审核':params.row.is_audit==1?'通过':'未通过'
                },
                type: {
                    color: params.row.is_audit==0?'black':params.row.is_audit==1?'green':'red'
                }
            })
        },
        tooltip: true
    },
    {
        title: '操作',
        key: 'handle',
        align: 'center',
        width: 350,
        fixed: 'right',
        button: [(h, params, vm) => {
            return h('div', [
                h(
                    'i-button', {
                        props: {
                            type: 'primary',
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
                    '查看完整信息'
                ),
                h(
                    'Poptip',
                    {
                        props: {
                            confirm: true,
                            title: '您是否确定审核通过?通过后将为该商户创建账号',
                            transfer: true,
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            'on-ok': () => {
                                vm.$emit('on-able', params)
                            }
                        }
                    },
                    [
                        h(
                            'i-button',
                            {
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                style: {
                                    display: params.row.is_audit == 0 ? '' : 'none'
                                }
                            },
                            '审核通过'
                        )
                    ]
                ),
                h(
                    'Poptip',
                    {
                        props: {
                            confirm: true,
                            title: '您是否确定审核不通过?',
                            transfer: true,
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            'on-ok': () => {
                                vm.$emit('on-disable', params)
                            }
                        }
                    },
                    [
                        h(
                            'i-button',
                            {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                    display: params.row.is_audit == 0 ? '' : 'none'
                                }
                            },
                            '审核不通过'
                        )
                    ]
                ),
                h(
                    'Poptip',
                    {
                        props: {
                            confirm: true,
                            title: '您是否确定删除?',
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

export const getApplyList = page => {
    return axios.request({
        url: `/Merchants/getMerchantsInformation?page=${page.index}&pageSize=${page.size}&token=${user.token}`,
        method: 'get'
    })
}

export const getApplyDetail = id => {
    return axios.request({
        url: `/Merchants/getMerchantsInformationView?id=${id}&token=${user.token}`,
        method: 'get'
    })
}

export const setAgree = id => {
    return axios.request({
        url: `/Merchants/updateMerchantsInformation?id=${id}&token=${user.token}&is_audit=1`,
        method: 'post'
    })
}

export const setDisagree = id => {
    return axios.request({
        url: `/Merchants/updateMerchantsInformation?id=${id}&token=${user.token}&is_audit=2`,
        method: 'post'
    })
}

export const deleteApply = id => {
    return axios.request({
        url: `/Merchants/deleteMerchantsInformation?id=${id}&token=${user.token}`,
        method: 'get'
    })
}

export const setStoreChange = form => {
    return axios.request({
        url: `/Merchants/updateShow?id=${form.id}&is_show=${form.is_show}&token=${user.token}`,
        method: 'post'
    })
}
