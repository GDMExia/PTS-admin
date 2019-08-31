<template>
  <div>
    <Card>
      <div style="margin-bottom:10px">
        <Button @click="handleCreate" class="search-btn" type="primary" style="margin-right:5px">
          <Icon type="md-add"/>&nbsp;&nbsp;添加</Button>
       </div>
      <tables ref="tables" stripe v-model="tableData" :columns="columns" @on-edit="handleEdit"
        @on-delete="handleDelete" />
      <!-- <div style="margin-top:10px;text-align:right;">
         <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleOnChange" 
          show-sizer size="small" :page-size-opts="[10,20,50,100,]" @on-page-size-change="handleOnChangeSize"/>
      </div> -->
    </Card>
  <div>
    <ModelDialog :status="modelStatus"
        @handlerModelDialogOk="handlerModelDialogOk"
        @handlerModelDialogCancel="handlerModelDialogCancel">
      <RoleCreateForm ref='RoleCreateForm'
        :formInline="createForm.formInline"
        :ruleInline="createForm.ruleInline"
        :roleType="rightsType"
        v-if="modelStatus.name=='RoleCreateForm'"/>
      <RoleEditForm ref='RoleEditForm'
        :formInline="editForm.formInline"
        :ruleInline="editForm.ruleInline"
        :roleType="rightsType"
        v-if="modelStatus.name=='RoleEditForm'"/>
    </ModelDialog>
  </div>

  </div>
</template>

<script>
import Tables from '_c/tables'
import ModelDialog from '_c/model-dialog'
import RoleCreateForm from './forms/role-create-form'
import roleCreateModel from './model/role-create-model'
import RoleEditForm from './forms/role-edit-form'
import roleEditModel from './model/role-edit-model'
import pageInfo from "@/libs/page-info"
import {
  getRightsType,
  roleColumns,  
  getRoleIndex,
  setRoleCreate,
  setRoleDelete
} from './api/rights'

export default {
  name: 'tables_page',
  components: {
    Tables,
    ModelDialog,
    RoleCreateForm,
    RoleEditForm
  },
  data() {
    return {
      columns: [],
      tableData: [],
      modelStatus: { show: false, hide: false, loading: true, title: '', name: '' },
      createForm: {},
      editForm: {},
      page: {},
      rightsType: []
    }
  },
  methods: {
    // 查询
    handleQuery() {
      getRoleIndex().then(res => {
        this.tableData = res.data.data.roleList?res.data.data.roleList:[]
        // this.page = pageInfo.converter({pageIndex: this.page.index, pageSize: this.page.size, pageTotal: res.data.total,search: this.page.search})
        // 关闭表单框
        this.modelStatus.show = false
      })
    },

    /** 获取菜单权限列表 */
    getRightsType() {
      getRightsType().then(res=>{
        this.rightsType = res.data.data.menuList
      })
    },

    /* 新增 */
    handleCreate() {
      this.modelStatus.show = true
      this.modelStatus.loading = true
      this.modelStatus.title = '添加角色'
      this.modelStatus.name = 'RoleCreateForm'
      this.createForm = roleCreateModel.init()
      /* 不清除有记忆 */
      this.$nextTick(()=>{
        this.$refs.RoleCreateForm.init([])
      })
      
    },

    /* 新增提交 */
    handleCreateSubmit() {
      const form = roleCreateModel.converter(this.createForm.formInline)
      setRoleCreate(form).then(res => {
        // console.log(res.data);
        if (res.data.code==200) {
          this.$Message.success('添加成功')
          this.modelStatus.show = false
          this.handleQuery()
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },

    /* 编辑 */
    handleEdit(params) {
      const form = {id: params.row.role_id, name: params.row.permissions_name, permission: params.row.permissions_group, functions: params.row.permissions_group}
      this.modelStatus.show = true
      this.modelStatus.loading = true
      this.modelStatus.title = '修改角色'
      this.modelStatus.name = 'RoleEditForm'
      this.editForm = roleEditModel.init(form)
      this.$nextTick(()=>{
        let permission = []
        if(form.functions == '所有权限') {
          permission = this.rightsType.map(item=>{
            return item.functionName
          })
        } else {
          permission = form.functions.split(',')
        }
        this.$refs.RoleEditForm.init(permission)
      })
    },

    /* 编辑提交 */
    handleEditSubmit() {
      const form = roleEditModel.converter(this.editForm.formInline)
      setRoleCreate(form).then(res => {
        if (res.data.code==200) {
          this.$Message.success('编辑成功')
          this.modelStatus.show = false
          this.handleQuery()
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },

    /* 对话框确认 */
    handlerModelDialogOk(name) {
      if (name === 'RoleCreateForm') {
        this.$refs.RoleCreateForm.validate(valid => {
          if (valid) {
            this.handleCreateSubmit()
          }
        })
        
      } else if (name === 'RoleEditForm') {
        this.$refs.RoleEditForm.validate(valid => {
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

    /* 删除 */
    handleDelete(params) {
      setRoleDelete(params.row.role_id).then(res => {
        if(res.data.code==200) {
          this.$Message.success('删除成功')
          this.handleQuery()
        } else {
          this.$Message.error(res.data.message)
        }
      })
    }
  },
  
  mounted() {
    // 加载表格列
    this.columns = roleColumns
    // 加载分页类
    this.page = pageInfo.init()
    // 首页查询
    this.handleQuery()
    this.getRightsType()
  }
}
</script>

<style>
</style>
