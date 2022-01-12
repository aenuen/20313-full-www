<template>
  <div>
    <ul class="fly-list">
      <li v-for="(item,index) in items" :key="index">
        <a href="javascript:" class="fly-avatar">
          <img :src="item.uid.avatar" :alt="item.uid.nickname">
        </a>
        <h2>
          <a class="layui-badge">{{ item.catalog }}</a>
          <router-link :to="{name:'postDetail',params:{pid:item._id}}">{{ item.title }}</router-link>
        </h2>
        <div class="fly-list-info">
          <a href="javascript:" link>
            <cite>{{ item.uid.nickname }}</cite>
            <i class="layui-badge fly-badge-vip" v-if="item.uid.isVip !== '0'">VIP {{ item.uid.isVip }}</i>
          </a>
          <!--suppress JSUnresolvedFunction -->
          <span>{{ item.created | dateDist }}</span>
          <span class="fly-list-kiss layui-hide-xs" title="悬赏积分">
            <i class="iconfont icon-kiss" />
            {{ item.integral }}
          </span>
          <span class="layui-badge fly-badge-accept layui-hide-xs" v-show="item.status !== '0'">
            已结
          </span>
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1" title="回答" />
            {{ item['answer'] }}
          </span>
        </div>
        <div class="fly-list-badge" v-show="item.tags.length > 0 && item.tags[0].name !== ''">
          <span
              class="layui-badge"
              v-for="(tag,index) in item.tags"
              :key="index"
              :class="tag.class"
          >
            {{ tag.name }}
          </span>
        </div>
      </li>
    </ul>
    <div style="text-align: center" v-show="showMore">
      <div v-if="isEnd" class="no-more gray">没有更多了</div>
      <div v-else class="laypage-main">
        <a @click.prevent="more" class="laypage-next">更多求解</a>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'ViewsItemComponentsListItem',
  props: {
    lists: {
      type: Array,
      default: () => []
    },
    showMore: {
      type: Boolean,
      default: true
    },
    isEnd: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    items () {
      _.map(this.lists, (item) => {
        switch (item.catalog) {
          case 'ask':
            item.catalog = '提问'
            break
          case 'share':
            item.catalog = '分享'
            break
          case 'discuss':
            item.catalog = '讨论'
            break
          case 'advise':
            item.catalog = '建议'
            break
          case 'notice':
            item.catalog = '动态'
            break
          case 'logs':
            item.catalog = '动态'
            break
        }
      })
      return this.lists
    }
  },
  methods: {
    more () {
      this.$emit('nextPage')
    }
  }
}
</script>

<style lang="scss" scoped>
.laypage-next {
  cursor: pointer;
}

.no-more {
  font-size: 16px;
  padding: 30px 0;
}
</style>
