<template>
    <div>
        <Form ref="CreateForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
            <Row>
                <Col span="12">
                    <FormItem label="标题" prop="title">
                        <Input v-model="formInline.title" placeholder="请输入" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="选择分类" prop="cid">
                        <Cascader :data="casdata" @on-change="handleChange" change-on-select @on-clear="handleChange" v-model="formInline.cid">
                        </Cascader>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="发布者" prop="create_name">
                        <Input v-model="formInline.create_name" placeholder="请输入" />
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="图片" prop="cover">
                        <Upload
                            multiple
                            type="drag"
                            action
                            :before-upload="handleBeforeUpload"
                            v-model="formInline.cover"
                            >
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff" v-if="formInline.cover==''"></Icon>
                                <img :src="formInline.cover" alt="" v-else style="height:52px"/>
                                <p>拖动或点击上传</p>
                            </div>
                        </Upload>
                    </FormItem>
                </Col>
            </Row>
                <FormItem label="视频" prop="vedio_url">
                    <!-- <Upload
                        multiple
                        type="drag"
                        action
                        :before-upload="handleBeforeUpload"
                        :on-progress="handleProgress"
                        :on-success="handleProgress"
                        :on-error="handleProgress"
                        :on-preview="handleProgress"
                        >
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>Click or drag files here to upload</p>
                        </div>
                    </Upload> -->
                    <input type="file" @change="handleUpload"/>
                    <!-- <oss /> -->
                </FormItem>
            <Row>
                <Col span="24">
                    <FormItem label="详情" prop="content">
                        <editor ref="editor" v-model="formInline.content" :value="formInline.content"/>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="是否推荐" prop="is_top">
                <i-Switch v-model="formInline.is_top" :true-value="'1'" :false-value="'0'" @on-change="change" />
            </FormItem>
        </Form>
    </div>
</template>
<script>
import Editor from "_c/editor";
import { Upload } from "../../api"

import oss from '@/libs/oss.js'
// import oss from '_c/oss/oss.vue'

export default {
    name: 'CreateForm',
    components: {
        Editor,
        
    },
    props: {
        formInline: Object,
        ruleInline: Object,
        casdata: Array
    },
    data() {
        return {
            category:'',
            caslist:[],
            form: {
            title: '',
            sub_title: '',
            category_id: '',
            description: '',
            status: true
            }

        }
    },
    methods: {
        validate(cb) {
            this.$refs.CreateForm.validate(cb)
        },
        resetFields() {
            this.$refs.CreateForm.resetFields()
        },
        handleRichEditor() {
            this.$refs.editor.handleRichEditor(this.formInline.content)
        },
        handleBeforeUpload(file){
            console.log(file)
            Upload(file).then(res=>{
                console.log(res)
                if(res.data.code=="200"){
                    this.formInline.cover=res.data.data.fileUrl
                }else{
                    this.$Notice.error({desc:'上传失败'})
                }
            })
            return false
        },
        async handleUpload(event){
            console.log(event.target.files[0])
            oss.ossUploadFile(event.target.files[0])
        },
        handleProgress(event, file, fileList){
            console.log(file)
        },
        change(){},
        handleChange(event){
            console.log(event)
            console.log(this.category)
            this.category=event[event.length-1]
            console.log(this.category)
        },
    },
    mounted() {
        this.handleRichEditor()
        this.caslist=this.casdata.shift()
    }
}
</script>
