<template>
  <section class="home-plugins">
<!--    插件列表-->
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
            <div class="text-main-black">
              <span>{{ scope.row.name }}</span>
              <el-tag effect="dark" v-if="scope.row.type === 'local'" size="mini" style="margin-left: 10px;">Local</el-tag>
            </div>
            <p class="text-placeholder">{{ scope.row.path }}</p>
          </template>
        </el-table-column>
        <el-table-column width="120px">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" circle @click="deletePlugin(scope.row.name)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
<!--    添加插件-->
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
<!--            <el-input :debounce="500" placeholder="Input name to search plugins." v-model="pluginSearchParam" class="plugin-search-input"></el-input>-->
            <p class="text-secondary-black tac">Installed Local</p>
            <el-table :data="localList" style="width: 100%" :show-header="false">
              <el-table-column prop="name"></el-table-column>
              <el-table-column
                align="right">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="success"
                    v-if="!isAdded(scope.row.name)"
                    @click="addPluginFromLocalList(scope.row)">Add</el-button>
                  <el-button
                    size="mini"
                    type="info"
                    disabled
                    v-if="isAdded(scope.row.name)">Added</el-button>
                </template>
              </el-table-column>
            </el-table>
            <p class="text-secondary-black tac">NPM Online</p>
            <el-table :data="npmList" style="width: 100%" :show-header="false">
              <el-table-column prop="name"></el-table-column>
              <el-table-column
                align="right">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="installAndAddPluginFromNpmList(scope.row.name)" v-if="!isNpmListInstalled(scope.row.name)">Install and Add</el-button>
                  <el-button
                    size="mini"
                    type="success"
                    @click="addPluginFromNpmList(scope.row)" v-if="isNpmListInstalled(scope.row.name) && !isAdded(scope.row.name)">Add</el-button>
                  <el-button
                    size="mini"
                    type="info"
                    disabled
                    v-if="isAdded(scope.row.name)">Added</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { addPlugin, deletePlugin } from '@/api/service/plugins'
import { searchPackages, getLocalPackages } from '@/api/service/packages'
import { mapActions, mapGetters } from 'vuex'
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
      },
      npmList: [],
      localList: []
    }
  },
  methods: {
    ...mapActions([
      'refreshPlugins'
    ]),
    installAndAddPluginFromNpmList (pluginName) {
      this.$alert(`Sorry, feature install is not complete yet, please install plugins global ( npm install -g ${pluginName} ) by your self, and go back refresh this page. This feature will come in few weeks.`)
    },
    async addPluginFromLocalList (plugin) {
      const result = await this.addLocalPlugin({
        name: plugin.pluginConfig.tabName,
        path: plugin.pluginPath,
        type: 'npm'
      })
      if (result) {
        this.showAddDialog = false
      }
    },
    addPluginFromNpmList (plugin) {
      for (const item of this.localList) {
        if (item.name === plugin.name) {
          this.addPluginFromLocalList(item)
          return
        }
      }
    },
    isAdded (pluginName) {
      for (const item of this.pluginList) {
        if (item.info && item.info.packageJson && item.info.packageJson.name === pluginName) {
          return true
        }
      }
      return false
    },
    isNpmListInstalled (pluginName) {
      for (const item of this.localList) {
        if (item.name === pluginName) {
          return true
        }
      }
      return false
    },
    addLocalPlugin ({ type = 'local', name = this.addLocalPluginForm.name, path = this.addLocalPluginForm.path }) {
      return addPlugin({
        name,
        path,
        type
      }).then(res => {
        if (!res.result) {
          this.$message.success('Add plugin success')
          this.showAddDialog = false
          this.clearAddPluginForm()
          this.refreshPlugins()
          return true
        }
      })
    },
    clearAddPluginForm () {
      this.addLocalPluginForm.path = ''
      this.addLocalPluginForm.name = ''
    },
    deletePlugin (pluginName) {
      this.$confirm(`Are you sure to delete plugin "${pluginName}"?`, 'Confirm', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        deletePlugin({
          name: pluginName
        }).then(res => {
          if (!res.result) {
            this.$message({
              type: 'success',
              message: `Plugin "${pluginName}" has been deleted.`
            })
            this.refreshPlugins()
          }
        })
      })
    }
  },
  computed: {
    ...mapGetters({
      pluginList: 'getPlugins'
    })
  },
  created () {
    searchPackages({
      name: 'mofish-plugin-'
    }).then(res => {
      if (res.data) {
        this.npmList = res.data
      }
    })
    getLocalPackages().then(res => {
      if (res.data) {
        this.localList = res.data
      }
    })
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
