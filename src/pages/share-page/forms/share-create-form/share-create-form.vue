<template>
    <div>
        <Form ref="ShareCreateForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
            <Row>
              <Col span="12">
                    <FormItem label="标题" prop="title">
                        <Input v-model="formInline.title" placeholder="请输入" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="封面图" prop="image">
                        <div style="width: 50px;height: 50px; position: relative;cursor:pointer">
                            <div style="position:absolute;left:0;top:0;width:50px;height:50px">
                                <Icon type="ios-person-add-outline" size="50" v-show="formInline.image==''"/>
                                <img :src="formInline.image" v-show="formInline.image!=''" style="width:50px;height:50px"/>
                            </div>
                            <div style="position:absolute;left:0;top:0;width:50px;height:50px">
                                <input type="file" id="upload" @change="uploadImage" style="width:50px;height:50px;opacity:0;"/>
                            </div>
                        </div>
                      <p>尺寸：355x177</p>
                    </FormItem>
                </Col>
            </Row>
            <Row>
              <Col span="24">
                <!-- <FormItem label="关联活动"> -->
                  <!-- <Select v-model="formInline">
                    <Option v-for="item in activityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select> -->
                <!-- </FormItem> -->
              </Col>
            </Row>
            <Row>
                <FormItem label="正文" prop="details">
                  <editor ref="editor" v-model="formInline.details" :value = "formInline.content"/>
                </FormItem>
            </Row>
        </Form>
    </div>
</template>
<script>
import Editor from '_c/editor'
import { setUpload } from '_p/banner-page/api'
export default {
  name: 'ShareCreateForm',
  components: {
    Editor
  },
  props: {
    formInline: Object,
    ruleInline: Object,
    activityList: Array
  },
  data() {
    return {
    }
  },
  methods: {
    validate(cb) {
      this.$refs.ShareCreateForm.validate(cb)
    },
    handleRichEditor() {
      this.$refs.editor.handleRichEditor(this.formInline.details)
    },
    resetFields() {
      this.$refs.ShareCreateForm.resetFields()
    },
    uploadImage(event) {
      var file = event.target.files[0]
      if(file.size > 5*1024*1024) {
        this.$Message.warning('上传图片不得大于5兆，请重新上传')
        return
      }
      var imgStr = /\.(jpg|jpeg|png|bmp|BMP|JPG|PNG|JPEG)$/;
      if(!imgStr.test(file.name)) {
          alert("文件不是图片类型");
          return
      }
      var formData = new FormData();
      formData.append('file_image', file)
      setUpload(formData).then(res=>{
          event.target.value=''
          if(res.data.code == 200) {
            this.$Message.info('上传成功')
            this.formInline.image = `${res.data.data.fileUrl}`
          }
      })
    },
  }
}
</script>
