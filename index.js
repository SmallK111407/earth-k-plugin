import { Data, Version } from './components/index.js'
import fs from 'node:fs'

logger.info('---------=.=---------')
logger.info(`土块插件${Version.version}载入成功~qwq`)
logger.info(`作者-SunRyK曉K & 地球生物`)
logger.info(`注意！土块插件仅支持Yunzai V3`)
logger.info(`土块画图连不上官网，则安装此依赖，命令: pnpm add https-proxy-agent -w`)
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
