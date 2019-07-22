import { getConfig } from './utils/configs'
import commander from 'commander'
import PackageConfig from '../package'
import { getValidPort } from './utils/portInUsed'
import PluginsRouter from './router/plugins'
import Koa from 'koa'

// 解析命令行参数
commander.version(`Version: ${PackageConfig.version}`)
  .option('-p, --port [port]', 'Set port for Frame Process.')
  .option('-d, --dev', 'Development mode. Use this option, Mofish will not start frontend process.')
commander.parse(process.argv);

(async function () {
  const settings = getConfig()

  const port = await getValidPort(settings.port || commander.port || 8080)

  const app = new Koa()

  app
    .use(PluginsRouter.routes())
    .use(PluginsRouter.allowedMethods())

  app.listen(port)

  console.log(`App is started at port ${port}`)
})()
