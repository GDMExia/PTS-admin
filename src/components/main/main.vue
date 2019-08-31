<template>
  <Layout style="height: 100%" class="main">
    <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
      <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con">
          <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
          <img v-show="collapsed" :src="minLogo" key="min-logo" />
        </div>
      </side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <user :message-unread-count="messageUnreadCount" :user-name="userName" :user-avator="userAvator" @on-change="handleChangePassword"/>
          <ModelDialog :status="modelStatus"
              @handlerModelDialogOk="handlerModelDialogOk"
              @handlerModelDialogCancel="handlerModelDialogCancel">
            <AdminChangeForm ref='AdminChangeForm'
            :formInline="changeForm.formInline"
            :ruleInline="changeForm.ruleInline"
            v-if="modelStatus.name=='AdminChangeForm'"/>
          </ModelDialog>
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <!-- <div class="tag-nav-wrapper">
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
          </div> -->
          <Content class="content-wrapper">
            <keep-alive :include="cacheList">
              <router-view/>
            </keep-alive>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import ModelDialog from '_c/model-dialog'
import AdminChangeForm from '_p/home-page/forms/admin-change-form'
import AdminChangeModel from '_p/home-page/model/admin-change-model'
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getNewTagList, getNextRoute, routeEqual } from '@/libs/util'
import routers from '@/router/routers'
import minLogo from '@/assets/images/logo-min.png'
import maxLogo from '@/assets/images/logo.png'
import { setChangePassword } from '_p/home-page/api'
import './main.less'
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    TagsNav,
    User,
    ModelDialog,
    AdminChangeForm
  },
  data () {
    return {
      collapsed: false,
      minLogo,
      maxLogo,
      isFullscreen: false,
      modelStatus: { show: false, hide: false, loading: true, title: '', name: '' },
      changeForm: {}
    }
  },
  computed: {
    ...mapGetters([
      'errorCount',
      'messageUnreadCount'
    ]),
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    tagRouter () {
      return this.$store.state.app.tagRouter
    },
    userAvator () {
      return this.$store.state.user.avatorImgPath
    },
    userName () {
      return this.$store.state.user.userName
    },
    cacheList () {
      return ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
    },
    menuList () {
      return this.$store.getters.menuList
    },
    local () {
      return this.$store.state.app.local
    },
    hasReadErrorPage () {
      return this.$store.state.app.hasReadErrorPage
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal',
      'setHomeRoute',
      'setPmsTickets'
    ]),
    ...mapActions([
      'handleLogin',
      'handleLogOut',
    ]),
    // 修改密码对话框
    handleChangePassword(){
        this.modelStatus.show = true
        this.modelStatus.loading = true
        this.modelStatus.title = '修改密码'
        this.modelStatus.name = 'AdminChangeForm'
        this.changeForm = AdminChangeModel.init()
        this.$nextTick(()=>{
          this.$refs.AdminChangeForm.resetFields()
        })
    },

    // 修改密码提交
    handleChangePasswordSubmit(){
      const form = AdminChangeModel.converter(this.changeForm.formInline)
      setChangePassword(form).then(res => {
        if (res.data.code == 200) {
          this.$Message.success('修改密码成功')
          this.modelStatus.show = false
          this.handleLogOut().then(() => {
            this.$router.push({
              name: 'login'
            })
          })
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },

    handlerModelDialogOk(name){
      if (name === 'AdminChangeForm') {
        this.$refs.AdminChangeForm.validate(valid => {
          if (valid) {
            this.handleChangePasswordSubmit()          
          }
        })
      }
      this.modelStatus.loading = false
      this.$nextTick(() => {
        this.modelStatus.loading = true
      })
    },

    handlerModelDialogCancel(){
      // 确保关闭对话框
      this.modelStatus.show = false
      // 对话框显示footer恢复
      this.modelStatus.hide = false
    },
    turnToPage (route) {
      this.setPmsTickets({data: [], pageIndex: -1, total: 0 })
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, type, route) {
      if (type === 'all') {
        this.turnToPage(this.$config.homeName)
      } else if (routeEqual(this.$route, route)) {
        if (type !== 'others') {
          const nextRoute = getNextRoute(this.tagNavList, route)
          this.$router.push(nextRoute)
        }
      }
      this.setTagNavList(res)
    },
    handleClick (item) {
      this.turnToPage(item)
    }
  },
  watch: {
    '$route' (newRoute) {
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
      this.setBreadCrumb(newRoute)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.setHomeRoute(routers)
    this.addTag({
      route: this.$store.state.app.homeRoute
    })
    this.setBreadCrumb(this.$route)
    // 设置初始语言
    this.setLocal(this.$i18n.locale)
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      })
    }
  }
}
</script>
