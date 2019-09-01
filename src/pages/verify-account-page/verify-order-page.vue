<template>
    <div>
        <Card>
            <div class="clearfix">
                <div class="pull-left" style="margin-bottom: 10px;">
                    <Button @click="$router.back()" class="search-btn" type="primary" style="margin-right:5px">
                        <Icon type="md-arrow-back" />&nbsp;&nbsp;返回</Button>
                    <Button class="search-btn" type="success" style="margin-right:5px">
                        <Icon type="ios-cloud-download" />&nbsp;&nbsp;导出</Button>
                </div>
                <div class="pull-right">
                    <span class="span-h2">2019年8月</span>
                    <span class="span-h2">花鸟岛民宿名称</span>
                </div>
            </div>
            <tables class="self-table-wrap" ref="tables" stripe v-model="tableData" :columns="columns"/>
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
    verifyOrderColumn
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
        }
    },
    methods: {
        handleQuery() {

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
        this.columns = verifyOrderColumn
        this.page = pageInfo.init()
        this.handleQuery()
    }
}
</script>

