<template>
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <a class="fly-logo" href="/">
        <img src="../../assets/logo.png" alt="layui" />
      </a>
      <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item layui-this">
          <a href="/"><i class="iconfont icon-jiaoliu"></i>交流</a>
        </li>
        <li class="layui-nav-item">
          <a href="javascript:">
            <i class="iconfont icon-iconmingxinganli"></i>案例</a
          >
        </li>
        <li class="layui-nav-item">
          <a href="/" target="_blank"><i class="iconfont icon-ui"></i>框架</a>
        </li>
      </ul>

      <ul class="layui-nav fly-nav-user">
        <template v-if="isLogin">
          <li class="layui-nav-item" @mouseover="show" @mouseout="hide">
            <a href="javascript:" class="fly-nav-avatar">
              <cite class="layui-hide-xs">{{ userInfo.nickname }}</cite>
              <i
                class="layui-badge fly-badge-vip layui-hide-xs"
                v-show="userInfo.isVip!=='0'"
              >
                VIP{{ userInfo.isVip }}
              </i>
              <img :src="userInfo.avatar" :alt="`${userInfo.nickname}的头像`">
            </a>
            <dl class="layui-nav-child layui-anim layui-anim-upbit" :class="{'layui-show':isHover}">
              <dd>
                <router-link :to="{name:'settingsBasic'}">
                  <i class="layui-icon">&#xe620;</i>
                  基本设置
                </router-link>
              </dd>
              <dd>
                <router-link :to="{name:'settingsMessage'}">
                  <i class="iconfont icon-tongzhi" style="top: 4px;" />
                  我的消息
                </router-link>
              </dd>
              <dd>
                <router-link :to="{name:'personal'}">
                  <i class="layui-icon" style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>
                  我的主页
                </router-link>
              </dd>
              <hr style="margin: 5px 0;" />
              <dd>
                <a href="javascript:" style="text-align: center;" @click="logout">
                  退出
                </a>
              </dd>
            </dl>
          </li>
        </template>
        <template v-else>
          <li class="layui-nav-item">
            <a
              class="iconfont icon-touxiang layui-hide-xs"
              href="javascript:"
            ></a>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{name:'signIn'}">登入</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{name:'signUp'}">注册</router-link>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              href="javascript:"
              title="QQ登入"
              class="iconfont icon-qq"
            />
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              href="javascript:"
              title="微博登入"
              class="iconfont icon-weibo"
            />
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
<script>

export default {
  name: 'LayoutHeader',
  data () {
    return {
      isHover: false,
      hoverCtrl: {}
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    userInfo () {
      return this.$store.state.userInfo || {
        nickname: '',
        avatar: '',
        isVip: 0
      }
    }
  },
  methods: {
    show () {
      clearTimeout(this.hoverCtrl)
      this.hoverCtrl = setTimeout(() => {
        this.isHover = true
      }, 200)
    },
    hide () {
      clearTimeout(this.hoverCtrl)
      this.hoverCtrl = setTimeout(() => {
        this.isHover = false
      }, 500)
    },
    logout () {
      this.$confirm('确定退出吗？', () => {
        this.$store.commit('setToken', '')
        this.$store.commit('setUserInfo', {})
        this.$store.commit('setIsLogin', false)
        localStorage.clear()
        // location.reload()
        this.$router.push({ name: 'home' }, () => {
        })
      }, () => {
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.fly-logo {
  left: -15px;
  top: -10px;
  margin-left: 15px;
}
</style>
