<template>
    <div>
        <Card>
            <tables class="self-table-wrap" ref="tables" stripe v-model="tableData" :columns="columns" @on-view="handleView"
            @on-able="handleAble" @on-disable="handleDisable" @on-delete="handleDelete"/>
            <div style="margin-top:10px;text-align:right;">
                <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleOnChange" 
                show-sizer size="small" :page-size-opts="[10,20,50,100,]" @on-page-size-change="handleOnChangeSize"/>
            </div>
        </Card>
        <div>
            <ModelDialog :status="modelStatus"
                @handlerModelDialogOk="handlerModelDialogOk"
                @handlerModelDialogCancel="handlerModelDialogCancel">
                <ApplyViewForm ref='ApplyViewForm'
                    :formInline="createForm.formInline"
                    :ruleInline="createForm.ruleInline"
                    :id="id"
                    v-if="modelStatus.name=='ApplyViewForm'"/>
            </ModelDialog>
        </div>
    </div>
</template>

<script>
import Tables from '_c/tables'
import ModelDialog from '_c/model-dialog'
import ApplyViewForm from './forms/apply-view-form'
import ApplyViewModel from './model/apply-view-model'
import pageInfo from "@/libs/page-info"
import {
    applyColumn,
    getApplyList,
    setAgree,
    setDisagree,
    deleteApply
} from './api'
import {
    setAdminReset,
    setAdminForbit
} from '_p/rights-page/api/rights'
export default {
    components: {
        Tables,
        ModelDialog,
        ApplyViewForm
    },
    data() {
        return {
            tableData: [],
            columns: [],
            page: {},
            modelStatus: { show: false, hide: false, loading: true, title: '', name: '' },
            createForm: {},
            id:''
        }
    },
    methods: {
        handleQuery() {
            getApplyList(this.page).then(res=>{
                console.log(res)
                if(res.data.code == 200) {
                    this.tableData = res.data.data.userList
                    this.page = pageInfo.converter({pageIndex: this.page.index, pageSize: this.page.size, pageTotal: res.data.data.PageInfo.TotalCounts})
                    // 关闭表单框
                    this.modelStatus.show = false
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        // 查看
        handleView(params) {
            this.setDialogProperty(800, '添加', 'ApplyViewForm')
            this.createForm = ApplyViewModel.init()
            this.id=params.row.id
            this.$refs['ApplyViewForm'].getDetail(this.id)
            this.$nextTick(()=>{
                this.id=params.row.id
                this.$refs['ApplyViewForm'].getDetail(this.id)
            })
        },
        handleAble(params){
            setAgree(params.row.id).then(res=>{
                if(res.data.code==200){
                    this.handleQuery()
                    this.$Message.success('操作成功')
                }else{
                    this.$Message.error(res.data.message)
                }
            })
        },
        handleDisable(params){
            setDisagree(params.row.id).then(res=>{
                if(res.data.code==200){
                    this.handleQuery()
                    this.$Message.success('操作成功')
                }else{
                    this.$Message.error(res.data.message)
                }
            })
        },
        handleDelete(params){
            deleteApply(params.row.id).then(res=>{
                if(res.data.code==200){
                    this.handleQuery()
                    this.$Message.success('操作成功')
                }else{
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
            // 确保关闭对话框
            this.modelStatus.show = false
            // 对话框显示footer恢复
            this.modelStatus.hide = false
        },
        /* 对话框取消 */
        handlerModelDialogCancel() {
            this.id=''
            this.$refs['ApplyViewForm'].data={}
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
        this.columns = applyColumn
        this.page = pageInfo.init()
        this.handleQuery()
    }
}
</script>

