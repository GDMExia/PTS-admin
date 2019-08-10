<template>
    <div>
        <Card>
            <div class="clearfix" style="margin-bottom: 10px;">
                <div class="pull-left">
                    <Button @click="handlePrice" class="search-btn" type="info" style="margin-right:5px">
                        <Icon type="ios-filing-outline" />&nbsp;&nbsp;价格设置</Button>
                    <Button @click="handleInfo" class="search-btn" type="success" style="margin-right:5px">
                        <Icon type="ios-crop-outline" />&nbsp;&nbsp;基本信息设置</Button>
                    <Button @click="handleCreate" class="search-btn" type="primary" style="margin-right:5px">
                        <Icon type="md-add"/>&nbsp;&nbsp;生成</Button>
                </div>
                <div class="pull-right">
                    
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
    customColumn
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
        }
    },
    methods: {
        handleQuery() {},
        // 价格设置
        handlePrice() {
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
        this.columns = customColumn
        this.page = pageInfo.init()
        this.handleQuery()
    }
}
</script>

