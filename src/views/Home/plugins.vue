<template>
  <el-card class="home-plugins" shadow="hover">
    <div slot="header" class="clearfix">
      <span>Plugins</span>
      <el-button style="float: right; padding: 3px 0" type="text">Add plugin</el-button>
    </div>
    <div class="tac text-main ">There's no plugin here, click on the top right corner to add a plugin.</div>
  </el-card>
</template>

<script>
import { getPlugins } from '@/api/service/plugins'
export default {
  name: 'HomePlugins',
  created () {
    console.log(getPlugins)
    getPlugins()
  }
}
</script>

<style lang="scss">
</style>
