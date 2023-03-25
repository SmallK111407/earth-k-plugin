import fetch from "node-fetch";
import fs from "fs";
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import plugin from '../../../lib/plugins/plugin.js'
import gsCfg from '../../genshin/model/gsCfg.js'
let data1 = {}
let ml = process.cwd()
let wj = []
let fen = []
let wjname = []
let ks = 0
let huihe = 0
let daan = ""
let yykg = 1
export class GenshinSpeak extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '[土块插件]原神语音',
            /** 功能描述 */
            dsc: '简单开发示例',
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1145,
            rule: [
                {
                    reg: "^#角色语音汇总$", //匹配消息正则，命令正则
                    /** 执行方法 */
                    fnc: 'zonlb'
                }, {
                    reg: "^#(.*)语音(.*)$", //匹配消息正则，命令正则
                    /** 执行方法 */
                    fnc: 'tingyy'
                }, {
                    reg: "^原神猜语$|#我猜(.*)|^重置分数|猜语音|#公布答案", //匹配消息正则，命令正则
                    /** 执行方法 */
                    fnc: 'cyy'
                }

            ]

        })
    }

    async cyy(e) {
        if (e.msg == '重置分数') {
            e.reply('猜语音分数已重置')
            ks = 0
            wj = []
            fen = []
            wjname = []
        }
        if (e.msg == '#公布答案' & ks == 1) {
            e.reply('答案为' + daan + '\n很遗憾没有人答对')
            ks = 0
        }
        if (e.msg == '原神猜语' & ks == 1 | e.msg == '猜语音' & ks == 1) {
            e.reply('当前猜语音已开始，如果猜不出来可以发送#公布答案')
        }
        if (wj.indexOf(e.user_id) == -1 & ks == 1) {
            wj[wj.length] = e.user_id
            fen[fen.length] = 0
            wjname[wjname.length] = e.member.card
            console.log(wjname[0])
        }
        if (e.msg == '原神猜语' | e.msg == '猜语音' & ks == 0) {

            ks = 1
            const dir = './plugins/earth-k-plugin/resources/html/GenshinSpeak/Characters/';

            let name = "总列表"
            let filelist = ""
            let wenj2 = ""
            let n = 0
            // list all files in the directory
            try {
                const files = fs.readdirSync(dir);

                // files object contains all files names
                // log them on console
                files.forEach(file => {

                    wenj2 = wenj2 + file.replace(/.txt/g, "") + "," + ","

                    filelist = filelist + String(n) + "." + file + "\n"
                    n = n + 1
                });
                wenj2 = wenj2.split(",")
                wenj2 = wenj2.filter(n => n)

            } catch (err) {
                console.log(err);
            }
            let i = Math.floor(Math.random() * 48);
            console.log(wenj2[i])

            let jsdz = ml + "/plugins/earth-k-plugin/resources/html/GenshinSpeak/" + "Characters/" + wenj2[i] + ".txt"
            let wb = ""

            let jieguo = fs.readFileSync(jsdz.toString(), 'utf-8')

            wb = jieguo.match(/src="https(\S*).mp3/g);

            for (let a = 0; a < wb.length; a++) {
                wb[a] = wb[a].replace(/src="/g, "").trim();

            }


            let z = Math.floor(Math.random() * wb.length);
            console.log(z)

            if (yykg == 1) {
                let msg2 = await uploadRecord(wb[Number(z)], 0, false)
                e.reply(msg2)

            } else {
                let msg2 = await segment.record(wb[Number(z)])
                e.reply(msg2)


            }

            //let msg2 = await segment.record(wb[Number(z)])

            daan = wenj2[i]
        }

        if (e.msg.includes('#我猜') & ks == 1) {
            let caice = e.msg.replace(/#我猜/g, "").trim()
            let role = {}

            role = gsCfg.getRole(caice)
            if (role.name != undefined & role.name != "主角") {
                caice = role.name

            }

            console.log(caice)
            console.log(daan)
            if (caice == daan) {
                ks = 0
                console.log('答对了')
                e.reply([segment.at(e.user_id), "恭喜你回答正确"])
                huihe = huihe + 1
                let msg4 = ""
                for (let i = 0; i < wj.length; i++) {

                    if (e.user_id == wj[i]) {
                        fen[i] = fen[i] + 1
                    }
                    msg4 = '\n' + wjname[i] + '     ' + String(fen[i]) + '分' + msg4
                }
                //e.reply(['当前分数为：\n' + msg4 +'\n当前为第'+String(huihe)+'回合\n共10回合']);


                data1 = {
                    tplFile: './plugins/earth-k-plugin/resources/html/GenshinSpeak/GuessVideo.html',
                    dz: ml,
                    wjname: wjname,
                    fen: fen,
                    huihe: huihe

                }
                let img = await puppeteer.screenshot("123", {
                    ...data1,
                });
                e.reply(img)



                if (huihe == 10) {



                    e.reply(['游戏结束\n，最终得分为：\n' + msg4]);
                    wj = []
                    fen = []
                    wjname = []
                    e.reply('分数已重置')
                    huihe = 0


                }

            }
        }


    }

    async tingyy(e) {
        if (e.msg == "#高清语音开启") {
            yykg = 1
            e.reply('高清语音已开启，ps.电脑听不了高清语音')
            return
        }
        if (e.msg == "#高清语音关闭") {
            yykg = 0
            e.reply('高清语音已关闭')
            return
        }

        //兼容小飞插件 #(高清)语音x 指令
        if (e.msg.startsWith("#高清语音") || e.msg.startsWith("#语音"))
            return

        if (e.msg == "#猜语音") {
            e.reply('你干嘛哎哟，命令是猜语音，没有#，哼哼啊啊啊啊啊啊啊~。')
            return
        }

        let reg = /[\u4e00-\u9FA5]+/;
        let name = e.msg
        let name1 = name.replace(/语音/g, "").trim()

        let name2 = name1.replace(/#/g, "").trim()



        let name3 = String(name2).match(reg)
        let name4 = name3[0]

        let i = name2.replace(new RegExp(name3, 'g'), "");



        let role = {}
        console.log(name4)
        if (e.msg.includes("语音列表")) {
            name4 = name4.replace(/列表/g, "").trim()


            role = gsCfg.getRole(name4)
            console.log(role.name)
            if (role.name != undefined) {
                name4 = role.name
            }




        } else {
            role = gsCfg.getRole(name4)

            if (role.name != undefined) {

                name4 = role.name
            }
        }

        //https://wiki.biligame.com/ys/%E5%8F%AF%E8%8E%89%E8%AF%AD%E9%9F%B3
        let jsdz = ml + "/plugins/earth-k-plugin/resources/html/GenshinSpeak/" + "Characters/" + name4 + ".txt"
        let wb = ""

        let jieguo = ""
        try {
            jieguo = fs.readFileSync(jsdz.toString(), 'utf-8')

        } catch {
            e.reply('没有这个角色的语音')
            return

        }

        let liebiao
        wb = jieguo.match(/src="https(\S*).mp3/g);
        if (name4 == "纳西妲" | name4 == "赛诺" | name4 == "坎蒂丝" | name4 == "妮露" | name4 == "夜兰" | name4 == "莱依拉" | name4 == "久岐忍" | name4 == "鹿野院平藏" | name4 == "空" | name4 == "荧" | name4 == "流浪者" | name4 == "艾尔海森" | name4 == "瑶瑶" | name4 == "珐露珊") {
            liebiao = jieguo.match(/pre-wrap;">([\s\S]*?)</g);

        } else {
            liebiao = jieguo.match(/pre-wrap;">(\S*)</g);
        }

        let liebiao2 = ""
        //'pre-wrap;">元素爆发·其一</p><',
        for (let b = 0; b < liebiao.length; b++) {
            liebiao[b] = liebiao[b].replace(/pre-wrap;"/g, "").trim();
            liebiao[b] = liebiao[b].replace(/\/p/g, "").trim();
            liebiao[b] = liebiao[b].replace(/\>/g, "").trim();
            liebiao[b] = liebiao[b].replace(/\</g, "").trim();
        }

        liebiao2 = liebiao2.split(",")
        for (let a = 0; a < wb.length; a++) {
            wb[a] = wb[a].replace(/src="/g, "").trim();

        }
        if (e.msg.includes("语音列表")) {

            data1 = {
                tplFile: './plugins/earth-k-plugin/resources/html/GenshinSpeak/index.html',
                dz: ml,
                nr2: liebiao,
                name: name4

            }
            let img = await puppeteer.screenshot("123", {
                ...data1,
            });
            e.reply(img)

            return
        }

        let shuliang = liebiao.length / 2

        if (i == "") {
            i = Math.floor(Math.random() * shuliang)

        }






        e.reply(liebiao[(i - 1) * 2])

        if (yykg == 1) {
            let msg2 = await uploadRecord(wb[Number(i - 1)], 0, false)
            e.reply(msg2)

        } else {
            let msg2 = await segment.record(wb[Number(i - 1)])
            e.reply(msg2)

        }





    }

    async zonlb(e) {
        const dir = './plugins/earth-k-plugin/resources/html/GenshinSpeak/Characters/';
        let name = "总列表"
        let filelist = ""
        let wenj2 = ""
        let n = 0
        // list all files in the directory
        try {
            const files = fs.readdirSync(dir);

            // files object contains all files names
            // log them on console
            files.forEach(file => {

                wenj2 = wenj2 + file.replace(/.txt/g, "") + "," + ","

                filelist = filelist + String(n) + "." + file + "\n"
                n = n + 1
            });
            wenj2 = wenj2.split(",")

        } catch (err) {
            console.log(err);
        }
        name = "角色"
        data1 = {
            tplFile: './plugins/earth-k-plugin/resources/html/GenshinSpeak/index.html',
            dz: ml,
            nr2: wenj2,
            name: name
        }
        let img = await puppeteer.screenshot("123", {
            ...data1,
        });
        e.reply(img)

    }
    async liebiao(e) {
        let reg = /[\u4e00-\u9FA5]+/;
        let n = 1
        let filelist = ""
        let wenj2 = ""

        let name = e.msg.replace(/语音列表/g, "").trim()
        name = name.replace(/#/g, "").trim()
        console.log(name)
        const dir = './plugins/earth-k-plugin/resources/html/GenshinSpeak/Characters/' + name + '/';

        // list all files in the directory
        try {
            const files = fs.readdirSync(dir);
            // files object contains all files names
            // log them on console
            files.forEach(file => {
                wenj2 = wenj2 + file.match(reg) + ","
                filelist = filelist + String(n) + "." + file + "\n"
                n = n + 1
            });
            wenj2 = wenj2.split(",")
        } catch (err) {
            console.log(err);
        }
        data1 = {
            tplFile: './plugins/earth-k-plugin/resources/html/GenshinSpeak/index.html',
            dz: ml,
            nr2: wenj2,
            name: name
        }
        let img = await puppeteer.screenshot("123", {
            ...data1,
        });
        e.reply(img)
    }
}
