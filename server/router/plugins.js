import Router from 'koa-router'
import { response, check } from '../utils/response'
import { setConfig, getConfig } from '../utils/configs'
const router = new Router()

router.prefix('/api/plugins')

router.get('/list', async (ctx, next) => {
  response(ctx, 200, getConfig() || [])
  await next()
})

router.post('/add', async (ctx, next) => {
  const body = ctx.request.body
  const { name, type, path } = body
  console.log(check(body, [['name', 'string'], ['type', 'string']]))
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
    switch (type) {
      case 'local': plugins.push({
        name,
        type,
        path
      })
    }
    setConfig({
      ...curConfig,
      plugins
    })
    response(ctx, 200, null)
  }
  await next()
})

export default router
