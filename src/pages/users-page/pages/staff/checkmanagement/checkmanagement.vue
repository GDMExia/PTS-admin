<template>
  <div>
    <Card>
      <top-menu @on-back="handleBack"></top-menu>
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
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import TopMenu from "./forms/top-menu";
import { mapMutations } from 'vuex'
import { columns , getData } from "./api";
import pageInfo from "@/libs/page-info"
export default {
  components:{
    Tables,
    TopMenu
  },
  data(){
    return{
      tableData:[],
      columns:[],
      row:this.$route.params.row,
      page:{}
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
    handleQuery(){
      getData(Object.assign(this.page,{token:this.$store.state.user.token},{userId:this.row.userId})).then(res=>{
        console.log(res)
        if(res.data.code==="1000"){
          this.tableData=res.data.data.dataInfo.list;
          this.page={
            index:res.data.data.dataInfo.pageNum,
            size:res.data.data.dataInfo.pageSize,
            total:res.data.data.dataInfo.pages*this.page.size
          }
        }else{
          this.$Notice.error({
            desc:'获取失败'
          })
        }
      })
    },
    handleBack(){
      console.log(this.$route.params)
      this.closeTag({
        name: 'check',
        params: {
          row: this.$route.params.row
        }
      })
      this.$router.replace({name:'staff'})
    },
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
