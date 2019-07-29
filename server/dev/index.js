import commander from 'commander'
import nodemon from 'nodemon'
import path from 'path'

// 解析命令行参数
commander.version(`Version: 1.0.0`)
  .option('--plugin [plugin]', 'Plugin absolute path.')
  .option('--port [port]', 'Port for server.')
commander.parse(process.argv)

if (commander.plugin) {
  console.log(`Detect plugin path successful. Watching path "${commander.plugin}"...`)
  const options = {
    script: path.join(__dirname, '../index.js'),
    exec: 'npm run lint:server && babel-node --presets env --plugins babel-plugin-syntax-object-rest-spread',
    watch: [path.join(__dirname, '../'), commander.plugin],
    ignore: path.join(commander.plugin, 'src')
  }
  if (commander.port) {
    options.args = ['--port', commander.port, '--dev']
  }
  nodemon(options)
}
