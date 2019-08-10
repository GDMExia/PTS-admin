<template>
  <div>
    <Card>
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
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import TopMenu from "./forms/staff/top-menu";
import ModelDialog from "_c/model-dialog";
import pageInfo from "@/libs/page-info"
import { touristcolumns , getData , getCharacterList, createData , changeData } from "./api";
export default {
  components:{
    Tables,
    TopMenu,
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
      characterList:[]
    }
  },
  methods: {
    //获取列表
    handleQuery(){
      getData(Object.assign(this.page,{character:'tourists'})).then(res=>{
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
    getList(){
      getCharacterList().then(res=>{
        console.log(res)
        if(res.data.code==="1000"){
          this.characterList=res.data.data.dataInfo
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
    handleChange(params){
      console.log(params)
      let data={
        id:params.row.userId
      }
      changeData(data).then(res=>{
        console.log(res)
        if(res.data.code==='1000'){
          this.$Notice.success({
            desc:res.data.data.dataInfo
          })
          this.handleQuery()
        }else{
          this.$Notice.error({
            desc:'123'
          })
        }
      })
      
    },
    handleManage(params){
        const row = params.row
        this.$router.push({ name: 'travel', params: { row } })
    }
  },
  mounted() {
    this.columns=touristcolumns
    this.page = pageInfo.init()
    this.handleQuery()
  }
}
</script>

<style>
.search{position:absolute;right:16px;top:5px;display: inline-block;}
</style>
