<template>
  <el-menu :router="true" :default-active="activeIndex" class="top-nav" mode="horizontal" @select="handleSelect">
    <el-menu-item index="plugins">
      <logo></logo>
    </el-menu-item>
    <el-menu-item index="plugins">Dashboard</el-menu-item>
    <el-menu-item :index="plugin.name" :key="plugin.name" :route="{name: 'pluginPage', query: {name: plugin.name}}" v-for="plugin in pluginList">{{ plugin.name }}</el-menu-item>
    <el-dropdown class="project-selector" trigger="click">
      <el-button type="danger">
        No project<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Project Manager</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import Logo from '@/components/Logo'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Nav',
  data () {
    return {
      activeIndex: 'plugins'
    }
  },
  async created () {
    await this.refreshProjects()
    if (this.$route.name === 'pluginPage') {
      this.activeIndex = this.$route.query.name
    } else {
      this.activeIndex = 'plugins'
    }
  },
  methods: {
    ...mapActions([
      'refreshProjects'
    ]),
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

<style lang="scss">
  .top-nav {
    .project-selector {
      position: fixed;
      right: 20px;
      top: 30px;
      transform: translateY(-50%);
    }
  }
</style>
