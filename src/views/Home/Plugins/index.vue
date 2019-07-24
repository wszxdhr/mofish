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
      <div class="plugin-type-switch-wrap">
        <el-tabs v-model="pluginType" class="plugin-type-switch">
          <el-tab-pane label="Local" name="local">
            <el-form ref="addPluginForm" :model="addLocalPluginForm" label-width="100px">
              <el-form-item label="Name" required>
                <el-input v-model="addLocalPluginForm.name" placeholder="Name for plugin."></el-input>
              </el-form-item>
              <el-form-item label="Path" required>
                <el-input v-model="addLocalPluginForm.path" placeholder="Please input a absolute path."></el-input>
              </el-form-item>
              <el-form-item class="tal">
                <el-button type="primary" @click="addLocalPlugin">Add plugin</el-button>
                <el-button @click="showAddDialog = false">Cancel</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="NPM" name="npm">
            <el-autocomplete :debounce="500" placeholder="Input name to search plugins." v-model="pluginSearchParam" class="plugin-search-input"></el-autocomplete>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { getPlugins, addPlugins } from '@/api/service/plugins'
export default {
  name: 'HomePlugins',
  data () {
    return {
      // 展示添加插件的模态框
      showAddDialog: false,
      // 添加插件的搜索框
      pluginSearchParam: '',
      // 插件类型
      pluginType: 'local',
      addLocalPluginForm: {
        path: '',
        name: ''
      }
    }
  },
  methods: {
    addLocalPlugin () {
      addPlugins({
        name: this.addLocalPluginForm.name,
        path: this.addLocalPluginForm.path,
        type: 'local'
      }).then(res => {
        if (!res.result) {
          this.$message.success('Add plugin success')
        } else {
          this.$message.error(res.message)
        }
      })
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
    .plugin-type-switch-wrap {
      text-align: center;
      transform: translateY(-30px);
    }
    .plugin-search-input {
      width: 100%;
    }
  }
</style>
