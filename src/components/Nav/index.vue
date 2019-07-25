<template>
  <el-menu :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="plugins">
      <logo></logo>
    </el-menu-item>
    <el-menu-item index="plugins">Dashboard</el-menu-item>
    <el-menu-item :index="plugin.name" :key="plugin.name" :route="{name: 'pluginPage', query: {name: plugin.name}}" v-for="plugin in pluginList">{{ plugin.name }}</el-menu-item>
  </el-menu>
</template>

<script>
import Logo from '@/components/Logo'
import { mapGetters } from 'vuex'
export default {
  name: 'Nav',
  data () {
    return {
      activeIndex: 'plugins'
    }
  },
  methods: {
    handleSelect () {}
  },
  computed: {
    ...mapGetters({
      pluginList: 'getPlugins'
    })
  },
  components: {
    Logo
  }
}
</script>
