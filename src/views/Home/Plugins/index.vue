<template>
  <section class="home-plugins">
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span>Plugins</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="showAddDialog = true">Add plugin</el-button>
      </div>
      <div class="tac text-placeholder">There's no plugin here, click on the top right corner to add a plugin.</div>
    </el-card>
    <el-dialog title="Add plugin" :visible.sync="showAddDialog" width="600px">
      <el-autocomplete :debounce="500" placeholder="Input name to search plugins." v-model="pluginSearchParam" class="plugin-search-input"></el-autocomplete>
    </el-dialog>
  </section>
</template>

<script>
import { getPlugins } from '@/api/service/plugins'
export default {
  name: 'HomePlugins',
  data () {
    return {
      // 展示添加插件的模态框
      showAddDialog: false,
      // 添加插件的搜索框
      pluginSearchParam: ''
    }
  },
  created () {
    console.log(getPlugins)
    getPlugins()
  }
}
</script>

<style lang="scss">
  .home-plugins {
    .plugin-search-input {
      width: 100%;
    }
  }
</style>
