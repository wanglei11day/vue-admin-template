<template>
  <div class="page-container" :style="{'height':pageHeight + 'px'}">
    <el-container style="height:100%">
      <el-header style="height: 40px;" ref="title" v-if="titleShow" class="page-title-container">
        <slot name="title"></slot>
      </el-header>
      <el-container>
        <el-aside ref="aside" v-if="asideShow" class="page-sider-container">
          <slot name="aside"></slot>
        </el-aside>
        <el-aside ref="accessoryAside" v-if="accessoryAsideShow" class="page-accessorySider-container">
          <slot name="accessoryAside"></slot>
        </el-aside>
        <el-container class="page-main-container">
         <el-header ref="header" v-if="headerShow" class="page-hearder-container">
            <!--工具栏-->
            <div class="toolbar">
              <slot name="toolbar"></slot>
            </div>
          </el-header>
            <el-main id="main" :style="{ 'max-height': contentHeight + 'px' }" ref="main" class="page-content-container">
            <slot name="content"></slot>
          </el-main>
            <el-footer ref="footer" style="height:40px;" v-if="footShow" class="page-footer-container">
            <slot name="footer"></slot>
          </el-footer>
        </el-container>
      </el-container>

    </el-container>

  </div>
</template>

<script>
  export default {
 name: 'data-template',
   props: {
      titleShow: {
        type: Boolean,
        default: false
      },
      asideShow: {
        type: Boolean,
        default: true
      },
      accessoryAsideShow: {
        type: Boolean,
        default: false
      },
      headerShow: {
        type: Boolean,
        default: true
      },
      footShow: {
        type: Boolean,
        default: true
      },
    },
    data(){
      return{
                screenHeight: document.body.clientHeight,

          contentHeight: 800
      }
    },
     computed: {
      pageHeight() {
        return this.screenHeight - 140
      //   console.log(this.screenHeight - 140)
      }
     
    },
    methods:{
       setContentHeight: function () {
        let height = 0
        if (this.$refs.title) {
          height += this.$refs.title.$el.clientHeight
         
        }
        if (this.$refs.header) {
          height += this.$refs.header.$el.clientHeight
        } 
        
        if (this.$refs.footer) {
          height += this.$refs.footer.$el.clientHeight
        }
        this.contentHeight = this.pageHeight - height
      }
    },
    mounted(){
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenHeight = document.body.clientHeight
          that.screenHeight = window.screenHeight  
        })()
      }
      this.setContentHeight()
   //   console.log(this.screenHeight,"00000sssssss")
    },
      watch: {
        
      screenHeight(val) {
        
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器 
        if (!this.timer) {
          debugger
          // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth 
          this.screenHeight = val
          this.setContentHeight()
          this.timer = true
          let that = this
         
          setTimeout(function () {
            // 打印screenWidth变化的值 
            console.log(that.screenHeight)
            that.timer = false
          }, 400)
        }
      }
    }
  }

</script>

<style lang="less" scoped>

</style> 


