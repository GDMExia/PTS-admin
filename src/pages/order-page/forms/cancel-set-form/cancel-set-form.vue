<template>
    <div>
        <Form ref="CancelSetForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
            <Row>
              <Col span="24">
                <FormItem label="退订须提前" prop="date">
                    <Input v-model="formInline.date" placeholder="请输入" style="width: 100px"></Input>
                    <span style="margin-left: 10px;">天</span>
                </FormItem>
              </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
export default {
    props: {
        formInline: Object,
        ruleInline: Object,
    },
    methods: {
        
    }
}
</script>
<style>
</style>


