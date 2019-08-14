<template>
    <div>
        <Card>
            <div class="clearfix" style="margin-bottom: 10px;">
                <div class="pull-left">
                    <Button @click="handleCreate" class="search-btn" type="primary" style="margin-right:5px">
                        <Icon type="md-add"/>&nbsp;&nbsp;添加</Button>
                </div>
                <div class="pull-right">
                    
                </div>
            </div>
            <tables class="self-table-wrap" ref="tables" stripe v-model="tableData" :columns="columns" @on-edit="handleEdit" @on-change="handleChange" @on-delete="handleDelete" />
            <div style="margin-top:10px;text-align:right;">
                <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleOnChange" 
                show-sizer size="small" :page-size-opts="[10,20,50,100,1000]" @on-page-size-change="handleOnChangeSize"/>
            </div>
        </Card>
        <div>
            <ModelDialog :status="modelStatus"
                @handlerModelDialogOk="handlerModelDialogOk"
                @handlerModelDialogCancel="handlerModelDialogCancel">
                <ShareCreateForm ref='ShareCreateForm'
                    :formInline="createForm.formInline"
                    :ruleInline="createForm.ruleInline"
                    v-if="modelStatus.name=='ShareCreateForm'"/>
            </ModelDialog>
        </div>
    </div>
</template>

<script>
import Tables from '_c/tables'
import ModelDialog from '_c/model-dialog'
import ShareCreateForm from './forms/share-create-form'
import ShareCreateModel from './model/share-create-model'
import pageInfo from "@/libs/page-info"
import {
    shareColumn,
    getShareList
} from './api'
export default {
    components: {
        Tables,
        ModelDialog,
        ShareCreateForm,
    },
    data() {
        return {
            tableData: [],
            columns: [],
            page: {},
            modelStatus: { show: false, hide: false, loading: true, title: '', name: '' },
            createForm: {},
            imageForm: {}
        }
    },
    methods: {
        handleQuery() {
            getShareList(1, this.page).then(res=>{
                if(res.data.code==200) {
                    this.tableData = res.data.data.newsList
                    this.page = pageInfo.converter({pageIndex: this.page.index, pageSize: this.page.size, pageTotal: res.data.data.PageInfo.TotalCounts,search: this.page.search})
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        // 添加
        handleCreate() {
            const form = {
                id: '',
                title: '',
                details: '',
                activity: '',
                image: ''
            }
            this.setDialogProperty(900, '添加', 'ShareCreateForm')
            this.createForm = ShareCreateModel.init(form)
            this.$nextTick(()=>{
                this.$refs.ShareCreateForm.handleRichEditor()
            })
        },
        // 编辑
        handleEdit(params) {
            getGuideDetail(params.row.id).then(res=>{
                if(res.data.code == 200) {
                    const form = {
                        id: res.data.data.dataInfo.id,
                        title: res.data.data.dataInfo.title,
                        details: res.data.data.dataInfo.intro
                    }
                    this.setDialogProperty(900, '编辑', 'ShareCreateForm')
                    this.createForm = ShareCreateModel.init(form)
                    this.$nextTick(()=>{
                        this.$refs.ShareCreateForm.handleRichEditor()
                    })
                } else {
                    this.$Message.error(res.data.message)
                }
            })
            
        },
        handleSubmit() {
            const form = ShareCreateModel.converter(this.createForm.formInline)
            if(form.id == '') {
                this.setCreate(form)
            } else {
                this.setEdit(form)
            }
        },
        setCreate(form) {
            setGuideCreate(form).then(res=>{
                if(res.data.code == 200) {
                    this.$Message.success('添加成功')
                    this.modelStatus.show = false
                    this.handleQuery()
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        setEdit(form) {
            setGuideEdit(form).then(res=>{
                if(res.data.code == 200) {
                    this.$Message.success('编辑成功')
                    this.modelStatus.show = false
                    this.handleQuery()
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        // 上下线
        handleChange(params) {
            setGuideChange(params.row.id).then(res=>{
                if(res.data.code == 200) {
                    this.$Message.success('操作成功')
                    this.modelStatus.show = false
                    this.handleQuery()
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        // 删除
        handleDelete(params) {
            setGuideDelete(params.row.id).then(res=>{
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
            if(name==='ShareCreateForm') {
                this.$refs.ShareCreateForm.validate(valid=>{
                    if(valid) {
                        this.handleSubmit()
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
        this.columns = shareColumn
        this.page = pageInfo.init()
        this.handleQuery()
    }
}
</script>

