<template>
  <div>
     <Form  ref="AdminChangeForm" :model="formInline" :rules="ruleInline" :label-width="100" label-position="left">
      <!-- <FormItem label="帐号" prop="role"> -->
        <!-- {{formInline.account}} -->
        <!-- <Input v-model="formInline.account" readonly placeholder="请输入" />
      </FormItem> -->
      <FormItem label="旧密码" prop="oldpass">
        <Input v-model="formInline.oldpass" type="password" placeholder="请输入" />
      </FormItem>
      <FormItem label="新密码"  prop="newpass">
        <Input v-model="formInline.newpass" type="password" placeholder="请输入" />
      </FormItem>
      <FormItem label="确认密码" prop="target2">
        <Input v-model="formInline.target2" type="password" placeholder="请输入" />
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  name: 'AdminChangeForm',
  props: {
    formInline: Object,
    ruleInline: Object
  },
  methods: {
    validate(cb) {
      this.$refs.AdminChangeForm.validate(cb)
    },
    resetFields() {
      this.$refs.AdminChangeForm.resetFields()
    }
  }
}
</script>
