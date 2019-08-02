import os from 'os'
import path from 'path'
const home = os.homedir()

export default (isDev) => {
  const mofishDir = isDev ? path.join(home, '.mofish-dev') : path.join(home, '.mofish')
  return {
    configPath: path.join(mofishDir, 'config.json'),
    frontendPath: path.join(__dirname, '../../dist'),
    dir: mofishDir,
    defaultConfigJson: () => ({
      projects: [],
      plugins: []
    })
  }
}
