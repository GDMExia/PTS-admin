<template>
    <div>
        <Card>
            <div class="clearfix" style="margin-bottom: 10px;">
                <div class="pull-left">
                    <Button @click="handleCreate" class="search-btn" type="primary" style="margin-right:5px">
                        <Icon type="md-add" />&nbsp;&nbsp;添加</Button>
                    <Button @click="handleInfo" class="search-btn" type="success" style="margin-right:5px">
                        <Icon type="ios-crop-outline" />&nbsp;&nbsp;相关文章设置</Button>
                    <!-- <Button @click="handleCreate" class="search-btn" type="primary" style="margin-right:5px">
                        <Icon type="md-add"/>&nbsp;&nbsp;生成</Button> -->
                </div>
                <div class="pull-right">
                    <Cascader :data="casdata" @on-change="handleChange" change-on-select @on-clear="handleChange">
                        <!-- <a href="javascript:void(0)">选择</a> -->
                    </Cascader>
                </div>
            </div>
            <tables class="self-table-wrap" ref="tables" stripe v-model="tableData" :columns="columns"/>
            <div style="margin-top:10px;text-align:right;">
                <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleOnChange" 
                show-sizer size="small" :page-size-opts="[10,20,50,100,1000]" @on-page-size-change="handleOnChangeSize"/>
            </div>
        </Card>
    </div>
</template>
<script>
import Tables from '_c/tables'
import pageInfo from "@/libs/page-info"
import {
    schoolarticleColumn,
    getarticleData,
    getCategoryTree
} from './api'
export default {
    components: {
        Tables,
    },
    data() {
        return {
            tableData: [],
            columns: [],
            page: {},
            modelStatus: { show: false, hide: false, loading: true, title: '', name: '' },
            createForm: {},
            casdata:[],
            category:''
        }
    },
    methods: {
        handleQuery() {
            let data={
                token:this.$store.state.user.token,
                page:this.page,
                cid:this.category||0
            }
            getarticleData(data).then(res=>{
                console.log(res)
                if(res.data.code=="200"){
                    if(res.data.data.newsList){
                        this.tableData=res.data.data.newsList
                    }else{
                        this.tableData=[]
                    }
                }
            })
        },
        handleCategoryTree(){
            getCategoryTree(this.$store.state.user.token).then(res=>{
                console.log(res)
                if(res.data.code=="200"){
                    this.casdata=res.data.data.Classification.map(el=>{
                        el.value=el.id,
                        el.label=el.cate_name,
                        el.children=el.Classification.map(em=>{
                            em.value=em.id,
                            em.label=em.cate_name
                            return em
                        })
                        return el
                    })
                    this.casdata.unshift({value:'0',label:'全部'})
                }
            })
        },
        handleChange(event){
            console.log(event)
            console.log(this.category)
            this.category=event[event.length-1]
            console.log(this.category)

            this.handleQuery()
        },
        // 添加
        handleCreate() {
            this.$router.push({name: 'price'})
        },
        // 基本信息设置
        handleInfo() {},
        handleCreate() {},
        /* 分页查询 */
        handleOnChange(index) {
            this.page.index = index
            this.handleQuery()
        },
        /* 分页大小 */
        handleOnChangeSize(size) {
            this.page.size = size
            this.handleQuery()
        },
    },
    mounted() {
        this.columns = schoolarticleColumn
        this.page = pageInfo.init()
        this.handleQuery()
        this.handleCategoryTree()
    }
}
</script>

