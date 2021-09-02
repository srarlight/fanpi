export default [
  {
    path: '/home',
    layout: false,
    routes: [
      {
        path: '/home',
        routes: [
          {
            name: 'login',
            path: '/home/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canSuper',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/promotion',
    name: 'promotion',
    icon: 'crown',
    access: 'canSuper',
    component: './Promotion/EventPreview',
    routes: [
      {
        path: '/promotion/event-preview',
        name: 'event-preview',
        icon: 'smile',
        component: './Promotion/EventPreview',
      },

      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
