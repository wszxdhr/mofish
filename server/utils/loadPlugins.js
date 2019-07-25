export default function (settings) {
  const pluginInfo = []
  let currentPlugin = null
  try {
    for (const plugin of settings.plugins) {
      currentPlugin = plugin
      pluginInfo.push({
        ...require(plugin.path).default,
        plugin
      })
    }
    global.pluginInfo = pluginInfo
  } catch (err) {
    console.log(`Plugin "${(currentPlugin || '').name}" crashed when mofish parse it's config, please check and restart mofish. Error: \n ${err} \n ======================`)
  }
}
