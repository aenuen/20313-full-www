<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name:'signIn'}">登录</router-link>
          </li>
          <li class="layui-this">找回密码</li>
        </ul>
        <div class="layui-form layui-tab-content" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <form method="post">
                <div class="layui-form-item">
                  <label for="F_email" class="layui-form-label">{{ fields.email }}</label>
                  <validation-provider :name="fields.email" rules="required|email" v-slot="{errors}">
                    <div class="layui-input-inline">
                      <input
                          type="text"
                          id="F_email"
                          name="email"
                          v-model="postForm.email"
                          :placeholder="`请输入${fields.email}`"
                          autocomplete="off"
                          class="layui-input"
                      >
                    </div>
                    <div class="layui-form-mid errors">{{ errors[0] }}</div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <div class="layui-form-mid">
                    <auth-code />
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="F_authCode" class="layui-form-label">{{ fields.authCode }}</label>
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
                  <span style="padding-left:20px;" />
                  <router-link :to="{name:'signIn'}">想起密码了</router-link>
                  <span style="padding-left:20px;" />
                  <button type="button" class="layui-btn" @click="getCheckCode">获取校验码</button>
                </div>
                <three-login />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { fields } from '@/components/Fields'
import AuthCode from '../../layout/AuthCode'
import ThreeLogin from './components/ThreeLogin'
import { ValidationProvider } from 'vee-validate'
import { loginFindCode } from '@/api/login'

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
  },
  methods: {
    getCheckCode () {
      loginFindCode(this.postForm).then(res => {
        if (res.code === 200) {
          this.$alert(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.errors {
  color: #f30;
}
</style>
