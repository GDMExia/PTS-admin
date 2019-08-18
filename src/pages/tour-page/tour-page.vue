<template>
    <div>
        <Card>
            <div class="clearfix" style="margin-bottom: 10px;">
                <div class="pull-left">
                    <Button @click="handleCreate" class="search-btn" type="primary" style="margin-right:5px">
                        <Icon type="md-add"/>&nbsp;&nbsp;添加</Button>
                    <Button @click="handleSet" class="search-btn" type="success" style="margin-right:5px">
                        <Icon type="md-add"/>&nbsp;&nbsp;相关旅游设置</Button>
                </div>
                <div class="pull-right">
                    <Form ref="searchBarForm" inline @keydown.native.enter.prevent ="()=>{}">
                        <FormItem>
                            <Row>
                                <Col span="21">
                                    <Input v-model="page.search" placeholder="请输入旅游标题" style="width: 230px"/>
                                </Col>
                                <Col span="2" style="margin-left: 5px;">
                                    <Button @click="handleSearch" size="small" type="primary" shape="circle" icon="ios-search"></Button>
                                </Col>
                            </Row>
                        </FormItem>
                    </Form>
                </div>
            </div>
            <tables class="self-table-wrap" ref="tables" stripe v-model="tableData" :columns="columns" @on-edit="handleEdit" @on-delete="handleDelete" />
            <div style="margin-top:10px;text-align:right;">
                <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleOnChange" 
                show-sizer size="small" :page-size-opts="[10,20,50,100,1000]" @on-page-size-change="handleOnChangeSize"/>
            </div>
        </Card>
        <div>
            <ModelDialog :status="modelStatus"
                @handlerModelDialogOk="handlerModelDialogOk"
                @handlerModelDialogCancel="handlerModelDialogCancel">
                <TourCreateForm ref='TourCreateForm'
                    :formInline="createForm.formInline"
                    :ruleInline="createForm.ruleInline"
                    v-if="modelStatus.name=='TourCreateForm'"/>
                <TourArticleForm ref='TourArticleForm'
                    :formInline="articleForm.formInline"
                    :ruleInline="articleForm.ruleInline"
                    :articleList="articleList"
                    v-if="modelStatus.name=='TourArticleForm'"/>
            </ModelDialog>
        </div>
    </div>
</template>

<script>
import Tables from '_c/tables'
import ModelDialog from '_c/model-dialog'
import pageInfo from "@/libs/page-info"
import TourCreateForm from './forms/tour-create-form'
import TourCreateModel from './model/tour-create-model'
import TourArticleForm from './forms/tour-article-form'
import TourArticleModel from './model/tour-article-model'
import {
    tourColumn,
    getTourList,
    setTourDelete,
    setTourCreate,
    getFileList,
    getArticleInfo,
    setArticle
} from './api'
export default {
    components: {
        Tables,
        ModelDialog,
        TourCreateForm,
        TourArticleForm
    },
    data() {
        return {
            tableData: [],
            columns: [],
            page: {},
            modelStatus: { show: false, hide: false, loading: true, title: '', name: '' },
            createForm: {},
            articleForm: {},
            articleList: []
        }
    },
    methods: {
        handleSearch() {
            this.page.index = 1
            this.handleQuery()
        },
        handleQuery() {
            getTourList(this.page).then(res=>{
                if(res.data.code == 200) {
                    this.tableData = res.data.data.newsList?res.data.data.newsList.map(item=>{
                        item.join_time = `${item.start_time}~${item.end_time}`
                        return item
                    }):[]
                    this.page = pageInfo.converter({pageIndex: this.page.index, pageSize: this.page.size, pageTotal: res.data.data.PageInfo.TotalCounts,search: this.page.search})
                    // 关闭表单框
                    this.modelStatus.show = false
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        // 添加
        handleCreate() {
            let form = {
                id: '',
                goods_name: '',
                start_time: '',
                end_time: '',
                discount_point: '',
                goods_price: '',
                create_name: '',
                content: '',
                img_list: [],
            }
            form.date = [form.start_time, form.end_time]
            this.setDialogProperty(900, '添加', 'TourCreateForm')
            this.createForm = TourCreateModel.init(form)
            this.$nextTick(()=>{
                this.$refs.TourCreateForm.handleRichEditor()
            })
        },
        // 编辑
        handleEdit(params) {
            const info = {
                tourism_id: params.row.id
            }
            let imageList = []
            getFileList(info).then(res=>{
                if(res.data.code == 200) {
                    imageList = res.data.data.files
                    const form = {
                        id: params.row.id,
                        goods_name: params.row.goods_name,
                        start_time: params.row.start_time,
                        end_time: params.row.end_time,
                        discount_point: params.row.discount_point,
                        goods_price: params.row.goods_price,
                        create_name: params.row.create_name,
                        content: params.row.content,
                        img_list: imageList,
                        date: [params.row.start_time, params.row.end_time]
                    }
                    this.setDialogProperty(900, '编辑', 'TourCreateForm')
                    this.createForm = TourCreateModel.init(form)
                    this.$nextTick(()=>{
                        this.$refs.TourCreateForm.handleRichEditor()
                    })
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        handleSubmit() {
            let form = TourCreateModel.converter(this.createForm.formInline)
            // form.content = this.$refs.TourCreateForm.getEdiotrContent()
            if(form.img_list.length==0) {
                this.$Message.error('请上传图片')
                return 
            }
            if(form.end_time == '' || form.start_time == '') {
                this.$Message.error('请选择参与日期')
                return 
            }
            if(form.id == '') {
                this.setCreate(form)
            } else {
                this.setEdit(form)
            }
        },
        setCreate(form) {
            setTourCreate(form).then(res=>{
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
            setTourCreate(form).then(res=>{
                if(res.data.code == 200) {
                    this.$Message.success('编辑成功')
                    this.modelStatus.show = false
                    this.handleQuery()
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        getAllArticle() {
            getTourList({index: 1, size: 1000,search: ''}).then(res=>{
                if(res.data.code == 200) {
                    this.articleList = res.data.data.newsList?res.data.data.newsList:[]
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        handleSet() {
            getArticleInfo(2).then(res=>{
                if(res.data.code == 200) {
                    const form = {
                        article_id: res.data.data.articleBind.map(item=>{
                            return item.id
                        })
                    }
                    this.setDialogProperty(600, '相关旅游设置', 'TourArticleForm')
                    this.articleForm = TourArticleModel.init(form)
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        handleSetSubmit() {
            const form = TourArticleModel.converter(this.articleForm.formInline)
            setArticle(form).then(res=>{
                if(res.data.code == 200) {
                    this.$Message.success('设置成功')
                    this.modelStatus.show = false
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        // 删除
        handleDelete(params) {
            setTourDelete(params.row.id).then(res=>{
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
            if(name==='TourCreateForm') {
                this.$refs.TourCreateForm.validate(valid=>{
                    if(valid) {
                        this.handleSubmit()
                    }
                })
            } else if (name==='TourArticleForm') {
                this.$refs.TourArticleForm.validate(valid=>{
                    if(valid) {
                        this.handleSetSubmit()
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
        this.columns = tourColumn
        this.page = pageInfo.init()
        this.handleQuery()
        this.getAllArticle()
    }
}
</script>

