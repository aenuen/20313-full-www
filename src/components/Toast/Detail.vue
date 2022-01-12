<template>
  <div class="tips animation" :class="{'shake':type==='shake'}" v-if="isShow" ref="tips">
    <div class="content">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: 'ComponentsPopDetail',
  props: {
    type: {
      type: String,
      default: 'shake'
    },
    msg: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    type () {
      this.type = this.type || 'shake'
    },
    isShow (nVal, oVal) {
      if (nVal !== oVal && nVal === true) {
        setTimeout(() => {
          const height = this.$refs.tips.clientHeight
          this.$refs.tips.marginTop = `-${height / 2}px`
          const width = this.$refs.tips.clientWidth
          this.$refs.tips.marginLeft = `-${width / 2}px`
        }, 0)
        setTimeout(() => {
          this.isShow = false
          this.type = ''
          this.msg = ''
        }, 3000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tips {
  position: fixed;
  left: 50%;
  top: 50%;

  &.animation {
    animation-fill-mode: both;
    animation-duration: .3s;
  }

  &.shake {
    animation-name: action-shake;
  }

  .content {
    background: rgba(0, 0, 0, .4);
    color: #fff;
    padding: 10px 15px;
    border-radius: 6px;
  }

}
</style>
