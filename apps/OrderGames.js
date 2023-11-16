import fetch from "node-fetch";
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
let data1 = {}
let ml = process.cwd()
let lb = []
let tpj = []
let mz = []
let yema = 1
let msg2 = ''
let tag = 0
export class OrderGames extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '[土块1插件]点游戏',
            /** 功能描述 */
            dsc: '简单开发1示例',
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1145,
            rule: [{
                reg: "^#点(.*)游戏|#游戏下一页|#游戏上一页", //匹配消息正则，命令正则
                /** 执行方法 */
                fnc: 'youxi'
            }, {
                reg: "^#玩(.*)", //匹配消息正则，命令正则
                /** 执行方法 */
                fnc: 'wanyouxi'
            }

            ]

        })
    }
    async wanyouxi(e) {
        if (e.msg.includes('#玩')) {
            let id = e.msg.replace(/#玩/g, "").trim()
            id = Number(id)

            let tp = segment.image(tpj[id - 1])
            e.reply([tp, mz[id - 1], lb[id - 1]])
        }

    }
    async youxi(e) {
        if (e.msg == '#游戏下一页') {

            yema = yema + 1
        }
        if (e.msg == '#游戏上一页') {
            if (yema > 1) {
                yema = yema - 1
            }
        }
        if (e.msg.includes("#点")) {
            yema = 1
        }
        let msg = e.msg.replace(/#点/g, "").trim()
        msg = msg.replace(/游戏/g, "").trim()
        msg = msg.replace(/#下一页/g, "").trim()
        msg = msg.replace(/#上一页/g, "").trim()
        if (msg == '') {
            msg = msg2
        } else {
            msg2 = msg
        }
        if (msg == "fc") {
            tag = 0
        }
        if (msg == "街机") {
            tag = 9
        }
        if (msg == "gba") {
            tag = 11
        }
        let url = `https://www.yikm.net/nes?page=${yema}&tag=${tag}&e=0`
        let res = await fetch(url)
        let data = await res.text()
        lb = []
        tpj = []
        mz = []
        lb = data.match(/href="\/play(.*?)&n=/g);
        mz = data.match(/&t=(.*?)&/g);
        if (msg == "fc") {

            tpj = data.match(/&p=(.*?)">/g);
            for (let i = 0; i < tpj.length; i++) {
                tpj[i] = tpj[i].replace(/&p=/g, "").trim();
                tpj[i] = tpj[i].replace(/">/g, "").trim();
                tpj[i] = "https://img.1990i.com/" + tpj[i]

            }
            tpj = tpj.filter((value, index) => index % 2 !== 0);
        }
        if (msg == "街机") {

            tpj = data.match(/img-raised" src="(.*?)">/g);
            for (let i = 0; i < tpj.length; i++) {
                tpj[i] = tpj[i].replace(/img-raised" src="/g, "").trim();
                tpj[i] = tpj[i].replace(/">/g, "").trim();

            }
        }
        if (msg == "gba") {

            tpj = data.match(/img-raised" src="(.*?)">/g);
            for (let i = 0; i < tpj.length; i++) {
                tpj[i] = tpj[i].replace(/img-raised" src="/g, "").trim();
                tpj[i] = tpj[i].replace(/">/g, "").trim();
            }

        }
        for (let i = 0; i < mz.length; i++) {
            mz[i] = mz[i].replace(/&t=/g, "").trim();
            mz[i] = mz[i].replace(/&/g, "").trim();
        }
        mz = [...new Set(mz)];
        for (let i = 0; i < lb.length; i++) {

            lb[i] = lb[i].replace(/href="\/play/g, "").trim();
            lb[i] = lb[i].replace(/href="/g, "").trim();
            lb[i] = lb[i].replace(/&n=/g, "").trim();
            lb[i] = "https://www.yikm.net/play" + lb[i]


        }
        lb = [...new Set(lb)];
        data1 = {
            tplFile: './plugins/earth-k-plugin/resources/html/Game/OrderGames.html',
            dz: ml,
            lb: lb,
            tp: tpj,
            mz: mz

        }
        let img = await puppeteer.screenshot("123", {
            ...data1,
        });
        e.reply(img)
    }
}


