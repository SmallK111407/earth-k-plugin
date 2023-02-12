import { Data, Version } from './components/index.js'
import fs from 'node:fs'
import chalk from 'chalk'

let ret = []

logger.info(chalk.rgb(120, 255, 108)(`---------=.=---------`))
logger.info(chalk.rgb(120, 255, 108)(`土块插件${Version.version}载入成功~qwq`))
logger.info(chalk.rgb(120, 255, 108)(`作者-SunRyK曉K & 地球生物`))
logger.info(chalk.rgb(120, 255, 108)(`土块画图连不上官网，则安装此依赖，命令: pnpm add https-proxy-agent -w`))
logger.info(chalk.rgb(120, 255, 108)(`---------------------`));

try {
  await import('image-size')
 
  if (!await redis.get('earth-k:node_modules')) await redis.set('earth-k:node_modules', '1')
} catch (error) {
  if (error.stack?.includes('Cannot find package')) {
    logger.warn('--------土块依赖缺失--------')
    logger.warn(`earth-k-plugin 缺少依赖将无法使用 ${logger.yellow('AI绘图')}`)
    logger.warn(`如需使用请运行：${logger.red('pnpm add image-size -w')}`)
	 
    logger.warn('---------------------------')
    logger.debug(decodeURI(error.stack))
  } else {
    logger.error(`土块载入依赖错误：${logger.red('image-size')}`)
	
    logger.error(decodeURI(error.stack))
  }
  await redis.del('earth-k:node_modules')
}
try {

  await import('fluent-ffmpeg')
  if (!await redis.get('earth-k:node_modules')) await redis.set('earth-k:node_modules', '1')
} catch (error) {
  if (error.stack?.includes('Cannot find package')) {
    logger.warn('--------土块依赖缺失--------')
    logger.warn(`earth-k-plugin 缺少依赖将无法使用 ${logger.yellow('弹琴')}`)

	 logger.warn(`如需使用请运行：${logger.red('pnpm add fluent-ffmpeg -w')}`)
	 logger.warn(`或者使用：${logger.red('cnpm install fluent-ffmpeg -w')}`)
    logger.warn('---------------------------')
    logger.debug(decodeURI(error.stack))
  } else {
	 logger.error(`土块载入依赖错误：${logger.red('fluent-ffmpeg')}`)
    logger.error(decodeURI(error.stack))
  }
  await redis.del('earth-k:node_modules')
}

const files = fs
  .readdirSync('./plugins/earth-k-plugin/apps')
  .filter((file) => file.endsWith('.js'))

  files.forEach((file) => {
    ret.push(import(`./apps/${file}`))
})

ret = await Promise.allSettled(ret)

let apps = {}
for (let i in files) {
  let name = files[i].replace('.js', '')
  
  if (ret[i].status != 'fulfilled') {
    logger.error(`载入插件错误：${logger.red(name)}`)
    logger.error(ret[i].reason)
    continue
    }
    apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}
export { apps }
