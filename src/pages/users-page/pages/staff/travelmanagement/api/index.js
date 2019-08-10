import axios from '@/libs/api.request' // 引入 请求模块

export const getData = (params) => { 
  // return axios.request({
  //   url: `/tickets/record?token=${params.token}&pageNum=${params.index}&pageSize=${params.size}&userId=${params.userId}`,
  //   method: 'get'
  // })
}

export const columns = [
  {
    title: '出行日期',
    key: 'travelTime',
    tooltip: true
  },
  {
    title: '出行人数',
    key: 'travelNum',
    tooltip: true
  },
  {
    title: '状态',
    key: 'status',
    render: (h, params) => {
      return h('div', {
        domProps: {
          innerHTML: params.row.status === 0 ? '待确认' : '已确认'
        }
      })
    },
    tooltip: true
  },
  {
    title: '创建时间',
    key: 'createTime',
    tooltip: true
  },
  {
    title: '操作',
    key: 'handle',
    fixed: 'right',
    align: 'center',
    width: 300,
    button: [
      (h, params, vm) => {
        return h('div', [
          h('i-button', {
            props: {
              type: 'primary',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                vm.$emit('on-showgroupinfo', params)
              }
            }
          }, '查看团队信息'),
          h('i-button', {
            props: {
              type: 'primary',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                vm.$emit('on-showbookinfo', params)
              }
            }
          }, '查看预定信息')
        ]
        )
      }
    ]
  }
]
