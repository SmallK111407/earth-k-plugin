import fetch from 'node-fetch'
import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import fs from 'fs'
let ml = process.cwd()

let msg2 = ""
let kg = false
let wy = false
let qq = false
let zt = 0
let mid = []
let lb = "6"
let id = ""
let n = 0

export class SongsList extends plugin {
    constructor() {
        super({
            name: '[土块插件]歌单',
            dsc: '土块歌单',
            event: 'message',
            priority: 1145,
            rule: [
                {
                    reg: '^#我的歌单',
                    fnc: 'wdgd'
                }, {
                    reg: '^#顺序播放|#下一首|#上一首|#播歌单(.*)',
                    fnc: 'sxbf'
                }, {
                    reg: '^#新增歌单|#去除歌单',
                    fnc: 'tjgd'
                }
            ]
        })
    }

    async tjgd(e) {
        let mulu = ml + '/resources/' + String(e.user_id) + '.txt'



        fs.access(mulu.toString(), fs.constants.R_OK, (err) => {
            if (err) {
                let mulu = ml + '/resources/' + String(e.user_id) + '.txt'
                fs.writeFileSync(mulu.toString(), '大鱼,起风了', 'utf-8');

            } else
                console.log(e.user_id.toString() + '跳过创建');

        });
        await sleep(500)

        let gd = fs.readFileSync(mulu.toString(), 'utf-8')
        gd = gd.split(',')
        if (e.msg.includes('#去除歌单')) {
            let g = e.msg.replace(/#去除歌单/g, "").trim()
            g = Number(g)
            console.log(g)
            let gq1 = gd[g - 1]
            gd.splice(g - 1, 1)
            console.log(gd)

            fs.writeFile(mulu.toString(), gd.toString(), err => {

            })
            e.reply('去除歌单' + gq1 + '成功')
            return

        }
        let gq = e.msg.replace(/#新增歌单/g, "").trim()
        gd.push(gq)

        fs.writeFile(mulu.toString(), gd.toString(), err => {

        })
        e.reply('新增歌单' + gq + '成功')
    }

    async wdgd(e) {
        let mulu = ml + '/resources/' + String(e.user_id) + '.txt'

        fs.access(mulu.toString(), fs.constants.R_OK, (err) => {
            if (err) {
                let mulu = ml + '/resources/' + String(e.user_id) + '.txt'
                fs.writeFileSync(mulu.toString(), '大鱼,起风了', 'utf-8');

            } else
                console.log(e.user_id.toString() + '的歌曲日志已存在，跳过创建');

        });
        await sleep(500)


        let gd = fs.readFileSync(mulu.toString(), 'utf-8')
        gd = gd.split(',')
        let msg = ""
        let xvhao = ""
        let zuozhe = ""
        let song = ""


        for (let i = 0; i < gd.length; i++) {
            msg = msg + String(i + 1) + '.' + gd[i] + '\n'
            song = song + gd[i] + ","
            xvhao = xvhao + String(i + 1) + ","
            zuozhe = zuozhe + '鸡哥' + ","


        }
        msg = '你的歌单列表如下：\n' + msg

        let data1 = {}
        let ml2 = process.cwd()
        let bj = ""
        const min = 1;                            //最小值
        const max = 13;                            //最大值
        const range = max - min;                         //取值范围差
        const random = Math.random();                     //小于1的随机数
        const result = min + Math.round(random * range);  //最小数加随机数*范围差 



        bj = String(result)
        data1 = {
            tplFile: './plugins/earth-k-plugin/resources/html/SongsList/SongsList.html',
            xvhao: xvhao,
            song: song,
            zuozhe: zuozhe,
            dz: ml2,
            bj: bj
        }

        let img = await puppeteer.screenshot("123", {
            ...data1,
        });
        e.reply(img)


    }
    async sxbf(e) {
        let mulu = ml + '/resources/' + String(e.user_id) + '.txt'
        if (e.msg == '#下一首') {
            n = n + 1
        }
        if (e.msg == '#上一首') {
            n = n - 1
            if (n < 0) {
                n = 0
            }
        }
        if (e.msg.includes('#播歌单')) {
            let i = e.msg.replace(/#播歌单/g, "").trim()
            n = Number(i - 1)
            console.log(23123)

        }


        if (e.msg == '#顺序播放' | e.msg == '#下一首' | e.msg == "#上一首" | e.msg.includes('#播歌单')) {
            let gd = fs.readFileSync(mulu.toString(), 'utf-8')
            gd = gd.split(',')
            if (n > gd.length - 1) {
                n = 0

            }
            let geqv = gd[n]
            let url2 = 'http://110.41.21.181:3000/search?keywords=' + geqv
            let res2 = await fetch(url2)
            let jieguo = await res2.json()
            jieguo = jieguo.result.songs[0].id
            console.log(jieguo)
            let url = 'http://music.163.com/song/media/outer/url?id=' + String(jieguo)
            let options = {
                method: 'POST',//post请求 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; MI Build/SKQ1.211230.001)',
                    'Cookie': 'versioncode=8008070; os=android; channel=xiaomi; ;appver=8.8.70; ' + "MUSIC_U=00DCE90E4414477F6CEB1D678986B3E798756DC0B3789AC24E863D0F1CDA8392E2191A215A72C87DD76D33AC15963F1D4581ADFAD71698E9CEE1F59205B30465327BD608B9A4C03E907A43561CC8BD9A21C0D400237A879F6E5CDEFED2B7ADD78FD44F6402E41100966CD15F655BE0C37A18D1103134FAAE42BE3D77AEB60D300BE1A2789E1B4F7EB956E1969D2CED89D57D629398263FB44214E8BF12D201B368A9DFF0B1AE062C24A80C57953E8D42B4FBDA2B11ADD2E8C87F230727EAB2D75DC85C3A8D033CF2ABD045131969431DF3BCC689B902402FF9A683CDF5C96EFF1FBFD2563BF50EDAFB2200C887A51F4FF10B4D14A5AA745BBD62DD7DB1C5EA183E3FE575795096A830BF3FA91D685B96E981718C1568BF95E2D9A146509FE4430570AF16B22DC144D77C61D654F90046F61DC210814E63661061EFA80136272A0DF51F97529AC412523D009391B77DAF29"
                },
                body: `ids=${JSON.stringify([String(jieguo)])}&level=standard&encodeType=mp3`
            };
            let response = await fetch('https://music.163.com/api/song/enhance/player/url/v1', options); //调用接口获取数据

            let res = await response.json(); //结果json字符串转对象

            if (res.code == 200) {
                url = res.data[0]?.url;
                url = url ? url : '';
            }
            console.log(url)
            const music = await segment.record(url)
            let msg2 = await uploadRecord(url, 0, false)
            e.reply('当前歌曲：' + geqv)
            e.reply(msg2)
        }
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
