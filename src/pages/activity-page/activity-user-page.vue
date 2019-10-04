<template>
    <div>
        <Card>
            <div class="clearfix" style="margin-bottom: 10px;">
                <div class="pull-left">
                    <Button @click="$router.back()" class="search-btn" type="primary" style="margin-right:5px">
                        <Icon type="md-arrow-back" />&nbsp;&nbsp;返回</Button>
                    <Button class="search-btn" @click="handleExport" type="success" style="margin-right:5px">
                        <Icon type="ios-cloud-download" />&nbsp;&nbsp;导出</Button>
                </div>
                <div class="pull-right">
                    <p>{{$route.query.name}}</p>
                </div>
            </div>
            <tables class="self-table-wrap" ref="tables" stripe v-model="tableData" :columns="columns"/>
            <div style="margin-top:10px;text-align:right;">
                <!-- <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleOnChange"
                show-sizer size="small" :page-size-opts="[20,50,100]" @on-page-size-change="handleOnChangeSize"/> -->
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
    usersColumns,
    getActivityUsers
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
            this.tableData = [
                getActivityUsers(this.$route.query.id).then(res=>{
                    if(res.data.code==200) {
                        this.tableData = res.data.data.siginList?res.data.data.siginList.map(item=>{
                            item.status = item.coupons_status==1?'未核销':
                            item.coupons_status==2?'已核销':item.coupons_status==3?'已退订':''
                            return item
                        }):[]
                    } else {
                        this.$Message.error(res.data.message)
                    }
                })
            ]
        },
        // 导出
        handleExport() {
            location.href = `${this.$config.baseUrl.pro}/Export/userGoodsSiginList?goods_id=${this.$route.query.id}`
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
        this.columns = usersColumns
        this.page = pageInfo.init()
        this.handleQuery()
    }
}
</script>

