<template>
    <div>
        <Form ref="StoreInfoForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
            <Row>
              <Col span="12">
                <FormItem label="商家名称" prop="real_name">
                  <Input v-model="formInline.real_name" readonly placeholder="请输入" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="图片" prop="pic">
                    <div style="width: 50px;height: 50px; position: relative;cursor:pointer">
                        <div style="position:absolute;left:0;top:0;width:50px;height:50px">
                            <Icon type="ios-person-add-outline" size="50" v-show="formInline.pic==''"/>
                            <img :src="formInline.pic" v-show="formInline.pic!=''" style="width:50px;height:50px"/>
                        </div>
                        <div style="position:absolute;left:0;top:0;width:50px;height:50px">
                            <input type="file" id="upload" @change="uploadImage" style="width:50px;height:50px;opacity:0;"/>
                        </div>
                    </div>
                    <p style="height:0">（仅限一张图，尺寸为345*150）</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="分类" prop="merchants_cid">
                        <treeselect v-model="formInline.merchants_cid" :disable-branch-nodes="true" :options="typeList" style="width: 200px" placeholder="分类"/>
                        <!-- <Cascader :data="typeList" v-model="formInline.merchants_cid"></Cascader> -->
                    </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="商户公告" prop="announcement">
                    <Input v-model="formInline.announcement"/>
                  </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="地址" prop="address">
                        <Input v-model="formInline.address" placeholder="请输入" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="电话" prop="phone">
                        <Input v-model="formInline.phone" placeholder="请输入" />
                    </FormItem>
                </Col>
            </Row>
            <FormItem
              v-for="(item, index) in formInline.workers"
              :key="index"
              :label="'工作人员' + (index+1)"
              :prop="'workers.' + index + '.work_phone'">
              <Row>
                <Col span="9">
                  手机号：<Input type="text" v-model="item.work_phone" placeholder="请输入" style="width: 200px"></Input>
                </Col>
                <Col span="9">
                  姓名：<Input type="text" v-model="item.work_real_name" placeholder="请输入" style="width: 200px"></Input>
                </Col>
                <Col span="4" offset="1">
                  <Button @click="handleRemove(index)" v-if="index!=0">删除</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Row>
                <Col span="12">
                  <Button type="dashed" long @click="handleAdd" icon="md-add">添加（最多6人）</Button>
                </Col>
              </Row>
            </FormItem>
            <Row>
                <FormItem label="简介" prop="content">
                    <editor ref="editor" v-model="formInline.content" :value = "formInline.content"/>
                </FormItem>
            </Row>
        </Form>
    </div>
</template>
<script>
import Editor from "_c/editor";
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import {setUpload} from '_p/banner-page/api'
export default {
    components: {
        Treeselect,
        Editor
    },
    props: {
        formInline: Object,
        ruleInline: Object,
        typeList: Array
    },
    data() {
        return {
            configurl: this.$config.configUrl
        }
    },
    methods: {
        handleFormatError(file) {
            this.$Notice.warning({
                title: '文件格式错误，请上传jpg或png格式文件',
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '最大上传2M',
            });
        },
        validate(cb) {
            this.$refs.StoreInfoForm.validate(cb)
        },
        handleRichEditor() {
            this.$refs.editor.handleRichEditor(this.formInline.content)
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
                    this.formInline.pic = `${res.data.data.fileUrl}`
                }
            })
        },
      handleAdd(){
          if(this.formInline.workers.length>5){
            return false
          }
          this.formInline.workers.push({work_phone:'',work_real_name:''})
      },
      handleRemove(index){
          if(index==0){
            return false
          }else{
            this.formInline.workers.splice(index,1)
          }
      }
    }
}
</script>
<style>

</style>


