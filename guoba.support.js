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
      schemas: [{
        field: 'config.isch',
        label: '画图撤回设置',
        bottomHelpMessage: '是否撤回画图',
        component: "Select",
          componentProps: {
            options: [
              { label: "不撤回", value: 0 },
              { label: "撤回", value: 1 },
            ],
            placeholder: "请选择是否撤回",
          },
      },{
        field: 'config.iscd',
        label: '画图冷却设置',
        bottomHelpMessage: '画图是否有cd',
        component: "Select",
          componentProps: {
            options: [
              { label: "无cd", value: 0 },
              { label: "有cd", value: 1 },
            ],
            placeholder: "请选择是否有cd",
          },
      },{
        field: 'config.ss',
        label: '画图涩涩开关',
        bottomHelpMessage: '画图是否开启鉴黄',
        component: "Select",
          componentProps: {
            options: [
              { label: "关闭", value: 1 },
              { label: "开启", value: 0 },
            ],
            placeholder: "请选择是否开启",
          },
      },{
        field: 'config.zr',
        label: '画图主人设置',
        bottomHelpMessage: '画图是否仅主人可画',
        component: "Select",
          componentProps: {
            options: [
              { label: "所有人", value: 0 },
              { label: "仅主人", value: 1 },
            ],
            placeholder: "请选择是否限制",
          },
      },{
        field: 'config.ak',
        label: '土块鉴黄ak',
        bottomHelpMessage: '百度图像检测API key',
        component: 'Input',
        required: false,
        componentProps: {
        placeholder: '请输入API key',
      },
    },{
        field: 'config.sk',
        label: '土块鉴黄sk',
        bottomHelpMessage: '百度图像检测Secret key',
        component: 'Input',
        required: false,
        componentProps: {
        placeholder: '请输入Secret key',
      },
    },{
        field: 'config.cd',
        label: '用户画图冷却',
        bottomHelpMessage: '非主人用户画图cd，主人无cd',
        component: 'Input',
        required: false,
        componentProps: {
        placeholder: '请输入时间，单位：毫秒 输入1000=1s',   
      },
    },{
        field: 'config.timeout',
        label: '画图撤回时间',
        bottomHelpMessage: '画图撤回的时间，xx秒后撤回',
        component: 'Input',
        required: false,
        componentProps: {
        placeholder: '请输入时间，单位：毫秒 输入1000=1s',
      },
    },{
        field: 'config.wyck',
        label: '网易点歌cookie',
        bottomHelpMessage: '#点歌网易 用的账号cookie',
        component: 'Input',
        required: false,
        componentProps: {
        placeholder: '请输入cookie',
      },
    }],

      getConfigData () {
          return setting.merge()
        },
        // 设置配置的方法（前端点确定后调用的方法）
        setConfigData (data, { Result }) {
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
