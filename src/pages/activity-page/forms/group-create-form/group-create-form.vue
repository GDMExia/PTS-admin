<template>
    <div>
        <Form ref="GroupCreateForm" :model="formInline" :rules="ruleInline" :label-width="100" label-position="left">
            <Row>
              <Col span="24">
                <FormItem label="分组名称" prop="id">
                  <Input v-model="formInline.id" placeholder="请输入" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="选择分票规则" prop="id">
                  <Select v-model="formInline" multiple @on-change="handleResidence">
                    <Option v-for="item in ruleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="选择民宿" prop="id">
                  <Select v-model="formInline" multiple>
                    <Option v-for="item in residenceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
export default {
  name: 'GroupCreateForm',
  components: {
  },
  props: {
    formInline: Object,
    ruleInline: Object,
    ruleList: Array,
    residenceList: Array
  },
  data() {
    return {
    }
  },
  methods: {
    validate(cb) {
      this.$refs.GroupCreateForm.validate(cb)
    },
    resetFields() {
      this.$refs.GroupCreateForm.resetFields()
    },
    handleResidence(val) {

    }

  }
}
</script>
