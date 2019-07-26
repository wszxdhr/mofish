<template>
  <div class="plugin-page">
    <iframe :src="`/frontend/${plugin.info.frontend}`" frameborder="0"></iframe>
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
      return {
        info: {}
      }
    }
  }
}
</script>

<style lang="scss">
  .plugin-page {
    iframe {
      width: 100%;
      height: calc(100vh - 61px);
    }
  }
</style>
