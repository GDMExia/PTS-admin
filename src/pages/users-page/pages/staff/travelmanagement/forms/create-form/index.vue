<template>
  <div>
    <Form @submit.native.prevent="()=>{}" ref="CreateForm" :model="formInline" :rules="ruleInline" :label-width="100">
      <Row>
        <Col span="8">
          <FormItem label="出行人及分组" prop="file">
            <Upload
              type="drag"
              action
              v-model="formInline.file"
              :before-upload="beforeUpload"
            >
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>(支持扩展名：.xls)</p>
              </div>
            </Upload>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="选择入住日期" prop="checkInDate">
            <DatePicker type='date' v-model="formInline.checkInDate" placeholder="请选择开始时间" :clearable="false"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="至" prop="checkOutDate" :label-width="20">
            <DatePicker type='date' v-model="formInline.checkOutDate" :value="formInline.endDate" placeholder="请选择结束时间":clearable="false"/>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <FormItem label="选择入住日期" prop="checkInDate">
          <Table :columns="homeStaycolumns" :data="homeStayData" style="overflown:auto">

          </Table>
        </FormItem>
      </Row>




      <Row>
        <Col span="8">
          <FormItem label="选择大巴车票" prop="busstartDate">
            <DatePicker type='date' v-model="formInline.busstartDate" placeholder="请选择开始时间" :clearable="false"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="至" prop="busendDate" :label-width="20">
            <DatePicker type='date' v-model="formInline.busendDate" :value="formInline.endDate" placeholder="请选择结束时间" :clearable="false"/>
          </FormItem>
        </Col>
      </Row>
      <Row><p style="marginLeft:100px">票量 待获取</p></Row>
      <Row>
        <Col span="8">
          <FormItem label="选择常规船票" prop="shipstartDate">
            <DatePicker type='date' v-model="formInline.shipstartDate" placeholder="请选择开始时间" :clearable="false"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="至" prop="shipendDate" :label-width="20">
            <DatePicker type='date' v-model="formInline.shipendDate" :value="formInline.endDate" placeholder="请选择结束时间" :clearable="false"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <p style="marginLeft:100px">全价票量 28</p>
      </Row>
      <Row>
        <p style="marginLeft:100px">半价票量 2</p>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="选择门票" prop="ticketDate">
            <DatePicker type='date' v-model="formInline.ticketDate" placeholder="请选择开始时间" :clearable="false"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <p style="marginLeft:100px">全价票量 28</p>
      </Row>
      <Row>
        <p style="marginLeft:100px">半价票量 2</p>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="选择交通车票" prop="transferticketDate" v-for="(item,index) of transferticketDate">
              <DatePicker type='date' v-model="item.time" placeholder="请选择开始时间" :clearable="false"/>
              <Button type="primary" v-if="index==0" @click="addtransferticketDate">新增</Button>
              <Button type="primary" v-else @click="removetransferticketDate(index)">删除</Button>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <FormItem 
        label="选择交通车票" 
        prop="projectticket"
        v-for="(item,index) of projectticket"
        >
        <!-- :rules="{required: true, message: '请选择项目', trigger: 'blur'}" -->
        <Col span="4">
          <Select v-model="item.name" placeholder="请选择项目">
          <Option :value='1'>1</Option>
          <Option :value='2'>2</Option>
          </Select>
        </Col>
        <Col span="9">
          <DatePicker type='daterange' v-model="item.time" placeholder="请选择时间段" :clearable="false" style="margin-left:10px;width:300px"/>
        </Col>
        <Col span="4">
          <Button type="primary" v-if="index==0" @click="addprojectticket">新增</Button>
          <Button type="primary" v-else @click="removeprojectticket(index)">删除</Button>
        </Col>
        </FormItem>
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
      transferticketDate:[{time:'123'}],
      projectticket:[{name:'',time:''}],
      homeStayData:[{homeStayName:'',roomName:'',num:''}],
      homeStaycolumns:[
        {
          title:'民宿名称',
          render:(h,params)=>{
            return h('i-select',{
              props:{
                value:params.row.homeStayName,
                transfer:true
              }
            })
          }
        },
        {
          title:'房间名称',
          render:(h,params)=>{
            return h('i-select',{
              props:{
                value:params.row.roomName,
                transfer:true
              }
            })
          }
        },
        {
          title:'数量',
          render:(h,params)=>{
            return h('Input',{
              props:{
                value:params.row.num
              }
            })
          }
        },
        {
          title:'操作',
          key:'handle',
          render:(h,params)=>{
            return h('div',[
              h('i-button',{
                props: {
                  type: params.index==0?'primary':'error',
                  size: 'small'
                },
                on:{
                  click:()=>{
                    console.log(params)
                    if(params.index==0){
                      this.addhomestay()
                    }else{
                      this.removehomestay(params.index)
                    }
                  }
                }
              },params.index==0?'新增':'删除')
            ])
          }
        }
      ]
    };
  },
  methods: {
    validate(cb) {
      this.$refs.CreateForm.validate(cb)
    },
    resetFields() {
      this.$refs.CreateForm.resetFields()
    },
    beforeUpload(){},
    getList(){
      // getCharacterList().then(res=>{
      //   console.log(res)
      //   if(res.data.code==="1000"){
      //     this.characterList=res.data.data.dataInfo
      //     this.characterList.shift()
      //     // console.log(this.characterList.unshift({key:'',value:'全部'}))
      //   }else{
      //     this.$Notice.error({
      //       desc:'获取失败'
      //     })
      //   }
      // })
    },
    addhomestay(){
      this.homeStayData.push({homeStayName:'',roomName:'',num:''})
    },
    removehomestay(index){
      this.homeStayData.splice(index,1)
    },
    // 新增交通车票
    addtransferticketDate(){
      this.transferticketDate.push({time:''})
    },
    removetransferticketDate(index){
      this.transferticketDate.splice(index,1)
    },
    addprojectticket(){
      this.projectticket.push({name:'',time:''})
    },
    removeprojectticket(index){
      this.projectticket.splice(index,1)
    }
  },
  props: {
    formInline: Object,
    ruleInline: Object
  },
  mounted() {
    this.getList()
  },
  watch: {
  }
};
</script>

<style>
</style>
