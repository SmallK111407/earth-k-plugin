import fetch from "node-fetch";
import { createRequire } from 'module'
import fs from "fs";

const require = createRequire(import.meta.url)
const _path = process.cwd();
var http = require('http');
let msg = []
let kg = 0
let bqhc = 1
let msgData = []
//1.定义命令规则
export class xgn extends plugin {
  constructor() {
    super({
      /** 功能名称 */
      name: '小功能',
      /** 功能描述 */
      dsc: '小功能',
      event: 'message',
      /** 优先级,数字越小等级越高 */
      priority: 1045,
      rule: [{
        /** 命令正则匹配 */
        reg: /^\p{Emoji_Presentation}{2}$/gum, //匹配消息正则,命令正则
        /** 执行方法 */
        fnc: 'bqhc'
      }, {
        /** 命令正则匹配 */
        reg: '#今日运势', //匹配消息正则,命令正则
        /** 执行方法 */
        fnc: 'jrys'
      }, {
        /** 命令正则匹配 */
        reg: '#酷我(.*)', //匹配消息正则,命令正则
        /** 执行方法 */
        fnc: 'kuwo'
      }, {
        /** 命令正则匹配 */
        reg: '#钢琴(.*)|#八音盒(.*)|#古筝(.*)|#吉他(.*)|#萨克斯(.*)|#小提琴(.*)|#吹箫(.*)|#西域琴(.*)', //匹配消息正则,命令正则
        /** 执行方法 */
        fnc: 'gangqin'
      }, {
        /** 命令正则匹配 */
        reg: '#弹琴帮助', //匹配消息正则,命令正则
        /** 执行方法 */
        fnc: 'tqbz'
      }, {
        /** 命令正则匹配 */
        reg: '#(开启|关闭)表情合成', //匹配消息正则,命令正则
        /** 执行方法 */
        fnc: 'bqhckg'
      }
      ]
    })
  }
  async bqhckg (e) {
    if (!e.isMaster) return

    if (e.msg == '#开启表情合成') {
      e.reply('已经开启表情合成')
      bqhc = 1
    } else if (e.msg == '#关闭表情合成') {
      e.reply('已经关闭表情合成')
      bqhc = 0
    }
  }

 

  async tqbz (e) {
    let msg = "有以下几种乐器\n，1.钢琴2.八音盒3.古筝4.吉他5.萨克斯6.小提琴7.吹箫8.西域琴，\n有以下几种音调-1到-7，1到7，+1到+7，钢琴有++1到++7，\n每个音符要用空格隔开或者逗号，例如 #钢琴1 2 3 1 1 2 3 1\n设置倍速为再末尾加上|200，例如#钢琴1 2 3 1 1 2 3 1|200"
    e.reply(msg)
  }

  async gangqin (e) {
    let path = "gangqin/"
    const musicalInstrumentConfig = {
      '#钢琴': 'gangqin/',
      '#八音盒': 'ba/',
      '#古筝': 'gu/',
      '#吉他': 'jita/',
      '#萨克斯': 'sa/',
      '#小提琴': 'ti/',
      '#吹箫': 'xiao/',
      '#西域琴': 'xiyu/',
    }
    Object.keys(musicalInstrumentConfig).some(item => {
      if (e?.msg?.includes(item)) {
        path = musicalInstrumentConfig[item]
        return true
      }
    })
    const { spawn } = require('child_process');


    let bs = 100
    let msg = []
    let xix = []
    let xx = ""
    if (e.msg.includes('|')) {
      xix = e.msg.split('|')
      xix[0] = xix[0].replace(/[\u4e00-\u9fa5#]/g, "").trim()
      xix[0] = xix[0].replace(/[，,  ]/g, " ").trim()
      bs = xix[1]
    } else {
      xix[0] = e.msg.replace(/[\u4e00-\u9fa5#]/g, "").trim()
      xix[0] = xix[0].replace(/[，,  ]/g, " ").trim()
    }
    let zifu = GetFfmpegCommand(xix[0])
    let time = zifu.length * 50
    let sj = 0
    let shuju2 = ''

    msg.push('-y', '-threads', '4')
    e.reply(['好嘞，我开始弹了，等我一哈', '大约需要', String(time / 1000), '秒'])
    for (let i = 0; i < zifu.length; i++) {
      let suzi = 60000 / bs
      if (zifu[i].includes('___')) {
        suzi = suzi * 0.125
        zifu[i] = zifu[i].replace(/___/g, "").trim()
      }
      if (zifu[i].includes('__')) {
        suzi = suzi * 0.25
        zifu[i] = zifu[i].replace(/__/g, "").trim()
      }
      if (zifu[i].includes('_')) {
        suzi = suzi * 0.5
        zifu[i] = zifu[i].replace(/_/g, "").trim()
      }
      msg.push('-i', String(zifu[i]))
      if (i == 0) {
        xx += `[${String(i)}]adelay=${String(sj)}:all=1[${String(i)}a];`
        shuju2 = `${shuju2}[${String(i)}a]`
      } else {
        xx += `[${String(i)}]adelay=${String(sj)}:all=1[a${String(i)}];`
        shuju2 = `${shuju2}[a${String(i)}]`
      }
      sj += suzi
    }

    //"[0]adelay=0:all=1[0a]; [1]adelay=585:all=1[1a]; [2]adelay=780:all=1[2a]; [3]adelay=1365:all=1[3a];
    //'[0:a]adelay=2000|2000[a0];[1:a]adelay=4000|4000[a1];[2:a]adelay=6000|6000[a2];[3:a]adelay=8000|8000[a3];[a0][a1][a2][a3]concat=n=4:v=0:a=1[out]',
    xx += `${shuju2}amix=inputs=${String(zifu.length)}:dropout_transition=0:normalize=0[a]`//,dynaudnorm[a]:normalize=0[a]
    msg.push('-filter_complex', xx, '-map', '[a]', _path + '/resources/output2.mp3')
    const ffmpeg = spawn('ffmpeg', msg, {
      cwd: './plugins/earth-k-plugin/resources/tanqin/' + path
    });

    ffmpeg.on('error', (err) => {
      console.error(`Failed to start ffmpeg: ${err}`);
      e.reply('你还没有配置ffmpeg的环境变量，请到这里下载https://tukuai.one/download.html，并配置环境变量')
      return
    });
    ffmpeg.stdout.on('data', (data) => {
      console.log(`child process exited with code ${data}`);
    });

    ffmpeg.stderr.on('data', (data) => {
      console.log(`child process exited with code ${data}`);
    });

    ffmpeg.on('close', async (code) => {
      console.log(`child process exited with code ${code}`);
      if (fs.existsSync('./resources/output2.mp3') == false) {
        e.reply('你输入的不对')
        kg = 0
        return
      }
      kg = 1
      if (kg == 1) {
        // let msg2 =  segment.record('./plugins/earth-k-plugin/resources/tanqin/output2.mp3')
        await sleep(2000)
        try {
					let msg = await uploadRecord(_path+'/resources/output2.mp3', 0, false)
					e.reply(msg)
				} catch {
          let msg2 = await segment.record(_path+'/resources/output2.mp3')
          e.reply(msg2)
				}
       
      }
      kg = 0
    });
  }

  async kuwo (e) {
    let mz = e.msg.replace(/#酷我/g, "").trim()
    let url = "https://xiaobai.klizi.cn/API/music/kwmv.php?msg=" + encodeURI(mz) + "&n=1"
    let res = await fetch(url)
    let res2 = await res.json()

    res = res2.url

    await SendMusicShare(e, { source: 'kuwo', name: res2.name, artist: res2.artist, link: res, pic: res2.img })

    console.log(res)
  }
  async jrys (e) {
     try{
            let url = 'http://datukuai.top:1450/jrys.php?qq=' + String(e.user_id)
            let res = await fetch(url)
            res = await res.json()
            
    
            let fortuneSummary = res.fortuneSummary
            let luckyStar = res.luckyStar
            let signText = res.signText
            let unSignText = res.unSignText
            let msg = `运势：${fortuneSummary},\n星级：${luckyStar}\n点评：${signText}\n解读：${unSignText}`
            e.reply([segment.at(e.user_id), '\n', msg])
        }catch{
            let url = 'https://api.fanlisky.cn/api/qr-fortune/get/' + String(e.user_id)
            let res = await fetch(url)
            res = await res.json()
            res =res.data
    
            let fortuneSummary = res.fortuneSummary
            let luckyStar = res.luckyStar
            let signText = res.signText
            let unSignText = res.unSignText
            let msg = `运势：${fortuneSummary},\n星级：${luckyStar}\n点评：${signText}\n解读：${unSignText}`
            e.reply([segment.at(e.user_id), '\n', msg])
        }
  }

  async bqhc(e) {
        if (bqhc == 0) {
            return
        }

        //http://ovooa.com/API/emojimix/?emoji1=🥺&emoji2=😂
        let bq = e.msg.replace(/表情合成/g, '').split(/(.{2})/g)


        //https://xiaobapi.top/api/xb/api/emoji_synthesis.php?emoji=
        console.log(121231231321)
        let url = 'http://datukuai.top:1450/djs/API/emojimix/api.php?emoji1=' + bq[1] + '&emoji2=' + bq[3]
        console.log(url)
        let res = await fetch(url)
        res = await res.json()
        console.log(res)

        if (res.text == '请输入正确的emoji' | res.text == '这两个emoji不支持合成') {

            return

        }

        let msg = segment.image(res.data.url)
        e.reply(msg)







    }
}

// 此方法全局搜下来除了AI画图都没有调用，但是AI画图有自己定义的方法建议严查
async function imgUrlToBase64 (url) {
  let base64Img
  return new Promise(function (resolve, reject) {
    let req = http.get(url, function (res) {
      var chunks = [];
      var size = 0;
      res.on('data', function (chunk) {
        chunks.push(chunk);
        size += chunk.length;
        //累加缓冲数据的长度
      });
      res.on('end', function (err) {
        var data = Buffer.concat(chunks, size);
        base64Img = data.toString('base64');
        resolve({
          success: true,
          base64Img
        });
      });
    })
    req.on('error', (e) => {
      resolve({
        success: false,
        errmsg: e.message
      });
    });
    req.end();
  })
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function SendMusicShare (e, data, to_uin = null) {
  if (!e.bot.sendOidb) return false

  let appid, appname, appsign, style = 4;
  switch (data.source) {
    case 'mys':
      appid = 1109288517, appname = "com.mihoyo.hyperion", appsign = "abdcfbc2380da2413c1e0be7a118dd9e";
      break;
    case 'netease':
      appid = 100495085, appname = "com.netease.cloudmusic", appsign = "da6b069da1e2982db3e386233f68d76d";
      break;
    case 'kuwo':
      appid = 100243533, appname = "cn.kuwo.player", appsign = "bf9ff4ffb4c558a34ee3fd52c223ebf5";
      break;
    case 'kugou':
      appid = 205141, appname = "com.kugou.android", appsign = "fe4a24d80fcf253a00676a808f62c2c6";
      break;
    case 'migu':
      appid = 1101053067, appname = "cmccwm.mobilemusic", appsign = "6cdc72a439cef99a3418d2a78aa28c73";
      break;
    case 'qq':
    default:
      appid = 100497308, appname = "com.tencent.qqmusic", appsign = "cbd27cd7c861227d013a25b2d10f0799";
      break;
  }

  var title = data.name, singer = data.artist, prompt = '[分享]', jumpUrl, preview, musicUrl;

  let types = [];
  if (data.url == null) types.push('url');
  if (data.pic == null) types.push('pic');
  if (data.link == null) types.push('link');
  if (types.length > 0 && typeof (data.api) == 'function') {
    const { url, pic, link } = await data.api(data.data, types);
    if (url) data.url = url;
    if (pic) data.pic = pic;
    if (link) data.link = link;
  }

  typeof (data.url) == 'function' ? musicUrl = await data.url('/SmallK111407/earth-k-plugin/edit/master/apps/data.data') : musicUrl = data.url;
  typeof (data.pic) == 'function' ? preview = await data.pic(data.data) : preview = data.pic;
  typeof (data.link) == 'function' ? jumpUrl = await data.link(data.data) : jumpUrl = data.link;

  if (typeof (musicUrl) != 'string' || musicUrl == '') {
    style = 0;
    musicUrl = '';
  }

  prompt = '[分享]' + title + '-' + singer;

  let recv_uin = 0;
  let send_type = 0;
  let recv_guild_id = 0;
  // let ShareMusic_Guild_id = false; 

  if (e.isGroup && to_uin == null) {//群聊
    recv_uin = e.group.gid;
    send_type = 1;
  } else if (e.guild_id) {//频道
    recv_uin = Number(e.channel_id);
    recv_guild_id = BigInt(e.guild_id);
    send_type = 3;
  } else if (to_uin == null) {//私聊
    recv_uin = e.friend.uid;
    send_type = 0;
  } else {//指定号码私聊
    recv_uin = to_uin;
    send_type = 0;
  }

  let body = {
    1: appid,
    2: 1,
    3: style,
    5: {
      1: 1,
      2: "0.0.0",
      3: appname,
      4: appsign,
    },
    10: send_type,
    11: recv_uin,
    12: {
      10: title,
      11: singer,
      12: prompt,
      13: jumpUrl,
      14: preview,
      16: musicUrl,
    },
    19: recv_guild_id
  };

  let payload = await e.bot.sendOidb("OidbSvc.0xb77_9", core.pb.encode(body));

  let result = core.pb.decode(payload);

  if (result[3] != 0) {
    e.reply('歌曲分享失败：' + result[3], true);
  }
}

// 此方法全局搜下来除了AI画图都没有调用，但是AI画图有自己定义的方法建议严查
async function upload_image (file, e = { bot: Bot }) {
  return (await e.bot.pickFriend(e.bot.uin)._preprocess(segment.image(file, true))).imgs[0];
}


function GetFfmpegCommand (msg) {
  let Music = ""
  let Beats = 0;
  let File = ""; //文件名
  let settime = ""; //时间组合
  let setorder = ""; //序列组合
  let MusicTime = 0;
  let i = 0
  let reg = /[-|+]*\d_*/g;
  let xiaoxi = msg.replace(/#演奏\S*/g, "").trim()
  let notation = xiaoxi.split('|')
  let currenttime = 0
  let quantity = 0
  let beattime = 0//每拍时间（毫秒）

  //音频资源目录处理
  let Yueqi = msg.match(/#演奏(\S*)/g);
  if (isNotNull(Yueqi)) {
    Yueqi = Yueqi.toString()
  } else {
    Yueqi = "钢琴"
  }

  //算出每分钟节拍数
  if (notation.length > 1) {
    beattime = 60000 / parseInt(notation[1])
  } else { beattime = 60000 / 90 }

  let MusicScore = notation[0].match(reg);
  if (MusicScore.length > 1) { } else {
    return;
  }

  let result = []
  for (i in MusicScore) {

    Music = MusicScore[i];
    //console.log(Music)

    Beats = Music.match(/_/g);
    File = Music
    //console.log(Beats)

    //拼接ffmpeg参数
    if (Music != undefined) {
      result.push(`${File}.mp3`)
      settime += `[${quantity}]adelay=${Math.round(currenttime)}:all=1[${quantity}a];`;
      quantity += 1
    }

    //计算时间
    if (!isNotNull(MusicTime)) MusicTime = beattime

    if (Music == '·') MusicTime = MusicTime * 0.5
    else {
      if (Beats == null) MusicTime = beattime
      else if (Beats.length == 1) MusicTime = beattime * 0.5
      else if (Beats.length == 2) MusicTime = beattime * 0.25
      else if (Beats.length == 3) MusicTime = beattime * 0.125
      else MusicTime = beattime
    }
    currenttime = currenttime + MusicTime;
  }
  return result;
}

function isNotNull (obj) {
  if (obj == undefined || obj == null || obj != obj) { return false }
  return true
}
