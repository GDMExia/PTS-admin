<template>
  <div class="editor-wrapper">
    <div :id="editorId"></div>
  </div>
</template>

<script>
import Editor from 'wangeditor'
import 'wangeditor/release/wangEditor.min.css'
import { oneOf } from '@/libs/tools'
import { setUpload } from '_p/banner-page/api'
export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      default: ''
    },
    /**
     * 绑定的值的类型, enum: ['html', 'text']
     */
    valueType: {
      type: String,
      default: 'html',
      validator: (val) => {
        return oneOf(val, ['html', 'text'])
      }
    },
    /**
     * @description 设置change事件触发时间间隔
     */
    changeInterval: {
      type: Number,
      default: 200
    },
    /**
     * @description 是否开启本地存储
     */
    cache: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    editorId () {
      return `editor${this._uid}`
    }
  },
  methods: {
    setHtml (val) {
      this.editor.txt.html(val)
    },
    handleRichEditor (val) {
      // 如果本地有存储加载本地存储内容
      let html = val === '' ? '' : this.value
      this.editor.txt.html(html)
    }
  },
  mounted () {
    const token = this.$store.state.user.token
    this.editor = new Editor(`#${this.editorId}`)
    this.editor.customConfig.uploadImgShowBase64 = true
    this.editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024
    this.editor.customConfig.onchange = (html) => {
      let text = this.editor.txt.text()
      if (this.cache) localStorage.editorCache = html
      this.$emit('input', this.valueType === 'html' ? html : text)
      this.$emit('on-change', html, text)
    }
    let that = this
    // this.editor.customConfig.uploadFileName ='file_image'
    this.editor.customConfig.uploadImgHeaders = {
      token: token
    }
    this.editor.customConfig.uploadImgServer = this.$config.baseUrl.pro + '/File/uploadsImage';
    this.editor.customConfig.customUploadImg = function (files, insert) {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      files.forEach(file => {
        var formData = new FormData();
        formData.append('file_image', file)
        setUpload(formData).then(res=>{
          var url = `${res.data.data.fileUrl}`
          insert(url)
        })
      });
      // 上传代码返回结果之后，将图片插入到编辑器中
      // insert(imgUrl)
    }
    this.editor.customConfig.onchangeTimeout = this.changeInterval
    this.editor.customConfig.showLinkImg = false
    this.editor.customConfig.menus = [
        'head',
        'bold',
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',
        'underline',
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link', // 插入链接
        'image', // 图片
    ]
    // create这个方法一定要在所有配置项之后调用
    this.editor.create()
  }
}
</script>

<style>

</style>
