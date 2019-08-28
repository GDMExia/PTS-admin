<template>
  <div>
    <Form ref="TimeSetForm" :model="formInline" :rules="ruleInline" :label-width="110" label-position="left">
      <Row>
        <Col span="24">
          <FormItem label="活动截止日期前" prop="date">
            <Input v-model="formInline.date" placeholder="请输入数字" style="width: 100px" />
            <span style="margin-left: 10px;">天不可退订</span>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
export default {
  name: 'TimeSetForm',
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
      this.$refs.TimeSetForm.validate(cb)
    },
    resetFields() {
      this.$refs.TimeSetForm.resetFields()
    }

  }
}
</script>
