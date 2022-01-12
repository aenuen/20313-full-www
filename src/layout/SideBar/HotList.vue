<template>
  <dl class="fly-panel fly-list-one">
    <dt class="fly-panel-title">本周热议</dt>
    <template v-if="lists.length>0">
      <dd v-for="(item,index) in lists" :key="`HotList-${index}`">
        <router-link :to="{name:'postDetail',params:{pid:item._id}}">{{ item.title }}</router-link>
        <span><i class="iconfont icon-pinglun1" />{{ item['answer'] }}</span>
      </dd>
    </template>
    <div v-else class="layui-none gray">暂无相关数据</div>
  </dl>
</template>

<script>
import { publicPostTopWeek } from '@/api/public'

export default {
  name: 'ViewsItemSideBarHotList',
  data () {
    return {
      lists: []
    }
  },
  mounted () {
    this.getLists()
  },
  methods: {
    getLists () {
      publicPostTopWeek().then(({ code, data }) => {
        if (code === 200) {
          this.lists = data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-none {
  padding: 30px 0;
  text-align: center;
}
</style>
