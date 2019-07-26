import config from '../config'
import fs from 'fs'
import fsExists from '../utils/fsExists'
// require('color')
import path from 'path'

export function getConfig () {
  try {
    console.log('Reading and parsing Config File...')
    const configStr = fs.readFileSync(config.configPath).toString()
    const configObj = JSON.parse(configStr)
    console.log('Config File parse successful.')
    return configObj
  } catch (err) {
    const timestamp = new Date().valueOf()
    console.log('Config File parsing error or can\'t find the file.')
    console.log(`Making a new config.json and backup the old one to config_${timestamp}_bk.json.`)
    const hasDir = fsExists(config.dir)
    if (hasDir) {
      const hasFile = fsExists(config.configPath)
      // 如果有文件先备份
      if (hasFile) {
        fs.copyFileSync(config.configPath, path.join(config.configPath, `../config_${timestamp}_bk.json`))
      }
    } else {
      fs.mkdirSync(config.dir)
    }
    fs.writeFileSync(config.configPath, JSON.stringify(config.defaultConfigJson()))
    console.log('Make new config.json successful.')
    return config.defaultConfigJson()
  }
}

export function setConfig (value) {
  if (typeof value === 'function') {
    const result = value(getConfig())
    fs.writeFileSync(config.configPath, JSON.stringify(result))
  } else {
    console.log('write', config.configPath)
    fs.writeFileSync(config.configPath, JSON.stringify(value))
  }
}
