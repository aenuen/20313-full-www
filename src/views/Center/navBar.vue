<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree layui-inline">
      <li v-for="(item,index) in navAry" :key="`nav_${index}`" class="layui-nav-item">
        <router-link :to="{name:item.link}" :active-class="item.activeClass">
          <i class="layui-icon" :class="item.icon" />
          {{ item.name }}
        </router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'ViewsCenterNavBar',
  data () {
    return {
      navAry: [
        {
          name: '我的主页',
          icon: 'layui-icon-home',
          link: 'personal'
        },
        {
          name: '用户中心',
          icon: 'layui-icon-home',
          link: 'center'
        },
        {
          name: '基本设置',
          icon: 'layui-icon-set',
          link: 'settingsBasic',
          activeClass: 'layui-this'
        },
        {
          name: '我的帖子',
          icon: 'layui-icon-form',
          link: 'myPosts',
          activeClass: 'layui-this'
        },
        {
          name: '我的消息',
          icon: 'layui-icon-reply-fill',
          link: 'settingsMessage'
        },
        {
          name: '其它设置',
          icon: 'layui-icon-component',
          link: 'settingsOthers'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-nav-item {
  .layui-icon {
    margin-right: 10px;
  }
}
</style>
