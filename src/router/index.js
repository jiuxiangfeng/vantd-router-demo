import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/layout.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/Home',
    meta: {
      title: '首页',
      hidden: true
    },
    children: [
      {
        path: 'Home',
        name: 'Home',
        component: Home,
        meta: {
          title: '工作桌面'
        }
      }
    ]
  },
  {
    path: '/ohter',
    name: 'Layout',
    component: Layout,
    meta: {
      title: '其他',
      icon: 'table' // 图标，antd中的图标名称
    },
    children: [
      {
        path: 'ohter',
        name: 'Ohter',
        component: () => import('../views/other/Other.vue'),
        meta: {
          title: '其他1'
        }
      },
      {
        path: 'about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/other/About.vue'),
        meta: {
          title: '关于'
        }
      }
    ]
  }
  // {
  //   path: '/Main',
  //   name: 'Layout',
  //   component: Layout,
  //   meta: {
  //     title: '常用',
  //     icon: 'carry-out'
  //   },
  //   children: [
  //     {
  //       path: 'Form',
  //       name: 'Form',
  //       component: () => import('../views/main/Form.vue'),
  //       meta: {
  //         title: '表单页'
  //       }
  //     },
  //     {
  //       path: 'SearchTable',
  //       name: 'SearchTable',
  //       component: () => import('../views/main/SearchTable.vue'),
  //       meta: {
  //         title: '查询表格'
  //       }
  //     }
  //   ]
  // }
]

const router = new VueRouter({
  routes
})

export default router
