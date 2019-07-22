import Router from 'koa-router'
const router = new Router()

router.post('/api/getPlugins', async (ctx) => {
  console.log('ctx')
})

export default router
