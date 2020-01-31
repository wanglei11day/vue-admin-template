import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import api from '@/api/api'
import {
  getIFramePath,
  getIFrameUrl
} from '@/utils/iframe'




Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

const router = new Router({
  // mode: 'history',
  routes: [{
      path: '/login',
      component: () => import('@/views/login/index'),
      hidden: true
    },
    {
      path: '/404',
      component: () => import('@/views/404'),
      hidden: true
    },

    {
      path: '/',
      component: Layout,
      redirect: '/homePage',
      children: [{
        path: '/homePage',
        name: 'homePage',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '首页',
          icon: 'dashboard'
        }
      }]
    },
    {
      path: '/example',
      component: Layout,
      redirect: '/example/table',
      name: 'Example',
      meta: {
        title: '测试',
        icon: 'example'
      },
      children: [{
          path: 'table',
          name: 'Table',
          component: () => import('@/views/table/index'),
          meta: {
            title: '表格',
            icon: 'table'
          }
        },
        {
          path: 'tree',
          name: 'Tree',
          component: () => import('@/views/tree/index'),
          meta: {
            title: '树',
            icon: 'tree'
          }
        }
      ]
    },
    {
      path: '/form',
      component: Layout,
      children: [{
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: {
          title: '表单',
          icon: 'form'
        }
      }]
    },
    {
      path: '/nested',
      component: Layout,
      redirect: '/nested/menu1',

      name: 'Nested',
      meta: {
        title: '菜单',
        icon: 'nested'
      },
      children: [{
          path: 'menu1',
          component: () => import('@/views/nested/menu1/index'), // Parent router-view
          name: 'Menu1',
          meta: {
            title: 'Menu1'
          },
          children: [{
              path: 'menu1-1',
              component: () => import('@/views/nested/menu1/menu1-1'),
              name: 'Menu1-1',
              meta: {
                title: 'Menu1-1'
              }
            },
            {
              path: 'menu1-2',
              component: () => import('@/views/nested/menu1/menu1-2'),
              name: 'Menu1-2',
              meta: {
                title: 'Menu1-2'
              },
              children: [{
                  path: 'menu1-2-1',
                  component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                  name: 'Menu1-2-1',
                  meta: {
                    title: 'Menu1-2-1'
                  }
                },
                {
                  path: 'menu1-2-2',
                  component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                  name: 'Menu1-2-2',
                  meta: {
                    title: 'Menu1-2-2'
                  }
                }
              ]
            },
            {
              path: 'menu1-3',
              component: () => import('@/views/nested/menu1/menu1-3'),
              name: 'Menu1-3',
              meta: {
                title: 'Menu1-3'
              }
            }
          ]
        },
        {
          path: 'menu2',
          component: () => import('@/views/nested/menu2/index'),
          meta: {
            title: 'menu2'
          }
        }
      ]
    },
    {
      path: 'external-link',
      component: Layout,
      children: [{
        path: 'https://baidu.com',
        meta: {
          title: '外联',
          icon: 'link'
        }
      }]
    },

    // 404 page must be placed at the end !!!
    {
      path: '*',
      redirect: '/404',
      hidden: true
    }



  ]
})



/**
  登录界面登录成功之后，会把用户信息保存在会话
  存在时间为会话生命周期，页面关闭即失效。
 */
router.beforeEach((to, from, next) => {
  let userName = sessionStorage.getItem('user')
  if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if (userName) {
      next({
        path: '/'
      })

    } else {
      next()
    }

  } else {
    if (!userName) {
      // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
      next({
        path: '/login'
      })
    } else {
      // 加载动态菜单和路由
      addDynamicMenuAndRoutes(userName, to, from)
    
      next()
    }
  }
})
/**
 * @method
 * @param {string} userName 用户名称
 * @param {object} to 目标地址
 * @param {object} from 来源地址
 * @return {*} 存储结果
 * @desc 加载动态菜单和路由
 */

async function addDynamicMenuAndRoutes(userName, to, from) {
  // 处理IFrame嵌套页面
  handleIFrameUrl(to.path)
  if (store.state.app.menuRouteLoaded) {
    console.log('动态菜单和路由已经存在.')
    return
  }
  console.log('动态路由加载...')
  // 保存加载状态
  store.commit('menuRouteLoaded', true)
  await api.menu.findTree({
      'type': 1,
      'pid': 0
    })
    .then(res => { 
      if (res.code === 1000) {
        // 添加动态路由
        let dynamicRoutes = addDynamicRoutes(res.data)
        router.options.routes[2].children = router.options.routes[2].children.concat(dynamicRoutes)
        console.log(router.options.routes[2].children,"00000000")
        // router.options.routes[1].children
        router.addRoutes(router.options.routes)
        // 保存菜单树
        store.commit('setNavTree', res.data)
        sessionStorage.setItem('navTree', JSON.stringify(res.data))
        
        var tree=JSON.parse(sessionStorage.getItem('navTree'))
        console.log(tree,"树叔")
        
      }
    })
}

/**
 * @method
 * @param {string} path 路径
 * @return {*} 存储结果
 * @desc 处理IFrame嵌套页面
 */
function handleIFrameUrl(path) {
  // 嵌套页面，保存iframeUrl到store，供IFrame组件读取展示
  let url = path
  let length = store.state.iframe.iframeUrls.length
  for (let i = 0; i < length; i++) {
    let iframe = store.state.iframe.iframeUrls[i]
    if (path != null && path.endsWith(iframe.path)) {
      url = iframe.url
      store.commit('setIFrameUrl', url)
      break
    }
  }
}


/**
 * @method
 * @param {array} menuList 菜单列表
 * @param {array} routes 递归创建的动态(菜单)路由
 * @return {array} 路由数组
 * @desc 添加动态(菜单)路由
 */
function addDynamicRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].type === 2) {
      continue
    }
    if (menuList[i].children && menuList[i].children.filter(p => p.type === 1).length >= 1) {
      temp = temp.concat(menuList[i].children.filter(p => p.type === 1))
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      // 创建路由配置
      var route = {
        path: '/' + menuList[i].name,
        component: null,
        name: menuList[i].name,
        meta: {
          icon: menuList[i].icon,
          index: menuList[i].id,
          title: menuList[i].title,
          permission: menuList[i].permission
        }
      }
      let iframe = getIFramePath(menuList[i].url)
      if (iframe) {
        // 如果是嵌套页面, 通过iframe展示
        route['component'] = resolve => require([`@/components/core/IFrame.vue`], resolve)
        // 存储嵌套页面路由路径和访问URL
        let url = getIFrameUrl(menuList[i].url)
        let iFrameUrl = {
          'path': menuList[i].name,
          'url': url
        }
        store.commit('addIFrameUrl', iFrameUrl)
      } else {
        try {
          // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
          let array = menuList[i].url.split('/')
          let url = ''
          for (let i = 0; i < array.length; i++) {
            url += array[i] + '/'
          }
          url = url.substring(0, url.length - 1)
          route['component'] = resolve => require([`@/pages/${url}/index.vue`], resolve)
        } catch (e) {
          throw e
        }
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
     
    addDynamicRoutes(temp, routes)
  } else {
    console.log(routes)
    console.log('动态路由加载完成.')
  }
  return routes
}







export default router
