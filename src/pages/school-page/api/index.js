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
                    innerHTML: params.row.is_show == 0 ? '下线' : '上线'
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
                )
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

export const schoolmenuColumn = [
    {title: '类型名称', key: 'bannerIndex'},
    {title: '价格(元/人)', key: 'enabledStr', tooltip: true},
    {title: '单房价差(元)', key: 'enabledStr', tooltip: true},
    {title: '携带儿童(元/人)', key: 'enabledStr', tooltip: true},
    {title: '每日上限', key: 'enabledStr', tooltip: true},
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