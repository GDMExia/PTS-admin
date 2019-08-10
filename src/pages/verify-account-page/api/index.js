export const verifyColumn = [
    {title: 'ID', key: 'bannerIndex'},
    {title: '名称', key: 'bannerTitle', tooltip: true},
    {title: '进项金额', key: 'enabledStr', tooltip: true},
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
                    '查看相关订单'
                )
            ])
        }]
    }
]

export const verifyOrderColumn = [
    {title: '订单ID', key: 'bannerIndex'},
    {title: '订单金额', key: 'bannerTitle', tooltip: true},
    {title: '入住时间', key: 'enabledStr', tooltip: true},
    {title: '下单时间', key: 'enabledStr', tooltip: true},
]