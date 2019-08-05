import Router from 'koa-router'
import { getConfig } from '../utils/configs'
import { response } from '../utils/response'
// import eventBus from '../utils/eventBus'
const router = new Router()

router.prefix('/api/projects')

router.get('/list', async (ctx, next) => {
  const result = getConfig().projects || []
  response(ctx, 200, result)
  await next()
})

router.post('/add', async (ctx, next) => {
  // const body = ctx.request.body
  // const { name, path } = body
  const result = getConfig().projects || []
  response(ctx, 200, result)
  await next()
})

export default router
