<template>
  <div id="app">
    <page-header />
    <router-view />
    <page-footer />
  </div>
</template>
<script>
import Header from '@/layout/Header'
import Footer from '@/layout/Footer'

export default {
  name: 'App',
  components: {
    'page-header': Header,
    'page-footer': Footer
  }
}
</script>

<style lang="scss">
@import 'assets/css/global.css';

.d-flex {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  &.flex-start {
    justify-content: flex-start;
  }

  &.flex-end {
    justify-content: flex-end;
  }

  &.flex-center {
    justify-content: center;
  }
}
</style>
