<template>
    <div>
        <Card>
            <div class="clearfix" style="margin-bottom: 10px;">
                <div class="pull-left">
                    <Button @click="$router.back()" class="search-btn" type="primary" style="margin-right:5px">
                        <Icon type="md-arrow-back" />&nbsp;&nbsp;返回</Button>
                    <Button @click="handleCreate" class="search-btn" type="success" style="margin-right:5px">
                        <Icon type="md-add"/>&nbsp;&nbsp;添加</Button>
                </div>
                <div class="pull-right">
                    
                </div>
            </div>
            <tables class="self-table-wrap" ref="tables" stripe v-model="tableData" :columns="columns" @on-edit="handleEdit" @on-change="handleChange"/>
            <div style="margin-top:10px;text-align:right;">
                <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleOnChange" 
                show-sizer size="small" :page-size-opts="[10,20,50,100,1000]" @on-page-size-change="handleOnChangeSize"/>
            </div>
        </Card>
        <div>
            <ModelDialog :status="modelStatus"
                @handlerModelDialogOk="handlerModelDialogOk"
                @handlerModelDialogCancel="handlerModelDialogCancel">
                <GroupCreateForm ref='GroupCreateForm'
                    :formInline="createForm.formInline"
                    :ruleInline="createForm.ruleInline"
                    :ruleList="ruleList"
                    :residenceList="residenceList"
                    v-if="modelStatus.name=='GroupCreateForm'"/>
            </ModelDialog>
        </div>
    </div>
</template>
<script>
import Tables from '_c/tables'
import pageInfo from "@/libs/page-info"
import ModelDialog from '_c/model-dialog'
import GroupCreateForm from './forms/group-create-form'
import GroupCreateModel from './model/group-create-model'
import {
    groupColumns
} from './api'
export default {
    components: {
        Tables,
        ModelDialog,
        GroupCreateForm,
    },
    data() {
        return {
            tableData: [],
            columns: [],
            ruleList: [],
            residenceList: [],
            page: {},
            modelStatus: { show: false, hide: false, loading: true, title: '', name: '' },
            createForm: {},
            reserveForm: {},
            queryForm: {
                search: '',
            },
        }
    },
    methods: {
        handleSearch() {},
        handleQuery() {
            this.tableData = [
                {id: 1, name: '2019A组',rules: '2019年5月~2-19年12月规则', residenceArray: [{name: '花鸟岛民宿1'},{name: '花鸟岛民宿2'}], enableStr: '启用', enable: true},
                
            ]
        },
        handleCreate() {     
            const form = {
                name: '',
                id: '',
                rules: '',
                residences: '',
            }
            this.createForm = GroupCreateModel.init(form) 
            this.setDialogProperty(550, '添加', 'GroupCreateForm') 
        },
        // 编辑
        handleEdit(params) {},
        // 禁用/启用
        handleChange(params) {
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
        this.columns = groupColumns
        this.page = pageInfo.init()
        this.handleQuery()
    }
}
</script>

