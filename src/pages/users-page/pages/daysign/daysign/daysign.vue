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
      getData(this.row.userId).then(res=>{
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
        name: 'daysign',
        params: {
          row: this.$route.params.row
        }
      })
      this.$router.replace({name:'users'})
    },
    handleUpload(){}
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
