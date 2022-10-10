import plugin from '../../../lib/plugins/plugin.js'
import { currentVersion, changelogs, yunzaiVersion } from '../components/Changelog.js'
import puppeteer from '../../../lib/puppeteer/puppeteer.js'

export class LeaveMessage extends plugin {
  constructor () {
    super({
      name: '土块留言',
      dsc: '查看留言',
      event: 'message',
      priority: 1145,
      rule: [
        {
          reg: '^#*(土块)?(插件)?留言(栏|单|名单)?$',
          fnc: 'LeaveMessage'
        }
      ]
    })
    this._path = process.cwd().replace(/\\/g, '/')
    this.model = 'LeaveMessage'
  }

  async LeaveMessage () {
    let layoutPath = process.cwd() + '/plugins/earth-k-plugin/resources/html/layout/'

    let messageImg = await puppeteer.screenshot('LeaveMessage', {
      tplFile: `./plugins/earth-k-plugin/resources/html/${this.model}/${this.model}.html`,
      pluResPath: `${this._path}/plugins/earth-k-plugin/resources/`,
      saveId: 'LeaveMessage',
      currentVersion,
      changelogs,
      elem: 'cryo',
      defaultLayout: layoutPath + 'default.html',
      elemLayout: layoutPath + 'elem.html',
      sys: {
        copyright: `请通过<span class="version">爱发电</span>付费电圈留言，随缘更新该留言栏`
      }
    })
    await this.reply(messageImg, false, 110)
  }
}
