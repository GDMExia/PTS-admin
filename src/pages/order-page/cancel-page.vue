<template>
    <div>
        <Card>
            <div class="clearfix">
                <div class="pull-left">
                </div>
                <div class="pull-right">
                    <Form ref="searchBarForm" :model="queryForm" inline @keydown.native.enter.prevent ="()=>{}">
                        <FormItem>
                            <Row>
                                <Col span="21">
                                    <Input v-model="queryForm.search" placeholder="请输入订单号/下单游客手机号进行搜索" style="width: 230px"/>
                                </Col>
                                <Col span="2" style="margin-left: 5px;">
                                    <Button @click="handleSearch" size="small" type="primary" shape="circle" icon="ios-search"></Button>
                                </Col>
                            </Row>
                        </FormItem>
                    </Form>
                </div>
            </div>
            <tables class="self-table-wrap" ref="tables" stripe v-model="tableData" :columns="columns" @on-view="handleView"/>
            <div style="margin-top:10px;text-align:right;">
                <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleOnChange" 
                show-sizer size="small" :page-size-opts="[20,50,100]" @on-page-size-change="handleOnChangeSize"/>
            </div>
        </Card>
    </div>
</template>
<script>
import Tables from '_c/tables'
import pageInfo from "@/libs/page-info"
import {
    cancelColumn,
    getOrderList
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
                search: ''
            }
        }
    },
    methods: {
        handleSearch() {
            this.page.index = 1
            this.page.search = this.queryForm.search
            this.handleQuery()
        },
        handleQuery() {
            getOrderList(this.page, 6).then(res=>{
                if(res.data.code == 200) {
                    this.tableData = res.data.data.dataInfo.list?res.data.data.dataInfo.list.map(item=>{
                        item.useTime = (item.beginDate==item.finishDate)?item.beginDate:`${item.beginDate}~${item.finishDate}`
                        return item
                    }):[]
                    const total = res.data.data.dataInfo.pages * this.page.size
                    this.page = pageInfo.converter({pageIndex: this.page.index, pageSize: this.page.size, pageTotal: total,search: this.page.search})
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        // 查看详情
        handleView(params) {
            this.$router.push({name: 'detail', query: {orderId: params.row.id}})
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
        this.columns = cancelColumn
        this.page = pageInfo.init()
        this.handleQuery()
    }
}
</script>

