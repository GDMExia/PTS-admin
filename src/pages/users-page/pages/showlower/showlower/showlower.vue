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
        size="small" :page-size-opts="[10,20,50,100,1000]" @on-page-size-change="handleChangePageSize"/>
      </div>
    </Card>
  </div>
</template>

<script>
import pageInfo from "@/libs/page-info"
import Tables from '_c/tables'
import TopMenu from "./forms/top-menu";
import { mapMutations } from 'vuex'
import { columns , getData } from "./api";
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
      page: {}
    }
  },
  methods:{
    ...mapMutations([
      'closeTag'
    ]),
    handleQuery(){
      getData(this.page, this.$route.query.uid_number).then(res=>{
        if(res.data.code==200) {
          this.tableData = res.data.data.userList?res.data.data.userList.map(item=>{
            item.sexStr = item.sex==1?'男':'女'
            return item
          }):[]
          this.page = pageInfo.converter({pageIndex: this.page.index, pageSize: this.page.size, pageTotal: res.data.data.PageInfo.TotalCounts,search: this.page.search})
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
    handleBack(){
      console.log(this.$route.params)
      this.closeTag({
        name: 'showlower',
        params: {
          row: this.$route.params.row
        }
      })
      this.$router.replace({name:'users'})
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
