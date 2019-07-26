import Koa from 'koa'
import koaStatic from 'koa-static'
const staticMap = {}
export const addStaticServer = (pluginInfo) => {
  const app = new Koa()
  app
    .use(koaStatic(pluginInfo.frontend))
  staticMap[pluginInfo.pluginName] = {
    app,
    pluginInfo
  }
  console.log(`Plugin "${pluginInfo.pluginName}" frontend is running at ${pluginInfo.frontendPath}. Frontend path "${pluginInfo.frontend}"`)
  app.listen(pluginInfo.port)
}

export const deleteStaticServer = (pluginName) => {
  if (staticMap[pluginName].hasOwnProperty('app')) {
    console.log(staticMap[pluginName].app, staticMap[pluginName].app.close)
    staticMap[pluginName].app.close()
    console.log(`Plugin "${pluginName}" is stopped.`)
  }
}

export {
  staticMap
}
