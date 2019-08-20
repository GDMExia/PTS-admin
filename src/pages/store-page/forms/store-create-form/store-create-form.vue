<template>
    <div>
        <Form ref="StoreCreateForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
            <Row>
              <Col span="24">
                <FormItem label="账号" prop="admin_name">
                  <Input v-model="formInline.admin_name" placeholder="请输入" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="商家公司全称" prop="company">
                  <Input v-model="formInline.company" placeholder="请输入" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="商家名称" prop="real_name">
                  <Input v-model="formInline.real_name" placeholder="请输入" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="法定代表人" prop="legal_person">
                  <Input v-model="formInline.legal_person" placeholder="请输入" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="联系人" prop="contact">
                  <Input v-model="formInline.contact" placeholder="请输入" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="联系方式" prop="phone">
                  <Input v-model="formInline.phone" placeholder="请输入" />
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
