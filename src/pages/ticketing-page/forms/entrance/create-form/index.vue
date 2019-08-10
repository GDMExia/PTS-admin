<template>
  <div>
    <Form @submit.native.prevent="()=>{}" ref="CreateForm" :model="formInline" :rules="ruleInline" :label-width="50">
      <Row>
        <Col>
          <FormItem label="成人" prop="adultPrice">
            <Input type='text' v-model="formInline.adultPrice" placeholder="请输入" >
              <span slot="append">元</span>
            </Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormItem label="儿童" prop="childPrice">
            <Input type='text' v-model="formInline.childPrice" placeholder="请输入" >
            <span slot="append">元</span>
            </Input>
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
      
    };
  },
  methods: {
    validate(cb) {
      this.$refs.CreateForm.validate(cb)
    },
    resetFields() {
      this.$refs.CreateForm.resetFields()
    }
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
