import commander from 'commander'
import nodemon from 'nodemon'
import path from 'path'

// 解析命令行参数
commander.version(`Version: 1.0.0`)
  .option('--plugin [plugin]', 'Plugin path.')
commander.parse(process.argv)

if (commander.plugin) {
  console.log(`Detect plugin path successful. Watching path "${commander.plugin}"...`)
  nodemon({
    script: path.join(__dirname, '../index.js'),
    exec: 'npm run lint:server && babel-node --presets env --plugins babel-plugin-syntax-object-rest-spread',
    watch: [path.join(__dirname, '../'), commander.plugin]
  })
}
