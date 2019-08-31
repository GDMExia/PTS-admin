<template>
    <div>
        <Form ref="EditForm" :model="formInline" :rules="ruleInline" :label-width="120" label-position="left">
            <Row>
                <Col span="24">
                    <FormItem label="一级分类名称" prop="cate_name">
                        <Input v-model="formInline.cate_name" placeholder="请输入" />
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
