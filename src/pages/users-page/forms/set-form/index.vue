<template>
  <div>
    <Form @submit.native.prevent="()=>{}" ref="SetForm" :model="formInline" :rules="ruleInline" :label-width="100">
      <Row>
        <Col>
          <FormItem label="年费（元）" prop="vip_price">
            <Input type='text' v-model="formInline.vip_price" placeholder="请输入" />
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
      this.$refs.SetForm.validate(cb)
    },
    resetFields() {
      this.$refs.SetForm.resetFields()
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
