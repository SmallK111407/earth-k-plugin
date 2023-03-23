import fetch from "node-fetch";
import fs from "fs";
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
export class dianmanhua extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '[土块插件]点隐藏漫画',
            /** 功能描述 */
            dsc: '简单开发示例',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1145,
            rule: [{
                reg: "^#点隐藏漫画(.*)$|#看隐藏漫画(.*)|#选隐藏漫画(.*)|#取消隐藏漫画搜索$", //匹配消息正则，命令正则
                /** 执行方法 */
                fnc: 'manhua'
            }

            ]

        })
    }

    async manhua(e) {
        if (e.msg.includes("#取消隐藏漫画搜索") & zzss == 1) {
            zzss = 0
            e.reply('已取消当前' + name + '搜索')
        }
        if (zzss == 1) {
            e.reply('当前正在搜索中...请勿重复搜索')
            return
        }
        if (e.msg.includes("#点隐藏漫画")) {
            name = e.msg.replace(/#点隐藏漫画/g, "").trim()
            zzss = 1
            try {
                let url = 'https://www.pkssj.com/search?keyword=' + name
                let response = await fetch(url);
                let data = await response.text();

                lb = data.match(/title=(\S*)>/g);
                sm = data.match(/<a href(\S*) title/g);
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
                    sm[a] = sm[a].replace(/ title/g, "").trim();

                }
                data1 = {
                    tplFile: './plugins/earth-k-plugin/resources/htmlCartoon/OrderCartoon.html',
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

        if (e.msg.includes("#看隐藏漫画")) {

            console.log(sm[0])
            let id = e.msg.replace(/#看隐藏漫画/g, "").trim()
            id = Number(id) - 1
            let url2 = 'https://www.pkssj.com/' + sm[id]

            let response2 = await fetch(url2);
            let data2 = await response2.text();

            js = data2.match(/9a7b0fc8>(\S*)</g);
            lianjie = data2.match(/<a href=(\S*) rel/g);
            for (let b = 0; b < js.length; b++) {
                js[b] = js[b].replace(/9a7b0fc8/g, "").trim();
                js[b] = js[b].replace(/\>/g, "").trim();
                js[b] = js[b].replace(/\</g, "").trim();

            }

            for (let c = 0; c < lianjie.length; c++) {
                lianjie[c] = lianjie[c].replace(/a href=/g, "").trim();
                lianjie[c] = lianjie[c].replace(/ rel/g, "").trim();
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

        if (e.msg.includes("#选隐藏漫画") & e.isGroup) {

            // https://www.pkssj.com/
            let k = e.msg.replace(/#选隐藏漫画/g, "").trim()
            let url3 = 'https://www.pkssj.com' + lianjie[k]
            console.log(url3)
            let response3 = await fetch(url3);
            let data3 = await response3.text();

            tp = data3.match(/https(\S*)">/g);
            for (let d = 0; d < tp.length; d++) {


                tp[d] = tp[d].replace(/\>/g, "").trim();
                tp[d] = tp[d].replace(/\"/g, "").trim();
            }

            ForwardMsg(e, tp)




        }
        if (e.msg.includes("#选隐藏漫画") & e.isPrivate) {

            // https://www.pkssj.com/
            let k = e.msg.replace(/#选隐藏漫画/g, "").trim()
            let url3 = 'https://www.pkssj.com' + lianjie[k]
            console.log(url3)
            let response3 = await fetch(url3);
            let data3 = await response3.text();

            tp = data3.match(/https(\S*)">/g);



            for (let d = 0; d < tp.length; d++) {


                tp[d] = tp[d].replace(/\>/g, "").trim();
                tp[d] = tp[d].replace(/\"/g, "").trim();

            }


            let cs = tp.length / 10
            let g2 = 0
            for (let g = 0; g < cs; g++) {
                g2 = g + 1
                data1 = {
                    tplFile: './plugins/earth-k-plugin/resources/Cartoon/Cartoon.html',
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

async function ForwardMsg(e, data) {

    let msgList = [];
    for (let i = 0; i < tp.length; i++) {
        let msg2 = [
            await segment.image(tp[i])];
        msgList.push({
            message: msg2,
            nickname: Bot.nickname,
            user_id: Bot.uin,
        });
    }
    if (msgList.length == 0) {
        await e.reply(msgList[0].message);
    }
    else {
        //console.log(msgList);
        await e.reply(await Bot.makeForwardMsg(msgList));
    }
    return;
}
