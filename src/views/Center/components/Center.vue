<template>
  <div class="fly-panel fly-panel-user" style="padding:20px;">
    <div class="fly-msg" style="margin-bottom: 20px;">Hi，{{ userInfo.nickname }}，你已是我们的正式社员。</div>
    <div class="layui-row layui-col-space20">
      <div class="layui-col-md6">
        <div class="fly-panel fly-panel-border">
          <div class="fly-panel-title">我的会员信息</div>
          <div
              class="fly-panel-main layui-text"
              style="padding: 18px 15px; height: 50px; line-height: 26px;"
          >
            <p>
              您的财富经验值：
              <span class="orange">{{ userInfo.integral }}</span>
              <a
                  href="javascript:"
                  target="_blank"
                  class="layui-btn layui-btn-warm layui-btn-xs"
              >
                充值
              </a>
            </p>
            <p>
              您当前为：
              <span class="orange">{{ userInfo.isVip === '0' ? '非 VIP' : 'VIP' }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="layui-col-md6">
        <sign class="fly-panel-border" />
      </div>
      <div class="layui-col-md12" style="margin-top: -20px;">
        <div class="fly-panel fly-panel-border">
          <div class="fly-panel-title">快捷方式</div>
          <div class="fly-panel-main">
            <ul class="layui-row layui-col-space10 fly-shortcut">
              <li class="layui-col-sm3 layui-col-xs4">
                <router-link :to="{name: 'settingsBasic'}">
                  <i class="layui-icon"></i>
                  <cite>修改信息</cite>
                </router-link>
              </li>
              <li class="layui-col-sm3 layui-col-xs4">
                <router-link :to="{name: 'settingsAvatar'}">
                  <i class="layui-icon"></i>
                  <cite>修改头像</cite>
                </router-link>
              </li>
              <li class="layui-col-sm3 layui-col-xs4">
                <router-link :to="{name: 'settingsPassword'}">
                  <i class="layui-icon"></i>
                  <cite>修改密码</cite>
                </router-link>
              </li>
              <li class="layui-col-sm3 layui-col-xs4">
                <router-link :to="{name: 'settingsBind'}">
                  <i class="layui-icon"></i>
                  <cite>帐号绑定</cite>
                </router-link>
              </li>
              <li class="layui-col-sm3 layui-col-xs4">
                <router-link :to="{name: 'myPosts'}">
                  <i class="layui-icon"></i>
                  <cite>发表新帖</cite>
                </router-link>
              </li>
              <li class="layui-col-sm3 layui-col-xs4">
                <router-link :to="{name: 'catalog', params: {catalog: 'share'} }">
                  <i class="layui-icon"></i>
                  <cite>查看分享</cite>
                </router-link>
              </li>
              <li class="layui-col-sm3 layui-col-xs4 LAY_search">
                <a href="javascript:">
                  <i class="layui-icon"></i>
                  <cite>搜索资源</cite>
                </a>
              </li>
              <li class="layui-col-sm3 layui-col-xs4">
                <a href="javascript:">
                  <i class="layui-icon"></i>
                  <cite>我的收藏</cite>
                </a>
              </li>
              <li class="layui-col-sm3 layui-col-xs4">
                <a @click.prevent="lostPage()">
                  <i class="layui-icon"></i>
                  <cite>成为赞助商</cite>
                </a>
              </li>
              <li class="layui-col-sm3 layui-col-xs4">
                <a @click.prevent="lostPage()">
                  <i class="layui-icon"></i>
                  <cite>关注公众号</cite>
                </a>
              </li>
              <li class="layui-col-sm3 layui-col-xs4">
                <a @click.prevent="lostPage()">
                  <i class="layui-icon"></i>
                  <cite>文档</cite>
                </a>
              </li>
              <li class="layui-col-sm3 layui-col-xs4">
                <a @click.prevent="lostPage()">
                  <i class="layui-icon"></i>
                  <cite>示例</cite>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userInfo } from '@/api/user'
import Sign from '@/layout/Sign'

export default {
  name: 'ComponentsUserCenter',
  components: {
    Sign
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      userInfo({ uid: this.userInfo._id }).then((code, data) => {
        if (code === 200) {
          this.$store.commit('setUserInfo', data)
        }
      })
    },
    lostPage () {
    }
  }
}
</script>

<style lang="scss" scoped>
.fly-panel-border {
  border: 1px solid #e6e6e6;
  box-shadow: none;
}

.fly-shortcut {
  li {
    text-align: center;

    .layui-icon {
      background-color: #2f9688;
      display: inline-block;
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      color: #fff;
      border-radius: 2px;
      font-size: 30px;
      transition: all 0.3s;
      -webkit-transition: all 0.3s;
    }
  }
}

.orange {
  padding-right: 20px;
  color: #ff5722;
}
</style>
