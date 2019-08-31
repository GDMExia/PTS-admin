<template>
    <div>
        <Card>
            <div class="clearfix" style="margin-bottom: 10px;">
                <div class="pull-left">
                    <Button @click="handleBack" class="search-btn" type="primary" style="margin-right:5px">
                        <Icon type="" />返回</Button>
                    <!-- <Button @click="handleInfo" class="search-btn" type="success" style="margin-right:5px">
                        <Icon type="ios-crop-outline" />&nbsp;&nbsp;基本信息设置</Button>
                    <Button @click="handleCreate" class="search-btn" type="primary" style="margin-right:5px">
                        <Icon type="md-add"/>&nbsp;&nbsp;生成</Button> -->
                </div>
                <div class="pull-right">
                    
                </div>
            </div>
            <tables class="self-table-wrap" ref="tables" stripe v-model="tableData" :columns="columns" @on-edit="handleEdit"/>
            <div style="margin-top:10px;text-align:right;">
                <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleOnChange" 
                show-sizer size="small" :page-size-opts="[10,20,50,100,1000]" @on-page-size-change="handleOnChangeSize"/>
            </div>
        </Card>
        <ModelDialog :status="modelStatus"
                @handlerModelDialogOk="handlerModelDialogOk"
                @handlerModelDialogCancel="handlerModelDialogCancel">
                <EditForm ref='EditForm'
                    :formInline="editForm.formInline"
                    :ruleInline="editForm.ruleInline"
                    v-if="modelStatus.name=='EditForm'"/>
            </ModelDialog>
    </div>
</template>
<script>
import Tables from '_c/tables'
import pageInfo from "@/libs/page-info"
import ModelDialog from '_c/model-dialog'
import {
    schoolmoreColumn,
    getcategoryData,
    setcategoryData
} from './api'
import EditForm from './forms/edit-more-form'
import EditFormModel from './model/edit-more-model'
export default {
    components: {
        Tables,
        ModelDialog,
        EditForm
    },
    data() {
        return {
            tableData: [],
            columns: [],
            page: {},
            modelStatus: { show: false, hide: false, loading: true, title: '', name: '' },
            editForm: {},
            pid: this.$route.query.pid
        }
    },
    methods: {
        handleQuery() {
            getcategoryData({token:this.$store.state.user.token,pid:this.pid}).then(res=>{
                console.log(res)
                if(res.data.code=="200"){
                    this.tableData=res.data.data.cateTree
                }
            })
        },
        handleEdit(params){
            let form={
                id: params.row.id,
                cate_name: params.row.cate_name,
                code_name:params.row.code_name,
                is_code:params.row.is_code,
                pid:params.row.pid
            }
            this.editForm=EditFormModel.init(form)
            this.setDialogProperty(600,'编辑','EditForm')
        },
        handleBack(){
            this.$router.go(-1)
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
            console.log(name)
            console.log(this.$refs.EditForm)
            if (name==='EditForm') {
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
            console.log(name)
            this.$refs[name].resetFields()
            // 确保关闭对话框
            this.modelStatus.show = false
            // 对话框显示footer恢复
            this.modelStatus.hide = false
        },
        edit(){
            console.log(this.$store.state.user.token)
            let data={
                token: this.$store.state.user.token,
                id: this.editForm.formInline.id,
                pid: this.editForm.formInline.pid,
                cate_name: this.editForm.formInline.cate_name,
                is_code: this.editForm.formInline.is_code,
                code_name: this.editForm.formInline.code_name
            }
            let dat=new FormData()
            for(let i in data){
                console.log(i)
                dat.append(`${i}`, data[i])
            }
            setcategoryData(dat).then(res=>{
                console.log(res)
                if(res.data.code=="200"){
                    this.$Notice.success({desc:'操作成功'})
                    this.handleQuery()
                    // 确保关闭对话框
                    this.modelStatus.show = false
                    // 对话框显示footer恢复
                    this.modelStatus.hide = false
                }else{
                    this.$Notice.error({desc:'操作失败'})
                }
            })
        }
    },
    mounted() {
        this.columns = schoolmoreColumn
        this.page = pageInfo.init()
        this.handleQuery()
    }
}
</script>

