<template>
  <div class="fly-panel">
    <h3 class="fly-panel-title">温馨通道</h3>
    <div class="fly-panel-main layui-row">
      <ul class="layui-clear quick">
        <li v-for="(item,index) in links" :key="index" class="layui-col-xs6">
          <a :href="item.link" target="_blank">{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { publicLinkList } from '@/api/public'

export default {
  name: 'ViewsItemSideBarTips',
  data () {
    return {
      links: []
    }
  },
  mounted () {
    this.getTips()
  },
  methods: {
    getTips () {
      publicLinkList({ type: 'tips' }).then(({ code, data }) => {
        if (code === 200) {
          this.links = data
        }
      }).catch((err) => {
        err && err.message && this.$alert(err.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$border-color: #f2f2f2;
.fly-panel-main {
  padding: 15px;

  .quick {
    border: 1px solid $border-color;
    border-bottom: none;
    border-right: none;

    .layui-col-xs6 {
      height: 40px;
      line-height: 40px;
      border: 1px solid $border-color;
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      border-top: none;
      border-left: none;

      a {
        display: block;
      }
    }
  }
}
</style>
