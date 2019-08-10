<template>
  <div>
     <Form  ref="AdminEditForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
      <FormItem label="角色" prop="roleId">
        <Select v-model="formInline.roleId" placeholder="请选择">
          <Option :value="role.roleId" v-for="role in rolesType" :key="role.id">{{role.roleName}}</Option>
        </Select>
      </FormItem>
      <FormItem label="帐号" prop="accountNo">
        <Input v-model="formInline.accountNo" readonly placeholder="请输入" />
      </FormItem>
      <FormItem label="姓名" prop="accountName">
        <Input v-model="formInline.accountName" placeholder="请输入" />
      </FormItem>
      <!-- <FormItem label="初始密码" >
        <Input value="888888" readonly placeholder="请输入" />
      </FormItem> -->
    </Form>
  </div>
</template>
<script>
export default {
  name: 'AdminEditForm',
  props: {
    formInline: Object,
    ruleInline: Object,
    rolesType: Array
  },

// data(){
//     return {
//       features: [],
//     }
//   },

  methods: {
    validate(cb) {
      this.$refs.AdminEditForm.validate(cb)
    }

    // handleOnFeatureChange(items) {
    //   if(items.length==6){
    //     this.formInline.permission = '[1,2,3,4,5,6]'
    //   } else {
    //     const roles = []
    //     for(const name of items){
    //       const r = this.roleType.find(data=>{
    //         return name == data.name
    //       })
    //       roles.push(r.id)
    //     }
    //     this.formInline.permission = `[${roles.join(',')}]`
    //   }
    //   // console.log(this.formInline)
    // },

    // init(features) {
    //   this.features = features
    // } 

  }
}
</script>
