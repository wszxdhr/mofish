// 获取联网npm包和本地npm全局包
import childProcess from 'child_process'
import fs from 'fs'

export const getLocalPackages = () => new Promise((resolve, reject) => {
  childProcess.exec('npm root -g', (err, stdout, stderr) => {
    if (err) {
      reject(err)
    } else {
      console.log('npm root: ', stdout)
      fs.readdir(stdout.replace(/\n/g, '').replace(/\r/g, '').trim(), (err2, files) => {
        if (err2) {
          reject(err2)
        } else {
          resolve(files)
        }
      })
    }
  })
})
