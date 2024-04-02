import fetch from "node-fetch";
import fs from "fs";
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
let data1 = {}
let kg = 0
let ml = process.cwd()
export class GenshinPV extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '[土块插件]原神视频',
            /** 功能描述 */
            dsc: '简单开发示例',
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1146,
            rule: [{
                reg: "^#角色视频列表$|^#角色视频(.*)$", //匹配消息正则，命令正则
                /** 执行方法 */
                fnc: 'cspv'
            }, {
                reg: "^#过场动画列表$|^#过场动画(.*)$", //匹配消息正则，命令正则
                /** 执行方法 */
                fnc: 'gcdh'
            }
            ]
        })
    }

    async gcdh(e) {
        let url2 = 'https://api-static.mihoyo.com/common/blackboard/ys_obc/v1/home/content/list?app_sn=ys_obc&channel_id=80'
        let res2 = await fetch(url2)
        let response2 = await res2.json()

        let jslb = response2.data.list[0].children[2].list

        if (e.msg == '#过场动画列表') {

            data1 = {
                tplFile: './plugins/earth-k-plugin/resources/html/GenshinHistory/ml.html',
                dz: ml,
                lb: jslb,
                qsid: 0

            }
            let img = await puppeteer.screenshot("123", {
                ...data1,
            });
            e.reply(img)
            return
        }

        if (e.msg.includes('#过场动画')) {
            let sp = []

            let id = e.msg.replace(/#过场动画/g, "").trim()

            if (Number(id) < 1) {
                e.reply('你这不行，不对')
                return
                kg = 0
            }
            let id2 = jslb[Number(id - 1)].content_id
            let spmz = jslb[Number(id - 1)].title
            id = String(id)
            console.log(id)
            let url = 'https://api-static.mihoyo.com/common/blackboard/ys_obc/v1/content/info?app_sn=ys_obc&content_id=' + id2

            let res = await fetch(url)
            let response = await res.json()
            console.log(response.data.content.contents[0])

            if (response.data.content.contents[0] != undefined) {
                console.log(response.data.content.contents[0].text)
                let jieguo = response.data.content.contents[0].text
                sp = jieguo.match(/<video src="(.*?).mp4/g);
                sp = sp[0].replace(/<video src="/g, "").trim()

                console.log(sp)

            } else {
                console.log(response.data.content.content)
                let jieguo = response.data.content.content
                sp = jieguo.match(/<video src="(.*?).mp4/g);
                sp = sp[0].replace(/<video src="/g, "").trim()

            }

            if (kg == 1) {
                e.reply('我知道你很急，但你别急，先看这个吧')
                await SendMusicShare(e, { source: 'mys', name: spmz, artist: '原神', link: sp })
                return
            }
            kg = 1
            e.reply(spmz + '王大队长，等一下，视频马上就来,你可以先看这个')
            await SendMusicShare(e, { source: 'mys', name: spmz, artist: '原神', link: sp })
            //	console.log(response.data.content.content)
            //let jieguo = response.data.content.content
            //let sp = jieguo.match(/<video src="(.*?).mp4/g);
            //sp = sp[0].replace(/<video src="/g, "").trim()

            //console.log(sp)


            //e.reply('好的，请稍等哦')


            let video = await fetch(sp, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/octet-stream'
                },
            })
            video = Buffer.from(await video.arrayBuffer())

            await e.reply(segment.video(video))
            e.reply('哎诶诶，视频来咯~~~')
            kg = 0
        }
    }
    async cspv(e) {
        let url2 = 'https://api-static.mihoyo.com/common/blackboard/ys_obc/v1/home/content/list?app_sn=ys_obc&channel_id=80'
        let res2 = await fetch(url2)
        let response2 = await res2.json()

        let jslb = response2.data.list[0].children[0].list

        if (e.msg == '#角色视频列表') {

            data1 = {
                tplFile: './plugins/earth-k-plugin/resources/html/GenshinHistory/ml.html',
                dz: ml,
                lb: jslb,
                qsid: 0
            }
            let img = await puppeteer.screenshot("123", {
                ...data1,
            });
            e.reply(img)
            return
        }

        if (e.msg.includes('#角色视频')) {
            let sp = []



            let id = e.msg.replace(/#角色视频/g, "").trim()

            if (Number(id) < 1) {
                e.reply('你这不行，不对')
                return
                kg = 0
            }
            let id2 = jslb[Number(id - 1)].content_id
            let spmz = jslb[Number(id - 1)].title
            id = String(id)
            console.log(id)
            let url = 'https://api-static.mihoyo.com/common/blackboard/ys_obc/v1/content/info?app_sn=ys_obc&content_id=' + id2

            let res = await fetch(url)
            let response = await res.json()
            console.log(response.data.content.contents[0])

            if (response.data.content.contents[0] != undefined) {
                console.log(response.data.content.contents[0].text)
                let jieguo = response.data.content.contents[0].text
                sp = jieguo.match(/<video src="(.*?).mp4/g);
                sp = sp[0].replace(/<video src="/g, "").trim()

                console.log(sp)

            } else {
                console.log(response.data.content.content)
                let jieguo = response.data.content.content
                sp = jieguo.match(/<video src="(.*?).mp4/g);
                sp = sp[0].replace(/<video src="/g, "").trim()

            }
            if (kg == 1) {
                e.reply('我知道你很急，但你别急，先看这个吧，QAQ')
                await SendMusicShare(e, { source: 'mys', name: spmz, artist: '原神', link: sp })
                return
            }
            kg = 1


            e.reply(spmz + '王大队长，等一下，视频马上就来,你可以先看这个')
            await SendMusicShare(e, { source: 'mys', name: spmz, artist: '原神', link: sp })
            //	console.log(response.data.content.content)
            //let jieguo = response.data.content.content
            //let sp = jieguo.match(/<video src="(.*?).mp4/g);
            //sp = sp[0].replace(/<video src="/g, "").trim()

            //console.log(sp)


            //e.reply('好的，请稍等哦')


            let video = await fetch(sp, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/octet-stream'
                },
            })
            video = Buffer.from(await video.arrayBuffer())

            await e.reply(segment.video(video))
            e.reply('哎诶诶，视频来咯~~~')
            kg = 0
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function SendMusicShare(e, data, to_uin = null) {
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
    if (data.url == null) { types.push('url') };
    if (data.pic == null) { types.push('pic') };
    if (data.link == null) { types.push('link') };
    if (types.length > 0 && typeof (data.api) == 'function') {
        let { url, pic, link } = await data.api(data.data, types);
        if (url) { data.url = url; }
        if (pic) { data.pic = pic; }
        if (link) { data.link = link; }
    }

    typeof (data.url) == 'function' ? musicUrl = await data.url(data.data) : musicUrl = data.url;
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
    let ShareMusic_Guild_id = false;

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


