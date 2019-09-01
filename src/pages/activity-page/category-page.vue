<template>
    <div>
        <Card>
            <div class="clearfix">
                <div class="pull-left" style="margin-bottom: 10px;">
                    <Button @click="handleCreate" class="search-btn" type="success" style="margin-right:5px">
                        <Icon type="md-add"/>&nbsp;&nbsp;添加</Button>
                </div>
                <div class="pull-right">
                    
                </div>
            </div>
            <tables class="self-table-wrap" ref="tables" stripe v-model="tableData" :columns="columns" @on-edit="handleEdit" @on-delete="handleDelete"/>
            <!-- <div style="margin-top:10px;text-align:right;">
                <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleOnChange" 
                show-sizer size="small" :page-size-opts="[20,50,100]" @on-page-size-change="handleOnChangeSize"/>
            </div> -->
        </Card>
        <div>
            <ModelDialog :status="modelStatus"
                @handlerModelDialogOk="handlerModelDialogOk"
                @handlerModelDialogCancel="handlerModelDialogCancel">
                <CategoryCreateForm ref="CategoryCreateForm"
                    :formInline="createForm.formInline"
                    :ruleInline="createForm.ruleInline"
                    v-if="modelStatus.name=='CategoryCreateForm'"/>
            </ModelDialog>
        </div>
    </div>
</template>
<script>
import Tables from '_c/tables'
import pageInfo from "@/libs/page-info"
import ModelDialog from '_c/model-dialog'
import CategoryCreateForm from './forms/category-create-form'
import CategoryCreateModel from './model/category-create-model'
import {
    categoryColumn,
    getCategoryList,
    setCategoryUpdate,
    setCategoryDelete
} from './api'
export default {
    components: {
        Tables,
        ModelDialog,
        CategoryCreateForm
    },
    data() {
        return {
            tableData: [],
            columns: [],
            page: {},
            modelStatus: { show: false, hide: false, loading: true, title: '', name: '' },
            createForm: {}
        }
    },
    methods: {
        handleSearch() {},
        handleQuery() {
            getCategoryList().then(res=>{
                if(res.data.code==200) {
                    this.tableData = res.data.data.cateTree?res.data.data.cateTree:[]
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        handleCreate() {   
            const form = {
                cate_name: ''
            }
            this.setDialogProperty(600, '添加', 'CategoryCreateForm')
            this.createForm = CategoryCreateModel.init(form)
        },
        handleEdit(params) {
            const form = params.row
            this.setDialogProperty(600, '编辑', 'CategoryCreateForm')
            this.createForm = CategoryCreateModel.init(form)
        },
        handleCreateSubmit() {
            const form = CategoryCreateModel.converter(this.createForm.formInline)
            setCategoryUpdate(form).then(res=>{
                if(res.data.code == 200) {
                    this.$Message.success('设置成功')
                    this.modelStatus.show = false
                    this.handleQuery()
                } else {
                    this.$Message.error(res.data.message)
                }
           })

        },
        handleDelete(params) {
            setCategoryDelete(params.row.id).then(res=>{
                if(res.data.code == 200) {
                    this.$Message.success('删除成功')
                    this.modelStatus.show = false
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
            if(name == 'CategoryCreateForm') {
                this.$refs.CategoryCreateForm.validate(valid=>{
                    if(valid) {
                        this.handleCreateSubmit()
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
        this.columns = categoryColumn
        this.page = pageInfo.init()
        this.handleQuery()
    }
}
</script>

