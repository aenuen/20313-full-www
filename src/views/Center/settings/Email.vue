<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <validation-observer ref="observer" v-slot="{validate}">
      <form method="post">
        <div class="layui-form-item">
          <label for="F_email" class="layui-form-label">邮箱</label>
          <validation-provider name="email" rules="required|email" v-slot="{errors}">
            <div class="layui-input-inline">
              <input
                type="text"
                id="F_email"
                name="email"
                v-model.trim="postForm.email"
                maxlength="20"
                autocomplete="off"
                class="layui-input"
                :placeholder="`请输入${fields.email}`"
              />
            </div>
            <div class="layui-form-mid errors">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <div class="layui-form-mid orange" style="margin-left: 50px">注：若更新邮箱需重新验证电子邮箱。</div>
        </div>
        <div class="layui-form-item" style="padding-left:112px;">
          <button type="button" class="layui-btn" @click="validate().then(submitUpdate)" :disabled="loading">确认修改
          </button>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { fields } from '../../../components/Fields'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { userEmail } from '@/api/user'

export default {
  name: 'SettingsData',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      fields,
      postForm: {},
      loading: false
    }
  },
  mounted () {
    const { email } = this.$store.state.userInfo
    this.postForm = { email: email || '' }
  },
  methods: {
    async submitUpdate () {
      if (!this.loading && await this.$refs.observer.validate()) {
        this.loading = true
        userEmail({ ...this.postForm }).then(({
          code,
          msg
        }) => {
          if (code === 200) {
            this.$toast(msg)
          } else if (code === 601) {
            this.$toast(msg)
          }
          this.loading = false
        }).catch((e) => {
          this.loading = false
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.gender-label {
  cursor: pointer;
  margin-right: 10px;

  i {
    margin-right: 5px;
  }
}

.layui-icon-radio {
  color: #5FB878;
}
</style>
