<template>
  <div>
    <Form @submit.native.prevent="()=>{}" ref="SetForm" :model="formInline" :rules="ruleInline" :label-width="100">
      <Row>
        <Col>
          <FormItem label="积分调整值" prop="integral">
            <InputNumber type='text' v-model="formInline.integral" :min="1" placeholder="请输入" />
          </FormItem>
        </Col>
      </Row>
      <FormItem label="备注" prop="note">
        <Input type='text' v-model="formInline.note" placeholder="请输入" />
      </FormItem>
    </Form>
  </div>
</template>

<script>
import axios from "@/libs/api.request"; // 引入 请求模块
export default {
  name:'CreateForm',
  components: {

  },
  data() {
    return {
      characterList:[],
      projectList:[]
    };
  },
  methods: {
    validate(cb) {
      this.$refs.SetForm.validate(cb)
    },
    resetFields() {
      this.$refs.SetForm.resetFields()
    },

  },
  props: {
    formInline: Object,
    ruleInline: Object
  },
  mounted() {
  },
  watch: {
  }
};
</script>

<style>
</style>
