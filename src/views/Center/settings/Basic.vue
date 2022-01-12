<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <validation-observer ref="observer" v-slot="{validate}">
      <form method="post">
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
          <label for="F_location" class="layui-form-label">{{ fields.location }}</label>
          <div class="layui-input-inline">
            <input
              type="text"
              id="F_location"
              name="location"
              v-model="postForm.location"
              :placeholder="`请输入${fields.location}`"
              autocomplete="off"
              class="layui-input"
            >
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label mr1">{{ fields.gender }}</label>
          <div class="layui-input-inline" style="margin-top: 10px">
            <label for="F_man" class="gender-label">
              <input type="radio" v-model="postForm.gender" id="F_man" name="gender" value="0" title="男">
              <i class="layui-icon layui-icon-circle" :class="{'layui-icon-radio':postForm.gender==='0'}" />男
            </label>
            <label for="F_woman" class="gender-label">
              <input type="radio" v-model="postForm.gender" id="F_woman" name="gender" value="1" title="女">
              <i class="layui-icon layui-icon-circle" :class="{'layui-icon-radio':postForm.gender==='1'}" />女
            </label>
          </div>
        </div>
        <div class="layui-form-item layui-form-text">
          <label class="layui-form-label">{{ fields.signature }}</label>
          <div class="layui-input-block">
          <textarea
            v-model="postForm.signature"
            class="layui-textarea textarea-no-size"
            style="height: 80px;"
          />
          </div>
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
import { userBasic } from '@/api/user'

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
    const {
      nickname,
      gender,
      location,
      signature
    } = this.$store.state.userInfo
    this.postForm = {
      nickname: nickname || '',
      gender: gender || '',
      location: location || '',
      signature: signature || ''
    }
  },
  methods: {
    async submitUpdate () {
      if (!this.loading && await this.$refs.observer.validate()) {
        userBasic({ ...this.postForm }).then(({
          code,
          msg
        }) => {
          if (code === 200) {
            this.$toast(msg)
            this.$store.commit('setUserInfo', { ...this.$store.state.userInfo, ...this.postForm })
          } else if (code === 600) {
            this.$toast(msg)
          }
        }).catch((e) => {
          console.log(e)
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
