<template>
  <el-container class="home-page">
    <el-aside width="200px">
      <el-menu default-active="homePlugins" class="home-page-menu">
        <el-menu-item index="homePlugins" :route="{name: 'homePlugins'}">Plugins</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="home-page-content">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
    }
  },
  components: {
  }
}
</script>

<style lang="scss">
  .home-page {
    &-content {
      padding: 20px;
    }
    &-menu {
      height: calc(100vh - 61px);
    }
  }
</style>
