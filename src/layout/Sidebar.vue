<!--
 * @Auto: 蔡佳志
 * @Date: 2019-04-08
 * @Description: 系统侧边栏
 * @LastEditors: 蔡佳志
 * @LastEditTime: 2019-07-14 11:04:42
 -->

<template>
  <div class="sidebar">
    <el-menu ref="navmenu" class="sidebar-el-menu" :default-active="onRoutes" :collapse="$store.state.app.collapse"
      background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
      <template v-for="item in navTree">
        <template v-if="item.children">
          <el-submenu :index="item.name" :key="item.id">
            <template slot="title">
              <i v-if="item.icon" :class="item.icon"></i>
              <i v-else class="third-icon-shiyongwendang"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-submenu v-if="subItem.children" :index="subItem.name" :key="subItem.id">
                <template slot="title">
                  <i v-if="subItem.icon" :class="subItem.icon"></i>
                  <i v-else class="third-icon-shiyongwendang"></i>
                  {{ subItem.title }}
                </template>
                <el-menu-item v-for="(threeItem) in subItem.children" :index="threeItem.name" :key="threeItem.id">
                  <i v-if="threeItem.icon" :class="threeItem.icon"></i>
                  <i v-else class="third-icon-shiyongwendang"></i>
                  {{threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.name" :key="subItem.id">
                <i v-if="subItem.icon" :class="subItem.icon"></i>
                <i v-else class="third-icon-shiyongwendang"></i>
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.name" :key="item.id">
            <i v-if="item.icon" :class="item.icon"></i>
            <i v-else class="third-icon-shiyongwendang"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  //   import {
  //     getIFrameUrl,
  //     getIFramePath
  //   } from '@/utils/iframe'
  export default {
    name: 'sidebar-frame',
    data() {
      return {
          menuTree:[],
      }
    },
    computed: {
      /* 路由跳转 */
      onRoutes() {
        return this.$route.path.replace("/", "")
      },
      /* 菜单列表 */
      navTree: {
        get() {
          if (!this.$store.state.menu.navTree || this.$store.state.menu.navTree.length === 0) {
            if (sessionStorage.getItem('navTree')) {
             
              this.menuTree=JSON.parse(sessionStorage.getItem('navTree'))
              this.$store.state.menu.navTree = JSON.parse(sessionStorage.getItem('navTree'))
            } else {
              this.$store.state.menu.navTree = []
            }
          }
          return this.$store.state.menu.navTree
        }
      },
      /* 当前选项卡列表 */
        mainTabs: {
          get() {
            if (!this.$store.state.tab.mainTabs || this.$store.state.tab.mainTabs.length === 0) {
              if (sessionStorage.getItem('mainTabs')) {
                this.$store.state.tab.mainTabs = JSON.parse(sessionStorage.getItem('mainTabs'))
              } else {
                this.$store.state.tab.mainTabs = []
              }
            }
            return this.$store.state.tab.mainTabs
          },
          set(val) {
            this.$store.commit('updateMainTabs', val)
          //   sessionStorage.setItem('mainTabs', JSON.stringify(val))
          }
        },
      /* 当前激活中的选项卡 */
      mainTabsActiveName: {
        get() {
          if (!this.$store.state.tab.mainTabsActiveName) {
            if (sessionStorage.getItem('mainTabsActiveName')) {
              debugger
              this.$store.state.tab.mainTabsActiveName = JSON.parse(sessionStorage.getItem('mainTabsActiveName'))
            } else {
              this.$store.state.tab.mainTabsActiveName = ''
            }
          }
          return this.$store.state.tab.mainTabsActiveName
        },
        set(val) {
          this.$store.commit('updateMainTabsActiveName', val)
          sessionStorage.setItem('mainTabsActiveName', JSON.stringify(val))
        }
      }
    },
    watch: {
      $route: 'handleRoute'
    },
    created() {
      
      this.handleRoute(this.$route)
      // console.log(sessionStorage.getItem('navTree'),"树")
    },
    methods: {
      /* 路由操作处理 */
      handleRoute(route) {
        // tab标签页选中, 如果不存在则先添加
        var tab = this.mainTabs.filter(item => item.name === route.name)[0]
        if (!tab) {
          tab = {
            name: route.name,
            title: route.meta.title,
            icon: route.meta.icon
          }
          this.mainTabs = this.mainTabs.concat(tab)
        }
        this.mainTabsActiveName = tab.name
        // 切换标签页时同步更新高亮菜单
        if (this.$refs.navmenu != null) {
          this.$refs.navmenu.activeIndex = '' + route.meta.index
          this.$refs.navmenu.initOpenedMenu()
        }
      }
    },
    mounted(){
      console.log(this.menuTree,"树")
    }
  }

</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }

  .sidebar>ul {
    height: 100%;
  }

</style>
