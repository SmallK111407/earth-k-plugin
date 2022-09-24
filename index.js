import { currentVersion } from './components/Changelog.js'
import fs from 'node:fs'

logger.info('---------=.=---------')
logger.info(`土块插件${currentVersion}载入成功~qwq`)
logger.info(`---------------------`);

const files = fs
  .readdirSync('./plugins/earth-k-plugin/apps')
  .filter((file) => file.endsWith('.js'))

let apps = {}
for (let file of files) {
  let name = file.replace('.js', '')
  apps[name] = (await import(`./apps/${file}`))[name]
}
export { apps }
