<template>
  <div id="app">
    <nav-header></nav-header>
    <router-view/>
  </div>
</template>

<script>
import NavHeader from '@/components/Nav/index.vue'
export default {
  name: 'App',
  components: {
    NavHeader
  }
}
</script>

<style lang="scss">
</style>
