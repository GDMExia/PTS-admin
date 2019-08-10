<template>
  <div>
    <Card>
      <div style="marginBottom:10px">
        <!-- <top-menu class="button" @on-create="handleCreate"></top-menu> -->
        <div>
            <Button type="default" @click="setPrice">价格设置</Button>
            <Button type="default" style="marginLeft:10px" @click="get">生成</Button>
        </div>
        <div class="search search-con search-con-top">
        <DatePicker type="daterange" style="width:200px" v-model="date" placeholder="请选择日期/日期段进行搜索"></DatePicker>
        <Button @click="handleSearch" class="search-btn" type="primary" style="marginLeft:10px"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
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
import ModelDialog from "_c/model-dialog";
import CreateForm from "./forms/entrance/create-form"
import CreateFormModel from "./model/entrance/create-form";
import SetForm from "./forms/entrance/set"
import SetFormModel from "./model/entrance/set";
import pageInfo from "@/libs/page-info"
import moment from "moment"
import { entrancecolumns , getentranceData , getentrancePrice , setentrancePrice , setentrancedate } from "./api";
export default {
  components:{
    Tables,
    ModelDialog,
    CreateForm,
    SetForm
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
      setForm: SetFormModel.init(),
      date:['',''],
      search:{startTime:'',endTime:''},
    }
  },
  methods: {
    //获取列表
    handleQuery(){
      this.search.startTime=this.date[0]?moment(this.date[0]).format('YYYY-MM-DD'):''
      this.search.endTime=this.date[1]?moment(this.date[1]).format('YYYY-MM-DD'):''
      var data={
        page: this.page,
        search: this.search.startTime&&this.search.endTime?this.search:'',
        token: this.$store.state.user.token
      }
      // Object.assign(this.page,this.search,{'token':this.$store.state.user.token})
      console.log(this.page)
      getentranceData(data).then(res=>{
        console.log(res)
        if(res.data.code==='1000'){
          this.tableData=res.data.data.dataInfo.list;
          this.page={
            index:res.data.data.dataInfo.pageNum,
            size:res.data.data.dataInfo.pageSize,
            total:this.page.size*res.data.data.dataInfo.pages
          }
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
    setDialogProperty(show, title, name, width) {
      this.modelStatus.title = title;
      this.modelStatus.name = name;
      this.modelStatus.show = show;
      this.modelStatus.width = width;
    },
    // handleCreate(){
    //   this.setDialogProperty(true,'添加','CreateForm',500)
    // },
    setPrice(){
        this.setDialogProperty(true,'价格设置','CreateForm',500)
    },
    getPrice(){
      getentrancePrice({token:this.$store.state.user.token}).then((res)=>{
        if(res.data.code==="1000"){
          this.createForm.formInline=res.data.data.dataInfo
        }else{
          this.$Notice.error({
            desc:'获取失败'
          })
        }
      })
    },
    get(){
        this.setForm= SetFormModel.init(),
        this.$refs['SetForm'].init()
        this.setDialogProperty(true,'生成','SetForm',500)
    },
    handleSearch(){
      console.log(this.date)
      this.handleQuery()
    },
    ok(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          if(name==="CreateForm"){
            this.create()
          }
          if(name==="SetForm"){
            this.set()
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
    create(){
      let data={
        price:this.createForm.formInline,
        token:this.$store.state.user.token
      }
      console.log(data)
      setentrancePrice(data).then(res=>{
        console.log(res)
        if(res.data.code==='1000'){
          this.$Notice.success({
            desc:res.data.msg
          })
          this.$refs['CreateForm'].resetFields()
          this.setDialogProperty(false)
          // this.handleQuery()
          this.getPrice()
        }else{
          this.$Notice.error({
            desc:res.data.msg
          })
        }
      })
    },
    set(){
      // console.log(this.setForm.formInline.startDate>this.setForm.formInline.endDate)
      let date={
        startDate:moment(this.setForm.formInline.startDate).format('YYYY-MM-DD'),
        endDate:moment(this.setForm.formInline.endDate).format('YYYY-MM-DD')
      }
      console.log(this.setForm.formInline)
      let data={
        date:date,
        token:this.$store.state.user.token
      }
      console.log(data)
      setentrancedate(data).then(res=>{
        console.log(res)
        if(res.data.code==='1000'){
          this.$Notice.success({
            desc:res.data.msg
          })
          this.$refs['SetForm'].resetFields()
          this.setDialogProperty(false)
          this.handleQuery()
        }else{
          this.$Notice.error({
            desc:res.data.data.errorInfo
          })
        }
      })
    },
    cancel(name){
      this.$refs[name].resetFields()
      this.getPrice()
    }
  },
  mounted() {
    this.columns=entrancecolumns
    this.page = pageInfo.init()
    this.handleQuery()
    this.getPrice()
    console.log(this.$store.state.user.token)
  }
}
</script>

<style>
.search{position:absolute;right:16px;top:5px;display: inline-block;}
</style>
