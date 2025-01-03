/*
* 请注意，系统不会读取help_default.js ！！！！
* 【请勿直接修改此文件，且可能导致后续冲突】
*
* 如需自定义可将文件【复制】一份，并重命名为 help.js
*
* */

// 帮助配置
export const helpCfg = {
  // 帮助标题
  title: '土块帮助',

  // 帮助副标题
  subTitle: 'Yunzai-Bot & Earth-K-Plugin',

  // 帮助表格列数，可选：2-5，默认3
  // 注意：设置列数过多可能导致阅读困难，请参考实际效果进行设置
  colCount: 3,

  // 单列宽度，默认265
  // 注意：过窄可能导致文字有较多换行，请根据实际帮助项设定
  colWidth: 265,

  // 皮肤选择，可多选，或设置为all
  // 皮肤包放置于 resources/help/theme
  // 皮肤名为对应文件夹名
  // theme: 'all', // 设置为全部皮肤
  // theme: ['default','theme2'], // 设置为指定皮肤
  theme: 'all',

  // 排除皮肤：在存在其他皮肤时会忽略该项内设置的皮肤
  // 默认忽略default：即存在其他皮肤时会忽略自带的default皮肤
  // 如希望default皮肤也加入随机池可删除default项
  themeExclude: ['default'],

  // 是否启用背景毛玻璃效果，若渲染遇到问题可设置为false关闭
  bgBlur: true
}

// 帮助菜单内容
export const helpList = [{
  group: '土块小游戏',
  list: [{
    icon: 80,
    title: '#练习记忆力',
    desc: '记忆力小游戏 我猜+数字回答 #重置分数'
  }, {
    icon: 46,
    title: '猜语音 我猜+<角色>',
    desc: '猜原神语音 命令：猜语音 原神猜语 #我猜'
  }]
}, {
  group: '土块功能',
  list: [{
    icon: 33,
    title: '点歌xx',
    desc: '返回图片列表,点歌酷狗xx,点歌qqxx'
  }, {
    icon: 31,
    title: '#点视频+<视频名称>',
    desc: '查找视频返回图片列表 #取消搜索'
  }, {
    icon: 22,
    title: '#点小说+<小说名称>',
    desc: '查找小说返回图片列表 #取消小说搜索'
  }, {
    icon: 52,
    title: '#点漫画+<漫画名称>',
    desc: '查找漫画返回图片列表 #取消漫画搜索'
  }]
}, {
  group: '土块原史功能',
  list: [{
    icon: 57,
    title: '#<角色>语音+数字',
    desc: '#<角色>语音列表 #角色语音汇总'
  }, {
    icon: 58,
    title: '#了解+<角色>',
    desc: '#了解刻晴 #了解宵宫'
  }, {
    icon: 59,
    title: '#原史+角色',
    desc: '了解角色故事'
  }, {
    icon: 21,
    title: '#原史+武器',
    desc: '了解武器故事'
  }, {
    icon: 39,
    title: '#原史+圣遗物',
    desc: '了解圣遗物故事'
  }, {
    icon: 55,
    title: '#原史+装备',
    desc: '了解装备故事'
  }, {
    icon: 52,
    title: '#原史+书籍',
    desc: '了解书籍故事'
  }, {
    icon: 76,
    title: '#原史+任务',
    desc: '了解任务故事'
  }, {
    icon: 78,
    title: '#原史+NPC',
    desc: '了解npc故事'
  }, {
    icon: 79,
    title: '#原史id+数字',
    desc: 'id范围0~3794'
  }]
}, {
  group: '土块原史目录列表',
  list: [{
    icon: 60,
    title: '#原史角色目录',
    desc: '#角色id列表'
  }, {
    icon: 21,
    title: '#原史武器目录',
    desc: '#武器id列表'
  }, {
    icon: 38,
    title: '#原史圣遗物目录',
    desc: '圣遗物id列表'
  }, {
    icon: 43,
    title: '#原史怪物目录',
    desc: '怪物id列表'
  }, {
    icon: 22,
    title: '#原史任务目录',
    desc: '任务id列表'
  }, {
    icon: 54,
    title: '#原史食物目录',
    desc: '食物id列表'
  }, {
    icon: 55,
    title: '#原史物品目录',
    desc: '物品id列表'
  }, {
    icon: 71,
    title: '#原史活动目录',
    desc: '活动id列表'
  }, {
    icon: 74,
    title: '#原史动物目录',
    desc: '动物id列表'
  }, {
    icon: 11,
    title: '#原史书籍目录',
    desc: '书籍id列表'
  }, {
    icon: 80,
    title: '#原史npc目录',
    desc: 'npc id列表'
  }]
}, {
  group: '管理命令，仅管理员可用',
  auth: 'master',
  list: [{
    icon: 95,
    title: '#土块(强制)更新',
    desc: '更新土块插件'
  }]
}]
