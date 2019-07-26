import { getValidPort } from './portInUsed'
import { addStaticServer } from './frontendStatic'

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
  addStaticServer(pluginInfo[plugin.name])
  return pluginInfo[plugin.name]
}
