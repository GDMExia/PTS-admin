<template>
  <div>
    <Card>
      <top-menu @on-back="handleBack"></top-menu>
      <div class="box">
        <div class="box-item">
          <p class="box-item-title">当前积分</p>
          <p class="box-item-num">{{currentValue}}</p>
        </div>
        <div class="box-item">
          <p class="box-item-title">总获得积分</p>
          <p class="box-item-num">{{totalValue}}</p>
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
      <div style="margin-top:10px;text-align:right;">
        <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleChangePage" 
        size="small" :page-size-opts="[10,20,50,100,]" @on-page-size-change="handleChangePageSize"/>
      </div>
      </Tables>
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
      page: {},
      currentValue: 0,
      totalValue: 0,
      row:this.$route.params.row,
    }
  },
  methods:{
    ...mapMutations([
      'closeTag'
    ]),
    handleQuery(){
      getData(this.page, this.$route.query.uid).then(res=>{
        if(res.data.code==200) {
          this.tableData = res.data.data.paymentList?res.data.data.paymentList:[]
          this.currentValue = res.data.data.accountPrice?res.data.data.accountPrice:0
          this.totalValue = res.data.data.accountPriceTal?res.data.data.accountPriceTal:0
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
        name: 'integral',
        params: {
          row: this.$route.params.row
        }
      })
      this.$router.replace({name:'users'})
    },
  },
  mounted(){
    this.page = pageInfo.init()
    this.columns=columns
    this.handleQuery()
  }
}
</script>

<style>
.selected{
  background-color: #2d8cf0;
}
.box {
  display: flex;
  width: 50%;
  height: 153px;
  margin-bottom: 20px;
}
.box-item {
  flex: 1;
  border: 1px solid rgb(238,238,238);
  margin-right: 5px;
}
.box-item-title {
  height: 47px;
  line-height: 47px;
  background: rgb(226,226,226);
  padding: 0 20px;
}
.box-item-num {
  padding: 0 20px;
  font-size: 30px;
  font-weight: bold;
  margin-top: 15px
}
</style>
