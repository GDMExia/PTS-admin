<template>
  <div style="width:100%">
    <script id="editor" type="text/plain" style="width:1024px;height:500px;"></script>
  </div>
</template>
<script>
import '../../../static/UEditor/ueditor.config'
import '../../../static/UEditor/ueditor.all'
import '../../../static/UEditor/lang/zh-cn/zh-cn'
import '../../../static/UEditor/ueditor.parse'
import '../../../static/UEditor/themes/default/css/ueditor.min.css'
import '../../../static/UEditor/themes/iframe.css'
import '../../../static/UEditor/xiumi-ue-dialog-v5'
import '../../../static/UEditor/xiumi-ue-v5.css'
// import '../../../static/UE/ueditor.config'
// import '../../../static/UE/ueditor.all'
// import '../../../static/UE/lang/zh-cn/zh-cn'
// import '../../../static/UE/ueditor.parse'
// import '../../../static/UE/themes/default/css/ueditor.min.css'
// import '../../../static/UE/xiumi-ue-dialog-v5'
// import '../../../static/UE/xiumi-ue-v5.css'
// import '../../../static/UE/135EditorDialogPage.html'
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
      this.editor = UE.getEditor('editor'); // 初始化UE
      this.editor = UE.getEditor('editor', this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
    },
    methods: {
      handleRichEditor(val) {
        const _this = this;
        this.editor.addListener("ready", function () {
           // 确保UE加载完成后，放入内容。
           _this.editor.setContent(val);
        });
      },
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      },
      getContentTxt(){
        return this.editor.getContentTxt()
      },
      setContent(txt){
        return this.editor.setContent(txt)
      }
    },
    destroyed() {
      this.editor.destroy();
    },
  }
</script>

<style scoped>
.edui-button.edui-for-135editor .edui-button-wrap .edui-button-body .edui-icon{

    background-image: url("http://static.135editor.com/img/icons/editor-135-icon.png") !important;

    background-size: 85%;

    background-position: center;

    background-repeat: no-repeat;

}
</style>