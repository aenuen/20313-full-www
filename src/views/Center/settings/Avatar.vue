<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <div class="layui-form-item">
      <div class="avatar-add">
        <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
        <label for="F_input" class="layui-btn upload-img">
          <i class="layui-icon">&#xe67c;</i>上传头像
        </label>
        <input id="F_input" type="file" name="file" accept="image/png,image/jpg,image/gif" class="input" @change="upload" />
        <img :src="avatar" />
        <span class="loading" />
      </div>
    </div>
  </div>
</template>

<script>
import { contentUpload } from '@/api/content'
import { userAvatar } from '@/api/user'
export default {
  name: 'SettingsAvatar',
  data () {
    return {
      avatar: this.$store.state.userInfo.avatar,
      formData: ''
    }
  },
  methods: {
    upload (e) {
      const files = e.target.files
      const formData = new FormData()
      if (files.length > 0) {
        formData.append('file', files[0])
        this.formData = formData
      }
      contentUpload(formData).then((res) => {
        if (res.code === 200) {
          this.avatar = res.data
          userAvatar({ avatar: this.avatar }).then((res) => {
            if (res.code === 200) {
              const userInfo = this.$store.state.userInfo
              this.$set(this.$store.state.userInfo, 'avatar', this.avatar)
              this.$store.commit('setUserInfo', userInfo)
              this.$alert('图片上传成功')
            } else {
              this.$toast('更新失败')
            }
          })
        } else {
          this.$toast('上传失败')
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  display: none;
}
</style>
