import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/pages',
    component: Layout,
    redirect: '/pages/crudTable',
    meta: { title: 'message.menu.page.name', icon: 'sfont system-page' },
    alwayShow: true,
    children: [
      {
        path: 'userLogTable',
        component: createNameComponent(() => import('@/views/main/pages/userLogTable/index.vue')),
        meta: { title: 'message.menu.page.userLogTable', cache: false, roles: ['admin', 'editor'] }
      },
      {
        path: 'userInfoTable',
        component: createNameComponent(() => import('@/views/main/pages/userInfoTable/index.vue')),
        meta: { title: 'message.menu.page.userInfoTable', cache: false, roles: ['admin', 'editor'] }
      },
      {
        path: 'userOnlineTable',
        component: createNameComponent(() => import('@/views/main/pages/userOnlineTable/index.vue')),
        meta: { title: 'message.menu.page.userOnlineTable', cache: false, roles: ['admin', 'editor'] }
      },
      {
        path: 'userLevelTable',
        component: createNameComponent(() => import('@/views/main/pages/userLevelTable/index.vue')),
        meta: { title: 'message.menu.page.userLevelTable', cache: false, roles: ['admin', 'editor'] }
      },
      {
        path: 'gptModelConfig',
        component: createNameComponent(() => import('@/views/main/pages/gptModelConfig/index.vue')),
        meta: { title: 'message.menu.page.gptModelConfig', cache: false, roles: ['admin', 'editor'] }
      },
      {
        path: 'gptApiTokenTable',
        component: createNameComponent(() => import('@/views/main/pages/gptApiTokenTable/index.vue')),
        meta: { title: 'message.menu.page.gptApiTokenTable', cache: false, roles: ['admin', 'editor'] }
      },
      {
        path: 'promptRecordTable',
        component: createNameComponent(() => import('@/views/main/pages/promptRecordTable/index.vue')),
        meta: { title: 'message.menu.page.promptRecordTable', cache: false, roles: ['admin', 'editor'] }
      },
      // {
      //   path: 'categoryTable',
      //   component: createNameComponent(() => import('@/views/main/pages/categoryTable/index.vue')),
      //   meta: { title: 'message.menu.page.categoryTable', cache: true, roles: ['admin'] }
      // },
      // {
      //   path: 'treeTable',
      //   component: createNameComponent(() => import('@/views/main/pages/treeTable/index.vue')),
      //   meta: { title: 'message.menu.page.treeTable', cache: true }
      // },
      // {
      //   path: 'card',
      //   component: createNameComponent(() => import('@/views/main/pages/card/index.vue')),
      //   meta: { title: 'message.menu.page.card', cache: true }
      // },
      // {
      //   path: 'cardDetail',
      //   hideMenu: true,
      //   component: createNameComponent(() => import('@/views/main/pages/card/detail/index.vue')),
      //   meta: { title: 'message.menu.page.card', cache: false },
      // },
      // {
      //   path: 'work',
      //   component: createNameComponent(() => import('@/views/main/pages/work/index.vue')),
      //   meta: { title: 'message.menu.page.work' }
      // },
      // {
      //   path: 'blog',
      //   component: createNameComponent(() => import('@/views/main/pages/baidu/index.vue')),
      //   meta: { title: 'message.menu.page.baidu' }
      // },
    ]
  }
]

export default route