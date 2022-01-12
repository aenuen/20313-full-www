<template>
  <div class="layui-container flex">
    <div class="layui-row font pd3">确定更新电子邮箱为 {{ email }} 吗？</div>
    <div class="layui-row">
      <button type="button" class="layui-btn" :disabled="isUpdate" @click="submit">确定更新</button>
      <router-link :to="{name:'home'}" class="layui-btn layui-btn-primary">返回首页</router-link>
    </div>
  </div>
</template>

<script>
import { urlStringQueryJson } from 'plugins-methods/src/urlString'
import { loginFindCode } from '@/api/login'

export default {
  name: 'ViewsUserResetEmail',
  data () {
    return {
      email: '',
      isUpdate: false,
      postForm: {}
    }
  },
  mounted () {
    const queryString = window.location.href.replace(/.*\?/, '')
    const queryJson = urlStringQueryJson(queryString)
    this.postForm = queryJson
    this.email = decodeURIComponent(queryJson.email)
  },
  methods: {
    submit () {
      if (!this.isUpdate) {
        this.isUpdate = true
        loginFindCode(this.postForm).then((res) => {
          if (res.code === 200) {
            this.$alert(res.msg)
            setTimeout(() => {
              this.$router.push({ name: 'home' })
            }, 1000)
          } else {
            this.isUpdate = false
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  min-height: 260px;

  .font {
    font-size: 14px;
    color: #333;
  }
}
</style>
