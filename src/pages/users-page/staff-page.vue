<template>
  <div>
    <Card>
      <div style="">
        <top-menu class="button" @on-create="handleCreate"></top-menu>
        <div class="search search-con search-con-top">
        <Select v-model="character" class="search-col">
            <Option v-for="(item,index) of characterList"
            :key="index"
            :value="item.key"
            >
            {{item.value}}
            </Option>
        </Select>
        <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
      </div>
      </div>
      <Tables
        highlight-row
        stripe
        v-model="tableData"
        :columns="columns"
        :searchable="false"
        :border="false"
        :menuTopSpan = 9
        @on-handle="handleManage"
        @on-change="handleChange"
      >
      </Tables>
      <div style="margin-top:10px;text-align:right;">
        <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleChangePage" 
        show-sizer size="small" :page-size-opts="[10,20,50,100,1000]" @on-page-size-change="handleChangePageSize"/>
      </div>
      <ModelDialog
        :status="modelStatus"
        @handlerModelDialogOk="ok"
        @handlerModelDialogCancel="cancel"
      >
        <CreateForm
          v-show="modelStatus.name == 'CreateForm'"
          ref="CreateForm"
          :formInline="createForm.formInline"
          :ruleInline="createForm.ruleInline"
        >
        </CreateForm>
      </ModelDialog>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import TopMenu from "./forms/staff/top-menu";
import ModelDialog from "_c/model-dialog";
import CreateForm from "./forms/staff/create-form"
import CreateFormModel from "./model/staff/create-form";
import pageInfo from "@/libs/page-info"
import { staffcolumns , getData , getCharacterList, createData , changeworkData } from "./api";
export default {
  components:{
    Tables,
    TopMenu,
    ModelDialog,
    CreateForm
  },
  data(){
    return{
      tableData:[],
      columns:[],
      page: {},
      modelStatus: {
          show: false,
          hide: false,
          loading: true,
          title: "",
          name: ""
      },
      createForm: CreateFormModel.init(),
      character:'全部',
      characterList:[]
    }
  },
  methods: {
    //获取列表
    handleQuery(){
      console.log(this.character)
      getData(Object.assign(this.page,{character:this.character})).then(res=>{
        if(res.data.code==="1000"){
          this.tableData=res.data.data.dataInfo;
          this.page={
            index:res.data.pageIndex,
            size:res.data.pageSize,
            total:res.data.total
          }
        }else{
          this.$Notice.error({
            desc:'获取失败'
          })
        }
      })
    },
    // 获取角色列表
    getList(){
      getCharacterList().then(res=>{
        console.log(res)
        if(res.data.code==="1000"){
          this.characterList=res.data.data.dataInfo
          this.characterList.shift()
          this.characterList.unshift({key:'全部',value:'全部'})
          // console.log(this.characterList.unshift({key:'',value:'全部'}))
        }else{
          this.$Notice.error({
            desc:'获取失败'
          })
        }
      })
    },
    // 改变页码
    handleChangePage(params) {
        console.log("改变页码", params);
        this.page.index=params
        this.handleQuery(params);
        // console.log(this.page)
    },
    // 改变显示条目
    handleChangePageSize(params) {
        console.log("改变显示条目", params);
        this.page.size=params
        this.handleQuery(params);
        console.log(this.page)
    },
    // 弹出框设置
    setDialogProperty(show, title, name, width) {
      this.modelStatus.title = title;
      this.modelStatus.name = name;
      this.modelStatus.show = show;
      this.modelStatus.width = width;
    },
    //添加事件
    handleCreate(){
      this.setDialogProperty(true,'添加','CreateForm',500)
    },
    //改变角色上下线状态
    handleChange(params){
      console.log(params)
      let data={
        id:params.row.userId
      }
      changeworkData(data).then(res=>{
        console.log(res)
        if(res.data.code==='1000'){
          this.$Notice.success({
            desc:res.data.data.dataInfo
          })
          this.handleQuery()
        }else{
          this.$Notice.error({
            desc:res.data.data.dataInfo
          })
        }
      })
    },
    //分角色不同操作
    handleManage(params){
        console.log(params.row.roleName.indexOf('检票员'))
        const row = params.row
        if(params.row.roleName.indexOf('检票员')!==-1){
          this.$router.push({ name: 'check', params: { row } })
        }else{
          this.$router.push({ name: 'travelmanage', params: { row } })
        }
    },
    //搜索
    handleSearch(){
      this.handleQuery()
    },
    // 弹出框点击确定
    ok(name){
      console.log(this.$refs[name].formInline.projectType.join(','))
      this.$refs[name].validate((valid) => {
        if (valid) {
          if(name==="CreateForm"){
            this.create()
          }
        }else {
          this.$Message.error('请输入必填项!');
        }
        this.modelStatus.loading = false
        this.$nextTick(() => {
            this.modelStatus.loading = true
        })
      })
    },
    // 新增
    create(){
      const data={
        projectType: this.createForm.formInline.projectType.join(','),
        telephone: this.createForm.formInline.telephone,
        userName: this.createForm.formInline.userName,
        userType: this.createForm.formInline.userType
      }
      createData(data).then(res=>{
        if(res.data.code==="1000"){
          this.$Notice.success({
            desc:res.data.msg
          })
          this.$refs['CreateForm'].resetFields()
          this.setDialogProperty(false)
          this.handleQuery()
        }else{
          this.$Notice.error({
            desc:res.data.msg
          })
        }
      })
    },
    //弹出框取消
    cancel(name){
      this.$refs[name].resetFields()
    }
  },
  mounted() {
    console.log(this.character)
    this.getList()
    this.columns=staffcolumns
    this.page = pageInfo.init()
    this.handleQuery()
  }
}
</script>

<style>
.search{position:absolute;right:16px;top:5px;display: inline-block;}
</style>
