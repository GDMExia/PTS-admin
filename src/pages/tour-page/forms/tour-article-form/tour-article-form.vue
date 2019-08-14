<template>
    <div>
        <Form ref="TourArticleForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
            <Row>
                <Col span="24">
                    <FormItem label="选择旅游" prop="article_id">
                        <Select placeholder="选择旅游" multiple filterable v-model="formInline.article_id">
                            <Option v-for="item in articleList" :key="item.id" :value="item.id">{{item.goods_name}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
export default {
    components: {
    },
    props: {
        formInline: Object,
        ruleInline: Object,
        articleList: Array
    },
    data() {
        return {
            
        }
    },
    methods: {
        validate(cb) {
            this.$refs.TourArticleForm.validate(cb)
        },
    }
}
</script>
<style>

</style>


