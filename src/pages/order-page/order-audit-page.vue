<template>
    <div style="backround: #fff;">
        <Card>
            <div class="clearfix" style="margin-bottom: 10px;">
                <div class="pull-left">
                    <Button @click="$router.back()" class="search-btn" type="primary" style="margin-right:5px">
                        <Icon type="md-arrow-back" />&nbsp;&nbsp;返回</Button> 
                </div>
                <div class="pull-right">
                    
                </div>
            </div>
            <tables class="self-table-wrap" ref="tables" stripe v-model="tableData" :columns="columns" @on-view="handleView" @on-delete="handleCancel"/>
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
    auditColumn,
} from './api'
export default {
    components: {
        Tables
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
            this.tableData = [
                {orderId: '849101239130103', useTime: '2019/05/01~2019/05/03', price: '1900.00', userName: 'hn0002', userPhone: '13600000001', evaluated: '待审核', status: 4},
                
            ]
        }
    },
    mounted() {
        this.columns = auditColumn
        this.page = pageInfo.init()
        this.handleQuery()
    }
}
</script>
