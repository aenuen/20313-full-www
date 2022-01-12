<template>
  <div>
    <menu-bar />
    <router-view />
  </div>
</template>

<script>
import MenuBar from '@/layout/MenuBar'

export default {
  name: 'ViewItemMain',
  components: {
    MenuBar
  }
}
</script>

<style lang="scss" scoped>
</style>
