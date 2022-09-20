import path from "path";
const _path = process.cwd() + "/plugins/earth-k-plugin";
import xxCfg from "./model/xxCfg.js";

/**
 *  支持锅巴配置
 */
export function supportGuoba() {
  return {
    pluginInfo: {
      name: "earth-k-plugin",
      title: "earth-k-plugin",
      author: "@SunRyK曉K @地球生物",
      authorLink: "https://gitee.com/SmallK111407",
      link: "https://gitee.com/SmallK111407/earth-k-plugin",
      isV3: true,
      isV2: false,
      description: "提供了记忆力小游戏，图片可视化点歌，原史（原神角色背景故事等）等功能",
      // 显示图标，此为个性化配置
      // 图标可在 https://icon-sets.iconify.design 这里进行搜索
      icon: "mdi:stove",
      // 图标颜色，例：#FF0000 或 rgb(255, 0, 0)
      iconColor: "#d19f56",
      // 如果想要显示成图片，也可以填写图标路径（绝对路径）
      iconPath: path.join(_path, "resources/img/icon/paimon.png"),
    }}}