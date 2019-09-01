<template>
    <div>
        <Card>
            <div class="clearfix">
                <div class="pull-left">
                    <Button @click="handleCreate" class="search-btn" type="primary" style="margin-right:5px">
                        <Icon type="md-add"/>&nbsp;&nbsp;添加</Button>
                </div>
                <div class="pull-right">
                    <Form ref="searchBarForm" :model="queryForm" inline @keydown.native.enter.prevent ="()=>{}">
                        <FormItem>
                            <Select placeholder="分类" v-model="queryForm.cid" style="width: 150px;" clearable>
                                <Option v-for="item in typeList" :value="item.id" :key="item.id">{{item.cate_name}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Select placeholder="状态" v-model="queryForm.goods_status" style="width: 150px;" clearable>
                                <Option v-for="item in statusList" :value="item.value" :key="item.value">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Row>
                                <Col span="21">
                                    <Input v-model="queryForm.search" placeholder="请输入名称进行搜索" style="width: 200px"/>
                                </Col>
                                <Col span="2" style="margin-left: 5px;">
                                    <Button @click="handleSearch" size="small" type="primary" shape="circle" icon="ios-search"></Button>
                                </Col>
                            </Row>
                        </FormItem>
                    </Form>
                </div>
            </div>
            <tables class="self-table-wrap" ref="tables" stripe v-model="tableData" :columns="columns" @on-audit="handleAudit" @on-edit="handleEdit" @on-view="handlePeople" @on-delete="handleDelete"/>
            <div style="margin-top:10px;text-align:right;">
                <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleOnChange" 
                show-sizer size="small" :page-size-opts="[20,50,100]" @on-page-size-change="handleOnChangeSize"/>
            </div>
        </Card>
        <div>
            <ModelDialog :status="modelStatus"
                @handlerModelDialogOk="handlerModelDialogOk"
                @handlerModelDialogCancel="handlerModelDialogCancel">

            </ModelDialog>
        </div>
    </div>
</template>
<script>
import Tables from '_c/tables'
import moment from 'moment'
import pageInfo from "@/libs/page-info"
import ModelDialog from '_c/model-dialog'
import {
    getCategoryList,
    residenceColumns,
    getResidenceList,
    setActivityChange,
    setActivityDelete
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
            queryForm: {
                search: '',
                goods_status: '',
                cid: ''
            },
            statusList: [
                {value: '3', name: '待审核'},
                {value: '4', name: '审核不通过'},
                {value: '1', name: '进行中'},
                {value: '2', name: '已结束'},
            ],
            typeList: []
        }
    },
    methods: {
        handleSearch() {
            this.page.index = 1
            this.page.search = {
                search: this.queryForm.search,
                goods_status: this.queryForm.goods_status?this.queryForm.goods_status:'',
                cid: this.queryForm.cid?this.queryForm.cid:''
            }
            this.page = pageInfo.transfer()
            this.handleQuery()
        },
        handleQuery() {
            getResidenceList(this.page).then(res=>{
                if(res.data.code==200) {
                    this.tableData = res.data.data.goodsList?res.data.data.goodsList.map(item=>{
                        item.status = item.goods_status==1?'进行中':
                        item.goods_status==2?'已结束':item.goods_status==3?'待审核':'审核不通过'
                        item.pidStr = item.pid==1?'商家':'官方'
                        item.registration_time = item.registration_time?moment(item.registration_time).format("YYYY-MM-DD HH:mm:ss"):''
                        return item
                    }):[]
                    this.page = pageInfo.converter({pageIndex: this.page.index, pageSize: this.page.size, pageTotal: res.data.data.PageInfo.TotalCounts,search: this.page.search})
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        handleCategory() {
            getCategoryList().then(res=>{
                if(res.data.code==200) {
                    this.typeList = res.data.data.cateTree?res.data.data.cateTree:[]
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        handleCreate() {   
            localStorage.setItem('activityDetail', '')  
            this.$router.push({name: 'activityCreate'}) 
        },
        // 审核
        handleAudit(params) {
            const form = {
                goods_status: params.goods_status,
                id: params.data.row.id
            }
            setActivityChange(form).then(res=>{
                if(res.data.code == 200) {
                    this.$Message.success('审核成功')
                    this.modelStatus.show = false
                    this.handleQuery()
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        handleEdit(params) {
            localStorage.setItem('activityDetail', JSON.stringify(params.row))
            this.$router.push({name: 'activityCreate'}) 
        },
        handlePeople(params) {
            this.$router.push({name: 'activityUser', query: {id: params.row.id, name: params.row.goods_name}})
        },
        handleDelete(params) {
            setActivityDelete(params.row.id).then(res=>{
                if(res.data.code == 200) {
                    this.$Message.success('删除成功')
                    this.handleQuery()
                } else {
                    this.$Message.error(res.data.message)
                }
            })
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
        this.columns = residenceColumns
        this.page = pageInfo.init()
        this.handleQuery()
        this.handleCategory()
    }
}
</script>

