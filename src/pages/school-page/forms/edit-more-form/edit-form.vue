<template>
    <div>
        <Form ref="EditForm" :model="formInline" :rules="ruleInline" :label-width="120" label-position="left">
            <Row>
                <Col span="24">
                    <FormItem label="二级分类名称" prop="cate_name">
                        <Input v-model="formInline.cate_name" placeholder="请输入" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <FormItem label="是否开启验证" prop="is_code">
                        <i-Switch v-model="formInline.is_code" :true-value="'1'" :false-value="'0'" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <FormItem label="设置验证码" prop="code_name" :rules="{required: true, message: '请输入验证码', trigger: 'blur'}" v-if="formInline.is_code==1">
                        <Input v-model="formInline.code_name" placeholder="请输入" />
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
import Editor from "_c/editor";

export default {
    name: 'EditForm',
    components: {
        Editor,
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
            this.$refs.EditForm.validate(cb)
        },
        resetFields() {
            this.$refs.EditForm.resetFields()
        },
        change(){},
        handleChange(event){

        },
    },
    mounted() {
    }
}
</script>
