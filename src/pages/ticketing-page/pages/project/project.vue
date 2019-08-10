<template>
  <div>
    <Card>
      <top-menu @on-back="handleBack" @on-create="handleCreate"></top-menu>
      <Tables
        highlight-row
        stripe
        v-model="tableData"
        :columns="columns"
        :searchable="false"
        :border="false"
        :menuTopSpan = 9
        @on-edit = "handleEdit"
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
        <EditForm
          v-show="modelStatus.name == 'EditForm'"
          ref="EditForm"
          :formInline="editForm.formInline"
          :ruleInline="editForm.ruleInline"
        >
        </EditForm>
      </ModelDialog>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import TopMenu from "./forms/top-menu";
import pageInfo from "@/libs/page-info"
import ModelDialog from "_c/model-dialog";
import CreateForm from "./forms/create-form"
import CreateFormModel from "./model/create-form";
import EditForm from "./forms/edit-form"
import EditFormModel from "./model/edit-form";
import { mapMutations } from 'vuex'
import { columns , getData , createData , editData } from "./api";
export default {
  components:{
    Tables,
    TopMenu,
    ModelDialog,
    CreateForm,
    EditForm
  },
  data(){
    return{
      page: {},
      tableData:[],
      columns:[],
      modelStatus: {
        show: false,
        hide: false,
        loading: true,
        title: "",
        name: ""
      },
      createForm: CreateFormModel.init(),
      editForm: EditFormModel.init(),
    }
  },
  methods:{
    ...mapMutations([
      'closeTag'
    ]),
    handleQuery(){
      getData(this.$store.state.user.token).then(res=>{
        console.log(res)
        if(res.data.code==='1000'){
          this.tableData=res.data.data.dataInfo.list
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
    handleCreate(){
      this.setDialogProperty(true,'新增项目','CreateForm',600)
    },
    handleEdit(params){
      this.setDialogProperty(true,'编辑','EditForm',600)
      this.editForm=EditFormModel.init(params.row)
    },
    handleBack(){
      this.closeTag({
        name: 'setproject',
      })
      this.$router.replace({name:'ItemTicket'})
    },
    ok(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          let pass=false
          if(this.$refs[name].formInline.amusementItemTimeRequestList){
            this.$refs[name].formInline.amusementItemTimeRequestList.forEach(el=>{
              if(el.beginTime==''||el.endTime==''){
                this.$Notice.error({desc:'请填写正确的时间段'})
                this.modelStatus.loading = false
                this.$nextTick(() => {
                    this.modelStatus.loading = true
                })
                pass = false
              }else{
                pass = true
              }
            })
            }else{
              this.$Notice.error({desc:'请填写正确的时间段'})
              this.modelStatus.loading = false
              this.$nextTick(() => {
                  this.modelStatus.loading = true
              })
              pass = false
            }
            if(pass){
              if(name==="CreateForm"){
                this.create()
              }
              if(name==="EditForm"){
                this.edit()
              }
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
        data:this.createForm.formInline,
        token:this.$store.state.user.token
      }
      createData(data).then(res=>{
        console.log(res)
        if(res.data.code==='1000'){
          this.$Notice.success({
            desc:res.data.msg
          })
          this.$refs['CreateForm'].resetFields()
          this.$refs['CreateForm'].formInline.amusementItemTimeList=[{ beginTime: '', endTime: '' }]
          this.setDialogProperty(false)
          this.handleQuery()
        }else{
          this.$Notice.error({
            desc:res.data.msg
          })
        }
      })
    },
    edit(){
      let data={
        data:this.editForm.formInline,
        token:this.$store.state.user.token
      }
      console.log(data)
      editData(data).then(res=>{
        console.log(res)
        if(res.data.code==='1000'){
          this.$Notice.success({
            desc:res.data.msg
          })
          this.$refs['EditForm'].resetFields()
          this.$refs['EditForm'].formInline.amusementItemTimeList=[{ beginTime: '', endTime: '' }]
          this.setDialogProperty(false)
          this.handleQuery()
        }else{
          this.$Notice.error({
            desc:res.data.msg
          })
        }
      })
    },
    cancel(name){
      this.$refs[name].resetFields()
      this.$nextTick(()=>{
        this.$refs[name].formInline.amusementItemTimeRequestList=[{ beginTime: '', endTime: '' }]
        this.$refs['EditForm'].formInline.amusementItemTimeRequestList=[]
      })
    }
  },
  mounted(){
    this.page = pageInfo.init()
    console.log(this.row)
    this.columns=columns
    this.handleQuery()
  }
}
</script>

<style>
.selected{
  background-color: #2d8cf0;
}
</style>
