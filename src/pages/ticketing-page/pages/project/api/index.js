import axios from '@/libs/api.request' // 引入 请求模块

export const getData = (token) => {
  return axios.request({
    url: `/ticket/amusement/items?token=${token}`,
    method: 'get'
  })
}

export const createData = (params) => {
  return axios.request({
    url: `/ticket/amusement/item?token=${params.token}`,
    data: params.data,
    method: 'post'
  })
}

export const editData = (params) => {
  return axios.request({
    url: `/ticket/amusement/item?token=${params.token}`,
    data: params.data,
    method: 'put'
  })
}

function Array2String (array) {
  console.log(array)
  let array2string = ''
  array.forEach(el => {
    array2string = array2string + el.beginTime + '-' + el.endTime + ' '
  })
  return array2string
}

export const columns = [
  {
    title: '项目名称',
    key: 'projectName',
    tooltip: true
  },
  {
    title: '价格（元）',
    key: 'price',
    tooltip: true
  },
  {
    title: '票务时间段',
    render: (h, params) => {
      return h('div', {
        domProps: {
          innerHTML: Array2String(params.row.amusementItemTimeList)
        }
      })
    },
    tooltip: true
  },
  {
    title: '操作',
    key: 'handle',
    fixed: 'right',
    align: 'center',
    button: (h, params, vm) => {
      return h('div', [
        h('i-button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          on: {
            click: () => {
              vm.$emit('on-edit', params)
            }
          }
        }, '编辑')
      ])
    },
    tooltip: true
  }
]