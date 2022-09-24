import fs from 'fs'
import lodash from 'lodash'
import YAML from 'yaml'

const _path = process.cwd()
const _cfgPath = `${_path}/plugins/earth-k-plugin/components/`
let cfg = {}

let configPath = `${_path}/plugins/earth-k-plugin/config/`
let defSetPath = './plugins/earth-k-plugin/defSet/'

const getConfig = function (app, name) {
  let defp = `${defSetPath}${app}/${name}.yaml`
  if (!fs.existsSync(`${configPath}${app}.${name}.yaml`)) {
    fs.copyFileSync(defp, `${configPath}${app}.${name}.yaml`)
  }
  let conf = `${configPath}${app}.${name}.yaml`

  try {
    return YAML.parse(fs.readFileSync(conf, 'utf8'))
  } catch (error) {
    logger.error(`[${app}][${name}] 格式错误 ${error}`)
    return false
  }
}

try {
  if (fs.existsSync(_cfgPath + 'cfg.json')) {
    cfg = JSON.parse(fs.readFileSync(_cfgPath + 'cfg.json', 'utf8')) || {}
    cfg.gachas = getConfig('gacha', 'gacha')
  }
} catch (e) {
  // do nth
}

let Cfg = {
  get (rote, def = '') {
    return lodash.get(cfg, rote, def)
  },
  set (rote, val) {
    lodash.set(cfg, rote, val)
    let gachas = cfg.gachas
    delete cfg.gachas
    fs.writeFileSync(_cfgPath + 'cfg.json', JSON.stringify(cfg, null, '\t'))
    cfg.gachas = gachas
  },
  del (rote) {
    lodash.set(cfg, rote, undefined)
    fs.writeFileSync(_cfgPath + 'cfg.json', JSON.stringify(cfg, null, '\t'))
  },
  scale (pct = 1) {
    let scale = Cfg.get('sys.scale', 100)
    scale = Math.min(2, Math.max(0.5, scale / 100))
    pct = pct * scale
    return `style=transform:scale(${pct})`
  },
  isDisable (e, rote) {
    if (Cfg.get(rote, true)) {
      return false
    }
    return !/^#*土块/.test(e.msg || '')
  },
  merged () {
    return lodash.merge({}, cfg)
  }
}

export default Cfg
