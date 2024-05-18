import fetch, { Blob, FormData } from 'node-fetch'
import fs from 'fs'
import _ from 'lodash'
let kg = 1
const bq = {}
try {
  const res = JSON.parse(fs.readFileSync('plugins/earth-k-plugin/resources/bq.json'))
  for (const v of Object.values(res)) {
    for (const i of v.keywords) { bq[i] = v }
  }
} catch {}
const reg = new RegExp(`^(${Object.keys(bq).join('|')})`)
const url = 'http://www.itukuai.top:2233/memes/'

export class dailyNoteByWidget extends plugin {
  constructor (e) {
    super({
      name: '土块表情包',
      dsc: '土块表情包',
      event: 'message',
      priority: 1145,
      rule: [
        {
          reg: '^#?土块表情开启$',
          fnc: 'bqkq'
        },
        {
          reg: '^#?土块表情关闭$',
          fnc: 'bqgb'
        },
        {
          reg: '^#?土块表情列表$',
          fnc: 'bqlb'
        }
      ]
    })
  }

  bqkq (e) {
    kg = 1
    return e.reply('表情功能已开启')
  }

  bqgb (e) {
    kg = 0
    return e.reply('表情功能已关闭')
  }

  async bqlb (e) {
    const res = await fetch(`${url}render_list`, { method: 'POST' })
    const resultBuffer = Buffer.from(await res.arrayBuffer())
    return e.reply(segment.image(resultBuffer))
  }

  async accept (e) {
    if (!e.msg || kg == 0) return
    const match = e.msg.match?.(reg)?.[0]
    if (!match) return
    const keyword = e.msg.split(' ')
    const id = keyword[0].replace(match, '') || e.at || e.user_id
    const item = bq[match]

    const pick = await e.group?.pickMember?.(id) || await e.bot?.pickFriend?.(id)
    const info = await pick?.getInfo?.() || pick?.info || pick
    const name = info?.card || info?.nickname

    const formData = new FormData()
    if (item.params.min_images == 2) {
      const imgUrl = await e.member?.getAvatarUrl?.() || await e.friend?.getAvatarUrl?.() || `http://q2.qlogo.cn/headimg_dl?dst_uin=${e.user_id}&spec=5`
      const imgRes = await fetch(imgUrl)
      const buffer = Buffer.from(await imgRes.arrayBuffer())
      formData.append('images', new Blob([buffer]))
    }

    if (item.params.min_images != 0) {
      let reply
      if (e.getReply) {
        reply = await e.getReply()
      } else if (e.source) {
        if (e.group?.getChatHistory) { reply = (await e.group.getChatHistory(e.source.seq, 1)).pop() } else if (e.friend?.getChatHistory) { reply = (await e.friend.getChatHistory(e.source.time, 1)).pop() }
      }
      if (reply?.message) {
        for (const i of reply.message) {
          if (i.type == 'image' || i.type == 'file') {
            e.img = [i.url]
            break
          }
        }
      }

      const imgUrl = e.img?.[0] || await pick?.getAvatarUrl?.() || `http://q2.qlogo.cn/headimg_dl?dst_uin=${id}&spec=5`
      const imgRes = await fetch(imgUrl)
      const buffer = Buffer.from(await imgRes.arrayBuffer())
      formData.append('images', new Blob([buffer]))
    }

    if (item.params.min_texts != 0) {
      for (let i = 0; i < keyword.length - 1; i++) { formData.append('texts', keyword[i + 1]) }
    }

    let args
    if (item.params.min_texts == 0 & keyword[1] != undefined) { args = handleArgs(item.key, keyword[1], [{ text: name, gender: 'unknown' }]) } else { args = handleArgs(item.key, '', [{ text: name, gender: 'unknown' }]) }
    if (args) { formData.set('args', args) }

    const res = await fetch(`${url}${item.key}/`, { method: 'POST', body: formData })
    if (res.status > 299) { return e.reply(`该表情至少需要${item.params.min_images}张图片，${item.params.min_texts}个文字描述`, true) }

    const resultBuffer = Buffer.from(await res.arrayBuffer())
    return e.reply(segment.image(resultBuffer))
  }
}

function handleArgs (key, args, userInfos) {
  let argsObj = {}
  switch (key) {
    case 'look_flat':
      argsObj = { ratio: parseInt(args) || 2 }
      break
    case 'crawl':
      argsObj = { number: parseInt(args) || _.random(1, 92, false) }
      break
    case 'symmetric': {
      const directionMap = {
        左: 'left',
        右: 'right',
        上: 'top',
        下: 'bottom'
      }
      argsObj = { direction: directionMap[args.trim()] || 'left' }
      break
    }
    case 'petpet':
    case 'jiji_king':
    case 'kirby_hammer':
      argsObj = { circle: args.startsWith('圆') }
      break
    case 'my_friend':
      if (!args) args = _.trim(userInfos[0].text, '@')
      argsObj = { name: args }
      break
    case 'looklook':
      argsObj = { mirror: args === '翻转' }
      break
    case 'always': {
      const modeMap = {
        '': 'normal',
        循环: 'loop',
        套娃: 'circle'
      }
      argsObj = { mode: modeMap[args] || 'normal' }
      break
    }
    case 'gun':
    case 'bubble_tea': {
      const directionMap = {
        左: 'left',
        右: 'right',
        两边: 'both'
      }
      argsObj = { position: directionMap[args.trim()] || 'right' }
      break
    }
  }
  argsObj.user_infos = userInfos.map(u => {
    return {
      name: _.trim(u.text, '@'),
      gender: u.gender
    }
  })
  return JSON.stringify(argsObj)
}
