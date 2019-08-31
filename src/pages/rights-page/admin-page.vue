<template>
  <div>
    <Card>
      <div style="margin-bottom:10px">
        <Button @click="handleCreate" class="search-btn" type="primary" style="margin-right:5px">
          <Icon type="md-add"/>&nbsp;&nbsp;添加</Button>
       </div>
      <tables ref="tables" stripe v-model="tableData" :columns="columns" @on-edit="handleEdit"
        @on-delete="handleDelete" @on-forbid="handleForbid" @on-reset="handleReset"/>
      <div style="margin-top:10px;text-align:right;">
         <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleOnChange" 
          show-sizer size="small" :page-size-opts="[10,20,50,100]" @on-page-size-change="handleOnChangeSize"/>
      </div>
    </Card>
  <div>
    <ModelDialog :status="modelStatus"
        @handlerModelDialogOk="handlerModelDialogOk"
        @handlerModelDialogCancel="handlerModelDialogCancel">
      <AdminCreateForm ref='AdminCreateForm'
        :formInline="createForm.formInline"
        :ruleInline="createForm.ruleInline"
        :rolesType="rolesType"
        v-if="modelStatus.name=='AdminCreateForm'"/>
      <AdminEditForm ref='AdminEditForm'
        :formInline="editForm.formInline"
        :ruleInline="editForm.ruleInline"
        :rolesType="rolesType"
        v-if="modelStatus.name=='AdminEditForm'"/>
    </ModelDialog>
  </div>

  </div>
</template>

<script>
import Tables from '_c/tables'
import ModelDialog from '_c/model-dialog'
import AdminCreateForm from './forms/admin-create-form'
import adminCreateModel from './model/admin-create-model'
import AdminEditForm from './forms/admin-edit-form'
import adminEditModel from './model/admin-edit-model'
import pageInfo from "@/libs/page-info"
import {
  // rightsType,
  adminColumns,  
  getRoleIndex,
  getAdminIndex,
  setAdminCreate,
  setAdminDelete,
  setAdminForbit,
  setAdminReset,
} from './api/rights'

export default {
  name: 'tables_page',
  components: {
    Tables,
    ModelDialog,
    AdminCreateForm,
    AdminEditForm,
  },
  data() {
    return {
      columns: [],
      tableData: [],
      modelStatus: { show: false, hide: false, loading: true, title: '', name: '' },
      createForm: {},
      editForm: {},
      page: {},
      rolesType: []
    }
  },
  methods: {
    // 查询
    handleQuery() {
      getAdminIndex(this.page).then(res => {
        this.tableData = res.data.data.userList?res.data.data.userList.map(item=>{
          item.enabledStr = item.is_disable=='0'?'启用':'禁用'
          return item
        }):[]
        this.page = pageInfo.converter({pageIndex: this.page.index, pageSize: this.page.size, pageTotal: res.data.data.PageInfo.TotalCounts,search: this.page.search})
        // 关闭表单框
        this.modelStatus.show = false
        this.handleRolesList()
      })
    },
    // 获取角色列表
    handleRolesList() {
      getRoleIndex().then(res=>{
        this.rolesType = res.data.data.roleList
      })
    },
    /* 新增 */
    handleCreate() {
      if(this.rolesType.length ==0 ){
        this.$Message.error('请先设置角色')
        return
      }
      this.modelStatus.show = true
      this.modelStatus.loading = true
      this.modelStatus.title = '添加操作人员'
      this.modelStatus.name = 'AdminCreateForm'
      this.createForm = adminCreateModel.init()
      /* 不清除有记忆 */
      // this.$nextTick(()=>{
      //   this.$refs.RoleCreateForm.init([])
      // })
      
    },

    /* 新增提交 */
    handleCreateSubmit() {
      const form = adminCreateModel.converter(this.createForm.formInline)
      setAdminCreate(form).then(res => {
        // console.log(res.data);
        if (res.data.code==200) {
          this.$Message.success( '添加成功')
          this.modelStatus.show = false
          this.handleQuery()
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    /* 编辑 */
    handleEdit(params) {
      if(this.rolesType.length ==0 ){
        this.$Message.error('请先设置角色')
        return
      }
      const role = this.rolesType.find(item=>{
        return item.permissions_name == params.row.permissions_name
      })
      const form = {
        id: params.row.uid, 
        accountNo: params.row.admin_name,
        accountName: params.row.real_name, 
        roleId: role.role_id
      }
      // console.log(form)
      this.modelStatus.show = true
      this.modelStatus.loading = true
      this.modelStatus.title = '修改操作人员'
      this.modelStatus.name = 'AdminEditForm'
      this.editForm = adminEditModel.init(form)
    },

    /* 编辑提交 */
    handleEditSubmit() {
      const form = adminEditModel.converter(this.editForm.formInline)
      setAdminCreate(form).then(res => {
        if (res.data.code==200) {
          this.$Message.success('编辑成功')
          this.modelStatus.show = false
          this.handleQuery()
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },

    /* 删除 */
    handleDelete(params) {
      // alert(params)
      setAdminDelete(params.row.uid).then(res => {
        if(res.data.code==200) {
          this.$Message.success('删除成功')
          this.handleQuery()
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },

    /* 禁止 */
    handleForbid(params) {
      const form = {
        uid: params.row.uid,
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
      setAdminReset(params.row.uid).then(res => {
        if(res.data.code==200) {
          this.$Message.success('操作成功')
          this.handleQuery()
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },    

    /* 对话框确认 */
    handlerModelDialogOk(name) {
      if (name === 'AdminCreateForm') {
        // console.log(this.createForm)
        this.$refs.AdminCreateForm.validate(valid => {
          if (valid) {
            this.handleCreateSubmit()
          }
        })
        
      } else if (name === 'AdminEditForm') {
        this.$refs.AdminEditForm.validate(valid => {
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

    /* 对话框取消 */
    handlerModelDialogCancel() {
      // 确保关闭对话框
      this.modelStatus.show = false
      // 对话框显示footer恢复
      this.modelStatus.hide = false
    }
  },
   
  mounted() {
    // 加载表格列
    this.columns = adminColumns
    // 加载分页类
    this.page = pageInfo.init()
    // 首页查询
    this.handleQuery()
  }
}
</script>

<style>
</style>
