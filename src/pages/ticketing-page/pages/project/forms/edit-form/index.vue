<template>
  <div>
    <Form @submit.native.prevent="()=>{}" ref="CreateForm" :model="formInline" :rules="ruleInline" :label-width="80">
      <Row>
        <Col span="12">
          <FormItem label="项目名称" prop="projectName">
            <Input type='text' v-model="formInline.projectName" placeholder="请输入" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="价格" prop="price">
            <Input type='number' v-model="formInline.price" placeholder="请输入" >
              <span slot="append">元</span>
            </Input>
          </FormItem>
        </Col>
      </Row>
      <FormItem :label="'时间段'+(index+1)" prop="amusementItemTimeRequestList" v-for="(item,index) of formInline.amusementItemTimeRequestList">
        <Row>
          <Col span="8">
            <FormItem label="" prop="beginTime">
              <TimePicker type='time' v-model="item.beginTime" format="HH:mm" placeholder="请选择开始时间" @on-change="changeStart(item.beginTime,index)" :clearable="false"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="至" prop="endTime" :label-width='40'>
              <TimePicker type='time' v-model="item.endTime" format="HH:mm" placeholder="请选择结束时间" @on-change="changeEnd(item.endTime,index)" :clearable="false"/>
            </FormItem>
          </Col>
          <Col span="4">
            <Button type="error" @click="remove(index)">删除</Button>
          </Col>
        </Row>
      </FormItem>
      <Row><Button @click="add" style="margin-left:80px">添加时间段</Button></Row>
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
    },
    changeStart(val,index){
      console.log(val)
      if(val>this.formInline.amusementItemTimeRequestList[index].endTime&&this.formInline.amusementItemTimeRequestList[index].endTime!=''){
        this.$Notice.error({desc:'开始时间不可大于结束时间'})
        this.formInline.amusementItemTimeRequestList[index].beginTime=''
      }
    },
    changeEnd(val,index){
      console.log(val)
      console.log(this.formInline)
      if(val<this.formInline.amusementItemTimeRequestList[index].beginTime){
        this.$Notice.error({desc:'结束时间不可小于开始时间'})
        this.formInline.amusementItemTimeRequestList[index].endTime=''
      }
    },
    add(){
      this.formInline.amusementItemTimeRequestList.push({ beginTime: '', endTime: '' })
    },
    remove(index){
      this.formInline.amusementItemTimeRequestList.splice(index,1)
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
