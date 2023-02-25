import { segment } from "oicq";
import fetch from "node-fetch";
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
let ml = process.cwd()
let wanjia = []
let game = 0
let fq = 0
let daan = ""
let renshu = 0
let huihe = 0
let wjname = []
let wj = []
let fen = []
let wjname1 = []
let data1 = {}
let lunci = 0
let huihe1 = 0
let zhuren
let qun = 0
let gs = ""
let gushi = ""
let ciku = ['激情', '恐怖', '温馨', '可爱', '惊悚', '灵异', '团结', '有爱', '大哥', '小黑子', '666', '蔡徐坤', '黑夜', '马车', '侦探', '白日做梦', '手机', '痛苦', '可怕'
    , '有趣', '轻松', '愉快', '音乐', '唱', '跳', 'RAP', '篮球', '科幻', '战争', '温暖', '会飞', '残酷', '恐惧', '幻觉', '电影', '爱情', '大佬', '花海']

let kt = ['当晚最后一辆73路公交车返回公交总站，街上的路灯依次熄灭，李雷掐灭了手上的烟头，转身浸入一片黑暗。街角，提着高跟鞋的女人不紧不慢的尾随。“韩梅梅，你来了。”',
    '穿越过后宫，性格呆萌的我本打算混吃等死，当个小公主就好啦！  可偏偏获得了一个《皇帝宠幸别人我就会死系统》，  哎呀，皇帝今晚要去延禧宫，怎么办....眼看着天就要黑了！',
    '再来个系统叭，谁说得到系统就可以为所欲为？我这个系统简直一言难尽！天生高冷的我得到了一个舔狗系统，系统天天让我去舔那些一言难尽的人！.舔还不行吗！',
    '长生8000年，已经叱咤一界的我再次回到地球。呵呵，我脑补了许多自己在这里无敌的场面。一段时间之后等等，你说你活了8万年？他活了80万年？什么？还有800万年的！',
    '就想起昨天晚上这里闹鬼,小明就不敢出去,呆在家里看电视......突然,一阵声音传来,呜..........呜这声音如此的恐怖,他吓的赶紧躲到桌子底下,声音越来越近........忽然,一个白影闪过,小明尖叫一声"啊"........',
    '出门就被一架飞机撞死了！不过，还好，天龙2星上的智能生物昨天刚刚送给地球一批起死回生的食物，他吃下后，果然又活了过来，不过........',
    '我叫鸡哥，我经常被黑，但我从不。。。',
    '圣遗物又强化失败了，我独自一个人走到天台',
    '我是一个超能力者，这天我拯救了一个鸡哥',
    '为什么！为什么大家都要黑我，明明我只是爱打篮球而已',
    '我叫小鸡，我喜欢唱跳rap，我在学校有很多粉丝...',
    '某天，我收到了鸡哥的来信...',
    '这个世界，拒绝了我鸡哥吗？',
    '我来自鸡星球，在这里生活的人，各个都...',
    '我第一次打篮球的时候，是她...',
    '天呐。竟然是鸡哥，是鸡哥，啊啊啊..',
]

let gsnr = []
let msr = []
let gjc = []
let tx = []
export class StorySuccession extends plugin {
    constructor() {
        super({
            name: '[土块插件]故事接龙',
            dsc: '简单开发示例',
            event: 'message',
            priority: 1145,
            rule: [{
                reg: "^#加入故事接龙$",
                fnc: 'jryx'
            }, {
                reg: "^#开始故事接龙$|讲述(.*)",
                fnc: 'ksyx'
            }, {
                reg: "^#发起故事接龙$",
                fnc: 'jryx'
            }, {
                reg: "^#结束故事接龙$",
                fnc: 'jsyx'
            }

            ]

        })
    }
    async jsyx(e) {
        if (e.user_id == zhuren) {
            e.reply('故事接龙已结束')
            wanjia = []
            game = 0
            fq = 0
            daan = ""
            renshu = 0
            huihe = 0
            huihe1 = 0
            wjname = []
            wj = []
            fen = []
            wjname1 = []
            data1 = {}
            lunci = 0
            zhuren = 0
            qun = 0
            gsnr = []
            msr = []
            gjc = []
            tx = []

        }


    }


    async jryx(e) {

        if (fq == 0 & e.msg == '#发起故事接龙') {
            zhuren = e.user_id
            fq = 1
            e.reply('故事接龙已发起，快来加入吧')
            qun = e.group_id
            console.log(e.group_id)
        } else if (fq == 1 & e.msg != '#加入故事接龙') {
            e.reply('已经发起过了，哼哼啊啊啊啊啊')
            return
        }
        else if (fq == 0 & e.msg == '#加入故事接龙') {
            e.reply('游戏还没发起呢')
            return
        }

        console.log(wanjia.indexOf(e.user_id))
        if (wanjia.indexOf(e.user_id) == -1) {
            if (game == 0) {

                wanjia[wanjia.length] = e.user_id
                let msg = [segment.at(e.user_id), '加入游戏成功，当前人数', String(wanjia.length), '人']
                e.reply(msg)
                renshu = wanjia.length

                wjname[wanjia.length - 1] = e.member?.card ? e.member.card : e.member?.nickname

            }
            if (game == 1) {
                e.reply('游戏已经开始了,哼哼啊啊啊啊啊啊啊')
            }

        } else {
            if (game == 0) {
                e.reply('你已经加入游戏了！')


            }
            if (game == 1) {
                e.reply('游戏已经开始了,哼哼啊啊啊啊啊啊啊')
            }
        }
    }

    async ksyx(e) {
        if (e.msg.includes('讲述') & game == 0) {
            return false
        }

        if (e.msg.includes('讲述') & game == 1) {

            if (e.user_id == wanjia[huihe]) {
                console.log(123123123)
                huihe1 = huihe1 + 1
                gs = e.msg.replace(/讲述/g, "").trim();
                msr.push(wjname[huihe])
                gsnr.push(gs)
                console.log(e.user_id, wanjia[huihe])
                let i = Math.floor(Math.random() * ciku.length);
                gjc.push(ciku[i])
                let a = 'http://q2.qlogo.cn/headimg_dl?dst_uin=' + e.user_id + '&spec=5'
                tx.push(a)

                data1 = {
                    tplFile: './plugins/earth-k-plugin/resources/html/StorySuccession/StorySuccession.html',
                    dz: ml,
                    wjname: wjname1,
                    msr: msr,
                    gsnr: gsnr,


                    gjc: gjc,
                    tx: tx,

                    huihe: huihe1,
                    ren: wanjia.length * 2
                }

                let img = await puppeteer.screenshot("123", {
                    ...data1,
                });
                e.reply(img)
                huihe = huihe + 1

                if (lunci == 1 & huihe == wanjia.length) {
                    e.reply('故事接龙游戏结束，以上为最终故事')
                    wanjia = []
                    game = 0
                    fq = 0
                    daan = ""
                    renshu = 0
                    huihe = 0
                    huihe1 = 0
                    wjname = []
                    wj = []
                    fen = []
                    wjname1 = []
                    data1 = {}
                    lunci = 0
                    zhuren = 0
                    qun = 0

                    gsnr = []
                    msr = []
                    gjc = []
                    tx = []

                    return
                }
                if (huihe == wanjia.length) {
                    huihe = 0
                    lunci = 1
                }
                e.reply(['已描述完毕' + '\n现在进入下一轮', '\n当前讲述:', segment.at(wanjia[huihe]), '\n当前关键词：' + ciku[i]])
            }
            return
        }
        if (game == 0 & e.msg == '#开始故事接龙') {
            let n = Math.floor(Math.random() * kt.length);
            gushi = kt[n]

            e.reply(['\n故事接龙已开始，请第一位描述者开始编造故事开头\n'])
            let i = Math.floor(Math.random() * ciku.length);
            daan = ciku[i]
            let msg2 = '以下为玩家对应的号码数'
            for (let i = 0; i < renshu; i++) {
                msg2 = msg2 + '\n' + String(i + 1) + '号：' + wjname[i]
            }
            gjc.push(ciku[i])
            e.reply([msg2, '\n当前讲述:', segment.at(wanjia[huihe]), '\n当前关键词:', ciku[i]])
            ciku.splice(i, 1)
            game = 1
        } else if (game == 1 & e.msg == '#开始故事接龙') {
            e.reply('游戏已经开始了,哼哼啊啊啊啊啊啊啊')
        }
    }
}

