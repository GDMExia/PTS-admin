<template>
    <div>
        <Card>
            <div class="clearfix" style="margin-bottom: 10px;">
                <div class="pull-left">
                    <Button @click="handleCreate" class="search-btn" type="primary" style="margin-right:5px">
                        <Icon type="md-add" />&nbsp;&nbsp;添加</Button>
                    <!-- <Button @click="handleInfo" class="search-btn" type="success" style="margin-right:5px">
                        <Icon type="ios-crop-outline" />&nbsp;&nbsp;相关文章设置</Button> -->
                    <!-- <Button @click="handleCreate" class="search-btn" type="primary" style="margin-right:5px">
                        <Icon type="md-add"/>&nbsp;&nbsp;生成</Button> -->
                </div>
                <div class="pull-right">
                    <Cascader :data="casdata" @on-change="handleChange" change-on-select @on-clear="handleChange">
                        <!-- <a href="javascript:void(0)">选择</a> -->
                    </Cascader>
                </div>
            </div>
            <tables class="self-table-wrap" ref="tables" stripe v-model="tableData" :columns="columns" @on-edit="handleEdit" @on-change="handleChangestatus" @on-delete="handleDelete"/>
            <div style="margin-top:10px;text-align:right;">
                <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleOnChange" 
                show-sizer size="small" :page-size-opts="[10,20,50,100,1000]" @on-page-size-change="handleOnChangeSize"/>
            </div>
        </Card>
        <div>
            <ModelDialog :status="modelStatus"
                @handlerModelDialogOk="handlerModelDialogOk"
                @handlerModelDialogCancel="handlerModelDialogCancel">
                <CreateForm ref='CreateForm'
                    :formInline="createForm.formInline"
                    :ruleInline="createForm.ruleInline"
                    :casdata="casdata"
                    v-if="modelStatus.name=='CreateForm'"/>
                <EditForm ref='EditForm'
                    :formInline="editForm.formInline"
                    :ruleInline="editForm.ruleInline"
                    :casdata="casdata"
                    v-if="modelStatus.name=='EditForm'"/>
            </ModelDialog>
        </div>
    </div>
</template>
<script>
import Tables from '_c/tables'
import pageInfo from "@/libs/page-info"
import ModelDialog from '_c/model-dialog'
import {
    schoolarticleColumn,
    getarticleData,
    getCategoryTree,
    createschoolArticle,
    changeschoolArticle,
    deleteschoolArticle
} from './api'
import CreateForm from './forms/create-form'
import CreateFormModel from './model/create-model'
import EditForm from './forms/create-form'
import EditFormModel from './model/create-model'
export default {
    components: {
        Tables,
        ModelDialog,
        CreateForm,
        EditForm
    },
    data() {
        return {
            tableData: [],
            columns: [],
            page: {},
            modelStatus: { show: false, hide: false, loading: true, title: '', name: '' },
            createForm: {},
            editForm:{},
            casdata:[],
            category:''
        }
    },
    methods: {
        handleQuery() {
            let data={
                token:this.$store.state.user.token,
                page:this.page,
                cid:this.category||0
            }
            getarticleData(data).then(res=>{
                console.log(res)
                if(res.data.code=="200"){
                    if(res.data.data.newsList){
                        this.tableData=res.data.data.newsList
                    }else{
                        this.tableData=[]
                    }
                }
            })
        },
        handleCategoryTree(){
            getCategoryTree(this.$store.state.user.token).then(res=>{
                console.log(res)
                if(res.data.code=="200"){
                    this.casdata=res.data.data.Classification.map(el=>{
                        el.value=el.id,
                        el.label=el.cate_name,
                        el.children=el.Classification.map(em=>{
                            em.value=em.id,
                            em.label=em.cate_name
                            return em
                        })
                        return el
                    })
                    this.casdata.unshift({value:'0',label:'全部'})
                }
            })
        },
        handleChange(event){
            console.log(event)
            console.log(this.category)
            this.category=event[event.length-1]
            console.log(this.category)

            this.handleQuery()
        },
        // 改变上下架状态
        handleChangestatus(params){
            let data={
                token: this.$store.state.user.token,
                id: params.row.id,
                is_show: params.row.is_show == 0 ? '1' : '0'
            }
            changeschoolArticle(data).then(res=>{
                if(res.data.code="200"){
                    this.handleQuery()
                    this.$Notice.success({desc:'操作成功'})
                }else{
                    this.$Notice.error({desc:'操作失败'})
                }
            })
        },
        // 添加
        handleCreate() {
            let form={
                id: '',
                title: '',
                cid: [],
                create_name: '',
                vedio_url: '',
                content: '',
                is_top: '0',
                cover: ''
            }
            this.createForm=EditFormModel.init(form)
            this.setDialogProperty(1000,'添加','CreateForm')
        },
        getPid(id){
            let pid=''
            this.casdata.forEach(el=>{
                console.log(el.children)
                if(el.children){
                    el.children.forEach(em=>{
                        console.log(em)
                        if(em.value==id){
                            console.log(el.value)
                            pid= el.value
                        }
                    })
                }
            })
            return pid
        },
        handleEdit(params){
            console.log(params)
            console.log(this.casdata)
            let pid=this.getPid(params.row.cid)
            console.log(pid)
            let form={
                id: params.row.id,
                title: params.row.title,
                cid: [pid,params.row.cid],
                create_name: params.row.create_name,
                vedio_url: params.row.vedio_url,
                content: params.row.content,
                is_top: params.row.is_top,
                cover: params.row.cover
            }
            this.editForm=CreateFormModel.init(form)
            this.setDialogProperty(1000,'添加','EditForm')
        },
        // 基本信息设置
        handleInfo(){},
        handleDelete(params) {
            deleteschoolArticle({token:this.$store.state.user.token,id:params.row.id}).then(res=>{
                if(res.data.code="200"){
                    this.handleQuery()
                    this.$Notice.success({desc:'操作成功'})
                }else{
                    this.$Notice.error({desc:'操作失败'})
                }
            })
        },
        // handleCreate() {},
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
            if(name==='CreateForm') {
                this.$refs.CreateForm.validate(valid=>{
                    if(valid) {
                        this.create()
                    }
                })
            } else if (name==='EditForm') {
                this.$refs.EditForm.validate(valid=>{
                    if(valid) {
                        this.edit()
                    }
                })
            }
            this.modelStatus.loading = false
            this.$nextTick(() => {
                this.modelStatus.loading = true
            })
        },
        /* 对话框取消 */
        handlerModelDialogCancel(name) {
            this.$refs[name].resetFields()            
            // 确保关闭对话框
            this.modelStatus.show = false
            // 对话框显示footer恢复
            this.modelStatus.hide = false
        },
        create(){
            console.log(this.createForm.formInline)
            // let create=CreateFromModel.converter(this.createForm.formInline)
            let cid=this.createForm.formInline.cid[this.createForm.formInline.cid.length-1]
            let data={
                token: this.$store.state.user.token,
                id: this.createForm.formInline.id,
                title: this.createForm.formInline.title,
                cid: cid,
                create_name: this.createForm.formInline.create_name,
                vedio_url: this.createForm.formInline.vedio_url,
                content: this.createForm.formInline.content,
                is_top: this.createForm.formInline.is_top,
                cover: this.createForm.formInline.cover
            }
            // console.log(cid)
            createschoolArticle(data).then(res=>{
                console.log(res)
                if(res.data.code=="200"){
                    this.handleQuery()
                    // 确保关闭对话框
                    this.modelStatus.show = false
                    // 对话框显示footer恢复
                    this.modelStatus.hide = false
                }
            })
        },
        edit(){
            console.log(this.editForm.formInline)
            // let create=CreateFromModel.converter(this.createForm.formInline)
            let cid=this.editForm.formInline.cid[this.editForm.formInline.cid.length-1]
            let data={
                token: this.$store.state.user.token,
                id: this.editForm.formInline.id,
                title: this.editForm.formInline.title,
                cid: cid,
                create_name: this.editForm.formInline.create_name,
                vedio_url: this.editForm.formInline.vedio_url,
                content: this.editForm.formInline.content,
                is_top: this.editForm.formInline.is_top,
                cover: this.editForm.formInline.cover
            }
            // console.log(cid)
            createschoolArticle(data).then(res=>{
                console.log(res)
                if(res.data.code=="200"){
                    this.handleQuery()
                    // 确保关闭对话框
                    this.modelStatus.show = false
                    // 对话框显示footer恢复
                    this.modelStatus.hide = false
                }
            })
        }
    },
    mounted() {
        this.columns = schoolarticleColumn
        this.page = pageInfo.init()
        this.handleQuery()
        this.handleCategoryTree()
    }
}
</script>

