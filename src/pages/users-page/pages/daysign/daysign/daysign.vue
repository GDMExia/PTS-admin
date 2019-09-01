<template>
  <div>
    <Card>
      <top-menu @on-back="handleBack" @on-upload="handleUpload"></top-menu>
      <Tables
        highlight-row
        stripe
        v-model="tableData"
        :columns="columns"
        :searchable="false"
        :border="false"
        :menuTopSpan = 9
        @on-view="handleView"
        @on-edit="handleEdit"
      >
      </Tables>
      <div style="margin-top:10px;text-align:right;">
        <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleChangePage" 
        size="small" :page-size-opts="[20,50,100]" @on-page-size-change="handleChangePageSize"/>
      </div>
    </Card>
    <div>
      <ModelDialog :status="modelStatus"
        @handlerModelDialogOk="handlerModelDialogOk"
        @handlerModelDialogCancel="handlerModelDialogCancel">
        <div v-if="modelStatus.name==='avatar'" style="text-align:center">
          <img :src="avatar" style="max-width:100%" />
        </div>
      </ModelDialog>
    </div>
  </div>
</template>

<script>
import Tables from '_c/tables'
import TopMenu from "./forms/top-menu";
import pageInfo from "@/libs/page-info";
import ModelDialog from "_c/model-dialog";
import { columns , getData, setCreat } from "./api";
export default {
  components:{
    Tables,
    TopMenu,
    ModelDialog
  },
  data(){
    return{
      tableData:[],
      columns:[],
      page: {},
      modelStatus: { show: false, hide: false, loading: true, title: '', name: '' },
      avatar: ''
    }
  },
  methods:{
    handleQuery(){
      getData(this.page).then(res=>{
        if(res.data.code==200) {
          this.tableData = res.data.data.fileList?res.data.data.fileList:[]
          this.page = pageInfo.converter({pageIndex: this.page.index, pageSize: this.page.size, pageTotal: res.data.data.PageInfo.TotalCounts,search: this.page.search})
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    handleView(params) {
      this.avatar = params.row.pic
      this.modelStatus.show = true
      this.modelStatus.loading = true
      this.modelStatus.title = '查看'
      this.modelStatus.name = 'avatar'
      this.modelStatus.hide = true
    },
    handleEdit(params) {},
    handleBack(){
      this.$router.back()
    },
    handleUpload(){},
    /* 对话框确认 */
    handlerModelDialogOk(name) {
      
      this.modelStatus.loading = false
      this.$nextTick(() => {
        this.modelStatus.loading = true
      })
    },

    /* 对话框取消 */
    handlerModelDialogCancel() {
      // this.$Message.info('Clicked cancel')
      this.modelStatus.show = false
      // 对话框显示footer
      this.modelStatus.hide = false
    },
  },
  mounted(){
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
