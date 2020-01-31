<!--
 * @Auto: 蔡佳志
 * @Date: 2019-04-08 09:00:02
 * @Description: 标签选项卡
 * @LastEditors: 蔡佳志
 * @LastEditTime: 2019-07-16 09:16:36
 -->

<template>
  <div class="content-box" :class="{'content-collapse':$store.state.app.collapse}">
    <el-tabs :class="$store.state.app.collapse?'position-collapse-left':'position-left'" v-model="mainTabsActiveName"
      :closable="true" type="border-card" @tab-click="selectedTabHandle" @tab-remove="removeTabHandle" scrollable>
      <div class="tabs-tools">
        <el-dropdown size="mini" split-button @click="tabsRefreshCurrentHandle" :show-timeout="0">
          <i class="el-icon-refresh"></i>
          刷新
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="tabsCloseCurrentHandle">关闭当前标签</el-dropdown-item>
            <el-dropdown-item @click.native="tabsCloseOtherHandle">关闭其它标签</el-dropdown-item>
            <el-dropdown-item @click.native="tabsCloseAllHandle">关闭全部标签</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-tab-pane class="tabs-item" v-for="item in mainTabs" :key="item.name" :label="item.title" :name="item.name">
        <span slot="label"><i :class="item.icon"></i> {{item.title}} </span>
        <keep-alive>
          <router-view v-if="item.name === mainTabsActiveName"></router-view>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'tags-frame',
    data() {
      return {}
    },
    computed: {
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
          sessionStorage.setItem('mainTabs', JSON.stringify(val))
        }
      },
      /* 当前激活中的选项卡 */
      mainTabsActiveName: {
        get() {
          if (!this.$store.state.tab.mainTabsActiveName) {
            if (sessionStorage.getItem('mainTabsActiveName')) {
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
    methods: {
      /* tabs, 选中tab */
      selectedTabHandle(tab) {
        tab = this.mainTabs.filter(item => item.name === tab.name)
        if (tab.length >= 1) {
          this.$router.push({
            name: tab[0].name
          })
        }
      },
      /* tabs, 删除tab */
      removeTabHandle(tabName) {
        this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
        if (this.mainTabs.length >= 1) {
          // 当前选中tab被删除
          if (tabName === this.mainTabsActiveName) {
            this.$router.push({
              name: this.mainTabs[this.mainTabs.length - 1].name
            }, () => {
              this.mainTabsActiveName = this.$route.name
            })
          }
        } else {
          this.$router.push("/")
        }
      },
      /* tabs, 关闭当前 */
      tabsCloseCurrentHandle() {
        this.removeTabHandle(this.mainTabsActiveName)
      },
      /* tabs, 关闭其它 */
      tabsCloseOtherHandle() {
        this.mainTabs = this.mainTabs.filter(item => item.name === this.mainTabsActiveName)
      },
      /* tabs, 关闭全部 */
      tabsCloseAllHandle() {
        this.mainTabs = []
        this.$router.push("/")
      },
      /* tabs, 刷新当前 */
      tabsRefreshCurrentHandle() {
        var tempTabName = this.mainTabsActiveName
        this.removeTabHandle(tempTabName)
        this.$nextTick(() => {
          this.$router.push({
            name: tempTabName
          })
        })
      }
    }
  }

</script>


<style scoped>
  .content-box {
    position: absolute;
    left: 250px;
    right: 0;
    top: 70px;
    bottom: 0;
    padding-bottom: 30px;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
  }

  .position-collapse-left {
    width: 100%;
  }

  .position-left {
    width: 100%;
  }

  .tabs-tools {
    position: fixed;
    top: 75px;
    right: 50px;
    z-index: 1020;
    height: 26px;
    font-size: 14px;
    line-height: 26px;
    cursor: pointer;
    border-color: rgba(200, 206, 206, 0.5);
    border-left-width: 1px;
    border-left-style: solid;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    background: rgba(255, 255, 255, 1);
  }

  .tabs-tools >>> .el-button-group>.el-button:first-child {
    margin-right: 1px;
    border-radius: 3px;
    border-right: 1px solid #c6e2ff;
  }

</style>
