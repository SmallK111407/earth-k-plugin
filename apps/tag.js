
import _ from 'lodash'
import fetch from "node-fetch";
import fs from "fs";
let data1 = {}
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
let ml = process.cwd()
let wenj2 = ""
export class example extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '土块tags',
            /** 功能描述 */
            dsc: '土块tags',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1145,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: `^#魔法目录`, //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'ckmfs'
                }, {
                    /** 命令正则匹配 */
                    reg: "^#目录(.*)", //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'mofa'
                }, {
                    /** 命令正则匹配 */
                    reg: "^#预览图(.*)", //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'yulantu'
                }
            ]
        })
    }

    async yulantu(e) {
        let name = e.msg.replace(/#预览图/g, "").trim()
        name = name.replace(/_/g, " ").trim()
        let url = `https://tukuai.ddns.net:1450/preview/${name}.jpg`
        e.reply(segment.image(url))


    }
    async mofa(e) {
        let name = e.msg.replace(/#目录/g, "").trim()
        let dizhi
        let jieguo
        try{
             dizhi = './plugins/earth-k-plugin/resources/tag/ms/' + name + '.txt';
             jieguo = fs.readFileSync(dizhi.toString(), 'utf-8')
           
        }catch{
            dizhi = './plugins/earth-k-plugin/resources/tag/ms/' + wenj2[Number(name)-1] + '.txt';
            jieguo = fs.readFileSync(dizhi.toString(), 'utf-8')
        }
        
        ForwardMsg(e,jieguo)


    }


    async ckmfs(e) {
        const dir = './plugins/earth-k-plugin/resources/tag/ms/';
        let name = "总列表"
        let filelist = ""
        wenj2 = ""
        let n = 0
        // list all files in the directory
        try {
            const files = fs.readdirSync(dir);

            // files object contains all files names
            // log them on console
            files.forEach(file => {

                wenj2 = wenj2 + file.replace(/.txt/g, "") + "," 

                filelist = filelist + String(n) + "." + file + "\n"
                n = n + 1
            });
            wenj2 = wenj2.split(",")

        } catch (err) {
            console.log(err);
        }
       
        name = "魔法目录tag"
        data1 = {
            tplFile: './plugins/earth-k-plugin/resources/tag/index.html',
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



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function ForwardMsg(e, data) {
        let  msgList = []
        msgList.push({
            message: data,
            nickname: Bot.nickname,
            user_id: Bot.uin,
        });
    
    if (msgList.length == 0) {
        await e.reply(msgList[0].message);
    }
    else {
        //console.log(msgList);
        await e.reply(await Bot.makeForwardMsg(msgList));
    }
    return;
}


