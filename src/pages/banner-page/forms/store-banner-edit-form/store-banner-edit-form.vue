<template>
    <div>
        <Form ref="StoreBnnerEditForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
            <!-- <Row>
                <Col span="12"> -->
                    <FormItem label="标题" prop="content">
                        <Input v-model="formInline.content" placeholder="请输入" />
                    </FormItem>
                <!-- </Col>
                <Col span="12"> -->
                    <FormItem label="跳转" prop="jump_type">
                        <RadioGroup v-model="formInline.jump_type">
                            <Radio v-for="item in jumpList" :key="item.value" :label="item.label"></Radio>
                        </RadioGroup>
                    </FormItem>
                <!-- </Col>
            </Row>
            <Row>
                <Col span="24"> -->
                    <FormItem label="链接地址" prop="link_url" v-if="formInline.jump_type=='外链'">
                        <Input v-model="formInline.link_url" placeholder="请输入" />
                    </FormItem>
                    <FormItem label="跳转ID" prop="link_url" v-else>
                        <Input v-model="formInline.link_url" placeholder="请输入" />
                    </FormItem>
                <!-- </Col>
                <Col span="12"> -->
                    <FormItem label="宣传图" prop="bookcover">
                        <div style="width: 50px;height: 50px; position: relative;cursor:pointer">
                            <div style="position:absolute;left:0;top:0;width:50px;height:50px">
                                <Icon type="ios-person-add-outline" size="50" v-show="formInline.bookcover==''"/>
                                <img :src="formInline.bookcover" v-show="formInline.bookcover!=''" style="width:50px;height:50px"/>
                            </div>
                            <div style="position:absolute;left:0;top:0;width:50px;height:50px">
                                <input type="file" id="upload" @change="uploadImage" style="width:50px;height:50px;opacity:0;"/>
                            </div>
                        </div>
                    </FormItem>
                <!-- </Col>
            </Row> -->
            <!-- <FormItem label="上架时间">
                <DatePicker type="daterange" placement="bottom-end" placeholder="请选择日期段" style="width: 200px"></DatePicker>
            </FormItem> -->
        </Form>
    </div>
</template>
<script>
import Editor from "_c/editor";
import { setUpload } from '../../api'
export default {
    name: 'StoreBnnerEditForm',
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
            jumpList: [
                {value: '1', label: '活动'},
                {value: '2', label: '外链'},
                {value: '5', label: '商家'},
            ]
        }
    },
    methods: {
        validate(cb) {
            this.$refs.StoreBnnerEditForm.validate(cb)
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
            formData.append('file_image', file)
            setUpload(formData).then(res=>{
                event.target.value=''
                if(res.data.code == 200) {
                    this.$Message.info('上传成功')
                    this.formInline.bookcover = `${res.data.data.fileUrl}`
                }
            })
        },
        resetFields() {
            this.$refs.StoreBnnerEditForm.resetFields()
        }
    },
}
</script>
