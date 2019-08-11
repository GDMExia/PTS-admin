<template>
  <div>
     <Form  ref="RoleCreateForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
      <FormItem label="角色类别" prop="name">
        <Input v-model="formInline.name" placeholder="请输入角色类别" />
      </FormItem>
      <FormItem label="功能权限" prop="permission">
        <CheckboxGroup v-model="features" @on-change="handleOnFeatureChange">
          <Checkbox v-for="r of roleType" :key="r.menu_id" :label="r.menu_name"></Checkbox>
        </CheckboxGroup>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  name: 'RoleCreateForm',
  props: {
    formInline: Object,
    ruleInline: Object,
    roleType: Array
  },

data(){
    return {
      features: [],
    }
  },

  methods: {
    validate(cb) {
      this.$refs.RoleCreateForm.validate(cb)
    },

    handleOnFeatureChange(items) {
      const roles = []
      for(const name of items){
        const r = this.roleType.find(data=>{
          return name == data.menu_name
        })
        roles.push(r.menu_id)
      }
      this.formInline.permission = `${roles.join(',')}`
    },

    init(features) {
      this.features = features
    } 

  }
}
</script>
