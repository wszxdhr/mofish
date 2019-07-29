<template>
  <div class="plugin-page">
    <iframe v-if="plugin && plugin.info && !plugin.info.isDev && plugin.info.frontendPath" :src="plugin.info.frontendPath" frameborder="0"></iframe>
    <iframe v-if="plugin && plugin.info && plugin.info.isDev && plugin.info.frontendDev" :src="plugin.info.frontendDev" frameborder="0"></iframe>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PluginPage',
  computed: {
    ...mapGetters({
      pluginList: 'getPlugins'
    }),
    plugin () {
      const pluginName = this.$route.query.name
      for (const plugin of this.pluginList) {
        if (plugin.name === pluginName) {
          return plugin
        }
      }
      return null
    }
  }
}
</script>

<style lang="scss">
  .plugin-page {
    iframe {
      display: block;
      width: 100%;
      height: calc(100vh - 61px);
    }
  }
</style>
