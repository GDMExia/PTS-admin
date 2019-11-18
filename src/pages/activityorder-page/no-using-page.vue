<template>
  <div>
    <Card>
      <div style="marginBottom:10px">
        <!-- <top-menu class="button" @on-create="handleCreate"></top-menu> -->
        <div>
            <Button type="default" @click="handleExport">导出</Button>
            <!-- <Button type="default" style="marginLeft:10px" @click="get">生成</Button> -->
        </div>
        <div class="search search-con search-con-top">
        <!-- <DatePicker type="daterange" style="width:200px" v-model="date" placeholder="请选择日期/日期段进行搜索"></DatePicker> -->
        <Input placeholder="请输入用户联系电话" v-model="queryForm.phone" style="width:150px;margin-right:10px"></Input>
        <Input placeholder="请输入活动标题" v-model="queryForm.goods_name" style="width:150px;margin-right:10px"></Input>
          <Input placeholder="请输入订单号" v-model="queryForm.order_no" style="width:150px"></Input>
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
        show-sizer size="small" :page-size-opts="[20,50,100]" @on-page-size-change="handleChangePageSize"/>
      </div>
      <ModelDialog
        :status="modelStatus"
        @handlerModelDialogOk="ok"
        @handlerModelDialogCancel="cancel"
      >
<!--        <CreateForm-->
<!--          v-show="modelStatus.name == 'CreateForm'"-->
<!--          ref="CreateForm"-->
<!--          :formInline="createForm.formInline"-->
<!--          :ruleInline="createForm.ruleInline"-->
<!--        >-->
<!--        </CreateForm>-->
<!--        <SetForm-->
<!--          v-show="modelStatus.name == 'SetForm'"-->
<!--          ref="SetForm"-->
<!--          :formInline="setForm.formInline"-->
<!--          :ruleInline="setForm.ruleInline"-->
<!--        >-->
<!--        </SetForm>-->
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
import { waitingcolumns, getOrderList } from "./api";
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
      queryForm:{
        phone:'',
        goods_name:'',
        order_no:''
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
      console.log(this.page)
      var data={
        page: this.page,
        search: this.queryForm,
        token: this.$store.state.user.token,
        order_status: 6
      }
      console.log(this.page)
      getOrderList(data).then(res=>{
        console.log(res)
        if(res.data.code=='200'){
          this.tableData=res.data.data.orderList||[]
          console.log(res.data.data.PageInfo)
          this.page={
            index: this.page.index,
            size: parseInt(res.data.data.PageInfo.PageSize),
            total:this.page.size*res.data.data.PageInfo.TotalPages
          }
        }else{
          // this.$Notice.error({
          //   desc:'获取失败'
          // })
        }
      })
    },
    handleExport(){
      location.href=this.$config.baseUrl.pro+`/Export/orderDataExcalPut?phone=${this.queryForm.phone}&goods_name=${this.queryForm.goods_name}&order_no=${this.queryForm.order_no}&order_status=6`
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
    handleSearch(){
      this.page = pageInfo.init()
      console.log(this.date)
      this.handleQuery()
    },
    ok(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          if(name==="CreateForm"){
            // this.create()
          }
          if(name==="SetForm"){
            // this.set()
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
    cancel(name){
      this.$refs[name].resetFields()
    }
  },
  mounted() {
    this.columns=waitingcolumns
    this.page = pageInfo.init()
    this.handleQuery()
    console.log(this.$store.state.user.token)
  }
}
</script>

<style>
.search{position:absolute;right:16px;top:5px;display: inline-block;}
</style>
