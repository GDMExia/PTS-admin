<template>
    <div>
        <Form ref="UploadCreateForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
            <FormItem label="图片" prop="pic">
                <div class="demo-upload-list" v-for="(item, index) in formInline.pic" :key="index">
                    <template>
                        <img :src="item">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
                        </div>
                    </template>
                </div>
                <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :default-file-list="formInline.pic"
                    :format="['jpg', 'png', 'jpeg']"
                    :before-upload="beforeUpload"
                    multiple
                    action
                    style="display: inline-block;width:58px;">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="ios-camera" size="20"></Icon>
                    </div>
                </Upload>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import Editor from "_c/editor";
import { setUpload } from '_p/banner-page/api'
export default {
    name: 'UploadCreateForm',
    components: {
        Editor
    },
    props: {
        formInline: Object,
        ruleInline: Object,
    },
    data() {
        return {
        }
    },
    methods: {
        validate(cb) {
            this.$refs.UploadCreateForm.validate(cb)
        },
        handleRemove (index) {
            this.formInline.pic.splice(index, 1)
        },
        // 上传图片
        uploadImage(file) {
            var file = file
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
                if(res.data.code == 200) {
                    this.$Message.info('上传成功')
                    this.formInline.pic.push(`${res.data.data.fileUrl}`)
                }
            })
        },
        resetFields() {
            this.$refs.UploadCreateForm.resetFields()
        }
    },
}
</script>
