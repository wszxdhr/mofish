import config from './config'
import { getConfig } from './utils/configs'
import commander from 'commander'
import PackageConfig from '../package'
import { getValidPort } from './utils/portInUsed'
import loadPlugins from './utils/loadPlugins'
import PluginsRouter from './router/plugins'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import koaStatic from 'koa-static'
// 解析命令行参数
commander.version(`Version: ${PackageConfig.version}`)
  .option('-p, --port [port]', 'Set port for Frame Process.')
  .option('-d, --dev', 'Development mode. Use this option, Mofish will not start frontend process.')
commander.parse(process.argv);

(async function () {
  const settings = getConfig()
  global.settings = settings

  const port = await getValidPort(settings.port || commander.port || 8080)

  const app = new Koa()

  loadPlugins(settings)

  app
    .use(bodyParser())
    .use(PluginsRouter.routes())
    .use(PluginsRouter.allowedMethods())
  if (!commander.dev) {
    app.use(koaStatic(
      config.frontendPath
    ))
  }

  app.listen(port)

  console.log(`App is started at port ${port}`)
})()
