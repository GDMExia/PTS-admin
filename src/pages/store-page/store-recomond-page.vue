<template>
    <div>
        <Card>
            <div class="clearfix" style="margin-bottom: 10px;">
                <div class="pull-left">
                    
                </div>
                <div class="pull-right">
                    <Button @click="handleCreate" v-for="(item, index) in category" :key="index" class="search-btn" :type="item.id==categoryId?'pramiry':'default'" style="margin-right:5px">
                        <Icon type="md-add"/>&nbsp;&nbsp;{{item.name}}</Button>
                </div>
            </div>
            <tables class="self-table-wrap" ref="tables" stripe v-model="tableData" :columns="columns" @on-edit="handleEdit"
            @on-info="handleInfo" @on-delete="handleDelete" @on-forbid="handleForbid" @on-reset="handleReset" />
            <div style="margin-top:10px;text-align:right;">
                <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleOnChange" 
                show-sizer size="small" :page-size-opts="[10,20,50,100,]" @on-page-size-change="handleOnChangeSize"/>
            </div>
        </Card>
        <div>
            <ModelDialog :status="modelStatus"
                @handlerModelDialogOk="handlerModelDialogOk"
                @handlerModelDialogCancel="handlerModelDialogCancel">
                <StoreCreateForm ref='StoreCreateForm'
                    :formInline="createForm.formInline"
                    :ruleInline="createForm.ruleInline"
                    v-if="modelStatus.name=='StoreCreateForm'"/>
                <StoreInfoForm ref='StoreInfoForm'
                    :formInline="infoForm.formInline"
                    :ruleInline="infoForm.ruleInline"
                    :typeList="typeList"
                    v-if="modelStatus.name=='StoreInfoForm'"/>
            </ModelDialog>
        </div>
    </div>
</template>

<script>
import Tables from '_c/tables'
import ModelDialog from '_c/model-dialog'
import StoreCreateForm from './forms/store-create-form'
import StoreCreateModel from './model/store-create-model'
import StoreInfoForm from './forms/store-info-form'
import StoreInfoModel from './model/store-info-model'
import pageInfo from "@/libs/page-info"
import {
    storeColumn,
    getStoreList,
    setStoreCreate,
    setStoreDelete,
    getStoreInfo,
    getType
} from './api'
import {
    setAdminReset,
    setAdminForbit
} from '_p/rights-page/api/rights'
export default {
    components: {
        Tables,
        ModelDialog,
        StoreCreateForm,
        StoreInfoForm
    },
    data() {
        return {
            tableData: [],
            columns: [],
            page: {},
            modelStatus: { show: false, hide: false, loading: true, title: '', name: '' },
            createForm: {},
            infoForm: {},
            typeList: [],
            categoryId: 1,
            category: [
                {id: 1,name: '大类1'},
                {id: 2,name: '大类2'},
                {id: 3,name: '大类3'},
            ]
        }
    },
    methods: {
        handleQuery() {
            getStoreList(this.page).then(res=>{
                if(res.data.code == 200) {
                    this.tableData = res.data.data.userList?res.data.data.userList.map(item=>{
                        item.status = item.is_disable=='0'?'启用':'禁用'
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
            const form = {
                phone: '',
                contact: '',
                real_name: '',
                admin_name: '',
                mid: '',
            }
            this.setDialogProperty(600, '添加', 'StoreCreateForm')
            this.createForm = StoreCreateModel.init(form)
            this.$nextTick(()=>{
                
            })
        },
        // 编辑
        handleEdit(params) {
            const form = {
                phone: params.row.phone,
                contact: params.row.contact,
                real_name: params.row.real_name,
                admin_name: params.row.admin_name,
                mid: params.row.mid,
            }
            this.setDialogProperty(600, '编辑', 'StoreCreateForm')
            this.createForm = StoreCreateModel.init(form)
        },
        handleSubmit() {
            const form = StoreCreateModel.converter(this.createForm.formInline)
            if(form.id == '') {
                this.setCreate(form)
            } else {
                this.setEdit(form)
            }
        },
        setCreate(form) {
            setStoreCreate(form).then(res=>{
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
            setStoreCreate(form).then(res=>{
                if(res.data.code == 200) {
                    this.$Message.success('编辑成功')
                    this.modelStatus.show = false
                    this.handleQuery()
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        // 商家信息设置
        handleInfo(params) {
            getStoreInfo(params.row.mid).then(res=>{
                if(res.data.code == 200) {
                    let form = res.data.data.merchantsInfo
                    form.mid = params.row.mid
                    this.setDialogProperty(900, '编辑商家信息', 'StoreInfoForm')
                    this.infoForm = StoreInfoModel.init(form)
                    this.$nextTick(()=>{
                        this.$refs.StoreInfoForm.handleRichEditor()
                    })
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        // 删除
        handleDelete(params) {
            setStoreDelete(params.row.id).then(res=>{
                if(res.data.code == 200) {
                    this.$Message.success('删除成功')
                    this.modelStatus.show = false
                    this.handleQuery()
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        /* 禁止 */
        handleForbid(params) {
            const form = {
                uid: params.row.mid,
                is_disable: params.row.is_disable=='0'?1:0
            }
            setAdminForbit(form).then(res => {
                if(res.data.code==200) {
                this.$Message.success('操作成功')
                this.handleQuery()
                } else {
                this.$Message.error(res.data.message)
                }
            })
        },

        /* 重置密码 */
        handleReset(params) {
            setAdminReset(params.row.mid).then(res => {
                if(res.data.code==200) {
                    this.$Message.success('操作成功')
                    this.handleQuery()
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        }, 
        handleType() {
            getType().then(res=>{
                if(res.data.code==200) {
                    this.typeList = res.data.data.Classification.map(item=>{
                        item.value = item.merchants_cid
                        item.label = item.cate_name
                        item.children = item.Classification.map(value=>{
                            value.value = value.merchants_cid
                            value.label = value.cate_name
                            return value
                        })
                        return item
                    })
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        handleShareSubmit() {
            
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
            if(name==='StoreCreateForm') {
                this.$refs.StoreCreateForm.validate(valid=>{
                    if(valid) {
                        this.handleSubmit()
                    }
                })
            } else if (name==='StoreInfoForm') {
                this.$refs.StoreInfoForm.validate(valid=>{
                    if(valid) {
                        this.handleShareSubmit()
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
        this.columns = storeColumn
        this.page = pageInfo.init()
        this.handleQuery()
    }
}
</script>

