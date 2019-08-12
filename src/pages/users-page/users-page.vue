<template>
  <div>
    <Card>
      <div>
        <top-menu class="button" @on-create="handleCreate" @on-export="handleExport" @on-price="handlePrice" @on-sign="handleSign"></top-menu>
        <div class="search search-con search-con-top">
        <Select v-model="character" class="search-col" style="width:100px;margin-right:10px">
            <Option v-for="(item,index) of characterList"
            :key="index"
            :value="item.key"
            >
            {{item.value}}
            </Option>
        </Select>
        <Input type="text" placeholder="请输入手机号进行搜索" v-model="phone" style="width:200px" />
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
        @on-integral="handleIntegral"
        @on-showlower="handleShowlower"
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
        <SetForm
          v-show="modelStatus.name == 'SetForm'"
          ref="SetForm"
          :formInline="setForm.formInline"
          :ruleInline="setForm.ruleInline"
        >
        </SetForm>
      </ModelDialog>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import TopMenu from "./forms/top-menu";
import ModelDialog from "_c/model-dialog";
import pageInfo from "@/libs/page-info";
import CreateForm from "./forms/create-form"
import CreateFormModel from "./model/create-form";
import SetForm from "./forms/set-form"
import SetFormModel from "./model/set-form";
import { userscolumns , getData , createData , changeData } from "./api";
export default {
  components:{
    Tables,
    TopMenu,
    ModelDialog,
    CreateForm,
    SetForm
  },
  data(){
    return{
      tableData:[{id:'12',nickname:'nickname',phone:'13817070484',age:'27',upperID:'12363',overtime:'2020-08-22',identify:'VIP'}],
      columns:[],
      page: {},
      modelStatus: {
          show: false,
          hide: false,
          loading: true,
          title: "",
          name: ""
      },
      characterList:[{value:'VIP',key:1},{value:'普通用户',key:0}],
      createForm:CreateFormModel.init(),
      setForm:SetFormModel.init()
    }
  },
  methods: {
    //获取列表
    handleQuery(){
      // getData(Object.assign(this.page,{character:'tourists'})).then(res=>{
      //   if(res.data.code==="1000"){
      //     this.tableData=res.data.data.dataInfo;
      //     this.page={
      //       index:res.data.pageIndex,
      //       size:res.data.pageSize,
      //       total:res.data.total
      //     }
      //   }else{
      //     this.$Notice.error({
      //       desc:'获取失败'
      //     })
      //   }
      // })
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
        // console.log(this.page)
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
      this.setDialogProperty(true,'获取积分规则设置','CreateForm',500)
    },
    //搜索
    handleSearch(){
      this.handleQuery()
    },
    //导出
    handleExport(){

    },
    //设置vip价格
    handlePrice(){
      this.setDialogProperty(true,'VIP年费设置','SetForm',500)
    },
    // 弹出框点击确定
    ok(name){
      
    },
    //弹出框取消
    cancel(name){
      this.$refs[name].resetFields()
    },
    //日签
    handleSign(){

    },
    //查看下级
    handleShowlower(params){
      const row = params.row
      this.$router.push({ name: 'showlower', params: { row } })
    },
    //积分详情
    handleIntegral(params){
      const row = params.row
      this.$router.push({ name: 'integral', params: { row } })
    }
  },
  mounted() {
    this.columns=userscolumns
    this.page = pageInfo.init()
    this.handleQuery()
  }
}
</script>

<style>
.search{position:absolute;right:16px;top:5px;display: inline-block;}
</style>
