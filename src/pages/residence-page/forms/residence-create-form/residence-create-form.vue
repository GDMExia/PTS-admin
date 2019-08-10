<template>
    <div>
        <Form ref="ResidenceCreateForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
            <Row>
              <Col span="12">
                <FormItem label="ID" prop="id">
                  <Input v-model="formInline.id" placeholder="请输入" />
                </FormItem>
              </Col>
              <Col span="12">
              </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
export default {
  name: 'ResidenceCreateForm',
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
      this.$refs.ResidenceCreateForm.validate(cb)
    },
    resetFields() {
      this.$refs.ResidenceCreateForm.resetFields()
    }

  }
}
</script>
