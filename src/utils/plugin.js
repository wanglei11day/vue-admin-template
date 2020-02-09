import Vue from 'vue'

const plugin={
    install(Vue,option){
          // 添加全局方法或者属性
        Vue.myGlobalMethod = function () {}
        // 添加全局指令
    Vue.directive('focus', {
        inserted: function (el) {
          el.querySelector('input').focus()
        }
      })
      
      Vue.mixin({
          data(){
              return{
                  curId:-1,
                  fileUploadHeaders: {},
                  pagePermission: (this.$route && this.$route.meta && this.$route.meta.permission) ? this.$route.meta.permission : ''

              }
          },
           // 添加到mixin中的任何内容将被注入到所有组件中。
      // 在这个例子中， mounted() 方法将在组件被挂载到DOM后调用
      methods:{
        hasPerm: function (perms) {
            let hasPermission = false
            let permissions = this.$store.state.user.perms || []
            for (let i = 0, len = permissions.length; i < len; i++) {
              if (permissions[i].name === perms) {
                hasPermission = true
                break
              }
            }
            return hasPermission
          }
      },
      created() {
        if (sessionStorage) {
          this.fileUploadHeaders.Authorization = sessionStorage.getItem('token')
        }
      },
      beforeRouteLeave(to, from, next) {
        // this.scrollY = window.scrollY
        next()
      },
      beforeRounteEnter(to, from, next) {
        next(vm => {
          window.scroll(0, vm.scrollY)
        })
      }
      })
      // 添加实例方法
    // Vue.prototype.$xxx = function () {}
    // 注册全局组件
    Vue.component()
    }
}
// Vue.use内部会调用plugin的install方法
Vue.use(plugin)