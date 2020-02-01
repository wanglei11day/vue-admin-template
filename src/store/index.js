import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import menu from './modules/menu'
import tab from './modules/tab'
import iframe from './modules/iframes'



Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    tab: tab,
    iframe: iframe,

    menu:menu

  },
  getters
})

export default store
