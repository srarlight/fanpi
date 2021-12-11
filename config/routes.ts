export default [
  {
    path: '/home',
    layout: false,
    routes: [
      {path: '/home', routes: [
        {name: '登录', path: '/home/login', component: './user/Login'},
        {name: '注册', path: '/home/register', component: './user/Register'},
          {name: '微信扫码登录', path: '/home/wechatLogin', component: './user/Login/wxLogin'},
        ]
      },

      {component: './404'},
    ],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canSuper',
    component: './Admin',
    routes: [
      {path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome'},
      {component: './404'},
    ],
  },
  {
    path: '/user', name: '用户中心', icon: 'smile', routes: [
      {path: '/user/userInfo', name: '基本信息', icon: 'smile', component: './Welcome'},
      {path: '/user/orderList', name: '订单列表', icon: 'smile', component: './OrderList'},
      {component: './404'},
    ]
  },

  {
    path: '/promotion',
    name: '我要推广',
    icon: 'crown',
    routes: [
      {
        path: '/promotion/event-preview',
        name: '活动预览',
        icon: 'smile',
        component: './Promotion/EventPreview',
      },
      {
        path: '/promotion/event-link',
        icon: 'smile',
        name: '推广信息',
        hideInMenu: true,
        component: './eventInfo',
      },
      {component: './404'},
    ],
  },
  // { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  {path: '/', redirect: '/user/userInfo'},
  {component: './404'},
];
