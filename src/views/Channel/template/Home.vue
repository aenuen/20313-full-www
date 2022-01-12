<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <top />
        <abbott-list />
      </div>
      <div class="layui-col-md4">
        <tips />
        <sign />
        <hot-list />
        <ads />
        <links />
      </div>
    </div>
  </div>
</template>

<script>
import Top from '@/views/Channel/components/Top'
import List from '@/views/Channel/components/List'
import Tips from '@/layout/SideBar/Tips'
import Sign from '@/layout/Sign'
import HotList from '@/layout/SideBar/HotList'
import Ads from '@/layout/SideBar/Ads'
import Links from '@/layout/SideBar/Links'

export default {
  name: 'ViewsItemTemplateHome',
  components: {
    Top,
    'abbott-list': List,
    Tips,
    Sign,
    HotList,
    Ads,
    Links
  }
}
</script>

<style lang="scss" scoped>
</style>
