import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {},
    containerHide: false
  },
  mutations: {
    setSid (state, value) {
      state.sid = value
    },
    setToken (state, value) {
      state.token = value
      localStorage.setItem('token', value)
    },
    setIsLogin (state, value) { // 是否登录
      state.isLogin = value
      localStorage.setItem('isLogin', value)
    },
    setUserInfo (state, value) { // 设置用户的基本信息
      state.userInfo = value
      localStorage.setItem('userInfo', JSON.stringify(value)) // 本地存储用户的基本信
    },
    setContainerHide (state, value) { // 设置container的状态
      state.containerHide = value
    }
  },
  actions: {},
  modules: {}
})
