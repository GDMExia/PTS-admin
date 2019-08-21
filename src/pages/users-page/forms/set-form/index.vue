<template>
  <div>
    <Form @submit.native.prevent="()=>{}" ref="SetForm" :model="formInline" :rules="ruleInline" :label-width="100">
      <Row>
        <Col>
          <FormItem label="年费（元）" prop="vip_price">
            <Input type='text' v-model="formInline.vip_price" placeholder="请输入" />
            
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
