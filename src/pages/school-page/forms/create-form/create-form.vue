<template>
    <div>
        <Form ref="CreateForm" :model="formInline" :rules="ruleInline" :label-width="110" label-position="left">
            <Row>
                <Col span="12">
                    <FormItem label="标题" prop="type">
                        <Input v-model="formInline.type" placeholder="请输入" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="选择分类" prop="price">
                        <Cascader :data="casdata" @on-change="handleChange" change-on-select @on-clear="handleChange">
                        </Cascader>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="发布者" prop="discount">
                        <Input v-model="formInline.discount" placeholder="请输入" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="视频" prop="child">
                        <Upload
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
                        </Upload>
                        <!-- <oss /> -->
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <FormItem label="详情" prop="limit">
                        <editor ref="editor" v-model="formInline.content" :value="formInline.content"/>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="是否推荐" prop="commond">
                <i-Switch v-model="formInline.commond" @on-change="change" />
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
            defaultSrc: './static/img/img.jpg',
            fileList: [],
            imgSrc: '',
            cropImg: '',
            cropDialogVisible: false,
            textMap: {
            update: '编辑视频',
            create: '新增视频'
            },
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
        async handleBeforeUpload(file){
            oss.ossUploadFile(file)
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
    }
}
</script>
