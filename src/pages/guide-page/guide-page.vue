<template>
    <div>
        <Card>
            <div class="clearfix" style="margin-bottom: 10px;">
                <div class="pull-left">
                    <Button @click="handleCreate" class="search-btn" type="primary" style="margin-right:5px">
                        <Icon type="md-add"/>&nbsp;&nbsp;添加</Button>
                    <Button @click="handleShare" class="search-btn" type="success" style="margin-right:5px">
                        <Icon type="ios-pricetag-outline" />&nbsp;&nbsp;分享图片设置</Button>
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
                <GuideCreateForm ref='GuideCreateForm'
                    :formInline="createForm.formInline"
                    :ruleInline="createForm.ruleInline"
                    v-if="modelStatus.name=='GuideCreateForm'"/>
                <ShareImageForm ref='ShareImageForm'
                    :formInline="imageForm.formInline"
                    :ruleInline="imageForm.ruleInline"
                    v-if="modelStatus.name=='ShareImageForm'"/>
            </ModelDialog>
        </div>
    </div>
</template>

<script>
import Tables from '_c/tables'
import ModelDialog from '_c/model-dialog'
import GuideCreateForm from './forms/guide-create-form'
import GuideCreateModel from './model/guide-create-model'
import ShareImageForm from './forms/share-image-form'
import shareImageModel from './model/share-image-model'
import pageInfo from "@/libs/page-info"
import {
    guideColumn,
    getGuideList,
    setGuideCreate,
    getGuideDetail,
    setGuideEdit,
    setGuideChange,
    setGuideDelete,
    setImage,
    getImage
} from './api'
export default {
    components: {
        Tables,
        ModelDialog,
        GuideCreateForm,
        ShareImageForm
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
            getGuideList(this.page).then(res=>{
                if(res.data.code == 1000) {
                    this.tableData = res.data.data.dataInfo?res.data.data.dataInfo.map(item=>{
                        item.status = item.enable?'下线':'展示'
                        return item
                    }):[]
                    this.page = pageInfo.converter({pageIndex: this.page.index, pageSize: this.page.size, pageTotal: res.data.total,search: this.page.search})
                    // 关闭表单框
                    this.modelStatus.show = false
                } else {
                    this.$Message.error(res.data.msg)
                }
            })
        },
        // 添加
        handleCreate() {
            const form = {
                id: '',
                title: '',
                details: ''
            }
            this.setDialogProperty(900, '添加', 'GuideCreateForm')
            this.createForm = GuideCreateModel.init(form)
            this.$nextTick(()=>{
                this.$refs.GuideCreateForm.handleRichEditor()
            })
        },
        // 编辑
        handleEdit(params) {
            getGuideDetail(params.row.id).then(res=>{
                if(res.data.code == 1000) {
                    const form = {
                        id: res.data.data.dataInfo.id,
                        title: res.data.data.dataInfo.title,
                        details: res.data.data.dataInfo.intro
                    }
                    this.setDialogProperty(900, '编辑', 'GuideCreateForm')
                    this.createForm = GuideCreateModel.init(form)
                    this.$nextTick(()=>{
                        this.$refs.GuideCreateForm.handleRichEditor()
                    })
                } else {
                    this.$Message.error(res.data.msg)
                }
            })
            
        },
        handleSubmit() {
            const form = GuideCreateModel.converter(this.createForm.formInline)
            if(form.intro == '<p><br></p>') {
                this.$Message.warning('请输入详情')
                return
            }
            if(form.id == '') {
                this.setCreate(form)
            } else {
                this.setEdit(form)
            }
        },
        setCreate(form) {
            setGuideCreate(form).then(res=>{
                if(res.data.code == 1000) {
                    this.$Message.success('添加成功')
                    this.modelStatus.show = false
                    this.handleQuery()
                } else {
                    this.$Message.error(res.data.msg)
                }
            })
        },
        setEdit(form) {
            setGuideEdit(form).then(res=>{
                if(res.data.code == 1000) {
                    this.$Message.success('编辑成功')
                    this.modelStatus.show = false
                    this.handleQuery()
                } else {
                    this.$Message.error(res.data.msg)
                }
            })
        },
        // 分享图片设置
        handleShare() {
            getImage().then(res=>{
                if(res.data.code == 1000) {
                    const form = {
                        image: res.data.data.dataInfo.assets
                    }
                    this.setDialogProperty(550, '上传', 'ShareImageForm')
                    this.imageForm = shareImageModel.init(form)
                } else {
                    this.$Message.error(res.data.msg)
                }
            })
        },
        // 上下线
        handleChange(params) {
            setGuideChange(params.row.id).then(res=>{
                if(res.data.code == 1000) {
                    this.$Message.success('操作成功')
                    this.modelStatus.show = false
                    this.handleQuery()
                } else {
                    this.$Message.error(res.data.msg)
                }
            })
        },
        // 删除
        handleDelete(params) {
            setGuideDelete(params.row.id).then(res=>{
                if(res.data.code == 1000) {
                    this.$Message.success('删除成功')
                    this.modelStatus.show = false
                    this.handleQuery()
                } else {
                    this.$Message.error(res.data.msg)
                }
            })
        },
        handleShareSubmit() {
            const form = shareImageModel.converter(this.imageForm.formInline)
            setImage(form).then(res=>{
                if(res.data.code == 1000) {
                    this.$Message.success('设置成功')
                    this.modelStatus.show = false
                } else {
                    this.$Message.error(res.data.msg)
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
            if(name==='GuideCreateForm') {
                this.$refs.GuideCreateForm.validate(valid=>{
                    if(valid) {
                        this.handleSubmit()
                    }
                })
            } else if (name==='ShareImageForm') {
                // this.$refs.ShareImageForm.validate(valid=>{
                    // if(valid) {
                        this.handleShareSubmit()
                //     }
                // })
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
        this.columns = guideColumn
        this.page = pageInfo.init()
        this.handleQuery()
    }
}
</script>

