import plugin from '../../../lib/plugins/plugin.js'
import { currentVersion, changelogs, yunzaiVersion } from '../components/Changelog.js'
import puppeteer from '../../../lib/puppeteer/puppeteer.js'

export class version extends plugin {
  constructor () {
    super({
      name: '土块插件版本',
      dsc: '查看抽卡插件版本',
      event: 'message',
      priority: 1145,
      rule: [
        {
          reg: '^#*土块(插件)?版本(号)?$',
          fnc: 'version'
        }
      ]
    })
    this._path = process.cwd().replace(/\\/g, '/')
    this.model = 'version'
  }

  async version () {
    let layoutPath = process.cwd() + '/plugins/earth-k-plugin/resources/html/layout/'

    let versionImg = await puppeteer.screenshot('version', {
      tplFile: `./plugins/earth-k-plugin/resources/html/${this.model}/${this.model}.html`,
      pluResPath: `${this._path}/plugins/earth-k-plugin/resources/`,
      saveId: 'version',
      currentVersion,
      changelogs,
      elem: 'cryo',
      defaultLayout: layoutPath + 'default.html',
      elemLayout: layoutPath + 'elem.html',
      sys: {
        copyright: `Created By Yunzai-Bot<span class="version">${yunzaiVersion}</span> & Earth-K-Plugin<span class="version">${currentVersion}</span>`
      }
    })
    await this.reply(versionImg, false, 110)
  }
}
