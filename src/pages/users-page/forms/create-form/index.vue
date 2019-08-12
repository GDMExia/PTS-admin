<template>
  <div>
    <Form @submit.native.prevent="()=>{}" ref="CreateForm" :model="formInline" :rules="ruleInline" :label-width="80">
      <Row>
        <Col>
          <FormItem label="成为VIP" prop="userType">
            <Input type='text' v-model="formInline.character" placeholder="请输入内容" />
            <!-- <Select v-model="formInline.userType">
              <Option v-for="(item,index) of characterList"
              :key="index"
              :value="item.key"
              >
              {{item.value}}
              </Option>
            </Select> -->
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormItem label="下级用户首次成为VIP" prop="projectType">
            <Input type='text' v-model="formInline.character" placeholder="请输入内容" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormItem label="活动评价" prop="userName">
            <Input type='text' v-model="formInline.userName" placeholder="请输入" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormItem label="每日签到" prop="userName">
            <Input type='text' v-model="formInline.userName" placeholder="请输入" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="连续签到" prop="userName">
            <Input type='text' v-model="formInline.userName" placeholder="请输入" />
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="天 获得" prop="userName">
            <Input type='text' v-model="formInline.userName" placeholder="请输入" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormItem label="说明" prop="telephone">
            <Input type='textarea' v-model="formInline.telephone" placeholder="请输入数字" />
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import axios from "@/libs/api.request"; // 引入 请求模块
import { getCharacterList , getProjectList } from "../../api/index"
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
    getList(){
      getCharacterList().then(res=>{
        console.log(res)
        if(res.data.code==="1000"){
          this.characterList=res.data.data.dataInfo
          this.characterList.shift()
          // console.log(this.characterList.unshift({key:'',value:'全部'}))
        }else{
          this.$Notice.error({
            desc:'获取失败'
          })
        }
      })
    },
    getProject(){
      getProjectList().then(res=>{
        console.log(res)
        if(res.data.code==="1000"){
          this.projectList=res.data.data.dataInfo
        }else{
          this.$Notice.error({desc:res.data.msg})
        }
      })
    }
  },
  props: {
    formInline: Object,
    ruleInline: Object
  },
  mounted() {
    this.getList()
    this.getProject()
  },
  watch: {
  }
};
</script>

<style>
</style>
