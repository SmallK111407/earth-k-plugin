import { Cfg } from './index.js'
import { currentVersion, yunzaiVersion } from './Changelog.js'

export const render = async function (path, params, cfg) {
  let paths = path.split('/')
  let { render } = cfg
  let layoutPath = process.cwd() + '/plugins/earth-k-plugin/resources/common/layout/'
  return await render(paths[0], paths[1], {
    ...params,
    _layout_path: layoutPath,
    _tpl_path: process.cwd() + '/plugins/miao-plugin/resources/common/tpl/',
    defaultLayout: layoutPath + 'default.html',
    elemLayout: layoutPath + 'elem.html',
    sys: {
      scale: Cfg.scale(cfg.scale || 1),
      copyright: `Created By Yunzai-Bot<span class="version">${yunzaiVersion}</span> & Earth-K-Plugin<span class="version">${currentVersion}</span>`
    }
  })
}


function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default {
  render,
  cfg: Cfg.get,
  isDisable: Cfg.isDisable,
  sleep
}
