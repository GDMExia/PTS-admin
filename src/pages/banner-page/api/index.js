import axios from '@/libs/api.request'
import store from '@/store'
const user = store.state.user
import qs from 'qs'
export const bannerColumns = [
    {title: '广告位', key: 'id'},
    {title: '标题', key: 'content', tooltip: true},
    {title: '跳转', key: 'linkUrl', tooltip: true},
    {title: '发布时间', key: 'create_time', tooltip: true},
    {title: '状态', key: 'status', tooltip: true},
    {
        title: '操作',
        key: 'handle',
        align: 'center',
        width: 300,
        fixed: 'right',
        button: [(h, params, vm) => {
            console.log(params, '2333')
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
                            icon: 'md-arrow-up',
                            size: 'small',
                            disabled: params.index==0?true:false
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                vm.$emit('on-change', {data:params, sort_type: 1})
                            }
                        }
                    },
                    '上移'
                ),
                h(
                    'i-button', {
                        props: {
                            type: 'error',
                            icon: 'md-arrow-round-down',
                            size: 'small',
                            disabled: params.index==4?true:false
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                vm.$emit('on-change', {data:params, sort_type: 2})
                            }
                        }
                    },
                    '下移'
                ),
                h(
                    'i-button', {
                        props: {
                            type: 'warning',
                            icon: 'md-filing',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                vm.$emit('on-offline', params)
                            }
                        }
                    },
                    params.row.is_show==1?'下线':'上线'
                ),
            ])
        }]
    }
]

export const storeBannerColumns = [
    {title: '广告位', key: 'id'},
    {title: '标题', key: 'content', tooltip: true},
    {title: '跳转', key: 'linkUrl', tooltip: true},
    {title: '发布时间', key: 'create_time', tooltip: true},
    {title: '状态', key: 'status', tooltip: true},
    {
        title: '操作',
        key: 'handle',
        align: 'center',
        width: 300,
        fixed: 'right',
        button: [(h, params, vm) => {
            console.log(params, '2333')
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
                            icon: 'md-arrow-up',
                            size: 'small',
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                vm.$emit('on-change', {data:params, sort_type: 1})
                            }
                        }
                    },
                    '上移'
                ),
                h(
                    'i-button', {
                        props: {
                            type: 'error',
                            icon: 'md-arrow-round-down',
                            size: 'small',
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                vm.$emit('on-change', {data:params, sort_type: 2})
                            }
                        }
                    },
                    '下移'
                ),
                h(
                    'i-button', {
                        props: {
                            type: 'warning',
                            icon: 'md-filing',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                vm.$emit('on-offline', params)
                            }
                        }
                    },
                    params.row.is_show==1?'下线':'上线'
                ),
            ])
        }]
    }
]

export const getBannerList = type => {
    return axios.request({
        url: `/Advertising/getAdvertising?token=${user.token}&cid=${type}`,
        method: 'get'
    })
}

export const getStoreBannerList = form => {
    return axios.request({
        url: `/Advertising/getAdvertising?token=${user.token}&cid=${form.cid}&cate_id=${form.cate_id}`,
        headers:{
            
        },
        method: 'get'
    })
}

export const getBannerDetail = id => {
    return axios.request({
        url: `/admin/banner/info/${id}`,
        headers: {
            
        },
        method: 'get'
    })
}

export const setBannerUpdate = form => {
    const params = qs.stringify(Object.assign(form, {
        token: user.token
    }))
    return axios.request({
        url: `/Advertising/createAdvertising`,
        headers: {
            
        },
        data: params,
        method: 'post'
    })
}

export const setBannerEnable = form => {
    const params = qs.stringify(Object.assign(form, {
        token: user.token
    }))
    return axios.request({
        url: `/Advertising/updateShow`,
        
        data: params,
        method: 'post'
    })
}

export const setBannerChange = (form) => {
    return axios.request({
        url: `/Advertising/updateSort?token=${user.token}&id=${form.id}&sort_type=${form.sort_type}`,
        method: 'post'
    })
}
// 上传图片
export const setUpload = form => {
    return axios.request({
        url: `/File/uploadsImage`,
        data: form,
        method: 'post'
    })
}

export const setFileDelete = id => {
    const params = qs.stringify({
        file_id: id,
        token: user.token
    })
    return axios.request({
        url: `/Goods/deleteFiles?${params}`,
        method: 'get'
    })
}