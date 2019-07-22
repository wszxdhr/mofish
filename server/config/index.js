import os from 'os'
import path from 'path'
const home = os.homedir()

export default {
  configPath: path.join(home, '.mofish/config.json'),
  dir: path.join(home, '.mofish'),
  defaultConfigJson: () => ({
    projects: [],
    plugins: []
  })
}
