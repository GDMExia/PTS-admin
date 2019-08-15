<template>
  <div style="width:100%">
    <!-- <Card> -->
        <script id="editor" type="text/plain" style="width:1024px;height:500px;"></script>
    <!-- </Card> -->
  </div>
</template>
<script>
import '../../../static/UE/ueditor.config'
import '../../../static/UE/ueditor.all'
import '../../../static/UE/lang/zh-cn/zh-cn'
import '../../../static/UE/ueditor.parse'
import '../../../static/UE/themes/default/css/ueditor.min.css'
// import '../../../static/UE/ueditor.parse'
// import '../../../static/UE/ueditor.parse'
  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },
    mounted() {
      const _this = this;
    //   this.editor = UE.getEditor('editor'); // 初始化UE
      this.editor = UE.getEditor('editor', this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>