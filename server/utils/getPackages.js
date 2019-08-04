// 获取联网npm包和本地npm全局包
import childProcess from 'child_process'
import fs from 'fs'
import path from 'path'

export const getLocalPackages = () => new Promise((resolve, reject) => {
  childProcess.exec('npm root -g', (err, stdout, stderr) => {
    if (err) {
      reject(err)
    } else {
      console.log('npm root: ', stdout)
      const rootPath = stdout.replace(/\n/g, '').replace(/\r/g, '').trim()
      fs.readdir(rootPath, (err2, files) => {
        if (err2) {
          reject(err2)
        } else {
          resolve(files.filter(item => (/^mofish-plugin-/).test(item)).map(name => {
            const packageJson = require(path.join(rootPath, name, 'package.json'))
            const pluginPath = path.join(rootPath, name)
            const pluginConfig = require(pluginPath).default(global.commander.isDev)
            if (packageJson && packageJson.version) {
              return {
                pluginConfig,
                pluginPath,
                ...packageJson
              }
            } else {
              return {}
            }
          }))
        }
      })
    }
  })
})
