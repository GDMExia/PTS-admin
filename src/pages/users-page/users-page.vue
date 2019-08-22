<template>
  <div>
    <Card>
      <div>
        <top-menu class="button" @on-create="handleCreate" @on-export="handleExport" @on-price="handlePrice" @on-sign="handleSign"></top-menu>
        <div class="search search-con search-con-top">
        <Select v-model="queryForm.is_member" clearable class="search-col" style="width:100px;margin-right:10px">
            <Option v-for="(item,index) of characterList"
            :key="index"
            :value="item.key"
            >
            {{item.value}}
            </Option>
        </Select>
        <Input type="text" placeholder="请输入手机号进行搜索" v-model="queryForm.phone" style="width:200px" />
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
        size="small" :page-size-opts="[10,20,50,100,1000]" @on-page-size-change="handleChangePageSize"/>
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
import { userscolumns , getData , getIntegralDetail ,setIntegralInfo, setPrice } from "./api";
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
      tableData:[],
      columns:[],
      page: {},
      queryForm: {
        phone: '',
        is_member: ''
      },
      modelStatus: {
          show: false,
          hide: false,
          loading: true,
          title: "",
          name: ""
      },
      characterList:[{value:'VIP',key:1},{value:'普通用户',key:0}],
      createForm:{},
      setForm:{}
    }
  },
  methods: {
    //获取列表
    handleQuery(){
      getData(this.page, this.queryForm).then(res=>{
        if(res.data.code==200) {
          this.tableData = res.data.data.userList?res.data.data.userList.map(item=>{
            item.identify = item.is_member==1?'VIP':'普通用户'
            return item
          }):[]
          this.page = pageInfo.converter({pageIndex: this.page.index, pageSize: this.page.size, pageTotal: res.data.data.PageInfo.TotalCounts,search: this.page.search})
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    // 积分回显
    handleIntegralDetail() {
      getIntegralDetail().then(res=>{
        if(res.data.code==200) {
         const form = res.data.data.rulesInfo
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    // 改变页码
    handleChangePage(params) {
        this.page.index=params
        this.handleQuery();
    },
    // 改变显示条目
    handleChangePageSize(params) {
        this.page.size=params
        this.handleQuery();
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
      getIntegralDetail().then(res=>{
        if(res.data.code==200) {
         const form = res.data.data.rulesInfo
         this.createForm = CreateFormModel.init(form)
         this.setDialogProperty(true,'获取积分规则设置','CreateForm',500)
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    handleSetIntegral() {
      const form = this.createForm.formInline
      setIntegralInfo(form).then(res=>{
        if(res.data.code==200) {
          this.$Message.success('设置成功')
          this.modelStatus.show = false
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    //搜索
    handleSearch(){
      this.queryForm.is_member = this.queryForm.is_member||this.queryForm.is_member===0?this.queryForm.is_member:''
      this.page.search = pageInfo.transfer(this.queryForm)
      this.handleQuery()
    },
    //导出
    handleExport(){
      this.queryForm.is_member = this.queryForm.is_member||this.queryForm.is_member===0?this.queryForm.is_member:''
      const form = this.queryForm
      location.href = `${this.$config.baseUrl.pro}/Export/userExcalPut?is_member=${form.is_member}&phone=${form.phone}`
    },
    //设置vip价格
    handlePrice(){
      getIntegralDetail().then(res=>{
        if(res.data.code==200) {
         const form = res.data.data.rulesInfo
         this.setForm = SetFormModel.init(form)
         this.setDialogProperty(true,'VIP年费设置','SetForm',500)
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    handleSetPrice() {
      const form = this.setForm.formInline
      setPrice(form).then(res=>{
        if(res.data.code==200) {
          this.$Message.success('设置成功')
          this.modelStatus.show = false
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    // 弹出框点击确定
    ok(name){
      if(name==='SetForm') {
        this.$refs.SetForm.validate(valid=>{
            if(valid) {
                this.handleSetPrice()
            }
        })
      } else if(name==='CreateForm') {
        this.$refs.CreateForm.validate(valid=>{
            if(valid) {
                this.handleSetIntegral()
            }
        })
      }
      this.modelStatus.loading = false
      this.$nextTick(() => {
          this.modelStatus.loading = true
      })
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
      this.$router.push({ name: 'showlower',params: {row}, query: {uid_number: params.row.uid_number } })
    },
    //积分详情
    handleIntegral(params){
      const row = params.row
      this.$router.push({ name: 'integral',params: {row}, query: {uid: params.row.uid }})
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
