<template>
  <div class="fly-panel fly-sign">
    <div class="fly-panel-title">
      签到
      <i class="fly-mid"></i>
      <a href="javascript:" class="fly-link" @click="showExplain">说明</a>
      <i class="fly-mid"></i>
      <a href="javascript:" class="fly-link" @click="showActive">活跃榜<span class="layui-badge-dot" /></a>
      <span class="fly-sign-days" v-show="isSign||isLogin">已连续签到<cite>{{ count }}</cite>天</span>
    </div>
    <div class="fly-panel-main fly-sign-main">
      <template v-if="isSign">
        <button class="layui-btn layui-btn-disabled">{{ msg }}</button>
        <span>今日签到获得了<cite>{{ integral }}</cite>积分</span>
      </template>
      <template v-else>
        <button class="layui-btn layui-btn-danger" @click="todaySign">今日签到</button>
        <span>签到可获得<cite>{{ integral }}</cite>积分</span>
      </template>
    </div>
    <explain :explain-show="explainShow" :explain-index="explainIndex" @closeExplain="closeExplain" />
    <active :active-show="activeShow" :active-index="activeIndex" @closeActive="closeActive" />
  </div>
</template>

<script>
import Explain from './components/Explain'
import Active from './components/Active'
import { userSign } from '@/api/user'
import dayjs from 'dayjs'

export default {
  name: 'ViewsItemSideBarSign',
  components: {
    Explain,
    Active
  },
  data () {
    return {
      explainShow: false,
      explainIndex: 0,
      activeShow: false,
      activeIndex: 0,
      isSign: false,
      msg: ''
    }
  },
  mounted () {
    const isSign = this.$store.state.userInfo.isSign
    const lastSign = this.$store.state.userInfo.lastSign
    const newDate = dayjs().format('YYYY-MM-DD')
    const lastDate = dayjs(lastSign).format('YYYY-MM-DD')
    const diff = dayjs(newDate).diff(dayjs(lastDate), 'days')
    if (diff > 0 && isSign) {
      this.isSign = false
    } else {
      this.isSign = isSign
      if (diff === 0 && isSign) {
        this.nextSign()
      } else {
        this.msg = '今日已签到'
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    isLogin () {
      return this.$store.state.isLogin
    },
    count () {
      return this.$store.state.userInfo !== {} && typeof this.$store.state.userInfo.count !== 'undefined'
          ? this.$store.state.userInfo.count : 0
    },
    integral () {
      const count = ~~(this.count)
      return count < 5 ? 5
          : count >= 5 && count < 15 ? 10
              : count >= 10 && count < 30 ? 15
                  : count >= 30 && count < 100 ? 20
                      : count >= 100 && count < 365 ? 30
                          : count > 365 ? 50 : 0
    }
  },
  watch: {
    userInfo (nVal) {
      if (nVal.isSign === true) {
        this.nextSign()
        this.isSign = true
      } else {
        this.isSign = false
      }
    }
  },
  methods: {
    showExplain () {
      this.explainShow = true
      this.explainIndex = ~~(new Date().getTime() / 1000)
    },
    closeExplain () {
      this.explainShow = false
    },
    showActive () {
      this.activeShow = true
      this.activeIndex = ~~(new Date().getTime() / 1000)
    },
    closeActive () {
      this.activeShow = false
    },
    nextSign () {
      clearInterval(this.ctrl)
      const newDate = dayjs().add(1, 'day').format('YYYY-MM-DD')
      let seconds = dayjs(newDate + ' 00:00:00').diff(dayjs(), 'second')
      let hour = Math.floor(seconds / 3600)
      let min = Math.floor(seconds % 3600 / 60)
      let second = seconds % 60
      this.msg = `签到倒计时 ${hour}:${min < 10 ? '0' + min : min}:${second < 10 ? '0' + second : second}`
      this.ctrl = setInterval(() => {
        seconds = dayjs(newDate + ' 00:00:00').diff(dayjs(), 'second')
        hour = Math.floor(seconds / 3600)
        min = Math.floor(seconds % 3600 / 60)
        second = seconds % 60
        this.msg = `签到倒计时 ${hour}:${min < 10 ? '0' + min : min}:${second < 10 ? '0' + second : second}`
        if (seconds <= 0) {
          clearInterval(this.ctrl)
          this.isSign = false
          let user = this.$store.state.userInfo
          user.isSign = false
          this.$store.commit('setUserInfo', user)
        }
      }, 1000)
    },
    todaySign () {
      if (this.isLogin) {
        userSign().then((res) => {
          let user = this.$store.state.userInfo
          if (res.code === 200) {
            user.count = res.data.count
            user.integral = res.data.integral
            this.$toast('签到成功')
          } else if (res.code === 601) {
            this.isSign = true
            this.$toast('今天已经签到过了')
          }
          user.isSign = true
          user.lastSign = res.data.lastSign
          this.isSign = true
          this.$store.commit('setUserInfo', user)
        })
        this.nextSign()
      } else {
        this.$toast('请选登录')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
