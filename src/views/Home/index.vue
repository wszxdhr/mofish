<template>
  <div class="home-page">
    <home-plugins></home-plugins>
  </div>
</template>

<script>
import HomePlugins from './plugins'
export default {
  name: 'home',
  components: {
    HomePlugins
  }
}
</script>

<style lang="scss">
  .home-page {
    padding: 20px;
  }
</style>
