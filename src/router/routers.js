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
      id: 1
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
    path: '/users',
    name: 'users',
    meta: {
      icon: 'ios-people',
      title: '用户管理',
      access: ['super_admin'],
      id: 2
    },
    component: Main,
    children: [
      {
        path: 'tourist',
        name: 'tourist',
        meta: {
          icon: 'md-happy',
          title: '游客管理'
        },
        component: () => import('@/pages/users-page/tourists-page.vue')
      },
      {
        path: 'staff',
        name: 'staff',
        meta: {
          icon: 'ios-man',
          title: '工作人员管理'
        },
        component: () => import('@/pages/users-page/staff-page.vue')
      },
      {
        path: 'check',
        name: 'check',
        meta: {
          icon: 'ios-barcode-outline',
          title: '检票管理',
          hideInMenu: true
        },
        component: () => import('@/pages/users-page/pages/staff/checkmanagement/checkmanagement.vue')
      },
      {
        path: 'travel',
        name: 'travel',
        meta: {
          icon: 'ios-barcode-outline',
          title: '出行人信息',
          hideInMenu: true
        },
        component: () => import('@/pages/users-page/pages/tourist/travelInfo/travelInfo.vue')
      },
      {
        path: 'travelmanage',
        name: 'travelmanage',
        meta: {
          icon: 'ios-barcode-outline',
          title: '出行管理',
          hideInMenu: true
        },
        component: () => import('@/pages/users-page/pages/staff/travelmanagement/travelmanagement.vue')
      }
    ]
  },
  {
    path: '/residences',
    name: 'residences',
    meta: {
      icon: 'ios-home-outline',
      title: '民宿管理',
      access: ['super_admin'],
      id: 3
    },
    component: Main,
    children: [
      {
        path: 'residence',
        name: 'residence',
        meta: {
          icon: 'ios-home-outline',
          title: '民宿管理'
        },
        component: () => import('@/pages/residence-page/residence-page.vue')
      },
      {
        path: 'group',
        name: 'group',
        meta: {
          hideInMenu: true,
          icon: 'ios-home-outline',
          title: '分组规则'
        },
        component: () => import('@/pages/residence-page/group-page.vue')
      },
      {
        path: 'tickets',
        name: 'tickets',
        meta: {
          hideInMenu: true,
          icon: 'ios-home-outline',
          title: '分票规则'
        },
        component: () => import('@/pages/residence-page/tickets-page.vue')
      },
      {
        path: 'ticketsCreate',
        name: 'ticketsCreate',
        meta: {
          hideInMenu: true,
          icon: 'ios-home-outline',
          title: '添加分票规则'
        },
        component: () => import('@/pages/residence-page/tickets-create-page.vue')
      },
    ]
  },
  {
    path: '/ticketing',
    name: 'ticketing',
    meta: {
      icon: 'ios-card-outline',
      title: '票务管理',
      access: ['super_admin'],
      id: 4
    },
    component: Main,
    children: [
      {
        path: 'steamerTicket',
        name: 'steamerTicket',
        meta: {
          icon: 'ios-boat-outline',
          title: '船票'
        },
        component: () => import('@/pages/ticketing-page/steamer-ticket-page.vue')
      },
      {
        path: 'busTicket',
        name: 'busTicket',
        meta: {
          icon: 'md-bus',
          title: '大巴车票'
        },
        component: () => import('@/pages/ticketing-page/bus-ticket-page.vue')
      },
      {
        path: 'entranceTicket',
        name: 'entranceTicket',
        meta: {
          icon: 'ios-exit-outline',
          title: '门票'
        },
        component: () => import('@/pages/ticketing-page/entrance-ticket-page.vue')
      },
      {
        path: 'trafficTicket',
        name: 'trafficTicket',
        meta: {
          icon: 'ios-car',
          title: '交通车票'
        },
        component: () => import('@/pages/ticketing-page/traffic-ticket-page.vue')
      },
      {
        path: 'ItemTicket',
        name: 'ItemTicket',
        meta: {
          icon: 'ios-barcode-outline',
          title: '项目票'
        },
        component: () => import('@/pages/ticketing-page/Item-ticket-page.vue')
      },
      {
        path: 'setproject',
        name: 'setproject',
        meta: {
          icon: 'ios-barcode-outline',
          title: '项目设置',
          hideInMenu: true
        },
        component: () => import('@/pages/ticketing-page/pages/project/project.vue')
      },
      {
        path: 'projectticket',
        name: 'projectticket',
        meta: {
          icon: 'ios-barcode-outline',
          title: '查看预定情况',
          hideInMenu: true
        },
        component: () => import('@/pages/ticketing-page/pages/projectticket/projectticket.vue')
      }
    ]
  },
  {
    path: '/custom',
    name: 'custom',
    meta: {
      icon: 'ios-card-outline',
      title: '定制游管理',
      access: ['super_admin'],
      id: 5
    },
    component: Main,
    children: [
      {
        path: 'customTour',
        name: 'customTour',
        meta: {
          icon: 'ios-car',
          title: '定制游管理'
        },
        component: () => import('@/pages/custom-tour-page/custom-tour-page.vue')
      },
      {
        path: 'price',
        name: 'price',
        meta: {
          hideInMenu: true,
          icon: 'ios-car',
          title: '价格设置'
        },
        component: () => import('@/pages/custom-tour-page/set-price-page.vue')
      },
    ]
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      icon: 'md-reorder',
      title: '订单管理',
      access: ['super_admin'],
      id: 6
    },
    component: Main,
    children: [
      {
        path: 'standby',
        name: 'standby',
        meta: {
          icon: 'md-reorder',
          title: '待出票'
        },
        component: () => import('@/pages/order-page/standby-page.vue')
      },
      {
        path: 'tobeused',
        name: 'tobeused',
        meta: {
          icon: 'md-reorder',
          title: '待使用'
        },
        component: () => import('@/pages/order-page/tobeused-page.vue')
      },
      {
        path: 'inuse',
        name: 'inuse',
        meta: {
          icon: 'md-reorder',
          title: '使用中'
        },
        component: () => import('@/pages/order-page/inuse-page.vue')
      },
      {
        path: 'tobeevaluated',
        name: 'tobeevaluated',
        meta: {
          icon: 'md-reorder',
          title: '待评价'
        },
        component: () => import('@/pages/order-page/tobeevaluated-page.vue')
      },
      {
        path: 'evaluated',
        name: 'evaluated',
        meta: {
          icon: 'md-reorder',
          title: '已评价'
        },
        component: () => import('@/pages/order-page/evaluated-page.vue')
      },
      {
        path: 'cancel',
        name: 'cancel',
        meta: {
          icon: 'md-reorder',
          title: '已取消'
        },
        component: () => import('@/pages/order-page/cancel-page.vue')
      },
      {
        path: 'all',
        name: 'all',
        meta: {
          icon: 'md-reorder',
          title: '全部'
        },
        component: () => import('@/pages/order-page/all-order-page.vue')
      },
      {
        path: 'detail',
        name: 'detail',
        meta: {
          hideInMenu: true,
          icon: 'md-reorder',
          title: '订单详情'
        },
        component: () => import('@/pages/order-page/order-detail-page.vue')
      },
      {
        path: 'audit',
        name: 'audit',
        meta: {
          hideInMenu: true,
          icon: 'md-reorder',
          title: '统一审核评价'
        },
        component: () => import('@/pages/order-page/order-audit-page.vue')
      }
    ]
  },
  {
    path: '/amusement',
    name: 'amusement',
    meta: {
      icon: 'ios-cafe-outline',
      title: '娱乐管理',
      access: ['super_admin'],
      id: 7
    },
    component: Main,
    children: [
      {
        path: 'entertainment',
        name: 'entertainment',
        meta: {
          icon: 'ios-cafe-outline',
          title: '娱乐管理'
        },
        component: () => import('@/pages/amusement-page/amusement-page.vue')
      }
    ]
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    meta: {
      icon: 'ios-ice-cream-outline',
      title: '餐饮管理',
      access: ['super_admin'],
      id: 8
    },
    component: Main,
    children: [
      {
        path: 'restaurant',
        name: 'restaurant',
        meta: {
          icon: 'ios-ice-cream-outline',
          title: '餐饮管理'
        },
        component: () => import('@/pages/restaurant-page/restaurant-page.vue')
      }
    ]
  },
  {
    path: '/guide',
    name: 'guide',
    meta: {
      icon: 'ios-pin-outline',
      title: '岛内指南管理',
      access: ['super_admin'],
      id: 9
    },
    component: Main,
    children: [
      {
        path: 'IntraIslandGuide',
        name: 'IntraIslandGuide',
        meta: {
          icon: 'ios-pin-outline',
          title: '岛内指南管理'
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
      id: 10
    },
    component: Main,
    children: [
      {
        path: 'banner',
        name: 'banner',
        meta: {
          icon: 'ios-barcode-outline',
          title: 'Banner管理'
        },
        component: () => import('@/pages/banner-page/banner-page.vue')
      }
    ]
  },
  {
    path: '/statistics',
    name: 'statistics',
    meta: {
      icon: 'ios-barcode-outline',
      title: '统计管理',
      access: ['super_admin'],
      id: 11
    },
    component: Main,
    children: [
      {
        path: 'vital',
        name: 'vital',
        meta: {
          icon: 'ios-barcode-outline',
          title: '统计管理'
        },
        component: () => import('@/pages/statistics-page/statistics-page.vue')
      }
    ]
  },
  {
    path: '/verify',
    name: 'verify',
    meta: {
      icon: 'ios-barcode-outline',
      title: '民宿对账管理',
      access: ['super_admin'],
      id: 11
    },
    component: Main,
    children: [
      {
        path: 'account',
        name: 'account',
        meta: {
          icon: 'ios-barcode-outline',
          title: '民宿对账管理'
        },
        component: () => import('@/pages/verify-account-page/verify-account-page.vue')
      },
      {
        path: 'varifyOrder',
        name: 'varifyOrder',
        meta: {
          hideInMenu: true,
          icon: 'ios-barcode-outline',
          title: '查看相关订单'
        },
        component: () => import('@/pages/verify-account-page/verify-order-page.vue')
      }
    ]
  },
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
