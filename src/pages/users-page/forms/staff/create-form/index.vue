<template>
  <div>
    <Form @submit.native.prevent="()=>{}" ref="CreateForm" :model="formInline" :rules="ruleInline" :label-width="80">
      <Row>
        <Col>
          <FormItem label="角色" prop="userType">
            <!-- <Input type='text' v-model="formInline.character" placeholder="请输入内容" /> -->
            <Select v-model="formInline.userType">
              <Option v-for="(item,index) of characterList"
              :key="index"
              :value="item.key"
              >
              {{item.value}}
              </Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormItem 
          label="所属项目" 
          prop="projectType"
          :rules="{required: true, type:'array', message: '请选择项目', trigger: 'blur'}"
          v-if="formInline.userType=='project_ticket'"
          >
            <Select type='text' v-model="formInline.projectType" placeholder="请输入" multiple>
            <Option v-for="(item,index) of projectList" :value="item.id" :key="index">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormItem label="姓名" prop="userName">
            <Input type='text' v-model="formInline.userName" placeholder="请输入" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormItem label="手机号" prop="telephone">
            <Input type='text' v-model="formInline.telephone" placeholder="请输入数字" />
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import axios from "@/libs/api.request"; // 引入 请求模块
import { getCharacterList , getProjectList } from "../../../api/index"
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
          this.$Notice.error({desc:res.data.message})
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
