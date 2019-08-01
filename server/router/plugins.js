import Router from 'koa-router'
import { response, check } from '../utils/response'
import { setConfig, getConfig } from '../utils/configs'
import { loadPlugin, unloadPlugin } from '../utils/loadPlugins'
const router = new Router()

router.prefix('/api/plugins')

router.get('/list', async (ctx, next) => {
  const result = (getConfig().plugins || []).map(plugin => ({
    ...plugin,
    info: global.pluginInfo[plugin.name]
  }))
  response(ctx, 200, result)
  await next()
})

router.delete('/delete', async (ctx, next) => {
  const query = ctx.request.query
  if (!check(query, [['name', 'string']])) {
    response(ctx, 400, null, {
      message: 'Param error, check it and retry.'
    })
    await next()
    return
  }
  const { name } = query
  const curConfig = getConfig()
  const result = [];
  (curConfig.plugins || []).forEach(async item => {
    if (item.name === name) {
      console.log('find static server')
      await unloadPlugin(name)
    } else {
      result.push(item)
    }
  })
  curConfig.plugins = result
  console.log(curConfig.plugins)
  setConfig(curConfig)
  response(ctx, 200, null)
  await next()
})

router.post('/add', async (ctx, next) => {
  const body = ctx.request.body
  const { name, type, path } = body
  if (!check(body, [['name', 'string'], ['type', 'string']])) {
    response(ctx, 400, null, {
      message: 'Param error, check it and retry.'
    })
    await next()
    return
  }
  const curConfig = getConfig()
  let hasPlugin = false
  for (const plugin of curConfig.plugins || []) {
    if (plugin.name === name) {
      hasPlugin = true
    }
  }
  if (hasPlugin) {
    response(ctx, 400, null, {
      message: `Plugin ${name} is already in plugin list.`
    })
  } else {
    const plugins = curConfig.plugins || []
    let plugin = null
    switch (type) {
      case 'local':
        plugin = {
          name,
          type,
          path
        }
        plugins.push(plugin)
    }
    setConfig({
      ...curConfig,
      plugins
    })
    if (plugin) {
      await loadPlugin(global.pluginInfo, plugin)
    }
    response(ctx, 200, null)
  }
  await next()
})

export default router
