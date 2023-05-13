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
let touzi = ""
let zon = []
export class tzl extends plugin {
    constructor() {
        super({
            name: '[土块插件]大话骰',
            dsc: '简单开发示例',
            event: 'message',
            priority: 1145,
            rule: [{
                reg: "^#加入大话骰$",
                fnc: 'jryx'
            }, {
                reg: "^#开始大话骰$|我叫(.*)",
                fnc: 'ksyx'
            }, {
                reg: "^#发起大话骰$",
                fnc: 'jryx'
            }, {
                reg: "^#结束大话骰$",
                fnc: 'jsyx'
            }, {
                reg: "^#大话骰规则$",
                fnc: 'tzgz'
            }, {
                reg: "^#开蛊$",
                fnc: 'kg'
            }
            ]
        })
    }
    async kg(e) {
        let msg = ""
        for (let i = 0; i < zon.length; i++) {
            msg = msg + wjname[i] + ':' + zon[i] + '\n'
        }
        e.reply(msg)
        zon = []
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
    }
    async tzgz(e) {
        let msg = await segment.image('./plugins/earth-k-plugin/resources/img/骰子规则.jpg')
        e.reply(msg)
    }
    async jsyx(e) {
        if (e.user_id == zhuren) {
            e.reply('大话骰已结束')
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
        }
    }
    async jryx(e) {
        if (fq == 0 & e.msg == '#发起大话骰') {
            zhuren = e.user_id
            fq = 1
            e.reply('大话骰已发起，快来加入吧')
            qun = e.group_id
            console.log(e.group_id)
        } else if (fq == 1 & e.msg != '#加入大话骰') {
            e.reply('已经发起过了，哼哼啊啊啊啊啊')
            return
        }
        else if (fq == 0 & e.msg == '#加入大话骰') {
            e.reply('游戏还没发起呢')
            return
        }
        console.log(wanjia.indexOf(e.user_id))
        if (wanjia.indexOf(e.user_id) == -1 & wanjia.length < 2) {
            if (game == 0) {

                wanjia[wanjia.length] = e.user_id
                let msg = [segment.at(e.user_id), '加入游戏成功，当前人数', String(wanjia.length), '人', '当玩家人数为2人时房主可以开始了']
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
        if (e.msg.includes('我叫') & game == 0) {
            return false
        }
        if (e.msg.includes('我叫') & game == 1) {

            if (wj.indexOf(e.user_id) == -1 & game == 1) {
                wj[wj.length] = e.user_id
                fen[fen.length] = 0
                wjname1[wjname1.length] = e.member.card
                console.log(wjname1[0])
            }
            let caice = e.msg.replace(/我叫/g, "").trim();
            if (caice == daan) {
                let msg4 = ""
                huihe = huihe + 1
                huihe1 = huihe1 + 1
                for (let i = 0; i < wj.length; i++) {
                    if (e.user_id == wj[i]) {
                        fen[i] = fen[i] + 1
                    }
                    msg4 = '\n' + wjname1[i] + '     ' + String(fen[i]) + '分' + msg4
                }
                //e.reply(['当前分数为：\n' + msg4 +'\n当前为第'+String(huihe)+'回合\n共10回合']);
                data1 = {
                    tplFile: './plugins/earth-k-plugin/resources/html/YouDraw&IGuess/YouDraw&IGuess.html',
                    dz: ml,
                    wjname: wjname1,
                    fen: fen,
                    huihe: huihe1,
                    ren: wanjia.length * 2
                }
                let img = await puppeteer.screenshot("123", {
                    ...data1,
                });
                e.reply(img)
                Bot.pickGroup(qun).sendMsg(["恭喜", segment.at(e.user_id), '回答正确，加1分']);
                let i = Math.floor(Math.random() * ciku.length);
                if (lunci == 1 & huihe == wanjia.length) {
                    e.reply('大话骰游戏结束，以上为最终得分')
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
                    return
                }
                if (huihe == wanjia.length) {
                    huihe = 0
                    lunci = 1
                }
                let tp = segment.image('https://c2cpicdw.qpic.cn/offpic_new/0//1142407413-3587893631-F7E9A2A13278357600BB7B7E8895DD26/0')
                e.reply(['正确答案是：' + daan + '\n现在进入下一轮', '\n当前发言:', wjname[huihe]])
                Bot.pickUser(wanjia[huihe]).sendMsg(ciku[i]);
                Bot.pickMember(e.group_id, wanjia[huihe]).sendMsg(ciku[i]);
                daan = ciku[i]
                console.log(daan)
                ciku.splice(i, 1)
            }
            return
        }
        if (game == 0 & e.msg == '#开始大话骰' & fq == 1) {
            e.reply(['\n大话骰已开始，请查看后由1号开始'])
            let msg2 = '以下为玩家对应的号码数'
            for (let i = 0; i < renshu; i++) {
                msg2 = msg2 + '\n' + String(i + 1) + '号：' + wjname[i]
            }
            e.reply([msg2, '\n当前发言:', wjname[0]])
            ytz()
            Bot.pickUser(wanjia[0]).sendMsg(touzi);
            Bot.pickMember(e.group_id, wanjia[0]).sendMsg(touzi)
            zon.push(touzi)
            ytz()
            Bot.pickUser(wanjia[1]).sendMsg(touzi);
            Bot.pickMember(e.group_id, wanjia[1]).sendMsg(touzi)
            zon.push(touzi)
            console.log(daan)
            game = 1
        } else if (game == 1 & e.msg == '#开始大话骰') {
            e.reply('游戏已经开始了,哼哼啊啊啊啊啊啊啊')

        } else if (game == 0 & e.msg == '#开始大话骰' & fq == 0) {
            e.reply('游戏还没有发起啊,哼哼啊啊啊啊啊啊啊')
        }
    }
}
async function ytz() {
    touzi = ""
    for (let i = 0; i < 5; i++) {
        let n = Math.floor(Math.random() * 6);
        touzi = touzi + String(n + 1) + ' '
    }
}

