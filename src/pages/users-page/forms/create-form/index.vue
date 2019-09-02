<template>
  <div>
    <Form @submit.native.prevent="()=>{}" ref="CreateForm" :model="formInline" :rules="ruleInline" :label-width="120">
      <Row>
        <Col>
          <FormItem label="成为VIP" prop="vip_integral">
            <Input type='text' v-model="formInline.vip_integral" placeholder="请输入内容" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormItem label="下级用户首次成为VIP" prop="index_vip_integral">
            <Input type='text' v-model="formInline.index_vip_integral" placeholder="请输入内容" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormItem label="活动评价" prop="activity_integral">
            <Input type='text' v-model="formInline.activity_integral" placeholder="请输入" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormItem label="每日签到" prop="signin_time_integral">
            <Input type='text' v-model="formInline.signin_time_integral" placeholder="请输入" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="连续签到" prop="signin_time_number">
            <Input type='text' v-model="formInline.signin_time_number" placeholder="请输入" disabled/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="天 获得" prop="signin_time_number_integral">
            <Input type='text' v-model="formInline.signin_time_number_integral" placeholder="请输入" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormItem label="说明" prop="note">
            <Input type='textarea' v-model="formInline.note" placeholder="请输入数字" />
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
      this.$refs.CreateForm.validate(cb)
    },
    resetFields() {
      this.$refs.CreateForm.resetFields()
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
