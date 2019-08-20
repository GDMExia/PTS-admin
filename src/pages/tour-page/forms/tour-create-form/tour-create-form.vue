<template>
    <div>
        <Form ref="TourCreateForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
            <Row>
              <Col span="12">
                <FormItem label="标题" prop="goods_name">
                  <Input v-model="formInline.goods_name" placeholder="请输入" />
                </FormItem>
              </Col>
            </Row>
            <Row>
                <Col span="24">
                    <FormItem label="图片" prop="img_list" class="ivu-form-item-required">
                        <p>（默认第一张为封面图，且当被放置在首页展示，默认展示该封面图）</p>
                        <div class="demo-upload-list" v-for="(item, index) in formInline.img_list" :key="index">
                            <template>
                                <img :src="item.file_url">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item.file_id)"></Icon>
                                </div>
                            </template>
                            </div>
                            <Upload
                                ref="upload"
                                :show-upload-list="false"
                                :default-file-list="formInline.img_list"
                                :format="['jpg','jpeg','png']"
                                :before-upload="beforeUpload"
                                multiple
                                action=""
                                style="display: inline-block;width:58px;">
                            <div class="demo-upload-list" style="width: 58px;height:58px;line-height: 58px;text-align: center; cursor: pointer;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                        </Upload>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="参与日期" prop="date">
                        <DatePicker v-model="formInline.date" type="daterange" placement="bottom-end" placeholder="请选择" style="width: 200px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="价格" prop="goods_price">
                        <Input v-model="formInline.goods_price" style="width: 200px" placeholder="请输入" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="积分抵扣" prop="discount_point">
                        <Input v-model="formInline.discount_point" style="width: 200px" placeholder="请输入" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="发布者" prop="create_name">
                        <Input v-model="formInline.create_name" style="width: 200px" placeholder="请输入" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <FormItem label="正文" prop="content">
                   <!--  <UEtor :defaultMsg="formInline.content" :config=config  ref="uetor"></UEtor> -->
                    <editor ref="editor" v-model="formInline.content" :value = "formInline.content"/>
                </FormItem>
            </Row>
        </Form>
    </div>
</template>
<script>
import Editor from "_c/editor";
import UEtor from "_c/ueditor";
import {setUpload, setFileDelete} from '_p/banner-page/api'
export default {
    components: {
        Editor,
        UEtor
    },
    props: {
        formInline: Object,
        ruleInline: Object,
        typeList: Array
    },
    data() {
        return {
            fileList: [],
            config: {
                initialFrameWidth: 780,
                initialFrameHeight: 300
            },
            id: 'container',
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
            this.$refs.TourCreateForm.validate(cb)
        },
        handleRichEditor() {
            // this.$refs.uetor.handleRichEditor(this.formInline.content)
            this.$refs.editor.handleRichEditor(this.formInline.content)
        },
        getEdiotrContent () {
            let content = this.$refs.uetor.getUEContent() // 调用子组件方法
            return content
        },
        handleRemove(id) {
            this.formInline.img_list = this.formInline.img_list.filter(item=>{
                return item.file_id!=id
            })
            this.fileList = this.formInline.img_list.filter(item=>{
                return item.file_id!=id
            });
        },
        beforeUpload(file) {
            if(file.size > 5*1024*1024) {
                this.$Message.warning('上传图片不得大于5兆，请重新上传')
                return
            }
            var imgStr = /\.(jpg|jpeg|png|bmp|BMP|JPG|PNG|JPEG)$/;
            if(!imgStr.test(file.name)) {
                alert("文件不是图片类型");
                return
            } 
            this.fileList.push(file)
            const check = this.formInline.img_list.length < 5;
            if(!check) {
                this.$Notice.warning({
                    title: '最多上传5张图片'
                });
                return
            }
            var formData = new FormData();
            formData.append('file_image', file)
            setUpload(formData).then(res=>{
                if(res.data.code == 200) {
                    this.$Message.info('上传成功')
                    this.formInline.img_list.push({file_id: res.data.data.fileId,file_url: res.data.data.fileUrl})
                }
            })
        }
    }
}
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>


