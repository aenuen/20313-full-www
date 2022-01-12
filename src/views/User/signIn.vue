<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief">
        <ul class="layui-tab-title">
          <li class="layui-this">登录</li>
          <li>
            <router-link :to="{name:'signUp'}">注册</router-link>
          </li>
        </ul>
        <div class="layui-form layui-tab-content" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <validation-observer ref="observer" v-slot="{validate}">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <label for="F_account" class="layui-form-label">{{ fields.account }}</label>
                    <validation-provider name="account" rules="required|email" v-slot="{errors}">
                      <div class="layui-input-inline">
                        <input
                            type="text"
                            id="F_account"
                            name="account"
                            v-model.trim="postForm.account"
                            maxlength="20"
                            autocomplete="off"
                            class="layui-input"
                            :placeholder="`请输入${fields.account}`"
                        />
                      </div>
                      <div class="layui-form-mid errors">{{ errors[0] }}</div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item layui-word-aux">
                    账号为注册时填写的
                    <span style="color:#009688">电子邮箱</span>
                    或是已绑定的
                    <span style="color:#009688">用户名、手机号码</span>
                    均可
                  </div>
                  <div class="layui-form-item">
                    <label for="F_password" class="layui-form-label">{{ fields.password }}</label>
                    <validation-provider name="password" rules="required|min:6" v-slot="{errors}">
                      <div class="layui-input-inline">
                        <input
                            type="password"
                            id="F_password"
                            name="password"
                            v-model.trim="postForm.password"
                            maxlength="20"
                            autocomplete="off"
                            class="layui-input"
                            :placeholder="`请输入${fields.password}`"
                        />
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
                    <validation-provider
                        name="authCode"
                        ref="authCodeField"
                        rules="required|length:4|alpha_num"
                        v-slot="{errors}"
                    >
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
                    <router-link :to="{name:'forget'}">忘记密码？</router-link>
                    <span style="padding-left:20px;" />
                    <button type="button" class="layui-btn" @click="validate().then(submitLogin)">立即登录</button>
                  </div>
                  <three-login />
                </form>
              </div>
            </validation-observer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { fields } from '@/components/Fields'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import AuthCode from '../../layout/AuthCode'
import ThreeLogin from './components/ThreeLogin'
import { loginSignIn } from '@/api/login'

export default {
  name: 'Login',
  components: {
    ValidationProvider,
    ValidationObserver,
    AuthCode,
    ThreeLogin
  },
  data () {
    return {
      fields,
      postForm: {
        account: 'aenuen@qq.com',
        password: 'ee123123'
      }
    }
  },
  methods: {
    async submitLogin () {
      // noinspection JSUnresolvedFunction
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        const data = Object.assign(this.postForm, { sid: this.$store.state.sid })
        loginSignIn(data).then(({ code, msg, data, token }) => {
          if (code === 200) {
            data.email = this.postForm.account
            this.$store.commit('setUserInfo', data)
            this.$store.commit('setIsLogin', true)
            this.$store.commit('setToken', token)
            this.postForm.account = ''
            this.postForm.password = ''
            this.postForm.authCode = ''
            requestAnimationFrame(() => {
              // noinspection JSUnresolvedFunction
              this.$refs.observer && this.$refs.observer.reset()
            })
            this.$router.push({ name: 'home' })
          } else if (code === 598) {
            // noinspection JSUnresolvedFunction
            this.$refs.authCodeField.setErrors([msg])
          } else if (code === 600) {
            this.$alert('用户名或密码不正确，请检查')
          }
        }).catch((err) => {
          const { data: { code } } = err.response
          if (code === 500) {
            this.$alert('用户名或密码不正确，请检查')
          } else {
            this.$alert('服务器错误，请稍候再试…')
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.errors {
  color: #f30;
}
</style>
