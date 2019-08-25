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
                            <Select placeholder="分类" v-model="queryForm.enterpriseType" style="width: 150px;" clearable>
                                <Option v-for="item in typeList" :value="item.id" :key="item.id">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Select placeholder="状态" v-model="queryForm.enterpriseType" style="width: 150px;" clearable>
                                <Option v-for="item in statusList" :value="item.id" :key="item.id">{{item.name}}</Option>
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
                show-sizer size="small" :page-size-opts="[10,20,50,100,1000]" @on-page-size-change="handleOnChangeSize"/>
            </div>
        </Card>
        <div>
            <ModelDialog :status="modelStatus"
                @handlerModelDialogOk="handlerModelDialogOk"
                @handlerModelDialogCancel="handlerModelDialogCancel">
                <ResidenceCreateForm ref='ResidenceCreateForm'
                    :formInline="createForm.formInline"
                    :ruleInline="createForm.ruleInline"
                    v-if="modelStatus.name=='ResidenceCreateForm'"/>
                <ResidenceReserveForm ref='ResidenceReserveForm'
                    :formInline="reserveForm.formInline"
                    :ruleInline="reserveForm.ruleInline"
                    v-if="modelStatus.name=='ResidenceReserveForm'"/>
                <ResidenceGraphForm ref='ResidenceGraphForm'
                    :formInline="graphForm.formInline"
                    :ruleInline="graphForm.ruleInline"
                    v-if="modelStatus.name=='ResidenceGraphForm'"/>
            </ModelDialog>
        </div>
    </div>
</template>
<script>
import Tables from '_c/tables'
import pageInfo from "@/libs/page-info"
import ModelDialog from '_c/model-dialog'
import ResidenceCreateForm from './forms/residence-create-form'
import ResidenceCreateModel from './model/residence-create-model'
import ResidenceGraphForm from './forms/residence-graph-form'
import ResidenceGraphModel from './model/residence-graph-model'
import ResidenceReserveForm from './forms/residence-reserve-form'
import ResidenceReserveModel from './model/residence-reserve-model'
import {
    residenceColumns,
    getResidenceList,
    setResidenceCreate,
    setResidenceChange
} from './api'
export default {
    components: {
        Tables,
        ModelDialog,
        ResidenceCreateForm,
        ResidenceReserveForm,
        ResidenceGraphForm
    },
    data() {
        return {
            tableData: [],
            columns: [],
            page: {},
            modelStatus: { show: false, hide: false, loading: true, title: '', name: '' },
            createForm: {},
            reserveForm: {},
            graphForm: {},
            queryForm: {
                search: '',
            },
            statusList: [],
            typeList: []
        }
    },
    methods: {
        handleSearch() {
            this.page.index = 1
            this.page.search = this.queryForm.search
            this.handleQuery()
        },
        handleQuery() {
            getResidenceList(this.page).then(res=>{
                if(res.data.code==200) {
                    this.tableData = res.data.data.goodsList?res.data.data.goodsList.map(item=>{
                        item.status = item.goods_status==1?'进行中':
                        item.goods_status==2?'已结束':item.goods_status==3?'待审核':'审核不通过'
                        item.pidStr = item.pid==1?'商家':'官方'
                        return item
                    }):[]
                    this.page = pageInfo.converter({pageIndex: this.page.index, pageSize: this.page.size, pageTotal: res.data.data.PageInfo.TotalCounts,search: this.page.search})
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        handleCreate() {     
            this.$router.push({name: 'activityCreate'}) 
        },
        setCreateSubmit() {
            const form = ResidenceCreateModel.converter(this.createForm.formInline)
            setResidenceCreate(form).then(res=>{
                if(res.data.code == 200) {
                    this.$Message.success('添加成功')
                    this.modelStatus.show = false
                    this.handleQuery()
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        // 审核
        handleAudit(params) {
            const form = {
                id: params.row.id,
                recommendImg: params.row.recommendImg
            }
            this.graphForm = ResidenceGraphModel.init(form) 
            if(!params.row.isrecommend) {
                this.setDialogProperty(550, '推荐', 'ResidenceGraphForm') 
            } else {
                this.setChangeSubmit()
            }
        },
        handleEdit() {},
        handlePeople() {},
        handelDelete() {},
        setChangeSubmit() {
            const form = ResidenceGraphModel.converter(this.graphForm.formInline)
            setResidenceChange(form).then(res=>{
                if(res.data.code == 200) {
                    this.$Message.success('操作成功')
                    this.handleQuery()
                } else {
                    this.$Message.error(res.data.message)
                }
            })
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
            if(name === 'ResidenceCreateForm') {
                this.$refs.ResidenceCreateForm.validate(valid=>{
                    if(valid) {
                        this.setCreateSubmit()
                    }
                })
            } else if (name === 'ResidenceGraphForm') {
                this.$refs.ResidenceGraphForm.validate(valid=>{
                    if(valid) {
                        this.setChangeSubmit()
                    }
                })
            }
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
    }
}
</script>

