<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief">
      <ul class="layui-tab-title" id="LAY_mine">
        <li>
          <router-link :to="{name:'settingsBasic'}">我的资料</router-link>
        </li>
        <li>
          <router-link :to="{name:'settingsAvatar'}">头像</router-link>
        </li>
        <li>
          <router-link :to="{name:'settingsPassword'}">密码</router-link>
        </li>
        <li>
          <router-link :to="{name:'settingsEmail'}">电子邮箱</router-link>
        </li>
        <li>
          <router-link :to="{name:'settingsBind'}">帐号绑定</router-link>
        </li>
      </ul>
      <div class="layui-tab-content" style="padding: 20px 0;">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentsUserSettings'
}
</script>

<style lang="scss" scoped>
</style>
