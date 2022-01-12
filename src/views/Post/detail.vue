<template>
  <div class="layui-container">
    <menu-bar />
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8 content detail">
        <div class="fly-panel detail-box">
          <h1>{{ detail.title }}</h1>
          <div class="fly-detail-info">
            <!-- <span class="layui-badge">审核中</span> -->
            <span
                v-for="(item,index) in catalog"
                v-if="detail.catalog===index"
                :key="`catalog_${index}`"
                class="layui-badge layui-bg-green fly-detail-column"
            >
              {{ item }}
            </span>
            <span v-if="parseInt(detail.isEnd)===0" class="layui-badge" style="background-color: #999;">未结</span>
            <span v-else class="layui-badge" style="background-color: #5FB878;">已结</span>
            <span v-if="parseInt(detail.isTop)===1" class="layui-badge layui-bg-black">置顶</span>
            <span
                v-for="(tag,index) in detail.tags"
                :key="`tag_${index}`"
                :class="tag.class"
            >
              {{ tag.name }}
            </span>

            <div class="fly-admin-box" v-hasRole="'admin'">
              <span class="layui-btn layui-btn-xs jie-admin" type="del">删除</span>
              <span v-if="detail.isTop" class="layui-btn layui-btn-xs jie-admin">置顶</span>
              <span v-else class="layui-btn layui-btn-xs jie-admin" style="background-color:#ccc;">取消置顶</span>
            </div>
            <span class="fly-list-nums">
            <a href=""><i class="iconfont" title="回答">&#xe60c;</i>{{ detail['answer'] }}</a>
            <i class="iconfont" title="人气">&#xe60b;</i> {{ detail['reads'] }}
          </span>
          </div>
          <!-- 作者相关 -->
          <div class="detail-about">
            <a class="fly-avatar" href="javascript:">
              <img :src="detail.uid ? detail.uid.avatar : '/images/header.jpg'" alt="头像">
            </a>
            <div class="fly-detail-user">
              <a href="javascript:" class="fly-link">
                <cite>{{ detail.uid ? detail.uid.nickname : '' }}</cite>
                <!--<i class="iconfont icon-renzheng" title="认证信息" />-->
                <i
                    v-if="detail.uid && detail.uid.isVip !== '0' ? detail.uid.isVip : false"
                    class="layui-badge fly-badge-vip mr1"
                >
                  VIP{{ detail.uid.isVip }}
                </i>
              </a>
              <!--suppress JSUnresolvedFunction -->
              <span>{{ detail.created | dateDist }}</span>
            </div>
            <div class="detail-hits">
              <span style="padding-right: 10px; color: #FF7200">悬赏：{{ detail.integral }}积分</span>
            </div>
            <div class="layui-btn-container fly-detail-admin">
              <router-link
                  v-if="detail.isEnd === '0' && detail.uid._id === userInfo._id"
                  :to="{name:'postEdit',params:{pid,detail}}"
                  class="layui-btn layui-btn-sm jie-admin jie-admin-edit"
              >
                编辑
              </router-link>
              <a
                  class="layui-btn layui-btn-sm jie-admin jie-admin-collect"
                  :class="{'layui-btn-primary': detail['isCollect'] === 1}"
                  @click.prevent="setCollect(detail)"
              >
                {{ detail['isCollect'] === 1 ? '取消收藏' : '收藏' }}
              </a>
            </div>
          </div>
          <!-- 帖子内容 -->
          <div class="detail-body photos" v-html="content" />
        </div>
        <!-- 回帖相关内容 -->
        <div class="fly-panel detail-box" id="flyReply">
          <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
            <legend>回帖</legend>
          </fieldset>

          <ul class="jieda" id="jieda">
            <li
                v-for="(item,index) in comments"
                :key="`comments_${index}`"
                class="jieda-daan">
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar" href="">
                  <img :src="item.uid?item.uid.avatar:'/images/header.jpg'" alt="头像">
                </a>
                <div class="fly-detail-user">
                  <a href="" class="fly-link">
                    <cite>{{ item.uid ? item.uid.nickname : '' }}</cite>
                    <!--<i class="iconfont icon-renzheng" title="认证信息：XXX" />-->
                    <i
                        v-if="item.uid && item.uid.isVip !== '0' ? item.uid.isVip : false"
                        class="layui-badge fly-badge-vip"
                    >
                      VIP{{ item.uid.isVip }}
                    </i>
                  </a>
                  <span v-show="index===0">(楼主)</span>
                  <!--
                  <span style="color:#5FB878">(管理员)</span>
                  <span style="color:#FF9E3F">（社区之光）</span>
                  <span style="color:#999">（该号已被封）</span>
                  -->
                </div>
                <div class="detail-hits">
                  <!--suppress JSUnresolvedFunction -->
                  <span>{{ item.created | dateDist }}</span>
                </div>
                <i
                    v-if="item['isBest'] === '1'"
                    class="iconfont icon-caina"
                    title="最佳答案"
                />
              </div>
              <!--suppress HtmlUnknownAttribute -->
              <div class="detail-body jieda-body photos" v-richtext="item.content" />
              <div class="jieda-reply">
                <span
                    class="jieda-zan"
                    :class="{'zanok': item['liked']==='1'}"
                    type="zan"
                    @click="commentLike(item)"
                >
                  <i class="iconfont icon-zan" />
                  <em>{{ item['like'] }}</em>
                </span>
                <span type="reply" @click="commentReply(item)">
                  <i class="iconfont icon-svgmoban53" />回复
                </span>
                <div class="jieda-admin">
                  <span
                      v-show="detail.isEnd === '0' && detail.uid._id === userInfo._id"
                      @click="commentEdit(item)"
                  >
                    编辑
                  </span>
                  <span type="del">删除</span>
                  <span
                      v-show="detail.isEnd === '0' && detail.uid._id === userInfo._id"
                      class="jieda-accept"
                      @click="commentBest(item,index)"
                  >
                    采纳
                  </span>
                </div>
              </div>
            </li>
            <li v-if="comments.length === 0" class="fly-none">消灭零回复</li>
          </ul>

          <!-- 评论分页 -->
          <pagination
              v-if="total>size"
              :showType="'icon'"
              :hasSelect="true"
              :hasTotal="true"
              :showEnd="true"
              :total="total"
              :size="size"
              :current="current"
              @changeCurrent="pageChange"
              @changeLimit="pageLimit"
          />

          <!-- 回复框 -->
          <validation-observer ref="observer" v-slot="{validate}">
            <div class="layui-form layui-form-pane">
              <form>
                <div class="layui-form-item">
                  <editor @changeContent="writeComment" :initContent="comment" />
                </div>
                <div class="layui-form-item">
                  <div class="layui-form-mid">
                    <auth-code ref="authCode" />
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="F_authCode" class="layui-form-label">{{ fields.authCode }}</label>
                  <validation-provider
                      name="authCode"
                      ref="authCodeField"
                      rules="required|length:4|alpha_num"
                      v-slot="{errors}"
                  >
                    <div class="layui-input-inline">
                      <input
                          type="text"
                          id="F_authCode"
                          name="authCode"
                          v-model.trim="authCode"
                          maxlength="4"
                          autocomplete="off"
                          class="layui-input"
                          :placeholder="`请输入${fields.authCode}`"
                      >
                    </div>
                    <div class="layui-form-mid errors">{{ errors[0] }}</div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <button type="button" class="layui-btn" @click="validate().then(commentSubmit)">提交回复</button>
                </div>
              </form>
            </div>
          </validation-observer>
        </div>
      </div>
      <div class="layui-col-md4">
        <hot-list />
        <ads />
        <links />
      </div>
    </div>
  </div>
</template>

<script>
import { fields, catalog } from '@/components/Fields'
import { escapeHtml } from '@/utils/escapeHtml'
import MenuBar from '@/layout/MenuBar'
import HotList from '@/layout/SideBar/HotList'
import Ads from '@/layout/SideBar/Ads'
import Links from '@/layout/SideBar/Links'
import AuthCode from '@/layout/AuthCode'
import Editor from '@/components/Editor'
import Pagination from '@/components/Pagination'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { scrollToElement } from '@/utils/common'
import { publicPostDetail, publicCommentList } from '@/api/public'
import { commentCreate, commentUpdate, commentSetBest, commentSetLike } from '@/api/comment'
import { collectToggle } from '@/api/collect'

export default {
  name: 'detail',
  props: ['pid'],
  components: {
    MenuBar,
    HotList,
    Ads,
    Links,
    AuthCode,
    Editor,
    Pagination,
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      fields,
      catalog,
      authCode: '',
      total: 0,
      current: 0,
      size: 10,
      detail: {},
      comments: [],
      comment: '',
      tempCid: '',
      tempItem: {}
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    content () {
      if (typeof this.detail.content !== 'undefined') {
        if (this.detail.content.trim() !== '') {
          return escapeHtml(this.detail.content)
        } else {
          return ''
        }
      } else {
        return ''
      }
    }
  },
  watch: {
    pid () {
      this.getPostDetail()
      this.getPostComments()
    }
  },
  mounted () {
    this.getPostDetail()
    this.getPostComments()
  },
  methods: {
    pageChange (val) {
      this.current = val
      this.getPostComments()
    },
    pageLimit (val) {
      this.size = val
      this.getPostComments()
    },
    getPostDetail () {
      publicPostDetail({ pid: this.pid }).then(({ code, data }) => {
        if (code === 200) {
          this.detail = data
          console.log(data)
        }
      })
    },
    getPostComments () {
      publicCommentList({
        pid: this.pid,
        current: this.current,
        size: this.size
      }).then(({ code, data, count }) => {
        if (code === 200) {
          this.comments = data
          this.total = count
        }
      })
    },
    writeComment (val) {
      this.comment = val
    },
    async commentSubmit () {
      // noinspection JSUnresolvedFunction
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        const isLogin = this.$store.state.isLogin
        if (!isLogin) {
          this.$toast('请先登录')
        } else {
          const sid = this.$store.state.sid
          const userInfo = this.$store.state.userInfo
          const userData = {
            _id: userInfo._id,
            nickname: userInfo.nickname,
            avatar: userInfo.avatar,
            isVip: userInfo.isVip
          }
          if (userInfo.status !== '0') { // 用户禁言状态判断
            this.$toast('已被禁言，请联系管理员')
          } else {
            if (typeof this.tempCid !== 'undefined' && this.tempCid !== '') {
              if (this.comment === this.tempItem.content) {
                this.$toast('评论内容没有任何改动')
              } else {
                commentUpdate({
                  authCode: this.authCode,
                  sid,
                  cid: this.tempCid,
                  comment: this.comment
                }).then(({ code, msg }) => {
                  if (code === 200) {
                    this.$toast(msg)
                    const tempItem = this.tempItem
                    tempItem.content = this.comment
                    this.comments.splice(this.comments.indexOf(this.tempItem), 1, tempItem)
                    this.resetData()
                  } else {
                    this.$alert(msg)
                  }
                })
              }
            } else {
              commentCreate({
                authCode: this.authCode,
                sid,
                pid: this.pid,
                comment: this.comment
              }).then(({ code, msg, data }) => {
                if (code === 200) {
                  this.$toast(msg)
                  data.uid = userData
                  this.comments.push(data)
                  this.resetData()
                } else {
                  this.$alert(msg)
                }
              })
            }
          }
        }
      }
    },
    resetData () {
      this.tempCid = ''
      this.tempItem = {}
      this.comment = ''
      this.authCode = ''
      requestAnimationFrame(() => {
        // noinspection JSUnresolvedFunction
        this.$refs.observer && this.$refs.observer.reset()
      })
      this.$refs.authCode.getCaptcha()
    },
    commentEdit (item) {
      this.comment = item.content
      // 动态滚动到输入框的位置，并且进行focus
      scrollToElement('#editor', 500, -65)
      document.getElementById('editorTextarea').focus()
      this.tempCid = item._id
      this.tempItem = item
    },
    commentBest (item) {
      this.$confirm('确定采纳为最佳答案吗？', () => {
        commentSetBest({ pid: item.pid, cid: item._id }).then(({ code, msg }) => {
          if (code === 200) {
            this.$toast(msg)
            this.detail.isEnd = '1'
            item.isBest = '1'
          } else {
            this.$toast(msg)
          }
        })
      }, () => {
      })
    },
    commentLike (item) {
      commentSetLike({ cid: item._id }).then(({ code, msg, data }) => {
        if (code === 200) {
          this.$toast(msg)
          item.liked = data === 1 ? '1' : '0'
          item.like += data
        } else {
          this.$toast(msg)
        }
      })
    },
    commentReply (item) {
      const reg = /^@[\S]+/g
      if (this.comment) {
        if (reg.test(this.comment)) {
          this.comment = this.comment.replace(reg, '@' + item.uid.nickname + ' ')
        } else {
          if (this.comment !== '') { // 非空的情况
            this.comment = `@${item.uid.nickname} ${this.comment}`
          }
        }
      } else { // 评论框为空
        this.comment = '@' + item.uid.nickname + ' '
      }
      scrollToElement('#editor', 500, -65)
      document.getElementById('editorTextarea').focus()
    },
    setCollect () {
      // 设置收藏 & 取消收藏
      const isLogin = this.$store.state.isLogin
      if (isLogin) {
        const collect = {
          pid: this.pid,
          title: this.detail.title,
          isCollect: this.detail.isCollect ? 1 : 0
        }
        collectToggle(collect).then(({ code, data }) => {
          if (code === 200) {
            this.detail.isCollect = data.isCollect
            this.$toast(this.detail.isCollect ? '设置收藏成功' : '取消收藏成功')
            console.log(this.detail)
          }
        })
      } else {
        this.$toast('请先登录后再进行收藏！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fly-detail-admin {
  text-align: right;
  border-top: 1px dotted #eaeaea;
  background: #f8f8f8;
}

.fly-detail-info {
  span {
    margin-right: 5px;
  }
}

.jieda-body {
  margin: 25px 0 20px !important;
}
</style>
