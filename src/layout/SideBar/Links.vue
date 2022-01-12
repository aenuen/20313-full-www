<template>
  <div class="fly-panel fly-link">
    <h3 class="fly-panel-title">友情链接</h3>
    <dl class="fly-panel-main">
      <dd v-for="(item,index) in links" :key="index">
        <a :href="item.link" target="_blank">{{ item.title }}</a>
      </dd>
      <dd>
        <router-link :to="{name:'home'}" class="fly-link">申请友链</router-link>
      </dd>
    </dl>
  </div>
</template>

<script>
import { publicLinkList } from '@/api/public'

export default {
  name: 'ViewsItemSideBarLinks',
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
      publicLinkList({ type: 'links' }).then(({ code, data }) => {
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
</style>
