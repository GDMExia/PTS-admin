<template>
    <div>
        <Form ref="UploadEditForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
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
