import os from 'os'
import _ from 'lodash'
import fs from 'fs'
import child_process from 'child_process'






export default new class {
  constructor () {
    this.si = null
    this.osInfo = null
    // 是否可以获取gpu
    this.isGPU = false
    // 网络
    this._network = null
    // 读写速率
    this._fsStats = null
    // 记录60条数据一分钟记录一次
    this.chartData = {
      network: {
        // 上行
        upload: [],
        // 下行
        download: []
      },
      fsStats: {
        // 读
        readSpeed: [],
        // 写
        writeSpeed: []
      },
      // cpu
      cpu: [],
      // 内存
      ram: [],
      // 主题
    }

    this.valueObject = {
      networkStats: 'rx_sec,tx_sec,iface',
      currentLoad: 'currentLoad',
      mem: 'active',
      fsStats: 'wx_sec,rx_sec'
    }

    this.init()
  }

  set network (value) {
    if (_.isNumber(value[0]?.tx_sec) && _.isNumber(value[0]?.rx_sec)) {
      this._network = value
      this.addData(this.chartData.network.upload, [Date.now(), value[0].tx_sec])
      this.addData(this.chartData.network.download, [Date.now(), value[0].rx_sec])
    }
  }

  get network () {
    return this._network
  }

  set fsStats (value) {
    if (_.isNumber(value?.wx_sec) && _.isNumber(value?.rx_sec)) {
      this._fsStats = value
      this.addData(this.chartData.fsStats.writeSpeed, [Date.now(), value.wx_sec])
      this.addData(this.chartData.fsStats.readSpeed, [Date.now(), value.rx_sec])
    }
  }

  get fsStats () {
    return this._fsStats
  }

  async initDependence () {
    try {
      this.si = await import('systeminformation')
      this.osInfo = await this.si.osInfo()
      return this.si
    } catch (error) {
      if (error.stack?.includes('Cannot find package')) {
        logger.warn(` 缺少依赖将无法使用 ${logger.yellow('土块状态')}`)
        logger.warn(`如需使用请运行：${logger.red('pnpm add systeminformation -w')}`)
        logger.warn('---------------------------')
        logger.debug(decodeURI(error.stack))
      } else {
        logger.error(`土块状态需要安装：${logger.red('systeminformation')}`)
        logger.error(decodeURI(error.stack))
      }
    }
  }

  async init () {
    if (!await this.initDependence()) return
    const { controllers } = await this.si.graphics()
    // 初始化GPU获取
    if (controllers?.find(item =>
      item.memoryUsed && item.memoryFree && item.utilizationGpu)
    ) {
      this.isGPU = true
    }
    // 给有问题的用户关闭定时器
    this.getData()
    // 网速
    const Timer = setInterval(async () => {
      let data = await this.getData()
      if (_.isEmpty(data)) clearInterval(Timer)
    }, 60000)
  }

  async getData () {
    let data = await this.si.get(this.valueObject)
    _.forIn(data, (value, key) => {
      if (_.isEmpty(value)) {
        logger.debug(`获取${key}数据失败，停止获取对应数据`)
        delete this.valueObject[key]
      }
    })
    let {
      fsStats,
      networkStats,
      mem: { active },
      currentLoad: { currentLoad }
    } = data
    this.fsStats = fsStats
    this.network = networkStats
    if (_.isNumber(active)) {
      this.addData(this.chartData.ram, [Date.now(), active])
    }
    if (_.isNumber(currentLoad)) {
      this.addData(this.chartData.cpu, [Date.now(), currentLoad])
    }
    return data
  }

  /**
   * 向数组中添加数据，如果数组长度超过允许的最大值，则删除最早添加的数据
   *
   * @param {Array} arr - 要添加数据的数组
   * @param {*} data - 要添加的新数据
   * @param {number} [maxLen=60] - 数组允许的最大长度，默认值为60
   * @returns {void}
   */
  addData (arr, data, maxLen = 60) {
    if (data === null || data === undefined) return
    // 如果数组长度超过允许的最大值，删除第一个元素
    if (arr.length >= maxLen) {
      _.pullAt(arr, 0)
    }
    // 添加新数据
    arr.push(data)
  }

  /**
  * 重试获取数据，直到成功或达到最大重试次数。
  * @param {Function} fetchFunc 获取数据的函数，返回一个Promise对象。
  * @param {Array} [params=[]] 需要执行函数的参数数组
  * @param {Number} [timerId] 定时器的id，用于在获取数据失败时停止定时器
  * @param {Number} [maxRetryCount=3] 最大重试次数。
  * @param {Number} [retryInterval=1000] 两次重试之间的等待时间，单位为毫秒。。
  * @return {Promise} 获取到的数据。如果达到最大重试次数且获取失败，则返回null。
  */
  async fetchDataWithRetry (fetchFunc, params = [], timerId, maxRetryCount = 3, retryInterval = 1000) {
    let retryCount = 0
    let data = null
    while (retryCount <= maxRetryCount) {
      data = await fetchFunc(...params)
      if (!_.isEmpty(data)) {
        break
      }
      retryCount++
      if (retryCount > maxRetryCount && timerId) {
        logger.debug(`获取${fetchFunc.name}数据失败，停止定时器`)
        clearInterval(timerId)
        break
      }
      await new Promise(resolve => setTimeout(resolve, retryInterval))
    }
    return data
  }

  /**
  * 将文件大小从字节转化为可读性更好的格式，例如B、KB、MB、GB、TB。
  *
  * @param {number} size - 带转化的字节数。
  * @param {boolean} [isByte=true] - 如果为 true，则最终的文件大小显示保留 B 的后缀.
  * @param {boolean} [isSuffix=true] - 如果为 true，则在所得到的大小后面加上 kb、mb、gb、tb 等后缀.
  * @returns {string} 文件大小格式转换后的字符串.
  */
  getFileSize (size, isByte = true, isSuffix = true) { // 把字节转换成正常文件大小
    if (size == null || size == undefined) return 0
    let num = 1024.00 // byte
    if (isByte && size < num) {
      return size.toFixed(2) + 'B'
    }
    if (size < Math.pow(num, 2)) {
      return (size / num).toFixed(2) + `K${isSuffix ? 'b' : ''}`
    } // kb
    if (size < Math.pow(num, 3)) {
      return (size / Math.pow(num, 2)).toFixed(2) + `M${isSuffix ? 'b' : ''}`
    } // M
    if (size < Math.pow(num, 4)) {
      return (size / Math.pow(num, 3)).toFixed(2) + 'G'
    } // G
    return (size / Math.pow(num, 4)).toFixed(2) + 'T' // T
  }

  /**
    * @description: 圆形进度条渲染
    * @param {Number} res 百分比小数
    * @return {*} css样式
  */
  Circle (res) {
    let num = (res * 360).toFixed(0)
    let color = 'var(--low-color)'
    if (res >= 0.9) {
      color = 'var(--high-color)'
    } else if (res >= 0.8) {
      color = 'var(--medium-color)'
    }
    let leftCircle = `style="transform:rotate(-180deg);background:${color};"`
    let rightCircle = `style="transform:rotate(360deg);background:${color};"`
    if (num > 180) {
      leftCircle = `style="transform:rotate(${num}deg);background:${color};"`
    } else {
      rightCircle = `style="transform:rotate(-${180 - num}deg);background:${color};"`
    }
    return { leftCircle, rightCircle }
  }

  /** 获取nodejs内存情况 */
  getNodeInfo () {
    let memory = process.memoryUsage()
    // 总共
    let rss = this.getFileSize(memory.rss)
    // 堆
    let heapTotal = this.getFileSize(memory.heapTotal)
    // 栈
    let heapUsed = this.getFileSize(memory.heapUsed)
    // 占用率
    let occupy = (memory.rss / (os.totalmem() - os.freemem())).toFixed(2)
    return {
      ...this.Circle(occupy),
      inner: Math.round(occupy * 100) + '%',
      title: 'Node',
      info: [
        `总 ${rss}`,
        `堆 ${heapTotal}`,
        `栈 ${heapUsed}`
      ]
    }
  }

  /** 获取当前内存占用 */
  getMemUsage () {
    // 内存使用率
    let MemUsage = (1 - os.freemem() / os.totalmem()).toFixed(2)
    // 空闲内存
    let freemem = this.getFileSize(os.freemem())
    // 总共内存
    let totalmem = this.getFileSize(os.totalmem())
    // 使用内存
    let Usingmemory = this.getFileSize((os.totalmem() - os.freemem()))

    return {
      ...this.Circle(MemUsage),
      inner: Math.round(MemUsage * 100) + '%',
      title: 'RAM',
      info: [
        `总共 ${totalmem}`,
        `已用 ${Usingmemory}`,
        `空闲 ${freemem}`
      ]
    }
  }

  /** 获取CPU占用 */
  async getCpuInfo () {
    let { currentLoad: { currentLoad }, cpuCurrentSpeed } = await this.si.get({
      currentLoad: 'currentLoad',
      cpuCurrentSpeed: 'max,avg'
    })
    if (currentLoad == null || currentLoad == undefined) return false
    // 核心
    let cores = os.cpus()
    // cpu制造者
    let cpuModel = cores[0]?.model.slice(0, cores[0]?.model.indexOf(' ')) || ''
    return {
      ...this.Circle(currentLoad / 100),
      inner: Math.round(currentLoad) + '%',
      title: 'CPU',
      info: [
        `${cpuModel} ${cores.length}核 ${this.osInfo?.arch}`,
        `平均${cpuCurrentSpeed.avg}GHz`,
        `最大${cpuCurrentSpeed.max}GHz`
      ]

    }
  }
 


async execSync (cmd) {
    return new Promise((resolve, reject) => {
      child_process.exec(cmd, (error, stdout, stderr) => {
        resolve({ error, stdout, stderr })
      })
    })
  }

  
    async getFastFetch (e) {
    if (process.platform == 'win32' && !/pro/.test(e.msg)) return ''
    let ret = await this.execSync( 'bash plugins/earth-k-plugin/resources/html/state/state.sh') 
    if (ret.error) {
      e.reply(`❎ 请检查是否使用git bash启动Yunzai-bot\n错误信息：${ret.stderr}`)
      return ''
    }
    return ret.stdout.trim()
  }

  /** 获取GPU占用 */
  async getGPU () {
    if (!this.isGPU) return false
    try {
      const { controllers } = await this.si.graphics()
      let graphics = controllers?.find(item =>
        item.memoryUsed && item.memoryFree && item.utilizationGpu
      )
      if (!graphics) {
        logger.warn('[Yenai-plugin][state]状态GPU数据异常：\n', controllers)
        return false
      }
      let {
        vendor, temperatureGpu, utilizationGpu,
        memoryTotal, memoryUsed, powerDraw
      } = graphics
      temperatureGpu && (temperatureGpu = temperatureGpu + '℃')
      powerDraw && (powerDraw = powerDraw + 'W')
      return {
        ...this.Circle(utilizationGpu / 100),
        inner: Math.round(utilizationGpu) + '%',
        title: 'GPU',
        info: [
          `${vendor} ${temperatureGpu} ${powerDraw}`,
          `总共 ${(memoryTotal / 1024).toFixed(2)}G`,
          `已用 ${(memoryUsed / 1024).toFixed(2)}G`
        ]
      }
    } catch (e) {
      logger.warn('[Yenai-Plugin][State] 获取GPU失败')
      return false
    }
  }

  /**
   * @description: 获取硬盘
   * @return {*}
   */
   
   
   
   
  async getFsSize () {
    // 去重
    let HardDisk = _.uniqWith(await this.si.fsSize(),
      (a, b) =>
        a.used === b.used && a.size === b.size && a.use === b.use && a.available === b.available
    )
      .filter(item => item.size && item.used && item.available && item.use)
    // 为空返回false
    if (_.isEmpty(HardDisk)) return false
    // 数值转换
    return HardDisk.map(item => {
      item.used = this.getFileSize(item.used)
      item.size = this.getFileSize(item.size)
      item.use = Math.round(item.use)
      item.color = 'var(--low-color)'
      if (item.use >= 90) {
        item.color = 'var(--high-color)'
      } else if (item.use >= 70) {
        item.color = 'var(--medium-color)'
      }
      return item
    })
  }

  /** 获取FastFetch */


  // 获取读取速率
  get DiskSpeed () {
    if (!this.fsStats ||
      this.fsStats.rx_sec == null ||
      this.fsStats.wx_sec == null
    ) {
      return false
    }
    return {
      rx_sec: this.getFileSize(this.fsStats.rx_sec, false, false),
      wx_sec: this.getFileSize(this.fsStats.wx_sec, false, false)
    }
  }

  /**
   * @description: 获取网速
   * @return {object}
   
   
   */
   
   
   
  get getnetwork () {
    let network = _.cloneDeep(this.network)?.[0]
    if (!network || network.rx_sec == null || network.tx_sec == null) {
      return false
    }
    network.rx_sec = this.getFileSize(network.rx_sec, false, false)
    network.tx_sec = this.getFileSize(network.tx_sec, false, false)
    // return network
    return {
      first: network.iface,
      tail: `↑${network.tx_sec}/s | ↓${network.rx_sec}/s`
    }
  }

  /**
 * @description: 取插件包
 * @return {*} 插件包数量
 */
  get getPluginNum () {
    let str = './plugins'
    let arr = fs.readdirSync(str)
    let plugin = []
    arr.forEach((val) => {
      let ph = fs.statSync(str + '/' + val)
      if (ph.isDirectory()) {
        plugin.push(val)
      }
    })
    let del = ['example', 'genshin', 'other', 'system', 'bin']
    plugin = plugin.filter(item => !del.includes(item))
    const plugins = plugin?.length || 0
    const js = fs.readdirSync('./plugins/example')?.filter(item => item.includes('.js'))?.length || 0
    // return {
    //   plugins: plugin?.length || 0,
    //   js: fs.readdirSync('./plugins/example')?.filter(item => item.includes('.js'))?.length || 0
    // }
    return {
      first: '插件',
      tail: `${plugins} plugin | ${js} js`
    }
  }

 
}()
