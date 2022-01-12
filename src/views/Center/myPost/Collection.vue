<template>
  <div>
    <table class="layui-table">
      <thead>
      <tr class="text-center">
        <th>
          <div class="layui-table-cell pl0">
            <span>帖子标题</span>
          </div>
        </th>
        <th class="date">
          <div class="layui-table-cell text-center">
            <span>收藏时间</span>
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in lists" :key="`collect_${index}`" class="text-center">
        <td class="text-left">
          <router-link
              class="link"
              :title="item.title"
              :to="{name:'postDetail',params:{pid:item.pid}}"
          >
            {{ item.title }}
          </router-link>
        </td>
        <!--suppress JSUnresolvedFunction -->
        <td>{{ item.created | dateDist }}</td>
      </tr>
      </tbody>
    </table>
    <pagination
        :showType="'icon'"
        :hasSelect="true"
        :hasTotal="true"
        :showEnd="true"
        :total="total"
        :size="limit"
        :current="current"
        @changeCurrent="pageChange"
        @changeLimit="pageLimit"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { collectList } from '@/api/collect'

export default {
  name: 'ViewsCenterMyPostCollection',
  components: {
    Pagination
  },
  data () {
    return {
      current: 0,
      limit: 10,
      lists: [],
      total: 0
    }
  },
  mounted () {
    this.getPostList()
  },
  methods: {
    getPostList () {
      collectList({
        page: this.current,
        limit: this.size
      }).then(({ code, data, total }) => {
        if (code === 200) {
          this.lists = data
          this.total = total
        }
      })
    },
    pageChange (val) {
      this.current = val
      this.getPostComments()
    },
    pageLimit (val) {
      this.size = val
      this.getPostComments()
    }
  }
}
</script>

<style lang="scss" scoped>
.date {
  width: 100px;
}

.link {
  color: #01AAED;
}
</style>
