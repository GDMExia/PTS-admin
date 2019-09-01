<template>
  <div>
    <Card>
      <top-menu @on-create="handleCreate"></top-menu>
      <div class="search search-con search-con-top">
        <!-- <Select v-model="character" class="search-col" style="width:100px;margin-right:10px">
            <Option v-for="(item,index) of characterList"
            :key="index"
            :value="item.key"
            >
            {{item.value}}
            </Option>
        </Select> -->
        <Input type="text" placeholder="请输入商家名称" v-model="phone" style="width:200px;margin-right:10px" />
        <Input type="text" placeholder="请输入优惠券名称" v-model="phone" style="width:200px;margin-right:10px" />
        <Input type="text" placeholder="请输入发放时间" v-model="phone" style="width:200px;margin-right:10px" />
        <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
      </div>
      <Tables
        highlight-row
        stripe
        v-model="tableData"
        :columns="columns"
        :searchable="false"
        :border="false"
        :menuTopSpan = 9
        @on-edit="handleEdit"
        @on-delete="handleDelete"
        @on-change="handleChange"
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
          @getForm="getForm"
        >
        </EditForm>
      </ModelDialog>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import TopMenu from "./forms/top-menu";
import ModelDialog from "_c/model-dialog";
import EditForm from "./forms/edit-form"
import EditFormModel from "./model/edit-form";
import CreateForm from "./forms/create-form"
import CreateFormModel from "./model/create-form";
import pageInfo from "@/libs/page-info"
import { columns , getData , createData  , updateData , changeData , deleteData } from "./api";
export default {
  components:{
    Tables,
    TopMenu,
    ModelDialog,
    EditForm,
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
      editForm: EditFormModel.init(),
      createForm: CreateFormModel.init(),
    }
  },
  methods: {
    //获取列表
    handleQuery(){
      getData(this.page).then(res=>{
        if(res.data.code==='1000'){
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
      this.setDialogProperty(true,'添加','CreateForm',800)
    },
    handleEdit(params){
      console.log(params)
      this.setDialogProperty(true,'编辑','EditForm',800)
      this.editForm=EditFormModel.init(params.row)
      this.$nextTick(()=>{
        this.$refs['EditForm'].getImgList(params.row.assets)
      })
      this.$refs['EditForm'].getImgList(params.row.assets)
    },
    handleDelete(params){
      deleteData(params.row.id).then(res=>{
        if(res.data.code==='1000'){
          this.$Notice.success({
            desc:res.data.data.dataInfo
          })
        }else{
          this.$Notice.error({
            desc:res.data.data.dataInfo
          })
        }
        this.handleQuery()
      })
    },
    handleChange(params){
      console.log(params)
      changeData(params.row.id).then(res=>{
        console.log(res)
        if(res.data.code==='1000'){
          this.$Notice.success({
            desc:res.data.data.dataInfo
          })
        }else{
          this.$Notice.error({
            desc:res.data.data.dataInfo
          })
        }
        this.handleQuery()
      })
    },
    ok(name){
      console.log(this.$refs[name].formInline)
      this.$refs[name].validate((valid) => {
        if (valid) {
          // getLocal(this.$refs[name].formInline.address).then(res=>{
            this.$jsonp(`https://apis.map.qq.com/ws/geocoder/v1/?address=浙江省舟山市嵊泗县花鸟岛${this.$refs[name].formInline.address}&key=EFIBZ-L4HWV-NMRPP-UVJ2F-K2MHQ-GIFD5`,
            {
              key:'EFIBZ-L4HWV-NMRPP-UVJ2F-K2MHQ-GIFD5',
              callbackName: 'QQmap',
              output:'jsonp',
              address:`浙江省舟山市嵊泗县花鸟岛${this.$refs[name].formInline.address}`
            }).then(res=>{
            console.log(res)
            if(res.message=='query ok'){
              this.$refs[name].formInline.location=res.result.location.lat+','+res.result.location.lng
              if(name==="CreateForm"){
                this.create()
              }else if(name=="EditForm"){
                this.update()
              }
            }else{
              this.$Notice.error({
                desc:res.message
              })
            }
          })
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
      createData(this.createForm.formInline).then(res=>{
        console.log(res)
        if(res.data.code==='1000'){
          this.$Notice.success({
            desc:res.data.message
          })
          this.$refs['CreateForm'].resetFields()
          this.setDialogProperty(false)
          this.$refs['CreateForm'].imgList=[]
          this.handleQuery()
        }else{
          this.$Notice.error({
            desc:res.data.data.errorInfo.errorInfo
          })
        }
      })
    },
    update(){
      updateData(this.editForm.formInline).then(res=>{
        console.log(res)
        if(res.data.code==='1000'){
          this.$Notice.success({
            desc:res.data.data.dataInfo
          })
          this.$refs['EditForm'].resetFields()
          this.setDialogProperty(false)
          this.$refs['EditForm'].imgList=[]
          this.handleQuery()
        }else{
          this.$Notice.error({
            desc:res.data.message
          })
        }
      })
    },
    cancel(name){
      this.$refs[name].imgList=[]
      this.$refs[name].resetFields()
    },
    getForm(form){
      console.log(form)
      this.form=form
    },
  },
  mounted() {
    this.columns=columns
    this.page = pageInfo.init()
    this.handleQuery()
  }
}
</script>

<style>
.search{position:absolute;right:16px;top:5px;display: inline-block;}
</style>
