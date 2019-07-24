<template>
  <section class="home-plugins">
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span>Plugins</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="showAddDialog = true">Add plugin</el-button>
      </div>
      <div class="tac text-placeholder" v-show="!pluginList.length">There's no plugin here, click on the top right corner to add a plugin.</div>
      <el-table class="no-border-table" :stripe="true" :show-header="false" v-show="pluginList.length" :data="pluginList" style="width: 100%;">
        <el-table-column width="80">
          <template slot-scope="scope">
            <img :class="['home-plugins-table-icon', {'no-icon': !scope.row.icon}]" :src="scope.row.icon" alt=""/>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <p class="text-main-black">{{ scope.row.name }}</p>
            <p class="text-placeholder">{{ scope.row.path }}</p>
          </template>
        </el-table-column>
      </el-table>
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
            To be continued.
<!--            <el-autocomplete :debounce="500" placeholder="Input name to search plugins." v-model="pluginSearchParam" class="plugin-search-input"></el-autocomplete>-->
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
      // 插件列表
      pluginList: [],
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
          this.showAddDialog = false
          this.clearAddPluginForm()
          this.refreshPluginList()
        }
      })
    },
    clearAddPluginForm () {
      this.addLocalPluginForm.path = ''
      this.addLocalPluginForm.name = ''
    },
    refreshPluginList () {
      this.pluginList = []
      getPlugins().then(res => {
        if (!res.result) {
          this.pluginList = res.data
        }
      })
    }
  },
  created () {
    console.log(getPlugins)
    this.refreshPluginList()
  }
}
</script>

<style lang="scss">
  @import "~@/assets/style/base.scss";
  .home-plugins {
    .plugin-type-switch-wrap {
      text-align: center;
      transform: translateY(-30px);
    }
    .plugin-search-input {
      width: 100%;
    }
    .home-plugins-table-icon {
      width: 50px;
      height: 50px;
      min-height: 50px;
      min-width: 50px;
      max-width: 50px;
      max-height: 50px;
      border-radius: 50%;
      &.no-icon {
        background-color: $placeholder-text-color;
      }
    }
  }
</style>
