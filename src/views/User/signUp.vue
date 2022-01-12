<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name:'signIn'}">登录</router-link>
          </li>
          <li class="layui-this">注册</li>
        </ul>
        <div class="layui-form layui-tab-content" style="padding: 20px 0;">
          <validation-observer ref="observer" v-slot="{validate}">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <label for="F_email" class="layui-form-label">{{ fields.email }}</label>
                    <validation-provider
                        name="email"
                        rules="email|required"
                        v-slot="{errors}"
                    >
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
                    <label for="F_nickname" class="layui-form-label">{{ fields.nickname }}</label>
                    <validation-provider name="nickname" rules="required|min:2|max:20" v-slot="{errors}">
                      <div class="layui-input-inline">
                        <input
                            type="text"
                            id="F_nickname"
                            name="nickname"
                            v-model="postForm.nickname"
                            :placeholder="`请输入${fields.nickname}`"
                            autocomplete="off"
                            class="layui-input"
                        >
                      </div>
                      <div class="layui-form-mid errors">{{ errors[0] }}</div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label for="F_password" class="layui-form-label">{{ fields.password }}</label>
                    <validation-provider
                        name="password"
                        rules="required|min:6|max:20|confirmed:confirmation"
                        v-slot="{errors}"
                    >
                      <div class="layui-input-inline">
                        <input
                            type="password"
                            id="F_password"
                            name="password"
                            v-model="postForm.password"
                            :placeholder="`请输入${fields.password}`"
                            autocomplete="off"
                            class="layui-input"
                        >
                      </div>
                      <div class="layui-form-mid errors">{{ errors[0] }}</div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label for="F_rePassword" class="layui-form-label">{{ fields.rePassword }}</label>
                    <validation-provider
                        name="rePassword"
                        v-slot="{errors}"
                        vid="confirmation"
                    >
                      <div class="layui-input-inline">
                        <input
                            type="password"
                            id="F_rePassword"
                            name="rePassword"
                            v-model="postForm.rePassword"
                            maxlength="20"
                            :placeholder="`请输入${fields.rePassword}`"
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
                            v-model="postForm.authCode"
                            maxlength="4"
                            :placeholder="`请输入${fields.authCode}`"
                            autocomplete="off"
                            class="layui-input"
                        >
                      </div>
                      <div class="layui-form-mid errors">{{ errors[0] }}</div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <span style="padding-left:20px;" />
                    <router-link :to="{name:'forget'}">忘记密码？</router-link>
                    <span style="padding-left:20px;" />
                    <button type="button" class="layui-btn" @click="validate().then(submitRegister)">立即注册</button>
                  </div>
                  <three-login />
                </form>
              </div>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fields } from '@/components/Fields'
import AuthCode from '../../layout/AuthCode'
import ThreeLogin from './components/ThreeLogin'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { loginSignUp } from '@/api/login'

export default {
  name: 'Register',
  components: {
    AuthCode,
    ThreeLogin,
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      fields,
      postForm: {}
    }
  },
  methods: {
    async submitRegister () {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        const data = Object.assign(this.postForm, { sid: this.$store.state.sid })
        loginSignUp(data).then((res) => {
          if (res.code === 200) {
            this.postForm.email = ''
            this.postForm.nickname = ''
            this.postForm.password = ''
            this.postForm.rePassword = ''
            this.postForm.authCode = ''
            requestAnimationFrame(() => {
              this.$refs.observer && this.$refs.observer.reset()
            })
            this.$alert('注册成功')
            setTimeout(() => {
              this.$router.push('/signIn')
            }, 1000)
          } else {
            this.$refs.observer.setErrors(res.msg)
          }
        }).catch(err => {
          const { data } = err.response
          if (data.code === 500) {
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
