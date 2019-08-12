<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit" onselectstart="return false">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem label="验证码">
      <div class="flx flx_m" style="display: flex;">
        <Input v-model="form.ucode" placeholder="请输入" style=""></Input>
        <img :src="stickyImg" alt="" width="80" height="32" style="margin-left: 15px;" @click="refresh">
      </div>
    </FormItem>
    <!-- <FormItem>
      <SlidingBlock @on-sliding-block="handleSlidingBlock"/>
    </FormItem>   -->
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import SlidingBlock from '_c/sliding-block'
export default {
  name: 'LoginForm',
  components: {
    SlidingBlock
  },
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        userName: 'admin',
        password: '',
        ucode: ''
      },
      stickyImg: this.$config.configUrl+'/Account/verify',
      done: false
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      // if (!this.done) {
      //   this.$Notice.error({
      //     title: '错误',
      //     desc: '请完成验证'
      //   })
      //   return
      // }
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password,
            ucode: this.form.ucode,
          })
        }
      })
    },
    handleSlidingBlock() {
      this.done = true
    },
    refresh() {
      var that = this;
      that.stickyImg ='';
      setTimeout(function(){
        that.stickyImg = that.$config.configUrl+'/Account/verify';
      },100)
    }
  }
}
</script>
