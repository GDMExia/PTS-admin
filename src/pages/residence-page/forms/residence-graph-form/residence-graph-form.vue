<template>
    <div>
        <Form ref="ResidenceGraphForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
            <Row>
              <Col span="12">
                <FormItem label="设置推荐图" prop="id">
                  <div class="main-box">
                    <div class="img-box">
                      <Icon type="ios-cloud-upload" size="52" v-show="formInline.image==''"/>
                      <img :src="configurl+'/cos/get/'+formInline.image" v-show="formInline.image!=''" style="width:380px;height:150px"/>
                    </div>
                    <div style="position:absolute;left:0;top:0;width:380px;height:150px;">
                      <input type="file" id="upload" @change="uploadImage" style="width:380px;height:150px;opacity:0;"/>
                    </div>
                  </div>
                </FormItem>
              </Col>
              <Col span="12">
              </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
import {setUpload} from '_p/banner-page/api'
export default {
  name: 'ResidenceGraphForm',
  components: {
  },
  props: {
    formInline: Object,
    ruleInline: Object,
  },
  data() {
    return {
      configurl: this.$config.configUrl
    }
  },
  methods: {
    validate(cb) {
      this.$refs.ResidenceGraphForm.validate(cb)
    },
    resetFields() {
      this.$refs.ResidenceGraphForm.resetFields()
    },
    uploadImage() {
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
      formData.append('head_file', file)
      setUpload(formData).then(res=>{
          console.log(res)
          event.target.value=''
          if(res.data.code == 1000) {
              this.$Message.info('上传成功')
              this.formInline.image = `${res.data.data.dataInfo.key}`
          }
      })
    }

  }
}
</script>
