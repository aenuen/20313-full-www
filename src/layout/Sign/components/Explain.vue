<template>
  <div class="explain-wrap" v-show="explainShow">
    <div class="mask fixed-base" :style="{'z-index':explainIndex}" @click="closeExplain" />
    <div
        class="layui-layer layui-layer-page fixed-base"
        :style="{'z-index':explainIndex + 1}"
        :class="{active:explainShow}"
    >
      <div class="layui-layer-title pd2">
        签到说明
        <i class="layui-icon layui-icon-close f-right c-p" @click="closeExplain" />
      </div>
      <div class="layui-layer-content">
        <div class="layui-text">
          <blockquote class="layui-elem-quote">“签到”可获得的社区积分，规则如下</blockquote>
          <table class="layui-table">
            <thead>
            <tr>
              <th>连续签到天数</th>
              <th>每天可获积分</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in lists" :key="`tr${index}`">
              <td v-html="item.n" />
              <td>{{ item.d }}</td>
            </tr>
            </tbody>
          </table>
          <div>
            <p>中间若有间隔，则连续天数重新计算</p>
            <p class="orange">不可使用程序自动签到，否则积分清零</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default { // 签到说明
  name: 'LayoutSignComponentsExplain',
  props: {
    explainShow: {
      type: Boolean,
      default: false
    },
    explainIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      lists: [
        {
          n: '&lt;5',
          d: '5'
        },
        {
          n: '&ge;5',
          d: '10'
        },
        {
          n: '&ge;15',
          d: '15'
        },
        {
          n: '&ge;30',
          d: '20'
        },
        {
          n: '&ge;100',
          d: '30'
        },
        {
          n: '&ge;365',
          d: '50'
        }
      ]
    }
  },
  methods: {
    closeExplain () {
      this.$emit('closeExplain')
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
    animation-name: action-magnify;
  }

  .layui-layer-title {
    height: 20px;
    line-height: 20px;
    color: #333;
    background: #f8f8f8;
  }

  .layui-layer-content {
    padding: 20px;
  }
}
</style>
