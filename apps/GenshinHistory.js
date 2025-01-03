import fetch from "node-fetch";
import fs from "fs";
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import plugin from '../../../lib/plugins/plugin.js'
import gsCfg from '../../genshin/model/gsCfg.js'
let data1 = {}
let ml = process.cwd()

let syid = []




export class GenshinHistory extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '[土块插件]原史',
            /** 功能描述 */
            dsc: '简单开发示例',
            event: 'message',
            /** 优先级,数字越小等级越高 */
            priority: 145,
            rule: [{
                /** 命令正则匹配 */
                reg: "^#原史(.*)$", //匹配消息正则,命令正则
                /** 执行方法 */
                fnc: 'hqgs'
            }

            ]

        })
    }

    async hqgs(e) {
        let url2 = "https://api-static.mihoyo.com/common/blackboard/ys_obc/v1/home/content/list?app_sn=ys_obc&channel_id=189"
		let res2 = await fetch(url2)
    res2 =await res2.json()
    let jg = []
    let id = 0
    syid = []
    for(let n =0;n<17;n++){
        for(let i =0;i<res2.data.list[0].children[n].list.length-1;i++){
            id = id +1
            syid.push({ "fenlei":res2.data.list[0].children[n].name,"id":id,"content_id":res2.data.list[0].children[n].list[i].content_id,"title":res2.data.list[0].children[n].list[i].title})
         
            }
       
    }
   
    
       
        let id2 = syid
       // fs.writeFileSync("ys.text",syid)
        let id3 = []
        let qsid = 0





        if (e.msg.includes("目录")) {

            let mu =  e.msg.replace(/目录/g, "").trim()
            mu =  mu.replace(/#原史/g, "").trim()
            
            
            id3 = syid.filter(obj => obj.fenlei === mu);
            
            console.log(id3)


            data1 = {
                tplFile: './plugins/earth-k-plugin/resources/html/GenshinHistory/ml2.html',
                dz: ml,
                lb: id3,
              


            }

            let img = await puppeteer.screenshot("123", {
                ...data1,
            });
            e.reply(img)

            return

        }


        let name = e.msg
        let n = ""
        let name1 = name.replace(/#原史/g, "").trim()
        let li = fs.readFileSync('./plugins/earth-k-plugin/resources/json/mohu/mohu.json', 'utf-8')
        li = JSON.parse(li)

        let name2 = Object.keys(li).filter(function (x) {
            for (let i = 0; i < li[x].length; i++) {
                if (li[x][i] == name1) {
                    return li[x][i] == name1
                }
            }
        });

        if (name2.length != 0) {

            e.reply(name2)
            name1 = name2
        } else {
            let role = {}
            role = gsCfg.getRole(name1)
            console.log(role.name)
            if (role.name != undefined) {
                name1 = role.name
            }
        }


        console.log(name1)

        n = syid.findIndex(item => item.title == name1) + 1
        console.log(syid.findIndex(item => item.title == name1))



        if (e.msg.includes("#原史id")) {
            n = name.replace(/#原史id/g, "").trim()
            e.reply(syid[n - 1].title)

        }
        if (n == 0) {
            console.log(n)
            e.reply('关键词不对哦，请查看目录查询id')
            return

        }

        let url = 'https://api-static.mihoyo.com/common/blackboard/ys_obc/v1/content/info?app_sn=ys_obc&content_id=' + String(syid[n - 1].content_id)

        let response = await fetch(url);
        let res = await response.text();

        res = res.replace(/\\u003c/g, "<");
        res = res.replace(/\\u003e/g, ">");

        res = res.replace(/\\"/g, '"');

        let reg = /[\u4e00-\u9FA5]+/;

        let liebiao = res.match(/pre-wrap;(.*?)</g);

        let liebiao2 = ""
        for (let b = 0; b < liebiao.length; b++) {
            liebiao[b] = liebiao[b].replace(/pre-wrap;/g, "").trim();
            liebiao[b] = liebiao[b].replace(/text/g, "").trim();
            liebiao[b] = liebiao[b].replace(/center;/g, "").trim();
            liebiao[b] = liebiao[b].replace(/\/p/g, "").trim();
            liebiao[b] = liebiao[b].replace(/\>/g, "").trim();

            liebiao[b] = liebiao[b].replace(/\</g, "").trim();
            liebiao[b] = liebiao[b].replace(/\"/g, "").trim();
            liebiao[b] = liebiao[b].replace(/-align:/g, "").trim();
            liebiao[b] = liebiao[b].replace(/[a-zA-Z]+/g, "").trim();
            liebiao[b] = liebiao[b].replace(/1.5/g, "").trim();
            liebiao[b] = liebiao[b].replace(/1.4/g, "").trim();
            liebiao[b] = liebiao[b].replace(/\;/g, "").trim();
            liebiao[b] = liebiao[b].replace(/\-/g, "").trim();
            liebiao[b] = liebiao[b].replace(/\:/g, "").trim();
            liebiao[b] = liebiao[b].replace(/\\0026/g, "").trim();
            liebiao[b] = liebiao[b].replace(/=/g, "").trim();
        }

        liebiao = liebiao.filter(i => {
            return i.length > 0
        }) //删除空数组
        //0-53为角色   54-193为武器  195-233为圣遗物
        let n2 = liebiao.indexOf("特殊料理")

        if (n2 >= 0) {

            liebiao.splice(0, n2 + 3)
        }
        let sousuo = ""
        let tp = ["", ""]

        if (n > 55 & n < 234) {
            tp = res.match(/src="(.*?) alt/g)

            //alt="" src="
            for (let i = 0; i < tp.length; i++) {
                tp[i] = tp[i].replace(/src="/g, "").trim()
                tp[i] = tp[i].replace(/\>/g, "").trim()
                tp[i] = tp[i].replace(/\"/g, "").trim()
                tp[i] = tp[i].replace(/alt/g, "").trim()
                // 
            }
        }
        if (n < 56) {
            tp = res.match(/alt="" src="(.*?)">/g);
            if (tp[0] != null) {
                tp[0] = tp[0].replace(/alt="" src="/g, "").trim();
                tp[0] = tp[0].replace(/\>/g, "").trim();
                tp[0] = tp[0].replace(/\"/g, "").trim();
                //
            } else {
                tp[0] = ""
            }
            sousuo = name1
            console.log(sousuo)
        }
        data1 = {
            tplFile: './plugins/earth-k-plugin/resources/html/GenshinHistory/GenshinHistory.html',
            dz: ml,
            lb: liebiao,
            sousuo: syid[n - 1].title,
            tp: tp[0]
        }
        let img = await puppeteer.screenshot("123", {
            ...data1,
        });
        e.reply(img)
    }
}
