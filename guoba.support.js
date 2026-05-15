import path from "path";
import setting from "./model/setting.js";
import lodash from "lodash";

const _path = process.cwd() + "/plugins/earth-k-plugin";

/**
 *  支持锅巴配置
 */
export function supportGuoba() {
  return {
    pluginInfo: {
      name: "earth-k-plugin",
      title: "土块插件",
      author: "@SunRyK曉K @地球生物",
      authorLink: "https://gitee.com/SmallK111407",
      link: "https://gitee.com/SmallK111407/earth-k-plugin",
      isV3: true,
      isV2: false,
      description: "提供了记忆力小游戏，图片可视化点歌，原史（原神角色背景故事等）等功能",
      icon: "mdi:stove",
      iconColor: "#d19f56",
      iconPath: path.join(_path, "resources/img/logo.png"),
    },
    // 配置项信息
    configInfo: {
      // 配置项 schemas
      schemas: [
        {
          field: 'config.isch',
          label: '画图撤回设置',
          bottomHelpMessage: '画图是否撤回',
          component: 'Switch',
        },
        {
          field: 'config.iscd',
          label: '画图冷却设置',
          bottomHelpMessage: '画图是否有cd',
          component: 'Switch',
        },
        {
          field: 'config.ss',
          label: '画图涩涩开关',
          bottomHelpMessage: '画图是否开启鉴黄',
          component: 'Switch',
        },
        {
          field: 'config.zr',
          label: '画图主人设置',
          bottomHelpMessage: '画图是否仅主人可画',
          component: 'Switch',
        },
        {
          field: 'config.ak',
          label: '土块鉴黄ak',
          bottomHelpMessage: '百度图像检测API key',
          component: 'InputTextArea',
          required: false,
          componentProps: {
            placeholder: '请输入API key',
            autoSize: { minRows: 1, maxRows: 6 },
          },
        },
        {
          field: 'config.sk',
          label: '土块鉴黄sk',
          bottomHelpMessage: '百度图像检测Secret key',
          component: 'InputTextArea',
          required: false,
          componentProps: {
            placeholder: '请输入Secret key',
            autoSize: { minRows: 1, maxRows: 6 },
          },
        },
        {
          field: 'config.cd',
          label: '用户画图冷却',
          bottomHelpMessage: '非主人用户画图cd，主人无cd',
          component: 'InputNumber',
          required: false,
          componentProps: {
            addonAfter: 'ms',
            placeholder: '请输入时间，输入1000=1s',
          },
        },
        {
          field: 'config.timeout',
          label: '画图撤回时间',
          bottomHelpMessage: '画图撤回的时间，xx秒后撤回',
          component: 'InputNumber',
          required: false,
          componentProps: {
            addonAfter: 'ms',
            placeholder: '请输入时间，输入1000=1s',
          },
        },
        {
          field: 'config.wyck',
          label: '网易点歌cookie',
          bottomHelpMessage: '#点歌网易 用的账号cookie',
          component: 'InputTextArea',
          required: false,
          componentProps: {
            autoSize: { minRows: 1, maxRows: 6 },
            placeholder: '请输入cookie',
          },
        }
      ],

      getConfigData() {
        return setting.merge()
      },
      // 设置配置的方法（前端点确定后调用的方法）
      setConfigData(data, { Result }) {
        let config = {}
        for (let [keyPath, value] of Object.entries(data)) {
          lodash.set(config, keyPath, value)
        }
        config = lodash.merge({}, setting.merge, config)
        setting.analysis(config)
        return Result.ok({}, '保存成功~')
      }
    }
  }
}
