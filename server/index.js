// import config from './config'
import '@babel/polyfill'
import { getConfig } from './utils/configs'
import commander from 'commander'
import PackageConfig from '../package'
import { getValidPort } from './utils/portInUsed'
import loadPlugins from './utils/loadPlugins'
import PluginsRouter from './router/plugins'
import PluginRouter from './router/plugin'
import ProjectRouter from './router/projects'
import PackageRouter from './router/packages'
import getGlobalConfig from './config/index'
import Static from 'koa-static'
import eventBus from './utils/eventBus'
// import Proxy from 'koa-server-http-proxy'
// import { getLocalPackages } from './utils/getPackages'
// import libnpmsearch from 'libnpmsearch'
// import Mount from 'koa-mount'
// import FrontendRouter from './router/frontend'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
// import koaStatic from 'koa-static'

// 解析命令行参数
commander.version(`Version: ${PackageConfig.version}`)
  .option('-p, --port [port]', 'Set port for Frame Process.')
  .option('--dev', 'Development mode.')
commander.parse(process.argv)
global.commander = commander;

(async function () {
  // console.log(await libnpmsearch('vue'))
  const settings = getConfig()
  global.settings = settings
  global.eventBus = eventBus

  const app = new Koa()

  await loadPlugins(settings)

  const config = getGlobalConfig(commander.dev)
  if (commander.dev) {
    console.log('Mofish is running in Development Mode.')
  } else {
    app.use(Static(config.frontendPath))
  }

  app
    .use(bodyParser())
    .use(PluginsRouter.routes())
    .use(PluginsRouter.allowedMethods())
    .use(PluginRouter.routes())
    .use(PluginRouter.allowedMethods())
    .use(ProjectRouter.routes())
    .use(ProjectRouter.allowedMethods())
    .use(PackageRouter.routes())
    .use(PackageRouter.allowedMethods())

  const port = await getValidPort(settings.port || commander.port || 8080)
  app.listen(port)
  eventBus.$emit('serverStart', {
    port
  })

  console.log(`App is started at port ${port}`)
})()
