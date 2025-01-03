import fs from 'node:fs'
import lodash from 'lodash'
/** 全局变量 plugin */


/**
 * 加载插件
 */
class PluginsLoader {
  constructor () {
    this.priority = []
 
    this.task = []
    this.dir = './plugins'
  }

  /**
   * 监听事件加载
   * @param isRefresh 是否刷新
   */
  async load (isRefresh = false) {
    
    this.priority =[]

    const files = this.getPlugins()

  

    let pluCount = 0

    let packageErr = []
    for (let File of files) {
      try {
        let tmp = await import(File.path)
        let apps = tmp
        if (tmp.apps) {
          apps = { ...tmp.apps }
        }
        lodash.forEach(apps, (p, i) => {
          if (!p.prototype) return
          pluCount++
          /* eslint-disable new-cap */
          let plugin = new p()
          logger.debug(`载入插件 [${File.name}][${plugin.name}]`)
          /** 执行初始化 */
        
          /** 初始化定时任务 */
        
          this.priority.push({
            class: p,
            key: File.name,
            name: plugin.name,
            priority: plugin.priority,
            minglin:plugin.rule
          })
         
        })
      } catch (error) {
        if (error.stack.includes('Cannot find package')) {
          packageErr.push({ error, File })
        } else {
          logger.error(`载入插件错误：${logger.red(File.name)}`)
          logger.error(decodeURI(error.stack))
        }
      }
    }

 
    /** 优先级排序 */
    this.priority = lodash.orderBy(this.priority, ['priority'], ['asc'])
    return this.priority
  }

 
  getPlugins () {
    let ignore = ['index.js']
    let files = fs.readdirSync(this.dir, { withFileTypes: true })
    let ret = []
    for (let val of files) {
      let filepath = '../../../plugins/' + val.name
      let tmp = {
        name: val.name
      }
      if (val.isFile()) {
        if (!val.name.endsWith('.js')) continue
        if (ignore.includes(val.name)) continue
        tmp.path = filepath
        ret.push(tmp)
        continue
      }

      if (fs.existsSync(`${this.dir}/${val.name}/index.js`)) {
        tmp.path = filepath + '/index.js'
        ret.push(tmp)
        continue
      }

      let apps = fs.readdirSync(`${this.dir}/${val.name}`, { withFileTypes: true })
      for (let app of apps) {
        if (!app.name.endsWith('.js')) continue
        if (ignore.includes(app.name)) continue

        ret.push({
          name: `${val.name}/${app.name}`,
          path: `../../../plugins/${val.name}/${app.name}`
        })

        /** 监听热更新 */
      

      }
    }

    return ret
  }

  /**
   * 处理事件
   *
   * 参数文档 https://oicqjs.github.io/oicq/interfaces/GroupMessageEvent.html
   * @param e icqq Events
   */
 
}

export default new PluginsLoader()
