import Router from 'koa-router'
import libnpmsearch from 'libnpmsearch'
import { response, check } from '../utils/response'
import { getLocalPackages } from '../utils/getPackages'
// import urlParse from 'url-parse'
// import eventBus from '../utils/eventBus'
const router = new Router()

router.prefix('/package')

router.get('/online', async (ctx, next) => {
  const query = ctx.request.query
  if (!check(query, [['name', 'string']])) {
    response(ctx, 400, null, {
      message: 'Param error, check it and retry.'
    })
    await next()
    return
  }
  const { name } = query
  const list = await libnpmsearch(name)
  response(ctx, 200, list || [])
  await next()
})

router.get('/local', async (ctx, next) => {
  const list = await getLocalPackages()
  response(ctx, 200, list || [])
  await next()
})

export default router
