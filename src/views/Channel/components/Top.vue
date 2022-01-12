<template>
  <div class="fly-panel">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a class="layui-hide-sm layui-show-xs-block fly-right" style="color: #FF5722;">去签到</a>
    </div>
    <list-item :lists="lists" :show-more="false" />
  </div>
</template>

<script>
import ListItem from './ListItem'
import { publicPostList } from '@/api/public'

export default {
  name: 'ViewsItemComponentsTop',
  components: {
    ListItem
  },
  data () {
    return {
      page: 0,
      lists: []
    }
  },
  mounted () {
    this.getLists()
  },
  methods: {
    getLists () {
      publicPostList({ isTop: 1 }).then(({ code, data }) => {
        if (code === 200) {
          this.lists = this.lists.concat(data)
        }
      }).catch((err) => {
        err && err.msg && this.$alert(err.msg)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
