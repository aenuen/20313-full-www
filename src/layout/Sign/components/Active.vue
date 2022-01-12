<template>
  <div class="active-wrap" v-show="activeShow">
    <div class="mask fixed-base" :style="{'z-index':activeIndex}" @click="closeActive" />
    <div
        class="layui-layer layui-layer-page fixed-base"
        :style="{'z-index':activeIndex + 1}"
        :class="{active:activeShow}"
    >
      <div class="layui-layer-title pd2">
        签到活跃榜 - TOP20
        <i class="layui-icon layui-icon-close f-right c-p" @click="closeActive" />
      </div>
      <div class="layui-layer-content">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li :class="{'layui-this':currentTab === 0}" @click="selectTab(0)">最新签到</li>
            <li :class="{'layui-this':currentTab === 1}" @click="selectTab(1)">今日最快</li>
            <li :class="{'layui-this':currentTab === 2}" @click="selectTab(2)">总签到榜</li>
          </ul>
          <div class="layui-tab-content pd0">
            <ul class="layui-tab-item layui-show">
              <li v-for="(item,index) in lists" :key="`active${index}`">
                <img :src="item.avatar" :alt="item.name" class="mr1">
                <cite class="fly-link">{{ item.name }}</cite>
                <span class="fly-grey">已经连续签到<i class="orange">{{ item.count }}</i>天</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default { // 签到排行榜
  name: 'LayoutSignComponentsActive',
  props: {
    activeShow: {
      type: Boolean,
      default: false
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      currentTab: 0,
      lists: [
        {
          name: 'test1',
          count: 4,
          avatar: '/images/header.jpg'
        }
      ]
    }
  },
  methods: {
    closeActive () {
      this.$emit('closeActive')
    },
    selectTab (num) {
      this.currentTab = num
    }
  }
}
</script>

<style lang="scss" scoped>
.mask {
  background: rgba(0, 0, 0, .8);
}

.layui-layer {
  top: 50%;
  left: 50%;
  width: 300px;
  height: 500px;
  margin: -150px;
  margin-top: -250px;
  background: #fff;

  &.active {
    animation-fill-mode: both;
    animation-duration: .2s;
    animation-name: action-bounceIn;
  }

  .layui-layer-title {
    height: 20px;
    line-height: 20px;
    color: #333;
    background: #f8f8f8;
  }

  .layui-layer-content {
    padding: 0 10px !important;

    .layui-tab-item {
      line-height: 45px;

      li {
        border-bottom: 1px dotted #dcdcdc;
      }

      img {
        width: 30px;
        height: 30px;
        border-radius: 2px;
      }
    }
  }
}
</style>
