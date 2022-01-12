<template>
  <div class="layui-form-item fly-form-app">
    <span>或者使用社交账号登入</span>
    <a
      href="javascript:;"
      onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
      class="iconfont icon-qq" title="QQ登入"
    />
    <a
      href="/app/weibo/"
      onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
      class="iconfont icon-weibo"
      title="微博登入"
    />
  </div>
</template>

<script>
export default {
  name: 'UserThreeLogin'
}
</script>

<style lang="scss" scoped>
</style>
