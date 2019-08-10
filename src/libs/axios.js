import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Notice } from 'iview'

// import { Spin } from 'iview'
// const addErrorLog = errorInfo => {
//   const { statusText, status, request: { responseURL } } = errorInfo
//   let info = {
//     type: 'ajax',
//     code: status,
//     mes: statusText,
//     url: responseURL
//   }
//   if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
// }

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        token: store.state.user.token
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      if (store.state.user.token) {
        config.headers.token = `${store.state.user.token}`
        config.headers.sid = `${store.state.user.formToken}`
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      store.commit('setFormToken', data.sid)
      return { data, status }
    }, error => {
      this.destroy(url)
      if(error.response.data.sid) {
        store.commit('setFormToken', error.response.data.sid)
      }
      if(error.response.data.msg == 'functionId invalid') {
        confirm('暂无权限')
        router.replace({
          name: 'home'
        })
      } else if (error.response.data.msg == 'token invalid') {
        confirm('token过期')
        store.commit('setToken', '')
        store.commit('setAccess', [])
        store.commit('setPermission', [])
        router.replace({
          name: 'login'
        })
      } else if (error.response.data.msg == 'sid invalid') {
        confirm('sid 无效,请重新提交')
        window.location.reload()
      } else {
        Notice.error({title: error.response.data.data?error.response.data.msg:error.response.data.message
        // Notice.error({title: '错误', desc: error.response.data.message
      })
        // alert(error.response.data.data.errorInfo)
      }
      // addErrorLog(error.response)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
