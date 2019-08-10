<template>
    <div>
        <Form ref="StoreCreateForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
            <Row>
              <Col span="24">
                <FormItem label="账号" prop="title">
                  <Input v-model="formInline.title" placeholder="请输入" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="商家名称" prop="title">
                  <Input v-model="formInline.title" placeholder="请输入" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="联系人" prop="title">
                  <Input v-model="formInline.title" placeholder="请输入" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="联系方式" prop="title">
                  <Input v-model="formInline.title" placeholder="请输入" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="初始密码">
                  888888
                </FormItem>
              </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
import Editor from '_c/editor'
export default {
  name: 'StoreCreateForm',
  components: {
    Editor
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
      this.$refs.StoreCreateForm.validate(cb)
    },
    handleRichEditor() {
      this.$refs.editor.handleRichEditor(this.formInline.details)
    },
    resetFields() {
      this.$refs.StoreCreateForm.resetFields()
    }

  }
}
</script>
