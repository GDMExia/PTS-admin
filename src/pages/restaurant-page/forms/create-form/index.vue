<template>
  <div>
    <Form @submit.native.prevent="()=>{}" ref="CreateForm" :model="formInline" :rules="ruleInline" :label-width="80">
      <Row>
        <Col span="10">
          <FormItem label="标题" prop="title">
            <Input type='text' v-model="formInline.title" placeholder="请输入内容" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="10">
          <FormItem label="简介" prop="intro">
            <Input type='text' v-model="formInline.intro" placeholder="请输入内容" />
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="10">
          <FormItem label="图片" prop="assets">
            <Upload
              type="drag"
              action
              v-model="formInline.assets"
              :before-upload="beforeUpload"
              :disabled="imgList.length>=5"
            >
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>(默认第一张为封面图)</p>
              </div>
            </Upload>
          </FormItem>
        </Col>
        <Col span="14">
          <div v-if="imgList" style="display:flex;flex-wrap:wrap">
            <div v-for="(item,index) of imgList" style="display:inlineBlock">
              <img :src="configurl+'/cos/get/'+item" style="width:200px;height:200px" />
              <Button type="error" shape="circle" icon="ios-trash" style="display:block;marginLeft:90px;" @click="deleteimg(index)"></Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span="10">
          <FormItem label="人均消费" prop="avegmoney">
            <Input type='text' v-model="formInline.avegmoney" placeholder="请输入人均消费" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="14">
          <FormItem label="具体地址" prop="address">
            <Input type='text' v-model="formInline.address" placeholder="请输入具体地址"><span slot="prepend">浙江省舟山市嵊泗县花鸟岛</span></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="电话" prop="phone">
            <Input type='number' :maxlength="11" v-model="formInline.phone" placeholder="请输入数字" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormItem label="详情" prop="description">
            <Input type='textarea' :rows="4" v-model="formInline.description" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
        <FormItem label="推荐" prop="recommend">
          <i-switch v-model="formInline.recommend">
          </i-switch>
        </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import axios from "@/libs/api.request"; // 引入 请求模块
import { setUpload } from '_p/banner-page/api'

export default {
  name:'CreateForm',
  components: {

  },
  data() {
    return {
      configurl: this.$config.configUrl,
      imgList: []
    };
  },
  methods: {
    validate(cb) {
      this.$refs.CreateForm.validate(cb)
    },
    resetFields() {
      this.$refs.CreateForm.resetFields()
    },
    upload(params){
      var file = params
      if(file.size > 5*1024*1024) {
          this.$Message.warning('上传图片不得大于5兆，请重新上传')
          return
      }
      var imgStr = /\.(jpg|jpeg|png|bmp|BMP|JPG|PNG|JPEG)$/;
      if(!imgStr.test(file.name)) {
          alert("文件不是图片类型");
          return
      } 
      // this.formInline.assets.push(file.name)
      var formData = new FormData();
      formData.append('head_file', file)
      setUpload(formData).then(res=>{
          console.log(res)
          if(res.data.code == 1000) {
              this.$Message.info('上传成功')
              this.imgList.push(res.data.data.dataInfo.key)
              this.formInline.assets=this.imgList.join(',')
          }
      })
    },
    deleteimg(id){
      this.imgList.splice(id,1)
      this.formInline.assets=this.imgList.join(',')
    },
    beforeUpload(files){
      this.upload(files)
      return false
    }
  },
  props: {
    formInline: Object,
    ruleInline: Object
  },
  mounted() {
  
  },
  watch: {
    
  }
};
</script>

<style>
</style>
