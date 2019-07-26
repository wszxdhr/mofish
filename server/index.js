// import config from './config'
import { getConfig } from './utils/configs'
import commander from 'commander'
import PackageConfig from '../package'
import { getValidPort } from './utils/portInUsed'
import loadPlugins from './utils/loadPlugins'
import PluginsRouter from './router/plugins'
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
  const settings = getConfig()
  global.settings = settings

  const port = await getValidPort(settings.port || commander.port || 8080)

  const app = new Koa()

  await loadPlugins(settings)

  app
    .use(bodyParser())
    .use(PluginsRouter.routes())
    .use(PluginsRouter.allowedMethods())
  if (commander.dev) {
    console.log('Mofish is running in Development Mode.')
  }

  app.listen(port)

  console.log(`App is started at port ${port}`)
})()
