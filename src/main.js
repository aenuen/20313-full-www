import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import filters from '@/utils/filter'
import directives from '@/utils/directives'
import Alert from '@/components/Alert'
import Toast from '@/components/Toast'
import '@/utils/vee-validate'
import 'plugins-methods/css/supplement.scss'
import '@/assets/css/layui-layer/layer.css'

// 过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

// 指令
Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})

Vue.use(Toast)
Vue.use(Alert)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
