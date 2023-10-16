import fetch from "node-fetch";
import fs from "fs";
import common from "../../../lib/common/common.js"
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
let data1 = {}
let ml = process.cwd()
let lb = []
let sm = []
let js = []
let lianjie = []
let tp = []
let name = ""
let zzss = 0
let tpj = []
export class OrderCartoonII extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '[土块插件]点漫画',
            /** 功能描述 */
            dsc: '简单开发示例',
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1144,
            rule: [{
                reg: "^#点漫画(.*)$|#看漫画(.*)|#选漫画(.*)|#取消漫画搜索$", //匹配消息正则，命令正则
                /** 执行方法 */
                fnc: 'manhua'
            }

            ]

        })
    }

    async manhua(e) {

        if (e.msg.includes("#取消漫画搜索") & zzss == 1) {

            zzss = 0
            e.reply('已取消当前' + name + '搜索')
        }

        if (zzss == 1) {
            e.reply('当前正在搜索中...请勿重复搜索')
            return
        }
        if (e.msg.includes("#点漫画")) {

            name = e.msg.replace(/#点漫画/g, "").trim()
            zzss = 1

            try {
                let url = 'https://www.xinxinyi.com/search?key=' + name


                let response = await fetch(url);
                let data = await response.text();

                lb = data.match(/title=(\S*)>/g);
                sm = data.match(/<a href(\S*) target/g);
                tpj = data.match(/src=(\S*)" alt/g);

                for (let n = 0; n < lb.length; n++) {
                    tpj[n] = tpj[n].replace(/src=/g, "").trim();
                    tpj[n] = tpj[n].replace(/\"/g, "").trim();
                    tpj[n] = tpj[n].replace(/ alt/g, "").trim();

                }


                for (let i = 0; i < lb.length; i++) {
                    lb[i] = lb[i].replace(/title=/g, "").trim();
                    lb[i] = lb[i].replace(/\"/g, "").trim();
                    lb[i] = lb[i].replace(/\>/g, "").trim();
                }
                for (let a = 0; a < sm.length; a++) {
                    sm[a] = sm[a].replace(/<a href=/g, "").trim();
                    sm[a] = sm[a].replace(/\"/g, "").trim();
                    sm[a] = sm[a].replace(/\>/g, "").trim();
                    sm[a] = sm[a].replace(/ target/g, "").trim();

                }
                lb.splice(0, 1)
                data1 = {
                    tplFile: './plugins/earth-k-plugin/resources/html/Cartoon/OrderCartoon.html',
                    dz: ml,
                    lb: lb,
                    tp: tpj

                }
                let img = await puppeteer.screenshot("123", {
                    ...data1,
                });
                e.reply(img)
                zzss = 0
            } catch (err) {
                e.reply('未能搜索到 ' + name + '，抱歉')
                zzss = 0
                return
            }

        }

        if (e.msg.includes("#看漫画")) {


            let id = e.msg.replace(/#看漫画/g, "").trim()
            id = Number(id) - 1
            let url2 = 'https://www.xinxinyi.com/' + sm[id]

            let response2 = await fetch(url2);
            let data2 = await response2.text();

            js = data2.match(/title="(\S*)">/g);
            lianjie = data2.match(/<a href=(\S*) target/g);
            for (let b = 0; b < js.length; b++) {
                js[b] = js[b].replace(/title=/g, "").trim();
                js[b] = js[b].replace(/\>/g, "").trim();
                js[b] = js[b].replace(/\"/g, "").trim();

            }

            js.splice(0, 2)

            for (let c = 0; c < lianjie.length; c++) {
                lianjie[c] = lianjie[c].replace(/a href=/g, "").trim();
                lianjie[c] = lianjie[c].replace(/ target/g, "").trim();
                lianjie[c] = lianjie[c].replace(/\</g, "").trim();
                lianjie[c] = lianjie[c].replace(/\"/g, "").trim();
            }


            data1 = {
                tplFile: './plugins/earth-k-plugin/resources/html/Cartoon/OrderHide.html',
                dz: ml,
                name: name,
                js: js,
                tp: tpj[id]

            }
            let img = await puppeteer.screenshot("123", {
                ...data1,
            });
            e.reply(img)

        }

        if (e.msg.includes("#选漫画") & e.isGroup) {

            // https://www.pkssj.com/
            let k = e.msg.replace(/#选漫画/g, "").trim()
            let url3 = 'https://www.xinxinyi.com/' + lianjie[k - 1]

            let response3 = await fetch(url3);
            let data3 = await response3.text();

            tp = data3.match(/https(\S*)"  style/g);
            for (let d = 0; d < tp.length; d++) {


                tp[d] = tp[d].replace(/\>/g, "").trim();
                tp[d] = tp[d].replace(/\"  style/g, "").trim();
            }

            await e.reply(await common.makeForwardMsg(e, tp))
        }
        if (e.msg.includes("#选漫画") & e.isPrivate) {

            // https://www.pkssj.com/
            let k = e.msg.replace(/#选漫画/g, "").trim()
            let url3 = 'https://www.xinxinyi.com/' + lianjie[k - 1]

            let response3 = await fetch(url3);
            let data3 = await response3.text();

            tp = data3.match(/https(\S*)"  style/g);
            for (let d = 0; d < tp.length; d++) {


                tp[d] = tp[d].replace(/\>/g, "").trim();
                tp[d] = tp[d].replace(/\"  style/g, "").trim();
            }


            let cs = tp.length / 10
            let g2 = 0
            for (let g = 0; g < cs; g++) {
                g2 = g + 1
                data1 = {
                    tplFile: './plugins/earth-k-plugin/resources/html/Cartoon/Cartoon.html',
                    dz: ml,
                    tp: tp.slice(10 * g, 10 * g2)

                }
                let img = await puppeteer.screenshot("123", {
                    ...data1,
                });
                e.reply(img)

            }


        }

    }

}

