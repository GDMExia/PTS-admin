<template>
    <div>
        <Form ref="PriceCreateForm" :model="formInline" :rules="ruleInline" :label-width="110" label-position="left">
            <Row>
                <Col span="12">
                    <FormItem label="类型名称" prop="type">
                        <Input v-model="formInline.type" placeholder="请输入" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="价格(元/人)" prop="price">
                        <Input v-model="formInline.price" placeholder="请输入" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="单房价差(元)" prop="discount">
                        <Input v-model="formInline.discount" placeholder="请输入" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="携带儿童(元/人)" prop="child">
                        <Input v-model="formInline.child" placeholder="请输入" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="每日上限" prop="limit">
                        <Input v-model="formInline.limit" placeholder="请输入" />
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
export default {
    name: 'PriceCreateForm',
    components: {
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
            this.$refs.PriceCreateForm.validate(cb)
        },
        resetFields() {
            this.$refs.PriceCreateForm.resetFields()
        }
    },
}
</script>
