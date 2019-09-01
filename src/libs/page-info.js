import { Base64 } from 'js-base64'
class PageInfo {
  constructor() {
    this.init()
  }

  converter(pageInfo) {
    this.index = 1 * pageInfo.pageIndex
    this.size = 1 * pageInfo.pageSize
    this.total = 1 * pageInfo.pageTotal
    this.search = pageInfo.search || ''
    return this
  }

  init () {
    this.index = 1
    this.size = 20
    this.total = 1
    this.search = ''
    return this
  }

  transfer() {
    if(typeof(this.search)==='object') {
      let search = Base64.encode(JSON.stringify(this.search))
      search = search.replace(/\//g, "_")
      search = search.replace(/\+/g, "-")
      this.search = search
    }
    return {
      index: this.index,
      size: this.size,
      search: this.search
    }
  }

  base64Decode(val) {
    let search = val.replace(/\-/g, '+')
    search = val.replace(/\_/g, '/')
    let searchObj = Base64.decode(search)
    return searchObj
  }
}

export default new PageInfo()
