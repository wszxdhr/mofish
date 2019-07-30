import Router from 'koa-router'
import { getPluginModule } from '../utils/loadPlugins'
import urlParse from 'url-parse'
// import eventBus from '../utils/eventBus'
const router = new Router()

router.prefix('/plugin')

router.all('/:pluginName/*', async (ctx, next) => {
  const { pluginName } = ctx.params
  ctx.request.pluginUrl = ctx.request.url.replace(`/plugin/${pluginName}`, '')
  ctx.request.pluginUrlObj = urlParse(ctx.request.pluginUrl)
  if (getPluginModule(pluginName).request) {
    await getPluginModule(pluginName).request(ctx, next)
  } else {
    await next()
  }
})

export default router
