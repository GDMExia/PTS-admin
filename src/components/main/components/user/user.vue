<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <!-- <Badge :dot="!!messageUnreadCount">
        <Avatar :src="userAvator"/>
      </Badge> -->
      <Avatar style="background-color: #001529" icon="ios-person" />
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="name">
          {{userName}}
        </DropdownItem>
        <DropdownItem name="change">
          修改密码
        </DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
export default {
  name: 'User',
  props: {
    userAvator: {
      type: String,
      default: ''
    },
    userName: {
      type: String,
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    logout () {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
    change () {
      this.$emit('on-change')
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'change': this.change()
          break
      }
    }
  }
}
</script>
