<template>
    <div>
        <Form ref="UploadEditForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
            <FormItem label="图片" prop="pic">
                <Upload
                    multiple
                    type="drag"
                    action
                    :before-upload="handleBeforeUpload"
                    v-model="formInline.pic"
                    >
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff" v-if="formInline.pic==''"></Icon>
                        <img :src="formInline.pic" alt="" v-else style="height:52px"/>
                        <p>拖动或点击上传</p>
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
    name: 'UploadEditForm',
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
            this.$refs.UploadEditForm.validate(cb)
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
            formData.append('file_image', file)
            setUpload(formData).then(res=>{
                event.target.value=''
                if(res.data.code == 200) {
                    this.$Message.info('上传成功')
                    this.formInline.pic = `${res.data.data.fileUrl}`
                }
            })
        },
        resetFields() {
            this.$refs.UploadEditForm.resetFields()
        }
    },
}
</script>
