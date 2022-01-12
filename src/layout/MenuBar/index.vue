<template>
  <div class="fly-panel fly-column">
    <div class="layui-container">
      <ul class="layui-clear">
        <router-link tag="li" to="/" class="layui-hide-xs">
          <a href="/">首页</a>
        </router-link>
        <router-link tag="li" v-for="(item,index) in navLists" :key="index" :to="item.path">
          <a href="/">{{ item.name }}<span class="layui-badge-dot" v-if="item.isNew" /></a>
        </router-link>
        <template v-if="isLogin">
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <span class="fly-mid" />
          </li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <router-link :to="{name:'myPosts'}">我发表的帖</router-link>
          </li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <router-link :to="{name:'myCollection'}">我收藏的帖</router-link>
          </li>
        </template>
      </ul>

      <div class="fly-column-right layui-hide-xs">
        <span class="fly-search"><i class="layui-icon"></i></span>
        <router-link :to="{name:'postCreate'}" class="layui-btn">发表新帖</router-link>
      </div>
      <div class="layui-hide-sm layui-show-xs-block btn-class">
        <router-link :to="{name:'postCreate'}" class="layui-btn">发表新帖</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentsPanel',
  data () {
    return {
      isLogin: this.$store.state.isLogin,
      navLists: [
        {
          name: '提问',
          path: '/catalog/ask',
          isNew: false
        },
        {
          name: '分享',
          path: '/catalog/share',
          isNew: true
        },
        {
          name: '讨论',
          path: '/catalog/discuss',
          isNew: false
        },
        {
          name: '建议',
          path: '/catalog/advise',
          isNew: false
        },
        {
          name: '公告',
          path: '/catalog/notice',
          isNew: false
        },
        {
          name: '动态',
          path: '/catalog/logs',
          isNew: false
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-class {
  margin-top: -10px;
  padding-bottom: 10px;
  text-align: center;
}
</style>
