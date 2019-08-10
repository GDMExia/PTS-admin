<template>
    <div>
        <Form ref="BnnerEditForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
            <Row>
                <Col span="12">
                    <FormItem label="标题" prop="title">
                        <Input v-model="formInline.title" placeholder="请输入" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="封面图" prop="photo">
                        <div style="width: 50px;height: 50px; position: relative;cursor:pointer">
                            <div style="position:absolute;left:0;top:0;width:50px;height:50px">
                                <Icon type="ios-person-add-outline" size="50" v-show="formInline.photo==''"/>
                                <img :src="configurl+'/cos/get/'+formInline.photo" v-show="formInline.photo!=''" style="width:50px;height:50px"/>
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
                <FormItem label="详情" prop="content">
                    <editor ref="editor" v-model="formInline.content" :value = "formInline.content"/>
                </FormItem>
            </Row>
        </Form>
    </div>
</template>
<script>
import Editor from "_c/editor";
import { setUpload } from '../../api'
export default {
    name: 'BnnerEditForm',
    components: {
        Editor
    },
    props: {
        formInline: Object,
        ruleInline: Object,
        modules: Array
    },
    data() {
        return {
            token: this.$store.state.user.token,
            configurl: this.$config.configUrl
        }
    },
    methods: {
        validate(cb) {
            this.$refs.BnnerEditForm.validate(cb)
        },
        handleRichEditor() {
            this.$refs.editor.handleRichEditor(this.formInline.content)
        },
        // 上传图片
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
            formData.append('head_file', file)
            setUpload(formData).then(res=>{
                console.log(res)
                event.target.value=''
                if(res.data.code == 1000) {
                    this.$Message.info('上传成功')
                    this.formInline.photo = `${res.data.data.dataInfo.key}`
                }
            })
        },
        resetFields() {
            this.$refs.BnnerEditForm.resetFields()
        }
    },
}
</script>
