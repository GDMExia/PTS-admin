<template>
    <div>
        <Form ref="CategoryCreateForm" :model="formInline" :rules="ruleInline" :label-width="100" label-position="left">
            <Row>
              <Col span="24">
                <FormItem label="分类名称" prop="cate_name">
                  <Input v-model="formInline.cate_name" placeholder="请输入" />
                </FormItem>
              </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
export default {
  name: 'CategoryCreateForm',
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
      this.$refs.CategoryCreateForm.validate(cb)
    },
    resetFields() {
      this.$refs.CategoryCreateForm.resetFields()
    },

  }
}
</script>
