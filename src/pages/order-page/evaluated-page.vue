<template>
    <div>
        <Card>
            <div class="clearfix">
                <div class="pull-left">
                    <Button class="search-btn" type="primary" style="margin-right:5px">
                        <Icon type="md-add"/>&nbsp;&nbsp;统一审核评价</Button>
                </div>
                <div class="pull-right">
                    <Form ref="searchBarForm" :model="queryForm" inline @keydown.native.enter.prevent ="()=>{}">
                        <FormItem>
                            <Select v-model="queryForm.status" placeholder="请选择状态" style="width: 200px" clearable>
                                <Option :value="item.value" :key="item.value" v-for="item in statusList">{{item.label}}</Option>
                            </Select>
                        </FormItem>
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
            <tables class="self-table-wrap" ref="tables" stripe v-model="tableData" :columns="columns" @on-view="handleView" @on-cancel="handleCancel"/>
            <div style="margin-top:10px;text-align:right;">
                <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleOnChange" 
                show-sizer size="small" :page-size-opts="[20,50,100]" @on-page-size-change="handleOnChangeSize"/>
            </div>
        </Card>
        <div>
        </div>
    </div>
</template>
<script>
import Tables from '_c/tables'
import pageInfo from "@/libs/page-info"
import ModelDialog from '_c/model-dialog'
import {
    evaluatedColumn,
    getOrderList
} from './api'
export default {
    components: {
        Tables,
        ModelDialog,
    },
    data() {
        return {
            tableData: [],
            columns: [],
            page: {},
            modelStatus: { show: false, hide: false, loading: true, title: '', name: '' },
            setForm: {},
            queryForm: {
                search: '',
                status: '0'
            },
            statusList: [
                {label: '全部',value: '0'},
                {label: '待审核',value: '2'},
                {label: '审核通过',value: '3'},
                {label: '审核不通过',value: '4'},
            ]
        }
    },
    methods: {
        handleSearch() {},
        handleQuery() {
            getOrderList(this.page, 5).then(res=>{
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
        handleAudit() {
            this.$router.push({name: 'audit'})            
        },
        // 查看详情
        handleView(params) {
            this.$router.push({name: 'detail', query: {orderId: params.row.id}})
        },
        // 取消订单
        handleCancel(params) {},
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
        this.columns = evaluatedColumn
        this.page = pageInfo.init()
        this.handleQuery()
    }
}
</script>

