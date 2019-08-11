<template>
    <div>
        <Card>
            <div class="clearfix">
                
            </div>
            <tables ref="tables" draggable stripe v-model="tableData" :columns="columns" @on-drag-drop="handleDragDrop" @on-edit="handleEdit" @on-offline="handleChange"/>
            <div style="margin-top:10px;text-align:right;">
                <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleOnChange" 
                show-sizer size="small" :page-size-opts="[10,20,50,100,1000]" @on-page-size-change="handleOnChangeSize"/>
            </div>
        </Card>
        <div>
            <ModelDialog :status="modelStatus"
                @handlerModelDialogOk="handlerModelDialogOk"
                @handlerModelDialogCancel="handlerModelDialogCancel">
                <BnnerEditForm ref='BnnerEditForm'
                    :formInline="editForm.formInline"
                    :ruleInline="editForm.ruleInline"
                    :modules="modules"
                    v-if="modelStatus.name=='BnnerEditForm'"/>
            </ModelDialog>
        </div>
    </div>
</template>
<script>
import Tables from '_c/tables'
import ModelDialog from '_c/model-dialog'
import BnnerEditForm from './forms/banner-edit-form'
import BnnerEditModel from './model/banner-edit-model'
import pageInfo from "@/libs/page-info"
import { 
    bannerColumns,
    setBannerEnable,
    setBannerChange,
    getBannerDetail,
    setBannerUpdate,
    getBannerList,
} from "./api";
export default {
    components: {
        Tables,
        ModelDialog,
        BnnerEditForm
    },
    data() {
        return {
            tableData: [],
            columns: [],
            page: {},
            modelStatus: { show: false, hide: false, loading: true, title: '', name: '' },
            editForm: {},
            modules: []
        }
    },
    methods: {
        handleQuery() {
            getBannerList().then(res=>{
                this.tableData = res.data.data.dataInfo?res.data.data.dataInfo.map(item=>{
                    item.enabledStr = item.enabled?'展示':'下线'
                    return item
                }):[]
            })
        },
        // 编辑
        handleEdit(params) {
            getBannerDetail(params.row.bannerId).then(res=>{
                if(res.data.code==200) {
                    const form = res.data.data.dataInfo
                    this.setDialogProperty(900, '编辑', 'BnnerEditForm')
                    this.editForm = BnnerEditModel.init(form)
                    this.$nextTick(()=>{
                        this.$refs.BnnerEditForm.handleRichEditor()
                    })
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        handleEditSubmit() {
            const form = BnnerEditModel.converter(this.editForm.formInline)
            if(form.bannerContent == '<p><br></p>') {
                this.$Message.warning('请输入详情')
                return
            }
            setBannerUpdate(form).then(res=>{
                if(res.data.code==200) {
                    this.$Message.success('编辑成功')
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
            if (name === 'BnnerEditForm') {
                this.$refs.BnnerEditForm.validate(valid => {
                    if (valid) {
                        this.handleEditSubmit()
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

        // 上移下移
        handleDragDrop(index1, index2) {
            const id1 = this.tableData[index1].bannerId
            const id2 = this.tableData[index2].bannerId
            setBannerChange(id1, id2).then(res=>{
                if(res.data.code==200) {
                    this.$Message.success('操作成功')
                    this.handleQuery()
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },

        // 上线下线
        handleChange(params) {
            setBannerEnable(params.row.bannerId).then(res=>{
                if(res.data.code==200) {
                    this.$Message.success('操作成功')
                    this.handleQuery()
                } else {
                    this.$Message.error(res.data.message)
                }
            })
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
        this.columns = bannerColumns
        this.page = pageInfo.init()
        this.handleQuery()
    }
}
</script>

