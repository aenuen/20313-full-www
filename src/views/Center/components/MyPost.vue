<template>
  <div class="fly-panel fly-panel-title" pad20>
    <div class="layui-tab layui-tab-brief">
      <ul class="layui-tab-title">
        <li>
          <router-link :to="{name:'myPosts'}">我发布的帖</router-link>
        </li>
        <li>
          <router-link :to="{name:'myCollection'}">我收藏的帖</router-link>
        </li>
      </ul>
      <div class="layui-tab-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentsUserPostList'
}
</script>

<style lang="scss" scoped>
</style>
