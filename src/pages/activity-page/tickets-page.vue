<template>
    <div>
        <Card>
            <div class="clearfix">
                <div class="pull-left" style="margin-bottom: 10px;">
                    <Button @click="$router.back()" class="search-btn" type="primary" style="margin-right:5px">
                        <Icon type="md-arrow-back" />&nbsp;&nbsp;返回</Button>
                    <Button @click="handleCreate" class="search-btn" type="success" style="margin-right:5px">
                        <Icon type="md-add"/>&nbsp;&nbsp;添加</Button>
                </div>
                <div class="pull-right">
                    
                </div>
            </div>
            <tables class="self-table-wrap" ref="tables" stripe v-model="tableData" :columns="columns" @on-edit="handleEdit" @on-view="handleView"/>
            <div style="margin-top:10px;text-align:right;">
                <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleOnChange" 
                show-sizer size="small" :page-size-opts="[10,20,50,100,1000]" @on-page-size-change="handleOnChangeSize"/>
            </div>
        </Card>
        <div>
            
        </div>
    </div>
</template>
<script>
import Tables from '_c/tables'
import pageInfo from "@/libs/page-info"
import {
    ticketsColumn,
    getTicketsList
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
            queryForm: {
                search: '',
            },
        }
    },
    methods: {
        handleSearch() {},
        handleQuery() {
            getTicketsList(this.page).then(res=>{
                if(res.data.code == 200) {
                    this.tableData = res.data.data.dataInfo?res.data.data.dataInfo:[]
                    this.page = pageInfo.converter({pageIndex: this.page.index, pageSize: this.page.size, pageTotal: res.data.total,search: this.page.search})
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        handleCreate() {   
            this.$router.push({name: 'ticketsCreate'})  
        },
        handleEdit(params) {
            this.$router.push({name: 'ticketsCreate', query: {id: params.row.id}})  
        },
        handleView(params) {
            this.$router.push({name: 'ticketsCreate', query: {id: params.row.id, type: 'view'}})  
        },
        // 弹出框设置
        setDialogProperty(width, title, name) {
            this.modelStatus.show = true
            this.modelStatus.loading = true
            this.modelStatus.width = width
            this.modelStatus.title = title
            this.modelStatus.name = name
        },
        /* 对话框确认 */
        handlerModelDialogOk(name) {
            
            this.modelStatus.loading = false
            this.$nextTick(() => {
                this.modelStatus.loading = true
            })
        },
        /* 对话框取消 */
        handlerModelDialogCancel() {
            // 确保关闭对话框
            this.modelStatus.show = false
            // 对话框显示footer恢复
            this.modelStatus.hide = false
        },
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
        this.columns = ticketsColumn
        this.page = pageInfo.init()
        this.handleQuery()
    }
}
</script>

