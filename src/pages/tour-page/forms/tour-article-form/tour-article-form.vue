<template>
    <div>
        <Form ref="TourArticleForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
            <Row>
                <Col span="24">
                    <FormItem label="选择旅游" prop="article_id">
                        <Select placeholder="选择旅游" multiple filterable remote :remote-method="remoteQuery"
                            :loading="loading1" v-model="formInline.article_id">
                            <Option v-for="item in articleList" :key="item.id" :value="item.id">{{item.goods_name}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
import {
    getTourList
} from '../../api'
export default {
    components: {
    },
    props: {
        formInline: Object,
        ruleInline: Object,
    },
    data() {
        return {
            loading1: false,
            articleList: []
        }
    },
    methods: {
        validate(cb) {
            this.$refs.TourArticleForm.validate(cb)
        },
        remoteQuery(query) {
            this.loading1 = true;
            getTourList({index: 1, size: 10,search: query}).then(res=>{
                this.loading1 = false;
                if(res.data.code == 200) {
                    this.articleList = res.data.data.newsList?res.data.data.newsList.map(item=>{
                        item.label = item.goods_name
                        item.value = item.id
                        return item
                    }):[]
                } else {
                    this.$Message.error(res.data.message)
                    this.articleList = []
                }
            })
        },
    },
    created() {
        this.remoteQuery('')
    }
}
</script>
<style>

</style>


