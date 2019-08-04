import Koa from 'koa'
import koaStatic from 'koa-static'
import Proxy from 'koa-server-http-proxy'
const staticMap = {}
export const addStaticServer = (pluginInfo) => {
  const app = new Koa()
  app
    .use(koaStatic(pluginInfo.frontend))

  global.eventBus.$on('serverStart', ({ port }) => {
    if (port) {
      app.use(Proxy('/plugin', {
        target: `http://localhost:${port}`,
        secure: false
      }))
    }
  })
  const server = app.listen(pluginInfo.port)
  staticMap[pluginInfo.pluginName] = {
    server,
    pluginInfo
  }
  console.log(`Plugin "${pluginInfo.pluginName}" frontend is running as a static server. Frontend path "${pluginInfo.frontend}"`)
}

export const deleteStaticServer = (pluginName) => {
  if (staticMap[pluginName] && staticMap[pluginName].hasOwnProperty('server')) {
    staticMap[pluginName].server.close()
    delete staticMap[pluginName]
    console.log(`Plugin "${pluginName}" is stopped.`)
  }
}

export {
  staticMap
}
