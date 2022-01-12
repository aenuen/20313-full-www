<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block" id="editor">
        <div class="layui-unselect fly-edit" ref="icons">
          <!-- 表情 -->
          <span @click="choose(0)">
            <i class="iconfont icon-yxj-expression" />
          </span>
          <span @click="choose(1)">
            <i class="iconfont icon-image" />
          </span>
          <span @click="choose(2)">
            <i class="iconfont icon-link" />
          </span>
          <span class="quote" @click="choose(3)">”</span>
          <span @click="choose(4)">
            <i class="iconfont icon-quote-right" />
          </span>
          <span @click="addHr()">hr</span>
          <span @click="choose(6)">
            <i class="iconfont icon-preview" />
          </span>
        </div>
        <textarea
            id="editorTextarea"
            class="layui-textarea fly-editor"
            ref="textEdit"
            v-model="content"
            @focus="focusEvent()"
            @blur="blurEvent()"
        />
      </div>
    </div>
    <div ref="modal">
      <face :isShow="current === 0" @closeEvent="closeModal()" @addEvent="addFace" />
      <image-upload :isShow="current === 1" @closeEvent="closeModal()" @addEvent="addPic" />
      <link-add :isShow="current === 2" @closeEvent="closeModal()" @addEvent="addLink" />
      <quote :isShow="current === 3" @closeEvent="closeModal()" @addEvent="addQuote" />
      <code-input
          :isShow="current === 4"
          :width="codeWidth"
          :height="codeHeight"
          @closeEvent="closeModal()"
          @addEvent="addCode"
      />
      <preview :isShow="current === 6" :content="content" @closeEvent="closeModal()" />
    </div>
  </div>
</template>

<script>
import Face from './Face'
import ImageUpload from './ImageUpload'
import LinkAdd from './LinkAdd'
import Quote from './Quote'
import CodeInput from './Code'
import Preview from './Preview'

export default {
  name: 'ComponentsEditor',
  props: ['initContent'],
  components: {
    Face,
    ImageUpload,
    LinkAdd,
    Quote,
    CodeInput,
    Preview
  },
  data () {
    return {
      current: '',
      codeWidth: 400,
      codeHeight: 200,
      content: '',
      pos: ''
    }
  },
  watch: {
    initContent (nVal) {
      this.content = nVal
    }
  },
  updated () {
    this.$emit('changeContent', this.content)
  },
  methods: {
    closeModal () {
      this.current = ''
    },
    focusEvent () {
      this.getPos()
    },
    blurEvent () {
      this.getPos()
    },
    getPos () { // 计算光标的当前位置
      let cursorPos = 0
      let elem = document.getElementById('editorTextarea')
      // noinspection JSUnresolvedVariable
      if (document.selection) { // IE
        let selectRange = document.selection.createRange()
        // noinspection JSUnresolvedFunction
        selectRange.moveStart('character', -elem.value.length)
        cursorPos = selectRange.text.length
      } else if (elem.selectionStart || elem.selectionStart === '0') {
        cursorPos = elem.selectionStart
      }
      this.pos = cursorPos
    },
    // 添加表情
    addFace (item) {
      const insertContent = ` face${item}`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加图片链接
    addPic (item) {
      const insertContent = ` img[${item}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加链接
    addLink (item) {
      const insertContent = ` a(${item})[${item}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加代码
    addCode (item) {
      const insertContent = ` \n[pre]\n${item}\n[/pre]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加引用
    addQuote (item) {
      const insertContent = ` \n[quote]\n${item}\n[/quote]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加hr
    addHr () {
      this.insert('\n[hr]')
      this.pos += 5
    },
    choose (index) {
      if (index === this.current) {
        this.closeModal()
      } else {
        this.current = index
      }
    },
    handleBodyClick (e) {
      e.stopPropagation()
      // 触发隐藏本组件的关闭事件，改变isShow
      // 判断是否点击到了非控制ICON以外 + 本组件 的地方
      if (!(this.$refs.icons.contains(e.target) || this.$refs.modal.contains(e.target))) {
        this.closeModal()
      }
    },
    insert (val) {
      if (typeof this.content === 'undefined') {
        return
      }
      let tmp = this.content.split('')
      tmp.splice(this.pos, 0, val)
      this.content = tmp.join('')
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
    this.codeWidth = this.$refs.textEdit.offsetWidth - 60
    this.codeHeight = this.$refs.textEdit.offsetHeight - 80
    window.addEventListener('resize', () => {
      this.codeWidth = this.$refs.textEdit.offsetWidth - 60
      this.codeHeight = this.$refs.textEdit.offsetHeight - 80
    })
  },
  beforeDestroy () {
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
  }
}
</script>

<style lang="scss">
.fly-editor {
  height: 260px;
}

.quote {
  font-size: 22px;
  vertical-align: middle;
  position: relative;
  top: 4px;
}

.edit-wrap {
  position: relative;
}

.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
  z-index: 100;
  background: #fff;
}

.icon-quote-right {
  position: relative;
  top: 2px;
}

.layui-layer-prompt {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
</style>
