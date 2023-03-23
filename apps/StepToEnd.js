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
let zhuren
let gs = ""
let dati
let wjname1 = []
let huiheshu = 0
export class yzdd extends plugin {
    constructor() {
        super({
            name: '[土块插件]一站到底',
            dsc: '简单开发示例',
            event: 'message',
            priority: 1145,
            rule: [{
                reg: "^#加入一站到底$",
                fnc: 'jryx'
            }, {
                reg: "^#开始一站到底$|^答(.*)",
                fnc: 'ksyx'
            }, {
                reg: "^#发起一站到底$",
                fnc: 'jryx'
            }, {
                reg: "^#结束一站到底$",
                fnc: 'jsyx'
            }

            ]

        })
    }
    async jsyx(e) {
        if (e.user_id == zhuren) {
            e.reply('一站到底已结束')
            wanjia = []
            game = 0
            fq = 0
            daan = ""
            renshu = 0
            huihe = 0

            wjname = []
            huiheshu = 0

            wjname1 = []
            zhuren = 0
        }
    }


    async jryx(e) {

        if (fq == 0 & e.msg == '#发起一站到底') {
            zhuren = e.user_id
            fq = 1
            e.reply('一站到底已发起，快来加入吧')

            console.log(e.group_id)
        } else if (fq == 1 & e.msg != '#加入一站到底') {
            e.reply('已经发起过了，哼哼啊啊啊啊啊')
            return
        }
        else if (fq == 0 & e.msg == '#加入一站到底') {
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
        if (e.msg.includes('答') & game == 0) {
            console.log(121231231231231)
            return false
        }
        if (e.msg.includes('答') & game == 1) {
            if (wanjia.length == 1) {
                e.reply(['一站到底结束，本轮站神是', segment.at(wanjia[huihe])])
                return
            }
            console.log(wanjia[huihe])
            if (e.user_id == wanjia[huihe]) {
                huiheshu = huiheshu + 1
                console.log(123123123)
                gs = e.msg.replace(/答/g, "").trim();
                console.log(e.user_id, wanjia[huihe])
                if (gs == daan) {
                    clearTimeout(dati)
                    huihe = huihe + 1
                    e.reply('回答正确')
                    let url = 'https://xiaoapi.cn/API/game_dati.php?id=1828222534&msg=%E5%BC%80%E5%A7%8B%E6%B8%B8%E6%88%8F'
                    let res = await fetch(url)
                    res = await res.json()
                    let msg = res.data.msg
                    let xuanxiang = '\n' + res.data.option
                    daan = res.data.answer
                    if (huihe == wanjia.length) {
                        huihe = 0
                    }
                    e.reply([segment.at(wanjia[huihe]), '\n' + msg + xuanxiang, '\n第' + String(huiheshu) + '回合', ',当前人数', String(wanjia.length) + '人'])
                    console.log(daan)

                    dati = setTimeout(() => {

                        wanjia.splice(huihe, 1)


                        if (wanjia.length == 1) {
                            e.reply(['一站到底结束，本轮站神是', segment.at(wanjia[0]), "，答案是" + daan])
                            wanjia = []
                            game = 0
                            fq = 0
                            daan = ""
                            renshu = 0
                            huihe = 0

                            wjname = []
                            huiheshu = 0

                            wjname1 = []

                            zhuren = 0
                            return
                        }
                        e.reply(['20秒未作答，你被淘汰了，请下一位作答'])


                        let msg = res.data.msg
                        let xuanxiang = '\n' + res.data.option
                        daan = res.data.answer
                        if (huihe == wanjia.length) {
                            huihe = 0

                        }
                        e.reply([segment.at(wanjia[huihe]), '\n' + msg + xuanxiang, '\n第' + String(huiheshu) + '回合', ',当前人数', String(wanjia.length) + '人'])
                        console.log(daan)


                        console.log()
                    }
                        , 20000);


                } else {
                    clearTimeout(dati)
                    wanjia.splice(huihe, 1)


                    if (wanjia.length == 1) {
                        e.reply(['一站到底结束，本轮站神是', segment.at(wanjia[0]), "，答案是" + daan])
                        wanjia = []
                        game = 0
                        fq = 0
                        daan = ""
                        renshu = 0
                        huihe = 0

                        wjname = []
                        huiheshu = 0


                        wjname1 = []


                        zhuren = 0
                        return
                    }
                    e.reply(['回答错误，你被淘汰了，请下一位作答', "，答案是" + daan])
                    let url = 'https://xiaoapi.cn/API/game_dati.php?id=1828222534&msg=%E5%BC%80%E5%A7%8B%E6%B8%B8%E6%88%8F'


                    let res = await fetch(url)
                    res = await res.json()

                    let msg = res.data.msg
                    let xuanxiang = '\n' + res.data.option
                    daan = res.data.answer
                    if (huihe == wanjia.length) {
                        huihe = 0

                    }
                    e.reply([segment.at(wanjia[huihe]), '\n' + msg + xuanxiang, '\n第' + String(huiheshu) + '回合', ',当前人数', String(wanjia.length) + '人'])
                    console.log(daan)


                    console.log()
                    dati = setTimeout(() => {

                        wanjia.splice(huihe, 1)


                        if (wanjia.length == 1) {
                            e.reply(['一站到底结束，本轮站神是', segment.at(wanjia[0]), "，答案是" + daan])
                            wanjia = []
                            game = 0
                            fq = 0
                            daan = ""
                            renshu = 0
                            huihe = 0

                            wjname = []
                            huiheshu = 0

                            wjname1 = []

                            zhuren = 0
                            return
                        }
                        e.reply(['20秒未作答，你被淘汰了，请下一位作答'])


                        let msg = res.data.msg
                        let xuanxiang = '\n' + res.data.option
                        daan = res.data.answer
                        if (huihe == wanjia.length) {
                            huihe = 0

                        }
                        e.reply([segment.at(wanjia[huihe]), '\n' + msg + xuanxiang, '\n第' + String(huiheshu) + '回合', ',当前人数', String(wanjia.length) + '人'])
                        console.log(daan)


                        console.log()
                    }
                        , 20000);


                }
            }

            return
        }

        if (game == 0 & e.msg == '#开始一站到底' & fq == 1) {
            huiheshu = huiheshu + 1



            // let i = Math.floor(Math.random() * ciku.length);

            let msg2 = '以下为玩家对应的号码数'
            for (let i = 0; i < renshu; i++) {
                msg2 = msg2 + '\n' + String(i + 1) + '号：' + wjname[i]
            }

            let url = 'https://xiaoapi.cn/API/game_dati.php?id=1828222534&msg=%E5%BC%80%E5%A7%8B%E6%B8%B8%E6%88%8F'

            let res = await fetch(url)
            res = await res.json()

            let msg = res.data.msg
            let xuanxiang = '\n' + res.data.option
            daan = res.data.answer

            e.reply([segment.at(wanjia[0]), msg + xuanxiang, '\n第' + String(huiheshu) + '回合'])
            console.log(daan)

            dati = setTimeout(() => {

                wanjia.splice(huihe, 1)


                if (wanjia.length == 1) {
                    e.reply(['一站到底结束，本轮站神是', segment.at(wanjia[0]), "，答案是" + daan])
                    wanjia = []
                    game = 0
                    fq = 0
                    daan = ""
                    renshu = 0
                    huihe = 0

                    wjname = []
                    huiheshu = 0

                    wjname1 = []

                    zhuren = 0
                    return
                }
                e.reply(['20秒未作答，你被淘汰了，请下一位作答'])

                let msg = res.data.msg
                let xuanxiang = '\n' + res.data.option
                daan = res.data.answer
                if (huihe == wanjia.length) {
                    huihe = 0

                }
                e.reply([segment.at(wanjia[huihe]), '\n' + msg + xuanxiang, '\n第' + String(huiheshu) + '回合', ',当前人数', String(wanjia.length) + '人'])
                console.log(daan)

                console.log()
            }
                , 20000);
            game = 1
        } else if (game == 1 & e.msg == '#开始一站到底') {
            e.reply('游戏已经开始了,哼哼啊啊啊啊啊啊啊')
        }
    }
}


