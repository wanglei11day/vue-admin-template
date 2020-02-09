import Vue from 'vue'

import { timeDo } from './datetime'
const plugin={
    install(Vue,option){
        Vue.prototype.$timeDo = timeDo
    }
}
  // Vue.use内部会调用plugin的install方法
  Vue.use(plugin)   
  
  Vue.prototype.$timeDo = timeDo