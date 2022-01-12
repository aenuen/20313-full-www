<template>
  <div class="layui-container fly-marginTop" :class="{'container-hide': isHide}">
    <div class="fly-panel" pad20 style="padding-top: 5px;">
      <!--<div class="fly-none">没有权限</div>-->
      <div class="layui-form layui-form-pane">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li class="layui-this">发表新帖</li>
          </ul>
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
            <validation-observer ref="observer" v-slot="{validate}">
              <div class="layui-tab-item layui-show">
                <form>
                  <div class="layui-row layui-col-space15 layui-form-item">
                    <div class="layui-col-md3">
                      <validation-provider name="catalog" rules="is_not:请选择" v-slot="{errors}">
                        <label class="layui-form-label">所在专栏</label>
                        <div class="layui-input-block" @click="changeCatalog()">
                          <div class="layui-unselect layui-form-select"
                               :class="{'layui-form-selected': isSelectCatalog}">
                            <div class="layui-select-title">
                              <input
                                  type="text"
                                  placeholder="请选择"
                                  readonly
                                  v-model="catalogAry[catalogIndex].text"
                                  class="layui-input layui-unselect"
                              />
                              <i class="layui-edge"></i>
                            </div>
                            <dl class="layui-anim layui-anim-upbit">
                              <dd
                                  v-for="(item,index) in catalogAry"
                                  :key="'catalog' + index"
                                  @click="chooseCatalog(item, index)"
                                  :class="{'layui-this': index === catalogIndex}"
                              >{{ item.text }}
                              </dd>
                            </dl>
                          </div>
                          <div class="layui-row">
                            <span style="color: #c00;">{{ errors[0] }}</span>
                          </div>
                        </div>
                      </validation-provider>
                    </div>
                    <div class="layui-col-md9">
                      <validation-provider name="title" rules="required" v-slot="{errors}">
                        <div class="layui-row">
                          <label for="F_title" class="layui-form-label">{{ fields.title }}</label>
                          <div class="layui-input-block">
                            <input
                                type="text"
                                id="F_title"
                                class="layui-input"
                                :placeholder="`请输入${fields.title}`"
                                autocomplete="off"
                                v-model="title"
                            />
                          </div>
                        </div>
                        <div class="layui-row">
                          <span style="color: #c00;">{{ errors[0] }}</span>
                        </div>
                      </validation-provider>
                    </div>
                  </div>
                  <editor @changeContent="editorWrite" :initContent="content" />
                  <div class="layui-form-item">
                    <div class="layui-inline">
                      <label class="layui-form-label">悬赏积分</label>
                      <div class="layui-input-inline" style="width: 190px;">
                        <div
                            class="layui-unselect layui-form-select"
                            :class="{'layui-form-selected': isSelectIntegral}"
                            @click="changeIntegral()"
                        >
                          <div class="layui-select-title">
                            <input
                                type="text"
                                placeholder="请选择"
                                readonly
                                v-model="integralAry[integralIndex]"
                                class="layui-input layui-unselect"
                            />
                            <i class="layui-edge"></i>
                          </div>
                          <dl class="layui-anim layui-anim-upbit">
                            <dd
                                v-for="(item,index) in integralAry"
                                :key="'integral' + index"
                                @click="chooseIntegral(item, index)"
                                :class="{'layui-this': index === integralIndex}"
                            >
                              {{ item }}
                            </dd>
                          </dl>
                        </div>
                      </div>
                      <div class="layui-form-mid layui-word-aux">发表后无法更改积分</div>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <div class="layui-form-mid">
                      <auth-code />
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
                    <button type="button" class="layui-btn" @click="validate().then(submitCreate)">立即发布</button>
                  </div>
                </form>
              </div>
            </validation-observer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fields } from '@/components/Fields'
import AuthCode from '@/layout/AuthCode'
import Editor from '@/components/Editor'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { postCreate } from '@/api/post'

export default {
  name: 'ViewsPostCreate',
  components: {
    AuthCode,
    Editor,
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      fields,
      isSelectCatalog: false,
      isSelectIntegral: false,
      catalogIndex: 0,
      integralIndex: 0,
      catalogAry: [ // 分类
        {
          text: '请选择',
          value: ''
        },
        {
          text: '提问',
          value: 'ask'
        },
        {
          text: '分享',
          value: 'share'
        },
        {
          text: '讨论',
          value: 'discuss'
        },
        {
          text: '建议',
          value: 'advise'
        }
      ],
      integralAry: [20, 30, 50, 60, 80], // 积分
      title: '',
      content: '',
      authCode: ''
    }
  },
  computed: {
    isHide () {
      return this.$store.state.containerHide
    }
  },
  mounted () {
    const postData = localStorage.getItem('postData')
    if (postData && postData !== '') {
      this.$confirm('是否加载未编辑完的内容？', () => {
        const obj = JSON.parse(postData)
        this.content = obj.content
        this.title = obj.title
        this.catalogIndex = obj.catalogIndex
        this.integralIndex = obj.integralIndex
      }, () => {
        localStorage.setItem('postData', '')
      })
    }
  },
  methods: {
    changeCatalog () {
      this.isSelectCatalog = !this.isSelectCatalog
    },
    chooseCatalog (item, index) {
      this.catalogIndex = index
    },
    changeIntegral () {
      this.isSelectIntegral = !this.isSelectIntegral
    },
    chooseIntegral (item, index) {
      this.integralIndex = index
    },
    editorWrite (val) {
      this.content = val
      const getData = {
        title: this.title,
        catalogIndex: this.catalogIndex,
        content: this.content,
        integralIndex: this.integralIndex
      }
      if (this.title.trim() !== '' && this.content.trim() !== '') {
        localStorage.setItem('postData', JSON.stringify(getData))
      }
    },
    async submitCreate () {
      // noinspection JSUnresolvedFunction
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        if (this.content.trim() === '') { // 帖子内容是否为空的判断
          this.$alert('帖子内容不得为空！')
        } else {
          // 发布帖子
          postCreate({
            title: this.title,
            catalog: this.catalogAry[this.catalogIndex].value,
            content: this.content,
            integral: this.integralAry[this.integralIndex],
            authCode: this.authCode,
            sid: this.$store.state.sid
          }).then(({ code, msg, data }) => {
            if (code === 200) {
              // 清空已经发布的内容
              localStorage.setItem('postData', '')
              this.$toast('发帖成功，在3秒后跳转~~')
              setTimeout(() => {
                this.$router.push({ name: 'postDetail', params: { tid: data._id } })
              }, 3000)
            } else {
              this.$alert(msg)
            }
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container-hide {
  position: absolute;
  overflow: hidden;
  height: 0;
}
</style>
