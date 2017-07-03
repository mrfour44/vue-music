// vuex 入口
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'  // 在控制台记录每次通过mutation修改state

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'  // vuex的严格模式

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug, // vuex的严格模式
    plugins: debug ? [createLogger()] : []
})