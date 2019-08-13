import axios from '@/libs/api.request'
import qs from 'qs'
import store from '@/store'
const user = store.state.user
export const tourColumn = [
    { title: 'ID', key: 'id', tooltip: true,width: 80 },
    { title: '旅游标题', key: 'goods_name', tooltip: true },
    { title: '参与日期', key: 'join_time', tooltip: true },
    { title: '价格', key: 'goods_price', tooltip: true,width: 80 },
    { title: '积分抵扣', key: 'discount_point', tooltip: true,width: 120 },
    { title: '发布时间', key: 'create_time', tooltip: true },
    {
        title: '操作',
        key: 'handle',
        align: 'center',
        width: 200,
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

export const getTourList = page => {
    return axios.request({
        url: `/Goods/goodsTourism?page=${page.index}&pageSize=${page.size}&token=${user.token}&goods_name=${page.search}`,
        method: 'get'
    })
}

export const setTourDelete = id => {
    const params = qs.stringify({
        id: id,
        token: user.token
    })
    return axios.request({
        url: `/Goods/deleteNews?${params}`,
        method: 'get'
    })
}

export const setTourCreate = form => {
    let params = qs.stringify(Object.assign(form, {
        token: user.token
    }))
    return axios.request({
        url: `/Goods/createNews?${params}`,
        method: 'post'
    })
}

export const getArticleInfo = type => {
    const params = qs.stringify({
        cid: type,
        token: user.token
    })
    return axios.request({
        url: `/Goods/getBindArticleGroup?${params}`,
        method: 'get'
    })
}

export const setArticle = form => {
    let params = qs.stringify(Object.assign(form, {
        token: user.token
    }))
    return axios.request({
        url: `/News/bindArticleGroup?${params}`,
        method: 'post'
    })
}

export const getFileList = form => {
    let params = qs.stringify(Object.assign(form, {
        token: user.token
    }))
    return axios.request({
        url: `/Goods/getFiles?${params}`,
        method: 'get'
    })
}