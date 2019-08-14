import axios from '@/libs/api.request' // 引入 请求模块
import store from '@/store'
const user = store.state.user
export const shareColumn = [
  { title: '标题', key: 'title', tooltip: true },
  { title: '关联活动', key: 'status', tooltip: true },
  { title: '发布时间', key: 'updateTime', tooltip: true },
  { title: '状态', key: 'updateTime', tooltip: true },
  {
    title: '操作',
    key: 'handle',
    align: 'center',
    width: 360,
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
          params.row.is_show==1?'下线':'上线'
        ),
        h(
          'Poptip',{
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
              'i-button',{
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
