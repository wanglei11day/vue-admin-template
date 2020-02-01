<!--
 * @Auto: 蔡佳志
 * @Date: 2019-04-08
 * @Description: 框架头部组件
 * @LastEditors: wangdan
 * @LastEditTime: 2019-08-22 16:38:13
 -->

<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">{{$store.state.app.systemName}}</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-badge :value="messageCountShow" class="item">
            <i v-popover:popover class="el-icon-bell"></i>
          </el-badge>
        </div>
        <!-- 用户头像 -->
        <!-- <div class="user-avator"><img :src="user.headImgUrl"></div> -->
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <!-- {{user.username}} <i class="el-icon-caret-bottom"></i> -->
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item command="helpPage">帮助文档</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-popover ref="popover" placement="bottom" width="330" trigger="click" offset="30" @show="handleQuery">
      <el-table :data="gridData" :show-header="false" highlight-current-row stripe @row-click="rowClick">
        <el-table-column width="300" property="data">
          <template slot-scope="scope">
            <div class="handle" v-if="!scope.row.operation">
              <p>
                <span>{{scope.row.title}}</span>
                <span v-if="scope.row.status === 1" style="color: red;margin-left: 10px;">new!</span>
              </p>
              <p>
                <span>{{scope.row.createTime}}</span>
              </p>
            </div>
            <div class="handle" v-else style="text-align: center;">
              <span>{{scope.row.title}}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-popover>
    <!--预览界面-->
    <!-- <el-dialog class="dialog-container normal dialog-middle" title="预览" :visible.sync="viewVisible">
      <notic-view-page v-if="viewVisible" :noticeId="noticeId" @closeView="closeView"></notic-view-page>
    </el-dialog> -->
  </div>
</template>
<script>
  import {
    setInterval
  } from 'timers'
  //import noticViewPage from '../../system/Notice/View'
  export default {
    name: 'header-frame',
    components: {
   //   noticViewPage
    },
    data() {
      return {
        /* 全屏展示 */
        fullscreen: false,
        /* 用户名 */
        name: '未知',
        /* 消息列表 */
        gridData: [],
        /* 定时器 */
        timer: '',
        /* 通知详情Id */
        noticeId: '',
        /* 通知预览展示 */
        viewVisible: false
      }
    },
    computed: {
      /* 用户名 */
      user() {
        let user = JSON.parse(sessionStorage.getItem('user'))
        // user.username = user.username || this.name
        // user.headImgUrl = user.headImgUrl || '/static/file/handsome.jpg'
        return user
      },
      /* 消息个数提示 */
      messageCountShow() {
        return this.$store.state.user.messageCount > 0 ? this.$store.state.user.messageCount : ''
      }
    },
    methods: {
      /* 用户名下拉菜单选择事件 */
      handleCommand(command) {
        if (command === 'loginout') {
          this.$api.login.logout().then((res) => {
            sessionStorage.removeItem('token') // 删除token

            this.$store.state.tab.mainTabs = []
            this.$store.commit('menuRouteLoaded', true)
            this.$store.commit('setNavTree', '')
            this.$store.commit('setPerms', [])
            this.$store.commit('updateMainTabs', [])
            this.$store.commit('updateMainTabsActiveName', [])
            sessionStorage.removeItem('perms')
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('navTree')
            sessionStorage.removeItem('mainTabs')
            sessionStorage.removeItem('mainTabsActiveName')
            this.$router.push('/login')
          }).catch(function (res) {})
        }else if(command === 'helpPage'){
          window.open('static/_book/index.html')
        }
      },
      /* 侧边栏折叠 */
      collapseChage() {
        this.$store.commit('onCollapse')
      },
      /* 设置侧边栏状态 */
      setCollapse(val) {
        this.$store.commit('setCollapse', val)
      },
      /* 全屏显示 */
      handleFullScreen() {
        let element = document.documentElement
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen()
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen()
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen()
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen()
          }
        }
        this.fullscreen = !this.fullscreen
      },
      /* 验证登陆状态 */
      logined: function () {
        this.$api.login.logined().then((res) => {
          if (res.code != this.global.responseCode.OK) {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          } else {

          }
        }).catch(function (res) {})
      },
      /* 获取消息个数 */
      getMessage: function () {
        // this.$api.message.findPersonalMessageCount({
        //   status: 1,
        //   type: 0,
        //   businessType:1
        // }).then((res) => {
        //   if (res.code == this.global.responseCode.OK) {
        //     this.$store.commit('setMessageCount', res.data)
        //   }
        // })
      },
      /* 展示消息列表 */
      handleQuery: function () {
        this.$api.message.findPersonalPage({
          page: 1,
          pageSize: 5,
          title: '',
          type: 0,
          status:0,
          businessType: 1
        }).then((res) => {
          if (res.code == this.global.responseCode.OK) {
            this.gridData = res.data.list
            this.gridData.map(function (item) {
              item.status = item.status
              item.operation = false
            })
            this.gridData.push({
              id: -1,
              title: '查看更多...',
              status: 2,
              operation: true,
              type: 3,
              businessType:1,
              urlTemplate: 'system_messages'
            })
          }
        })
      },
      /* 消息栏处理 */
      rowClick: function (row, event, column) {
        if (row.status === 1) {
          this.$api.message.handleMessage({
            sysMessageReceiverMidIds: row.id
          }).then((res) => {
            this.$api.message.findPersonalMessageCount({
              status: 1,
              type: 0
            }).then((res) => {
              if (res.code == this.global.responseCode.OK) {
                this.$store.commit('setMessageCount', res.data)
              }
            })
          })
        }
        if (row.urlTemplate && row.type == 3 && row.businessType == 1) {
          this.$router.push({
            name: row.urlTemplate
          })
        } else if (row.type == 2) {
          this.noticeId = row.sysMessageId
          this.viewVisible = true
        }
        this.$refs.popover.doClose()
      },
      /* 关闭通知消息 */
      closeView: function () {
        this.viewVisible = false
      },
    },
    mounted() {
      /* 依据宽度设置侧边栏显示状态 */
      if (document.body.clientWidth < 1500) {
        this.setCollapse(true)
      }

      const that = this
      window.onresize = () => {
        return (() => {
          if (document.body.clientWidth < 1500) {
            this.setCollapse(true)
          } else {
            this.setCollapse(false)
          }
        })()
      }

      /* 设置定时器获取消息个数 */
      this.getMessage()
      if (!this.timer) {
        this.timer = setInterval(this.getMessage, 600000)
      }
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer._id)
        this.timer = null
      }
    }
  }

</script>
<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
    background-color: #242f42;
  }

  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
  }

  .collapse-btn:hover {
    background: rgb(40, 52, 70);
  }

  .header .logo {
    float: left;
    /* width: 250px; */
    line-height: 70px;
  }

  .header-right {
    float: right;
    padding-right: 50px;
  }

  .header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
  }

  .btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
  }

  .btn-bell,
  .btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
  }

  .btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
  }

  .btn-bell .el-icon-bell {
    color: #fff;
  }

  .user-name {
    margin-left: 10px;
  }

  .user-avator {
    margin-left: 20px;
  }

  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }

  div.cell {
    cursor: pointer
  }

  .handle {
    cursor: pointer;
  }

</style>
