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
                        <Input v-model="formInline.child" placeholder="请输入" />
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
                <Switch v-model="formInline.commond" />
            </FormItem>
        </Form>
    </div>
</template>
<script>
import Editor from "_c/editor";
export default {
    name: 'CreateForm',
    components: {
        Editor
    },
    props: {
        formInline: Object,
        ruleInline: Object,
        casdata: Array
    },
    data() {
        return {
            category:''
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
        handleChange(event){
            console.log(event)
            console.log(this.category)
            this.category=event[event.length-1]
            console.log(this.category)

            this.handleQuery()
        },
    },
    mounted() {
        this.handleRichEditor()
    }
}
</script>
