<template>
  <div  class="app-wrapper">
    <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <v-tags></v-tags>
  </div>
    <!-- <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
    </div> -->
  </div>
</template>

<script>
// import { Navbar, Sidebar, AppMain } from './components'
// import ResizeMixin from './mixin/ResizeHandler'
 import vHead from './Header'
  import vSidebar from './Sidebar'
  import vTags from './Tags'
export default {
  name: 'Layout',
  components: {
      vHead,
      vSidebar,
      vTags
  },
  //mixins: [ResizeMixin],
  // computed: {
  //   sidebar() {
  //    debugger
  //     return this.$store.state.app.sidebar
       
  //   },
  //   device() {
  //     return this.$store.state.app.device
  //   },
  //   fixedHeader() {
  //     return this.$store.state.settings.fixedHeader
  //   },
  //   classObj() {
  //     return {
  //       hideSidebar: !this.sidebar.opened,
  //       openSidebar: this.sidebar.opened,
  //       withoutAnimation: this.sidebar.withoutAnimation,
  //       mobile: this.device === 'mobile'
  //     }
  //   }
  // },
  methods: {
      /* 获取系统基本设置 */
      getSystemInfo: function () {
        if (this.$store.state.app.systemIsChange) {
          this.$store.commit('setSystemIsChange', false)
          this.$api.setting.findAll().then(res => {
            if (res.code === 1000) {
              this.setPageInfo(res.data.systemName, res.data.systemIconUrl)
            }
          })
        }
      },
      /* 获取用户权限 */
      getPerms: function () {
        if (this.$store.state.user.perms.length === 0) {
          if (sessionStorage.getItem('perms')) {
            this.$store.state.user.perms = JSON.parse(sessionStorage.getItem('perms'))
          }
        }
      }
  },
    created() {
      this.getSystemInfo()
      this.getPerms()
    }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s; 
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
