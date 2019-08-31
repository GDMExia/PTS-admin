<template>
  <div>
    <Card>
      <top-menu @on-back="handleBack" @on-create="handleCreate" :role="row.roleName"></top-menu>
      <Tables
        highlight-row
        stripe
        v-model="tableData"
        :columns="columns"
        :searchable="false"
        :border="false"
        :menuTopSpan = 9
        @on-showgroupinfo="showGroupInfo"
        @on-showbookinfo="showBookInfo"
      >
      </Tables>
      <div style="margin-top:10px;text-align:right;">
        <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleChangePage" 
        show-sizer size="small" :page-size-opts="[10,20,50,100,]" @on-page-size-change="handleChangePageSize"/>
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
import TopMenu from "./forms/top-menu";
import ModelDialog from "_c/model-dialog";
import CreateForm from "./forms/create-form"
import CreateFormModel from "./model/create-form";
import { mapMutations } from 'vuex'
import { columns , getData } from "./api";
import pageInfo from "@/libs/page-info"
export default {
  components:{
    Tables,
    TopMenu,
    CreateForm,
    ModelDialog
  },
  data(){
    return{
      tableData:[{travelTime:'2019/04/25-2019/04/27',travelNum:20,status: 0,createTime:'2019/04/03 10:00'},{travelTime:'2019/04/25-2019/04/27',travelNum:20,status: 1,createTime:'2019/04/03 10:00'}],
      columns:[],
      row:this.$route.params.row,
      page:{},
      modelStatus: {
          show: false,
          hide: false,
          loading: true,
          title: "",
          name: ""
      },
      createForm: CreateFormModel.init(),
    }
  },
  methods:{
    ...mapMutations([
      'closeTag'
    ]),
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
    //创建
    handleCreate(){
      this.setDialogProperty(true,this.row.roleName=='导游'?'创建团队票':'生成定制游票务','CreateForm',1000)
    },
    //获取数据
    handleQuery(){
      // getData(Object.assign(this.page,{token:this.$store.state.user.token},{userId:this.row.userId})).then(res=>{
      //   console.log(res)
      //   if(res.data.code==="1000"){
      //     this.tableData=res.data.data.dataInfo.list;
      //     this.page={
      //       index:res.data.data.dataInfo.pageNum,
      //       size:res.data.data.dataInfo.pageSize,
      //       total:res.data.data.dataInfo.pages*this.page.size
      //     }
      //   }else{
      //     this.$Notice.error({
      //       desc:'获取失败'
      //     })
      //   }
      // })
    },
    // 弹出框设置
    setDialogProperty(show, title, name, width) {
      this.modelStatus.title = title;
      this.modelStatus.name = name;
      this.modelStatus.show = show;
      this.modelStatus.width = width;
    },
    //返回上一页
    handleBack(){
      console.log(this.$route.params)
      this.closeTag({
        name: 'travelmanage',
        params: {
          row: this.$route.params.row
        }
      })
      this.$router.replace({name:'staff'})
    },
    //查看团队信息
    showGroupInfo(){

    },
    //查看预定信息
    showBookInfo(){

    },
    // 弹出框点击确定
    ok(name){
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
      // createData(this.createForm.formInline).then(res=>{
      //   if(res.data.code==="1000"){
      //     this.$Notice.success({
      //       desc:res.data.message
      //     })
      //     this.$refs['CreateForm'].resetFields()
      //     this.setDialogProperty(false)
      //     this.handleQuery()
      //   }else{
      //     this.$Notice.error({
      //       desc:res.data.message
      //     })
      //   }
      // })
    },
    //弹出框取消
    cancel(name){
      this.$refs[name].resetFields()
    }
  },
  mounted(){
    console.log(this.row)
    this.columns=columns
    this.page = pageInfo.init()
    this.handleQuery()
  }
}
</script>

<style>
.selected{
  background-color: #2d8cf0;
}
</style>
