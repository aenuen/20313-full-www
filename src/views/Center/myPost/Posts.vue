<template>
  <div class="overflow">
    <table class="layui-table">
      <thead>
      <tr class="text-center">
        <th>
          <div class="layui-table-cell pl0">
            <span>帖子标题</span>
          </div>
        </th>
        <th>
          <div class="layui-table-cell text-center">
            <span>状态</span>
          </div>
        </th>
        <th>
          <div class="layui-table-cell text-center">
            <span>结帖</span>
          </div>
        </th>
        <th>
          <div class="layui-table-cell text-center">
            <span>发表时间</span>
          </div>
        </th>
        <th>
          <div class="layui-table-cell text-center">
            <span>数据</span>
          </div>
        </th>
        <th class="min-cell">
          <div class="layui-table-cell text-center">
            <span>操作</span>
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in lists" :key="`posts_${index}`" class="text-center">
        <td class="text-left">
          <router-link
              class="link"
              :title="item.title"
              :to="{name:'postDetail',params:{pid:item._id}}"
          >
            {{ item.title }}
          </router-link>
        </td>
        <td>{{ item.status === '0' ? '打开' : '关闭' }}</td>
        <td :class="{'success': item.isEnd !=='0'}">{{ item.isEnd === '0' ? '未结' : '已结贴' }}</td>
        <!--suppress JSUnresolvedFunction -->
        <td>{{ item.created | dateDist }}</td>
        <td>{{ item['reads'] }}阅/{{ item['answer'] }}答</td>
        <td width="130">
          <div
              class="layui-btn layui-btn-xs"
              :class="{'layui-btn-disabled':item.isEnd==='1'}"
              @click="editPost(item)"
          >
            编辑
          </div>
          <div
              class="layui-btn layui-btn-xs layui-btn-danger"
              :class="{'layui-btn-disabled':item.isEnd==='1'}"
              @click="deletePost(item)"
          >
            删除
          </div>
        </td>
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
import { postDelete } from '@/api/post'
import { postHistory } from '@/api/post'

export default {
  name: 'ViewsCenterMyPostPosts',
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
      postHistory({
        page: this.current,
        limit: this.size
      }).then(({ code, data, total }) => {
        if (code === 200) {
          this.lists = data
          this.total = total
        }
      })
    },
    editPost (item) {
      if (item.isEnd === '0') {
        this.$router.push({
          name: 'postEdit',
          params: { pid: item._id, detail: item }
        })
      } else {
        this.$toast('该帖已结帖,无法编辑')
      }
    },
    deletePost (item) {
      if (item.isEnd === '0') {
        this.$confirm('确定删除这个帖子吗', () => {
          postDelete({ pid: item._id }).then(({ code, msg }) => {
            if (code === 200) {
              this.$toast(msg)
              this.lists.splice(this.lists.indexOf(item), 1)
            } else {
              this.$toast(msg)
            }
          })
        }, () => {
        })
      } else {
        this.$toast('该帖已结帖，无法删除')
      }
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
.overflow {
  overflow-y: auto;
}

.link {
  color: #01AAED;
}

.success {
  color: #5FB878;
}

.min-cell {
  min-width: 120px;
}
</style>
