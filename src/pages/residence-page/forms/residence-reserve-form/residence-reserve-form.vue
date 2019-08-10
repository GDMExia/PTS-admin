<template>
    <div>
        <Form ref="ResidenceReserveForm" :model="formInline" :rules="ruleInline" :label-width="100" label-position="left">
            <Row>
              <Col span="24">
                <FormItem label="3天2晚预定">
                  <RadioGroup v-model="formInline.enable" vertical>
                    <Radio label="0">开启</Radio>
                    <Radio label="1">关闭</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
export default {
  name: 'ResidenceReserveForm',
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
      this.$refs.ResidenceReserveForm.validate(cb)
    },
    resetFields() {
      this.$refs.ResidenceReserveForm.resetFields()
    }

  }
}
</script>
