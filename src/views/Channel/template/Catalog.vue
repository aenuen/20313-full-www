<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <abbott-list />
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
import List from '@/views/Channel/components/List'
import HotList from '@/layout/SideBar/HotList'
import Ads from '@/layout/SideBar/Ads'
import Links from '@/layout/SideBar/Links'

export default {
  name: 'ViewsItemTemplateCatalog',
  components: {
    'abbott-list': List,
    HotList,
    Ads,
    Links
  }
}
</script>

<style lang="scss" scoped>
</style>
