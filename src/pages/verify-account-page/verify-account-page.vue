<template>
    <div>
        <Card>
            <div class="clearfix">
                <div class="pull-left">
                    <span class="span-h2">2019年8月</span>
                </div>
                <div class="pull-right">
                    <Form ref="searchBarForm" :model="queryForm" inline @keydown.native.enter.prevent ="()=>{}">
                        <FormItem>
                            <Row>
                                <Col span="21">
                                    <DatePicker type="month" placeholder="请选择历史月份进行搜索" :options="disabledMonth" style="width: 200px"></DatePicker>
                                </Col>
                                <Col span="2" style="margin-left: 5px;">
                                    <Button size="small" type="primary" shape="circle" icon="ios-search"></Button>
                                </Col>
                            </Row>
                        </FormItem>
                        <Button class="search-btn" type="success" style="margin-right:5px">
                            <Icon type="ios-cloud-download" />&nbsp;&nbsp;导出</Button>
                    </Form>
                </div>
            </div>
            <tables class="self-table-wrap" ref="tables" stripe v-model="tableData" :columns="columns" @on-view="handleOrder"/>
            <div style="margin-top:10px;text-align:right;">
                <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleOnChange" 
                show-sizer size="small" :page-size-opts="[20,50,100]" @on-page-size-change="handleOnChangeSize"/>
            </div>
        </Card>
    </div>
</template>
<script>
import moment from 'moment'
import Tables from '_c/tables'
import pageInfo from "@/libs/page-info"
import {
    verifyColumn
} from './api'
export default {
    components: {
        Tables,
    },
    data() {
        return {
            disabledMonth: {
                disabledDate (date) {
                    return date && moment(date).format('YYYY-MM') > moment().format('YYYY-MM');
                }
            },
            tableData: [],
            columns: [],
            page: {},
            queryForm: {}
        }
    },
    methods: {
        handleQuery() {
            this.tableData = [
                {id: '12102313123123', name: '花鸟岛各民宿名称', amount: '50,000'}
            ]
        },
        handleOrder(params) {
            this.$router.push({name: 'varifyOrder', query: {id: params.row.id}})
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
        this.columns = verifyColumn
        this.page = pageInfo.init()
        this.handleQuery()
    }
}
</script>

