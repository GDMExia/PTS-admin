import axios from '@/libs/api.request'

export const schoolarticleColumn = [
    {title: '一级分类', key: 'pid_name'},
    {title: '二级分类', key: 'cid_name', tooltip: true},
    {title: '文章标题', key: 'title', tooltip: true},
    {title: '阅读量', key: 'look_number', tooltip: true},
    {title: '发布时间', key: 'create_time', tooltip: true},
    {
        title: '是否推荐',
        key: 'is_top',
        render: (h, params) => {
            return h('div', {
                domProps: {
                    innerHTML: params.row.is_top == 0 ? '否' : '是'
                }
            })
        },
        tooltip: true
    },
    {
        title: '状态',
        key: 'is_show',
        render: (h, params) => {
            return h('div', {
                domProps: {
                    innerHTML: params.row.is_show == 0 ? '下线' : '展示'
                }
            })
        },
        tooltip: true
    },
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
                            type: params.row.is_show == 0 ? 'success' : 'warning',
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
                    params.row.is_show == 0 ? '上线' : '下线'
                ),
                h('Poptip', {
                    props: {
                      confirm: true,
                      title: '你确定要删除吗?',
                      transfer: true
                    },
                    on: {
                      'on-ok': () => {
                        vm.$emit('on-delete', params)
                        // vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                      }
                    }
                  }, [
                    h(
                        'i-button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            }
                            // ,
                            // on: {
                            //     click: () => {
                            //         vm.$emit('on-delete', params)
                            //     }
                            // }
                        },
                        '删除'
                    )
                  ]),
            ])
        }]
    }
]

export const getarticleData = (params) => {
    return axios.request({
        url: `/News/getArticle?token=${params.token}&pageSize=${params.page.size}&page=${params.page.index}&cid=${params.cid}`,
        method: 'get'
    })
}

export const getCategoryTree = (params) => {
    return axios.request({
        url: `/Category/getArticleCategoryTree?token=${params}`,
        method: 'get'
    })
}

export const Upload = (file) => {
    let data = new FormData()
    data.append('file_image', file)
    return axios.request({
        url: `/File/uploadsImage`,
        data: data,
        method: 'post'
    })
}

export const createschoolArticle = (params) => {
    return axios.request({
        url: `/News/createArticle`,
        params: params,
        method: 'post'
    })
}

export const changeschoolArticle = (params) => {
    return axios.request({
        url: `/News/updateArticleSate`,
        params: params,
        method: 'post'
    })
}

export const deleteschoolArticle = (params) => {
    return axios.request({
        url: `/News/deleteArticle?token=${params.token}&id=${params.id}`,
        method: 'get'
    })
}

export const schoolmoreColumn = [
    {title: '二级分类名称', key: 'cate_name'},
    {
        title:'是否开启验证',
        render:(h, params)=>{
            return h('div',{
                domProps:{
                    innerHTML: params.row.is_code==1?'是':'否'
                }
            })
        }
    },
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
                )
            ])
        }]
    }
]

export const getcategoryData = (params) => {
    return axios.request({
        url: `/Category/getArticleCategory?token=${params.token}&pid=${params.pid}`,
        method: 'get'
    })
}

export const setcategoryData = (params) => {
    return axios.request({
        url: `/Category/createArticleCategory`,
        data: params,
        method: 'post'
    })
}

export const schoolmenuColumn = [
    {title: '一级分类名称', key: 'cate_name'},
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
                            type: 'primary',
                            icon: 'md-create',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                vm.$emit('on-more', params)
                            }
                        }
                    },
                    '二级分类'
                )
            ])
        }]
    }
]
