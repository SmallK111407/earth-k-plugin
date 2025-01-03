import _ from 'lodash'
import { createRequire } from 'module'
import moment from 'moment'
import os from 'os'
import plugin from '../../../lib/plugins/plugin.js'
import cfg from '../../../lib/config/config.js'
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import  State from '../model/State.js'
const require = createRequire(import.meta.url)

let interval = false


export class NewState extends plugin {
  constructor() {
    super({
      name: '土块状态',
      event: 'message',
      priority: 1145,
      rule: [
       {


          reg: '^#?土块状态(pro)?$',
          fnc: 'state2'

        }
      ]

    })
  }
  async state2(e) {
    let shuju = []

    // 防止多次触发

    // 系统
    let FastFetch; let HardDisk
    let otherInfo = []
    // 其他信息
    otherInfo.push({
      first: '系统',
      tail: State.osInfo?.distro
    })
    // 网络
    otherInfo.push(State.getnetwork)
    // 插件数量
    otherInfo.push(State.getPluginNum)
    let promiseTaskList = [
      State.getFastFetch(e).then(res => { FastFetch = res }),
      State.getFsSize().then(res => { HardDisk = res })
    ]

    // 网络测试
    let psTest = []
    let psTestSites = false
    let psTestTimeout = 5000


    psTestSites && promiseTaskList.push(...psTestSites?.map(i => State.getNetworkLatency(i.url, psTestTimeout).then(res => psTest.push({
      first: i.name,
      tail: res
    }))))
    // 执行promise任务
    await Promise.all(promiseTaskList)
    // 可视化数据
    let visualData = _.compact(await Promise.all([
      // CPU板块
      State.getCpuInfo(),
      // 内存板块
      State.getMemUsage(),
      // GPU板块
      State.getGPU(),
      // Node板块
      State.getNodeInfo()
    ]))
    
    // 发
    const sent = await redis.get('Yz:count:sendMsg:total') || 0
    // 图片
    const screenshot = await redis.get('Yz:count:screenshot:total') || 0
    // 机器人名称
    let yunzaiName = cfg.package.name
    if (yunzaiName == 'miao-yunzai') {
      yunzaiName = 'Miao-Yunzai'
    } else if (yunzaiName == 'yunzai') {
      yunzaiName = 'Yunzai-Bot'
    } else if (yunzaiName == 'trss-yunzai') {
      yunzaiName = 'TRSS-Yunzai'
    } else {
      yunzaiName = _.capitalize(yunzaiName)
    }
    const BotName = yunzaiName
    // 系统运行时间
    const systime = await formatTime(os.uptime(), 'dd天hh小时mm分', false)
    // 日历
    const calendar =  moment().format('YYYY-MM-DD HH:mm:ss')
    // nodejs版本
    const nodeVersion = process.version
    let BotStatus = ""

    /** bot列表 */
    let BotList = [e.self_id]
    /** TRSS */
    if (e.msg.includes("pro") && Array.isArray(Bot?.uin)) {
      BotList = Bot.uin
    }
    /** ws-plugin、Lain-plugin多bot */
    else if (e.msg.includes("pro") && !Array.isArray(Bot?.uin) && Bot?.adapter && Bot?.adapter.includes(e.self_id)) {
      BotList = Bot.adapter
    }


    for (const i of BotList) {
      const bot = Bot[i]
      if (!bot?.uin) continue
      // 头像
      const avatar = bot.avatar || `https://q1.qlogo.cn/g?b=qq&s=0&nk=${bot.uin}` 
      // 昵称
      const nickname = bot.nickname || "未知"
      // 在线状态
      // 登录平台版本
      const platform = bot.apk ? `${bot.apk.display} v${bot.apk.version}` : bot.version.version || "未知"
      // 收
      const recv = bot.stat?.recv_msg_cnt || "未知"
      // 好友数
      const friendQuantity = Array.from(bot.fl.values()).length
      // 群数
      const groupQuantity = Array.from(bot.gl.values()).length
      // 运行时间
      const runTime = await formatTime(Date.now() / 1000 - bot.stat?.start_time, 'dd天hh小时mm分', false)
      // Bot版本



      const botVersion = bot.version ? `${bot.version.name}(${bot.version.id})${bot.apk ? ` ${bot.version.version}` : ""}` : `ICQQ(QQ) v${require('icqq/package.json').version}`

      shuju.push({
        "avatar": avatar,
        "nickname": nickname,
        "platform": `  ${botVersion}${platform}`,
        "sent": sent,
        "screenshot": screenshot,
        "BotName": BotName,
        "systime": `系统运行 ${systime}`,
        "time": `${calendar}`,
        "calendar": `Nodejs ${nodeVersion} `,
        "recv": recv,
        "friendQuantity": friendQuantity,
        "groupQuantity": groupQuantity,
        "runTime": `${BotName} 已运行 ${runTime}`,
        "botVersion": botVersion
      }) 
    }
    let url = "https://www.loliapi.com/acg/pe"



    // 渲染数据
    let data = {
      shuju,
      url,
      BotStatus,

      // 硬盘内存
      HardDisk,
      // FastFetch
      FastFetch,
      // 硬盘速率
      fsStats: State.DiskSpeed,
      // 可视化数据
      visualData,
      // 其他数据
      otherInfo: _.compact(otherInfo),
      psTest: _.isEmpty(psTest) ? false : psTest
    }


    let ml = process.cwd()
    let data1 = {
      tplFile: './plugins/earth-k-plugin/resources/html/state/lyr.html',
      data,
      dz:ml,
      url,
      BotStatus,

      // 硬盘内存
      HardDisk,
      // FastFetch
      FastFetch,
      // 硬盘速率
      fsStats: State.DiskSpeed,
      // 可视化数据
      visualData,
      // 其他数据
    }

    let img = await puppeteer.screenshot("123", {
      ...data1,
    });
    e.reply(img)


  }

}

async function formatTime(time, format, repair = true) {
  const second = parseInt(time % 60)
  const minute = parseInt((time / 60) % 60)
  const hour = parseInt((time / (60 * 60)) % 24)
  const day = parseInt(time / (24 * 60 * 60))
  const timeObj = {
    day,
    hour: repair && hour < 10 ? `0${hour}` : hour,
    minute: repair && minute < 10 ? `0${minute}` : minute,
    second: repair && second < 10 ? `0${second}` : second
  }
  if (format == 'default') {
    let result = ''

    if (day > 0) {
      result += `${day}天`
    }
    if (hour > 0) {
      result += `${timeObj.hour}小时`
    }
    if (minute > 0) {
      result += `${timeObj.minute}分`
    }
    if (second > 0) {
      result += `${timeObj.second}秒`
    }
    return result
  }

  if (typeof format === 'string') {
    format = format
      .replace(/dd/g, day)
      .replace(/hh/g, timeObj.hour)
      .replace(/mm/g, timeObj.minute)
      .replace(/ss/g, timeObj.second)

    return format
  }

  if (typeof format === 'function') {
    return format(timeObj)
  }

  return timeObj
}

