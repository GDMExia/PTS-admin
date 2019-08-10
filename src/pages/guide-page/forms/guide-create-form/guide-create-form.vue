<template>
    <div>
        <Form ref="GuideCreateForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
            <Row>
              <Col span="12">
                <FormItem label="标题" prop="title">
                  <Input v-model="formInline.title" placeholder="请输入" />
                </FormItem>
              </Col>
              <Col span="12">
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="详情" prop="details">
                  <editor ref="editor" v-model="formInline.details" :value="formInline.details"/>
                </FormItem>
              </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
import Editor from '_c/editor'
export default {
  name: 'GuideCreateForm',
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
      this.$refs.GuideCreateForm.validate(cb)
    },
    handleRichEditor() {
      this.$refs.editor.handleRichEditor(this.formInline.details)
    },
    resetFields() {
      this.$refs.GuideCreateForm.resetFields()
    }

  }
}
</script>
