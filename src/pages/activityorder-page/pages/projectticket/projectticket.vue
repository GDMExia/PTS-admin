<template>
  <div>
    <Card>
      <top-menu @on-back="handleBack" @on-export="handleExport" style="display:inline-block"></top-menu>
      <div style="display:inline-block;position:absolute;right:20px;top:20px">{{row.projectName}}&nbsp;&nbsp; {{row.openDate+''+row.beginTime+'~'+row.endTime}}</div>
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
    </Card>
  </div>
</template>

<script>
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
    }
  },
  methods:{
    ...mapMutations([
      'closeTag'
    ]),
    handleQuery(){
      const data={
        token:this.$store.state.user.token,
        id:this.row.id
      }
      getData(data).then(res=>{
        console.log(res)
        if(res.data.code==='1000'){
          this.tableData=res.data.data.dataInfo
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
        name: 'projectticket',
        params: {
          row: this.$route.params.row
        }
      })
      this.$router.replace({name:'ItemTicket'})
    },
    handleExport(){}
  },
  mounted(){
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
