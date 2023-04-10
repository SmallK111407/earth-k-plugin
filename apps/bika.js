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
            event: 'message',
            /** 优先级,数字越小等级越高 */
            priority: 1145,
            rule: [{
                /** 命令正则匹配 */
                reg: "#点哔咔漫画(.*)$", //匹配消息正则,命令正则
                /** 执行方法 */
                fnc: 'dian'
            }, {
                /** 命令正则匹配 */
                reg: "#看哔咔漫画(.*)$", //匹配消息正则,命令正则
                /** 执行方法 */
                fnc: 'kan'
            }
            ]

        })
    }
    async kan(e) {
       

    }


    async dian(e) {
     

    }
}

async function ForwardMsg(e, data) {

    let msgList = [];
    for (let i = 0; i < tpnr.length; i++) {
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
