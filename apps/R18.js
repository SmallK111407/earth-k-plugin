import plugin from '../../../lib/plugins/plugin.js'
// Yenai-Plugin薄纱这个功能...后续删除@曉K
import fetch from "node-fetch";
import { createRequire }
    from 'module'
const require = createRequire(import.meta.url)
const blacklist = []
let CD = {}; // 命令CD
let isR18 = true; //群聊R18默认值
let isR18s = true; //私聊R18默认值
let interval = 10000; //连发模式的间隔时间，默认为10秒，由于图片质量不同导致发送时间不同，实际间隔可能有误差
let num = 3; //默认连发数量为3
let timeout = 10000

let msgRes = []
let kg = 0
let r18 = 0
let url = ""
let sl = 2
let zr = 1
export class R18 extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '[土块插件]隐藏涩涩',
            /** 功能描述 */
            dsc: '涩涩',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1145,
            rule: [
                {
                    reg: '^#搜索.*$',
                    fnc: 'acgs'
                }, {
                    reg: '^#设置图片数量(.*)|#开启18$|#关闭18$|#仅我能搜$|#一起搜吧$',
                    fnc: 'ycmm'
                }

            ]

        })
    }

    async ycmm(e) {
        if (e.isMaster) {
            if (e.msg == "#仅我能搜") {
                e.reply("好的，现在只有你能搜了")
                zr = 1
            }
            if (e.msg == "#一起搜吧") {
                e.reply("好的，现在大家都能搜了")
                zr = 0
            }

            if (e.msg.includes('#设置图片数量')) {
                let keyword = e.msg.replace("#设置图片数量", "");
                sl = Number(keyword)
                e.reply('当前返回' + keyword + '张图')

            }

            if (e.msg == "#开启18") {
                e.reply("已开启R18模式，请注意身体")
                r18 = 1
            }
            if (e.msg == "#关闭18") {
                e.reply("已关闭R18模式，进入养生模式")
                r18 = 0
            }
        }

    }

    async acgs(e) {
        if (e.isGroup & zr == 0 | e.isGroup & e.isMaster) {
            e.reply('不是这种人！')
            let img = []
            msgRes = []

            let keyword = e.msg.replace("#", "");
            keyword = keyword.replace("搜索", "");
            if (r18 == 0) {
                url = `https://api.lolicon.app/setu/v2?tag=${keyword}&proxy=i.pixiv.re&r18=0&size=regular&num=${sl}`;
            }
            if (r18 == 1) {
                url = `https://api.lolicon.app/setu/v2?tag=${keyword}&proxy=i.pixiv.re&r18=1&size=regular&num=${sl}`;
            }

            let response = ""; //调用接口获取数据
            let res = ""; //结果json字符串转对象
            let imgurl = "";
            try {


                response = await fetch(url);
                res = await response.json();
                for (let i = 0; i < res.data.length; i++) {
                    img[i] = res.data[i].urls.regular;
                }


            } catch {
                e.reply('对不起，没有搜索到' + keyword)
                return
            }

            console.log(img)

            if (res.data.length == 0) {
                e.reply("暂时没有搜到哦！换个关键词试试吧！");
                return true;
            }

            //发送消息

            for (let i = 0; i < img.length; i++) {
                msgRes[i] = await segment.image(img[i])


            }

            let msg2 = ForwardMsg(e, msgRes)
        }

        if (e.isMaster & e.isPrivate) {
            e.reply('不是这种人！')
            let img = []
            msgRes = []

            let keyword = e.msg.replace("#", "");
            keyword = keyword.replace("搜索", "");
            if (r18 == 0) {
                url = `https://api.lolicon.app/setu/v2?tag=${keyword}&proxy=i.pixiv.re&r18=0&size=regular&num=${sl}`;
            }
            if (r18 == 1) {
                url = `https://api.lolicon.app/setu/v2?tag=${keyword}&proxy=i.pixiv.re&r18=1&size=regular&num=${sl}`;
            }

            let response = ""; //调用接口获取数据
            let res = ""; //结果json字符串转对象
            let imgurl = "";
            try {


                response = await fetch(url);
                res = await response.json();
                for (let i = 0; i < res.data.length; i++) {
                    img[i] = res.data[i].urls.regular;
                }


            } catch {
                e.reply('对不起，没有搜索到' + keyword)
                return
            }

            console.log(img)

            if (res.data.length == 0) {
                e.reply("暂时没有搜到哦！换个关键词试试吧！");
                return true;
            }

            //发送消息

            for (let i = 0; i < img.length; i++) {
                msgRes[i] = await segment.image(img[i])


            }

            e.reply(msgRes[0])


        }




        if (e.isPrivate & !e.isMaster) {
            e.reply("不可以私聊涩涩哦")
        }

    }


}

async function ForwardMsg(e, data) {

    let msgList = [];
    for (let i = 0; i < msgRes.length; i++) {
        msgList.push({
            message: msgRes[i],
            nickname: Bot.nickname,
            user_id: Bot.uin,
        });
    }
    if (msgList.length == 10) {
        await e.reply(msgList[0].message);
    } else {
        //console.log(msgList);
        let msg2 = await Bot.makeForwardMsg(msgList);
        msg2.data = msg2.data.replace(/^<\?xml.*version=.*?>/g, '<?xml version="1.0" encoding="utf-8" ?>');
        await e.reply(msg2)
        if (msg2 && msg2.message_id) {
            setTimeout(() => {
                let target = e.group;
                target.recallMsg(msg2.message_id);
            }, 30000);
        }

    }
    return;
}


