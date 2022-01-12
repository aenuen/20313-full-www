<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <form action="javascript:" method="post">
      <div class="layui-form-item">
        <label for="L_nowPassword" class="layui-form-label">当前密码</label>
        <div class="layui-input-inline">
          <input
            type="password"
            id="L_nowPassword"
            name="nowPassword"
            autocomplete="off"
            class="layui-input"
          >
        </div>
      </div>
      <div class="layui-form-item">
        <label for="L_password" class="layui-form-label">新密码</label>
        <div class="layui-input-inline">
          <input
            type="password"
            id="L_password"
            name="password"
            autocomplete="off"
            class="layui-input"
          >
        </div>
        <div class="layui-form-mid layui-word-aux">6到16个字符</div>
      </div>
      <div class="layui-form-item">
        <label for="L_rePassword" class="layui-form-label">确认密码</label>
        <div class="layui-input-inline">
          <input
            type="password"
            id="L_rePassword"
            name="rePassword"
            autocomplete="off"
            class="layui-input"
          >
        </div>
      </div>
      <div class="layui-form-item">
        <button class="layui-btn" key="set-mine">确认修改</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SettingsPassword'
}
</script>

<style lang="scss" scoped>
</style>
