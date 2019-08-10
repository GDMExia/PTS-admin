<template>
  <div>
    <Form @submit.native.prevent="()=>{}" ref="SetForm" :model="formInline" :rules="ruleInline" :label-width="80">
      <Row>
        <Col span="12">
          <FormItem label="日期" prop="startDate">
            <DatePicker type='date' v-model="formInline.startDate" :options="optionsStart" placeholder="请选择开始时间" @on-change="changeStart" :clearable="false"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="至" prop="endDate">
            <DatePicker type='date' v-model="formInline.endDate" :value="formInline.endDate" :options="optionsEnd" placeholder="请选择结束时间" @on-change="changeEnd" :clearable="false"/>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import axios from "@/libs/api.request"; // 引入 请求模块
import moment from 'moment'
import { gettrafficdate } from '../../../api'
export default {
  name:'SetForm',
  components: {

  },
  data() {
    return {
      startDate:'',
      endDate:'',
      optionsStart:{
        // disabledDate (date) {
        //   return (date && date.valueOf() > this.formInline.endDate.valueOf())||(date && date.valueOf() < Date.now() - 86400000)
        // }
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      optionsEnd:{
        disabledDate (date) {
          return (date && date.valueOf() < Date.now() - 86400000);
          // return date && date.valueOf() > formInline.startDate?formInline.startDate.valueOf():Date.now() - 86400000;
        }
      },
      setdateList:[]
    };
  },
  methods: {
    validate(cb) {
      this.$refs.SetForm.validate(cb)
    },
    resetFields() {
      this.$refs.SetForm.resetFields()
    },
    changeStart(){
      this.$nextTick(()=>{
      this.startDate=this.formInline.startDate.valueOf()
      let startDate=this.startDate
      let that=this
      console.log(this.startDate)
      this.optionsEnd.disabledDate=function(date){
        return date && date.valueOf()<startDate||(that.setdateList.indexOf(moment(date).format('YYYY-MM-DD'))!=-1)||(moment(that.formInline.startDate).format('YYYY-MM-DD')<that.setdateList[that.setdateList.length-1]&&moment(date).format('YYYY-MM-DD')>that.setdateList[that.setdateList.length-1]);
      } 
      })
      // console.log(this.startDate.valueOf())
    },
    changeEnd(){
      this.$nextTick(()=>{
      this.endDate=this.formInline.endDate.valueOf()
      let endDate=this.endDate
      console.log(this.endDate)
      let that=this
      this.optionsStart.disabledDate=function(date){
        // console.log(date)
        // console.log(moment(date).format('YYYY-MM-DD'))
        // console.log(that.setdateList.indexOf(moment(date).format('YYYY-MM-DD')))
        return date && (date.valueOf()>endDate||date.valueOf()<Date.now() - 86400000||(that.setdateList.indexOf(moment(date).format('YYYY-MM-DD'))!=-1)||(moment(that.formInline.endDate).format('YYYY-MM-DD')>that.setdateList[that.setdateList.length-1]&&moment(date).format('YYYY-MM-DD')<that.setdateList[that.setdateList.length-1]));
      } 
      })
    },
    async stratChange(){
      await this.getalreadysetdate()
      let that=this
      this.optionsStart.disabledDate=function(date){
        // console.log(date)
        // console.log(moment(date).format('YYYY-MM-DD'))
        // console.log(that.setdateList.indexOf(moment(date).format('YYYY-MM-DD')))
        return date && (date.valueOf()<Date.now() - 86400000||(that.setdateList.indexOf(moment(date).format('YYYY-MM-DD'))!=-1));
      } 
      this.optionsEnd.disabledDate=function(date){
        // console.log(date)
        // console.log(moment(date).format('YYYY-MM-DD'))
        // console.log(that.setdateList.indexOf(moment(date).format('YYYY-MM-DD')))
        return date && (date.valueOf()<Date.now() - 86400000||(that.setdateList.indexOf(moment(date).format('YYYY-MM-DD'))!=-1));
      } 
    },
    getalreadysetdate(){
      gettrafficdate(this.$store.state.user.token).then(res=>{
        console.log(res)
        if(res.data.code==1000){
          this.setdateList=res.data.data.dataInfo
          console.log(this.setdateList)
        }
      })
    },
    init(){
    this.stratChange()
      this.startDate='',
      this.endDate='',
      this.optionsStart={
        // disabledDate (date) {
        //   return (date && date.valueOf() > this.formInline.endDate.valueOf())||(date && date.valueOf() < Date.now() - 86400000)
        // }
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      this.optionsEnd={
        disabledDate (date) {
          return (date && date.valueOf() < Date.now() - 86400000);
          // return date && date.valueOf() > formInline.startDate?formInline.startDate.valueOf():Date.now() - 86400000;
        }
      }
    }
  },
  props: {
    formInline: Object,
    ruleInline: Object
  },
  mounted() {
    // console.log(this.formInline.startDate)
    // this.startDate=Date.now() - 86400000,
    // this.changeStart()
    // this.getalreadysetdate()
    this.stratChange()
    // this.endDate='',
    console.log(this.formInline)
    
  },
  watch: {
    formInline:{
      handler:function(val){
        console.log(val)
      }
    }
  }
};
</script>

<style>
</style>
