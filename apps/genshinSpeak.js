import {
    segment
}
from "oicq";
import fetch from "node-fetch";
import fs from "fs";
import puppeteer from "../../..//lib/puppeteer/puppeteer.js";
let data1 = {}
let ml = process.cwd()

    export class genshinSpeak extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '土块原神角色语音',
            /** 功能描述 */
            dsc: '简单开发示例',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 4999,
            rule: [
                {
                    reg: "^#角色语音汇总$", //匹配消息正则，命令正则
                    /** 执行方法 */
                    fnc: 'zonlb'
                }, {
                    reg: "^#(.*)语音(.*)$", //匹配消息正则，命令正则
                    /** 执行方法 */
                    fnc: 'tingyy'
                }

            ]

        })
    }
    async tingyy(e) {
        let reg = /[\u4e00-\u9FA5]+/;
        let name = e.msg
            let name1 = name.replace(/语音/g, "").trim()
            console.log(name1)
            let name2 = name1.replace(/#/g, "").trim()

            console.log(name2)

            let name3 = String(name2).match(reg)
            let name4 = name3[0]
            let i = name2.replace(new RegExp(name3, 'g'), "");
        console.log(name4)
        console.log(i)

        if (e.msg.includes("语音列表")) {
            name4 = name4.replace(/列表/g, "").trim()
                console.log(name4)
        }

        //https://wiki.biligame.com/ys/%E5%8F%AF%E8%8E%89%E8%AF%AD%E9%9F%B3
        let jsdz = ml + "/plugins/earth-k-plugin/resources/yy/" + "name/" + name4 + ".txt"
            let wb = ""

            let jieguo = fs.readFileSync(jsdz.toString(), 'utf-8')

            wb = jieguo.match(/src="https(\S*).mp3/g);
        let liebiao = jieguo.match(/pre-wrap;">(\S*)</g);
        let n = Number(i) + 1
            console.log(wb[1])
            let liebiao2 = ""
            //'pre-wrap;">元素爆发·其一</p><',
            for (let b = 0; b < liebiao.length; b++) {
                liebiao[b] = liebiao[b].replace(/pre-wrap;"/g, "").trim();
                liebiao[b] = liebiao[b].replace(/\/p/g, "").trim();
                liebiao[b] = liebiao[b].replace(/\>/g, "").trim();
                liebiao[b] = liebiao[b].replace(/\</g, "").trim();
            }
            console.log(liebiao[0])
            liebiao2 = liebiao2.split(",")
            for (let a = 0; a < wb.length; a++) {
                wb[a] = wb[a].replace(/src="/g, "").trim();

            }
            if (e.msg.includes("语音列表")) {

                data1 = {
                    tplFile: './plugins/earth-k-plugin/resources/yy/index.html',
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

            let msg2 = await segment.record(wb[Number(i - 1)])
            e.reply(msg2)

    }

    async zonlb(e) {
        const dir = './plugins/earth-k-plugin/resources/yy/name/';
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
            tplFile: './plugins/earth-k-plugin/resources/yy/index.html',
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
            const dir = './plugins/earth-k-plugin/resources/yy/角色/' + name + '/';

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
            tplFile: './plugins/earth-k-plugin/resources/yy/index.html',
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
