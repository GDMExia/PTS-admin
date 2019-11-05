<template>
  <div>
    <Form @submit.native.prevent="()=>{}" ref="ContentForm" :model="formInline" :rules="ruleInline" :label-width="100">
      <Row>
        <Col>
          <FormItem label="内容" prop="content">
            <Input type='text' v-model="formInline.content" placeholder="请输入" />

          </FormItem>
        </Col>
      </Row>
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
      this.$refs.ContentForm.validate(cb)
    },
    resetFields() {
      this.$refs.ContentForm.resetFields()
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
