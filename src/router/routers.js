import Main from '@/components/main'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/pages/home-page')
        // component: () => import('_c/ueditor/index.vue')
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      icon: 'ios-contacts',
      title: '权限管理',
      access: ['super_admin'],
      id: 12
    },
    component: Main,
    children: [
      {
        path: 'admin',
        name: 'admin',
        meta: {
          icon: 'ios-contact',
          title: '系统账号管理'
        },
        component: () => import('@/pages/rights-page/admin-page.vue')
      },
      {
        path: 'role',
        name: 'role',
        meta: {
          icon: 'md-contacts',
          title: '系统角色管理'
        },
        component: () => import('@/pages/rights-page/role-page.vue')
      }
    ]
  },
  {
    path: '/stores',
    name: 'stores',
    meta: {
      icon: 'ios-pin-outline',
      title: '商家管理',
      access: ['super_admin'],
      id: 13
    },
    component: Main,
    children: [
      // {
      //   path: 'storeRecomond',
      //   name: 'storeRecomond',
      //   meta: {
      //     icon: 'ios-pin-outline',
      //     title: '商家推荐'
      //   },
      //   component: () => import('@/pages/store-page/store-recomond-page.vue')
      // },
      {
        path: 'storeApply',
        name: 'storeApply',
        meta: {
          icon: 'ios-pin-outline',
          title: '商家申请'
        },
        component: () => import('@/pages/store-page/store-apply-page.vue')
      },
      {
        path: 'store',
        name: 'store',
        meta: {
          icon: 'ios-pin-outline',
          title: '商家管理'
        },
        component: () => import('@/pages/store-page/store-page.vue')
      }
    ]
  },
  {
    path: '/users',
    name: 'users',
    meta: {
      icon: 'ios-people',
      title: '用户管理',
      access: ['super_admin'],
      id: 14
    },
    component: Main,
    children: [
      {
        path: 'users',
        name: 'users',
        meta: {
          icon: 'md-happy',
          title: '用户管理'
        },
        component: () => import('@/pages/users-page/users-page.vue')
      },
      // {
      //   path: 'staff',
      //   name: 'staff',
      //   meta: {
      //     icon: 'ios-man',
      //     title: '工作人员管理'
      //   },
      //   component: () => import('@/pages/users-page/staff-page.vue')
      // },
      // {
      //   path: 'check',
      //   name: 'check',
      //   meta: {
      //     icon: 'ios-barcode-outline',
      //     title: '检票管理',
      //     hideInMenu: true
      //   },
      //   component: () => import('@/pages/users-page/pages/staff/checkmanagement/checkmanagement.vue')
      // },
      {
        path: 'integral',
        name: 'integral',
        meta: {
          icon: 'ios-barcode-outline',
          title: '查看积分信息',
          hideInMenu: true
        },
        component: () => import('@/pages/users-page/pages/integral/integral/integral.vue')
      },
      {
        path: 'showlower',
        name: 'showlower',
        meta: {
          icon: 'ios-barcode-outline',
          title: '查看下级用户',
          hideInMenu: true
        },
        component: () => import('@/pages/users-page/pages/showlower/showlower/showlower.vue')
      },
      {
        path: 'daysign',
        name: 'daysign',
        meta: {
          icon: 'ios-barcode-outline',
          title: '日签设置',
          hideInMenu: true
        },
        component: () => import('@/pages/users-page/pages/daysign/daysign/daysign.vue')
      }
    ]
  },
  // {
  //   path: '/discountcoupon',
  //   name: 'discountcoupon',
  //   meta: {
  //     icon: 'ios-people',
  //     title: '优惠券管理',
  //     access: ['super_admin'],
  //     id: 23
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'discountcoupon',
  //       name: 'discountcoupon',
  //       meta: {
  //         icon: 'ios-home-outline',
  //         title: '优惠券管理'
  //       },
  //       component: () => import('@/pages/discountcoupon-page/discountcoupon-page.vue')
  //     }
  //     // {
  //     //   path: 'discountcoupon',
  //     //   name: 'discountcoupon',
  //     //   meta: {
  //     //     icon: 'ios-home-outline',
  //     //     title: '优惠券管理'
  //     //   },
  //     //   component: () => import('_c/ueditor/ed.vue')
  //     // }
  //   ]
  // },
  {
    path: '/activities',
    name: 'activities',
    meta: {
      icon: 'ios-home-outline',
      title: '活动管理',
      access: ['super_admin'],
      id: 15
    },
    component: Main,
    children: [
      {
        path: 'activity',
        name: 'activity',
        meta: {
          icon: 'ios-home-outline',
          title: '活动列表'
        },
        component: () => import('@/pages/activity-page/activity-page.vue')
      },
      {
        path: 'activityCreate',
        name: 'activityCreate',
        meta: {
          hideInMenu: true,
          icon: 'ios-home-outline',
          title: '添加'
        },
        component: () => import('@/pages/activity-page/activity-create-page.vue')
      },
      {
        path: 'activityUser',
        name: 'activityUser',
        meta: {
          hideInMenu: true,
          icon: 'ios-home-outline',
          title: '查看报名'
        },
        component: () => import('@/pages/activity-page/activity-user-page.vue')
      },
      {
        path: 'category',
        name: 'category',
        meta: {
          icon: 'ios-home-outline',
          title: '分类管理'
        },
        component: () => import('@/pages/activity-page/category-page.vue')
      },
      {
        path: 'activitySet',
        name: 'activitySet',
        meta: {
          icon: 'ios-home-outline',
          title: '相关设置'
        },
        component: () => import('@/pages/activity-page/activity-set-page.vue')
      },
    ]
  },
  {
    path: '/activityorder',
    name: 'activityorder',
    meta: {
      icon: 'ios-card-outline',
      title: '活动订单管理',
      access: ['super_admin'],
      id: 16
    },
    component: Main,
    children: [
      {
        path: 'waitingusing',
        name: 'waitingusing',
        meta: {
          icon: 'ios-boat-outline',
          title: '待使用'
        },
        component: () => import('@/pages/activityorder-page/waiting-using-page.vue')
      },
      {
        path: 'waitingevaluate',
        name: 'waitingevaluate',
        meta: {
          icon: 'md-bus',
          title: '待评价'
        },
        component: () => import('@/pages/activityorder-page/waiting-evaluate-page.vue')
      },
      {
        path: 'evaluate',
        name: 'evaluate',
        meta: {
          icon: 'ios-exit-outline',
          title: '已评价'
        },
        component: () => import('@/pages/activityorder-page/evaluate-page.vue')
      },
      {
        path: 'waitingunsubscribe',
        name: 'waitingunsubscribe',
        meta: {
          icon: 'ios-car',
          title: '退订待审核'
        },
        component: () => import('@/pages/activityorder-page/waiting-unsubscribe-page.vue')
      },
      {
        path: 'unsubscribe',
        name: 'unsubscribe',
        meta: {
          icon: 'ios-barcode-outline',
          title: '已退订'
        },
        component: () => import('@/pages/activityorder-page/unsubscribe-page.vue')
      },
      {
        path: 'all',
        name: 'all',
        meta: {
          icon: 'ios-barcode-outline',
          title: '全部'
        },
        component: () => import('@/pages/activityorder-page/all-page.vue')
      },
      {
        path: 'setproject',
        name: 'setproject',
        meta: {
          icon: 'ios-barcode-outline',
          title: '全部',
          hideInMenu: true
        },
        component: () => import('@/pages/activityorder-page/pages/project/project.vue')
      },
      {
        path: 'projectticket',
        name: 'projectticket',
        meta: {
          icon: 'ios-barcode-outline',
          title: '查看预定情况',
          hideInMenu: true
        },
        component: () => import('@/pages/activityorder-page/pages/projectticket/projectticket.vue')
      }
    ]
  },
  // {
  //   path: '/discountcouponorder',
  //   name: 'discountcouponorder',
  //   meta: {
  //     icon: 'md-reorder',
  //     title: '优惠券订单管理',
  //     access: ['super_admin'],
  //     id: 24
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'waitingtouse',
  //       name: 'waitingtouse',
  //       meta: {
  //         icon: 'md-reorder',
  //         title: '待使用'
  //       },
  //       component: () => import('@/pages/discountcoupon-order-page/waiting-page.vue')
  //     },
  //     {
  //       path: 'waitingunchecked',
  //       name: 'waitingunchecked',
  //       meta: {
  //         icon: 'md-reorder',
  //         title: '退订待审核'
  //       },
  //       component: () => import('@/pages/discountcoupon-order-page/waitingunchecked-page.vue')
  //     },
  //     {
  //       path: 'unchecked',
  //       name: 'unchecked',
  //       meta: {
  //         icon: 'md-reorder',
  //         title: '已退订'
  //       },
  //       component: () => import('@/pages/discountcoupon-order-page/unchecked-page.vue')
  //     },
  //     {
  //       path: 'allorder',
  //       name: 'allorder',
  //       meta: {
  //         icon: 'md-reorder',
  //         title: '全部'
  //       },
  //       component: () => import('@/pages/discountcoupon-order-page/allorder-page.vue')
  //     }
  //     // {
  //     //   path: 'evaluated',
  //     //   name: 'evaluated',
  //     //   meta: {
  //     //     icon: 'md-reorder',
  //     //     title: '已评价'
  //     //   },
  //     //   component: () => import('@/pages/order-page/evaluated-page.vue')
  //     // },
  //     // {
  //     //   path: 'cancel',
  //     //   name: 'cancel',
  //     //   meta: {
  //     //     icon: 'md-reorder',
  //     //     title: '已取消'
  //     //   },
  //     //   component: () => import('@/pages/order-page/cancel-page.vue')
  //     // },
  //     // {
  //     //   path: 'all',
  //     //   name: 'all',
  //     //   meta: {
  //     //     icon: 'md-reorder',
  //     //     title: '全部'
  //     //   },
  //     //   component: () => import('@/pages/order-page/all-order-page.vue')
  //     // },
  //     // {
  //     //   path: 'detail',
  //     //   name: 'detail',
  //     //   meta: {
  //     //     hideInMenu: true,
  //     //     icon: 'md-reorder',
  //     //     title: '订单详情'
  //     //   },
  //     //   component: () => import('@/pages/order-page/order-detail-page.vue')
  //     // },
  //     // {
  //     //   path: 'audit',
  //     //   name: 'audit',
  //     //   meta: {
  //     //     hideInMenu: true,
  //     //     icon: 'md-reorder',
  //     //     title: '统一审核评价'
  //     //   },
  //     //   component: () => import('@/pages/order-page/order-audit-page.vue')
  //     // }
  //   ]
  // },
  {
    path: '/tours',
    name: 'tours',
    meta: {
      icon: 'ios-cafe-outline',
      title: '旅游管理',
      access: ['super_admin'],
      id: 17
    },
    component: Main,
    children: [
      {
        path: 'tour',
        name: 'tour',
        meta: {
          icon: 'ios-cafe-outline',
          title: '旅游管理'
        },
        component: () => import('@/pages/tour-page/tour-page.vue')
      }
    ]
  },
  {
    path: '/school',
    name: 'school',
    meta: {
      icon: 'ios-card-outline',
      title: '学院管理',
      access: ['super_admin'],
      id: 18
    },
    component: Main,
    children: [
      {
        path: 'schoolArticle',
        name: 'schoolArticle',
        meta: {
          icon: 'ios-car',
          title: '文章列表'
        },
        component: () => import('@/pages/school-page/school-article-page.vue')
      },
      {
        path: 'schoolMenu',
        name: 'schoolMenu',
        meta: {
          icon: 'ios-car',
          title: '分类管理'
        },
        component: () => import('@/pages/school-page/school-menu-page.vue')
      },
      {
        path: 'schoolmore',
        name: 'schoolmore',
        meta: {
          hideInMenu: true,
          icon: 'ios-car',
          title: '二级分类'
        },
        component: () => import('@/pages/school-page/more.vue')
      },
    ]
  },
  {
    path: '/shares',
    name: 'shares',
    meta: {
      icon: 'ios-cafe-outline',
      title: '活动分享管理',
      access: ['super_admin'],
      id: 19
    },
    component: Main,
    children: [
      {
        path: 'share',
        name: 'share',
        meta: {
          icon: 'ios-cafe-outline',
          title: '活动分享管理'
        },
        component: () => import('@/pages/share-page/share-page.vue')
      }
    ]
  },
  {
    path: '/guides',
    name: 'guides',
    meta: {
      icon: 'ios-ice-cream-outline',
      title: '使用指南管理',
      access: ['super_admin'],
      id: 20
    },
    component: Main,
    children: [
      {
        path: 'guide',
        name: 'guide',
        meta: {
          icon: 'ios-ice-cream-outline',
          title: '使用指南管理'
        },
        component: () => import('@/pages/guide-page/guide-page.vue')
      }
    ]
  },
  {
    path: '/banners',
    name: 'banners',
    meta: {
      icon: 'ios-barcode-outline',
      title: 'Banner管理',
      access: ['super_admin'],
      id: 21
    },
    component: Main,
    children: [
      {
        path: 'banner',
        name: 'banner',
        meta: {
          icon: 'ios-barcode-outline',
          title: '首页'
        },
        component: () => import('@/pages/banner-page/banner-page.vue')
      },
      {
        path: 'storeBanner',
        name: 'storeBanner',
        meta: {
          icon: 'ios-barcode-outline',
          title: '商家页'
        },
        component: () => import('@/pages/banner-page/store-banner-page.vue')
      }
    ]
  },
  // {
  //   path: '/verify',
  //   name: 'verify',
  //   meta: {
  //     icon: 'ios-barcode-outline',
  //     title: '资金管理',
  //     access: ['super_admin'],
  //     id: 11
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'account',
  //       name: 'account',
  //       meta: {
  //         icon: 'ios-barcode-outline',
  //         title: '民宿对账管理'
  //       },
  //       component: () => import('@/pages/verify-account-page/verify-account-page.vue')
  //     },
  //     {
  //       path: 'varifyOrder',
  //       name: 'varifyOrder',
  //       meta: {
  //         hideInMenu: true,
  //         icon: 'ios-barcode-outline',
  //         title: '查看相关订单'
  //       },
  //       component: () => import('@/pages/verify-account-page/verify-order-page.vue')
  //     }
  //   ]
  // },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
