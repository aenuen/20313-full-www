<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name:'login'}">登录</router-link>
          </li>
          <li class="layui-this">找回密码</li>
        </ul>
        <div class="layui-form layui-tab-content" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <form method="post">
                <div class="layui-form-item">
                  <label for="L_pass" class="layui-form-label">密码</label>
                  <div class="layui-input-inline">
                    <input type="password" id="L_pass" name="pass" required lay-verify="required" autocomplete="off"
                           class="layui-input">
                  </div>
                  <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                </div>
                <div class="layui-form-item">
                  <label for="L_repass" class="layui-form-label">确认密码</label>
                  <div class="layui-input-inline">
                    <input type="password" id="L_repass" name="repass" required lay-verify="required" autocomplete="off"
                           class="layui-input">
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="F_authCode" class="layui-form-label">人类验证</label>
                  <validation-provider :name="fields.authCode" rules="required|length:4|alpha_num" v-slot="{errors}">
                    <div class="layui-input-inline">
                      <input
                        type="text"
                        id="F_authCode"
                        name="authCode"
                        v-model.trim="postForm.authCode"
                        maxlength="4"
                        autocomplete="off"
                        class="layui-input"
                        :placeholder="`请输入${fields.authCode}`"
                      >
                    </div>
                    <div class="layui-form-mid errors">{{ errors[0] }}</div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <input type="hidden" name="username">
                  <input type="hidden" name="email">
                  <button class="layui-btn">重置密码</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { fields } from '../../components/Fields'
import AuthCode from '../../layout/AuthCode'
import ThreeLogin from './components/ThreeLogin'
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'UserForget',
  components: {
    AuthCode,
    ThreeLogin,
    ValidationProvider
  },
  data () {
    return {
      fields,
      postForm: {}
    }
  }
}
</script>
<style lang="scss" scoped>
.errors {
  color: #f30;
}
</style>
