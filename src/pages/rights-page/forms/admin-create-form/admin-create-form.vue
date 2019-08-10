<template>
  <div>
     <Form  ref="AdminCreateForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
      <FormItem label="角色" prop="roleId">
        <Select v-model="formInline.roleId" placeholder="请选择">
          <Option :value="role.roleId" v-for="role in rolesType" :key="role.id">{{role.roleName}}</Option>
        </Select>
      </FormItem>
      <FormItem label="帐号" prop="accountNo">
        <Input v-model="formInline.accountNo" placeholder="请输入" />
      </FormItem>
      <FormItem label="姓名" prop="accountName">
        <Input v-model="formInline.accountName" placeholder="请输入" />
      </FormItem>
      <FormItem label="初始密码" >
        <Input value="888888" readonly placeholder="请输入" />
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  name: 'AdminCreateForm',
  props: {
    formInline: Object,
    ruleInline: Object,
    rolesType: Array
  },

  methods: {
    validate(cb) {
      this.$refs.AdminCreateForm.validate(cb)
    } 

  }
}
</script>
