<template>
  <div class="fly-panel" style="margin-bottom: 0;">
    <div class="fly-panel-title fly-filter">
      <a :class="{'layui-this':status===''&&tag===''}" @click.prevent="search()">综合</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this':status==='0'}" @click.prevent="search(0)">未结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this':status==='1'}" @click.prevent="search(1)">已结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this':status===''&&tag==='精华'}" @click.prevent="search(2)">精华</a>
      <span class="fly-filter-right layui-hide-xs">
        <a :class="{'layui-this':sort === 'created'}" @click.prevent="search(3)">按最新</a>
        <span class="fly-mid"></span>
        <a :class="{'layui-this':sort === 'answer'}" @click.prevent="search(4)">按热议</a>
      </span>
    </div>
    <list-item :lists="lists" :is-end="isEnd" @nextPage="nextPage" />
  </div>
</template>

<script>
import { publicPostList } from '@/api/public'
import ListItem from './ListItem'

export default {
  name: 'ViewsItemComponentsList',
  components: {
    ListItem
  },
  data () {
    return {
      status: '',
      tag: '',
      sort: 'created',
      page: 0,
      limit: 20,
      catalog: '',
      lists: [],
      isEnd: false,
      isReady: true,
      current: ''
    }
  },
  watch: {
    current () {
      this.newAction()
    },
    $route () {
      this.getAction()
      this.newAction()
    }
  },
  mounted () {
    this.getAction()
    this.getLists()
  },
  methods: {
    getLists () {
      if (!this.isEnd && this.isReady) {
        const options = {
          catalog: this.catalog,
          isTop: 0,
          page: this.page,
          limit: this.limit,
          sort: this.sort,
          status: this.status,
          tag: this.tag
        }
        this.isReady = false
        publicPostList(options).then(({ data }) => {
          if (this.lists.length < this.limit) {
            this.isEnd = true
          }
          if (this.lists.length === 0) {
            this.lists = data
          } else {
            this.lists = this.lists.concat(data)
          }
          this.isReady = true
        }).catch((err) => {
          err && err.message && this.$alert(err.message)
          this.isReady = true
        })
      }
    },
    getAction () {
      const catalog = this.$route.params.catalog
      if (typeof catalog !== 'undefined' && catalog !== '') {
        this.catalog = catalog
      }
    },
    newAction () {
      this.page = 0
      this.isEnd = false
      this.lists = []
      this.getLists()
    },
    nextPage () {
      this.page++
      this.getLists()
    },
    search (val) {
      if (typeof val === 'undefined' && this.current === '') {
        return
      }
      this.current = val
      switch (val) {
        case 0: // 未结
          this.status = '0'
          this.tag = ''
          break
        case 1: // 已结
          this.status = '1'
          this.tag = ''
          break
        case 2: // 精华
          this.status = ''
          this.tag = '精华'
          break
        case 3: // 日期
          this.sort = 'created'
          break
        case 4: // 回复
          this.sort = 'answer'
          break
        default: // 综合
          this.status = ''
          this.tag = ''
          this.current = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fly-panel-title {
  a {
    cursor: pointer;
  }
}
</style>
