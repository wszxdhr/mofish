import { getValidPort } from './portInUsed'
import { addStaticServer, deleteStaticServer } from './frontendStatic'
import eventBus from '../utils/eventBus'
import { response, check } from '../utils/response'
import Koa from 'koa'
import KoaStatic from 'koa-static'
import { getPluginConfig, setPluginConfig } from '../utils/configs'
const pluginModules = {}

export default async function (settings) {
  const pluginInfo = {}
  let currentPlugin = null
  try {
    for (const plugin of settings.plugins) {
      currentPlugin = plugin
      await loadPlugin(pluginInfo, plugin)
    }
    global.pluginInfo = pluginInfo
  } catch (err) {
    console.log(`Plugin "${(currentPlugin || '').name}" crashed when mofish parse it's config, please check and restart mofish. Error: \n ${err} \n ======================`)
  }
}

export const loadPlugin = async (pluginInfo, plugin) => {
  pluginInfo[plugin.name] = require(plugin.path).default
  console.log('loadPlugin name: ', plugin.name, 'frontend: ', pluginInfo[plugin.name].frontend)
  const port = await getValidPort(8080)
  pluginInfo[plugin.name].frontendPath = `http://localhost:${port}`
  pluginInfo[plugin.name].port = port
  pluginInfo[plugin.name].isDev = global.commander.dev
  pluginInfo[plugin.name].pluginName = plugin.name
  await initPlugin(pluginInfo[plugin.name], plugin)
  await addStaticServer(pluginInfo[plugin.name])
  return pluginInfo[plugin.name]
}

export const unloadPlugin = async (pluginName) => {
  await deleteStaticServer(pluginName)
  await destroyPlugin(pluginName)
}

export const initPlugin = async (pluginInfo, plugin) => {
  const MofishPlugin = pluginInfo.main
  pluginModules[plugin.name] = new MofishPlugin({
    libs: {
      Koa,
      KoaStatic
    },
    utils: {
      response,
      check,
      // getPluginConfig函数返回一个函数，和setPluginConfig不同
      getConfig: getPluginConfig(plugin.name),
      setConfig: setPluginConfig
    },
    eventBus,
    plugins: global.pluginInfo,
    pluginObjects: pluginModules
  })
}

export const destroyPlugin = async (pluginName) => {
  pluginModules[pluginName].destroy && pluginModules[pluginName].destroy()
}
