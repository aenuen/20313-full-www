<template>
  <div class="authCode">
    <div class="svg" v-html="authCode" @click="getCaptcha" title="看不清，换一个" />
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid'
import { publicCaptcha } from '@/api/public'

export default {
  name: 'AuthCode',
  data () {
    return {
      authCode: '',
      sid: ''
    }
  },
  mounted () {
    if (localStorage.getItem('sid')) {
      this.sid = localStorage.getItem('sid')
    } else {
      this.sid = uuid()
      localStorage.setItem('sid', this.sid)
    }
    this.$store.commit('setSid', this.sid)
    this.getCaptcha()
  },
  methods: {
    getCaptcha () {
      publicCaptcha(this.sid).then(({ code, data }) => {
        if (code === 200) {
          this.authCode = data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.authCode {
  height: 38px;
  position: relative;
  cursor: pointer;

  .svg {
    position: absolute;
    left: -0px;
    top: -0px;
  }
}
</style>
