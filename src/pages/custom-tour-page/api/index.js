export const customColumn = [
    {title: '日期', key: 'bannerIndex'},
    {title: '类型名称', key: 'bannerTitle', tooltip: true},
    {title: '价格(元/人)', key: 'enabledStr', tooltip: true},
    {title: '单房价差(元)', key: 'enabledStr', tooltip: true},
    {title: '携带儿童(元/人)', key: 'enabledStr', tooltip: true},
    {title: '已预定数量', key: 'enabledStr', tooltip: true},
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

export const priceColumn = [
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