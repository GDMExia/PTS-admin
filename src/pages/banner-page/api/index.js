import axios from '@/libs/api.request'

export const bannerColumns = [
    {title: '广告位', key: 'bannerIndex'},
    {title: '标题', key: 'bannerTitle', tooltip: true},
    {title: '状态', key: 'enabledStr', tooltip: true},
    {
        title: '操作',
        key: 'handle',
        align: 'center',
        width: 260,
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
                    params.row.enabled?'下线':'上线'
                ),
            ])
        }]
    }
]

export const getBannerList = () => {
    return axios.request({
        url: `/admin/banner/list`,
        headers: {
          functionId: 8
        },
        method: 'get'
    })
}

export const getBannerDetail = id => {
    return axios.request({
        url: `/admin/banner/info/${id}`,
        headers: {
            functionId: 8
        },
        method: 'get'
    })
}

export const setBannerUpdate = form => {
    return axios.request({
        url: `/admin/user/banner/update/${form.id}`,
        headers: {
          functionId: 8
        },
        data: form,
        method: 'put'
    })
}

export const setBannerEnable = id => {
    return axios.request({
        url: `/admin/user/banner/enable/${id}`,
        headers: {
          functionId: 8
        },
        method: 'put'
    })
}

export const setBannerChange = (id1, id2) => {
    return axios.request({
        url: `/admin/user/banner/change/${id1}/${id2}`,
        headers: {
          functionId: 8
        },
        method: 'put'
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