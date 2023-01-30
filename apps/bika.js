import { segment } from "oicq";
import fetch from "node-fetch";
import puppeteer from "../../../lib/puppeteer/puppeteer.js";


const ml = process.cwd();
let jieguo1
let mulu = []
let id = []
let tpj = []
let tpnr = []
//1.定义命令规则
export class plp extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '隐藏哔咔',
            /** 功能描述 */
            dsc: '隐藏哔咔',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级,数字越小等级越高 */
            priority: 1145,
            rule: [{
                    /** 命令正则匹配 */
                    reg: "#点哔咔漫画(.*)$", //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'dian'
                },{
                    /** 命令正则匹配 */
                    reg: "#看哔咔漫画(.*)$", //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'kan'
                }
            ]

        })
    }
    async kan(e) {
        if(!e.isMaster){
            return

        }
        tpnr= []
        let mh = e.msg.replace(/#看哔咔漫画/g, "").trim()
        //61779f8e3385a67d196117c6
        //http://api.liaobiao.top/api/bika/comic_page?id=61779f8e3385a67d196117c6&page=1
        let dqid = id[Number(mh-1)]
        console.log(dqid)
        let url = 'http://api.liaobiao.top/api/bika/comic_page?id='+dqid
        let jieguo2 = await fetch(url)
        jieguo2 = await jieguo2.json()
        
        let shuju = jieguo2.data.pages.docs
        let cishu = shuju.length
        console.log(cishu)
        for(let i=0;i<cishu;i++){
            let sj = shuju[i].media.path
            
            let nr = 'https://proxy.liaobiao.top/'+sj
           
            tpnr.push(nr)
        }
        console.log(tpnr)
        let msg = segment.image(tpnr[0])
        ForwardMsg(e, tpnr)





    }


    async dian(e) {
        if(!e.isMaster){
            return

        }
         mulu = []
id = []
 tpj = []
        //http://api.liaobiao.top/api/bika/advanced_search?keyword=%E5%A5%B3&sort=vd
        //61779f8e3385a67d196117c6
        let mh = e.msg.replace(/#点哔咔漫画/g, "").trim()
        let url = 'http://api.liaobiao.top/api/bika/advanced_search?keyword=' + encodeURI(mh)+'&sort=vd'
        jieguo1 = await fetch(url)
        jieguo1 = await jieguo1.json()
        
        let shuju = jieguo1.data.comics.docs
        let cishu = shuju.length
        console.log(jieguo1 )
        for(let i=0;i<cishu;i++){
           
            mulu.push(shuju[i].title)
        }
        for(let i=0;i<cishu;i++){
           
            id.push(shuju[i]._id)
        }
        for(let i=0;i<cishu;i++){
            let sj = shuju[i].thumb.path
            
            let nr = 'https://proxy.liaobiao.top/'+sj
           
            tpj.push(nr)
        }
      



       let data1 = {
            tplFile: './plugins/earth-k-plugin/resources/html/Cartoon/OrderCartoon.html',
            dz: ml,
            lb: mulu,
            tp:tpj
           

        }
        let img = await puppeteer.screenshot("123", {
            ...data1,
        });
        e.reply(img)
      
        console.log(tpj[0])


        


 



}
}

async function ForwardMsg(e, data) {
   
    let msgList = [];
    for (let i=0 ;i<tpnr.length;i++) {
		 let msg2 = [
         await segment.image(tpnr[i])];
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
