import component from './Detail'

const plugin = {}
plugin.install = function (Vue) {
  // 注册组件
  const constructor = Vue.extend(component)
  const instance = new constructor()
  instance.$mount(document.createElement('div'))
  // 在body中插入
  document.body.appendChild(instance.$el)
  // 添加实例方法，以便全局使用
  Vue.prototype.$toast = (msg, type) => {
    instance.type = type
    instance.msg = msg
    instance.isShow = true
  }
}

export default plugin
