<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="home">
      <logo></logo>
    </el-menu-item>
    <el-menu-item index="3">Dashboard</el-menu-item>
    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">Proxy</a></el-menu-item>
  </el-menu>
</template>

<script>
import Logo from '@/components/Logo'
export default {
  name: 'Nav',
  data () {
    return {
      activeIndex: '3'
    }
  },
  methods: {
    handleSelect () {}
  },
  components: {
    Logo
  }
}
</script>
