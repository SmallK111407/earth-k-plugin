
import _ from 'lodash'
import fetch from "node-fetch";
let bot = "机器人"//这里是你要触发的关键词
let msgData = []
let res = ""
let sign = ""
export class example extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: 'openai',
            /** 功能描述 */
            dsc: 'chatgpt from openai',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 10,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: `^${bot}`, //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'sjha'
                }, {
                    /** 命令正则匹配 */
                    reg: "#结束对话", //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'czdg'
                }
            ]
        })
    }
    async czdg(e) {
        msgData = []
        res = { "id": 0 }
        e.reply('重置聊天对话啦')

    }

    async sjha(e) {


        if (e.isMaster | e.isGroup) {
            let msg = _.trimStart(e.msg, bot)
            
            res = ''

            console.log('接口1')
            try {
                let msg = _.trimStart(e.msg, bot)
                 msgData.push({role:"user",content:msg})
				 let data = {
messages: JSON.stringify(msgData),
temperature: 1
}
                let url = await fetch("https://chat.miaorun.dev/api/chat-stream", {
  "headers": {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "content-type": "application/json",
    "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Microsoft Edge\";v=\"114\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "Referer": "https://chat.miaorun.dev/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": JSON.stringify(data ),
  "method": "POST"
});
                url = await url.text()

                //console.log(op)
                e.reply(url,true)
				
				
				msgData.push({"role":"assistant","content":url})
				if(url == "抱歉，该问题含有敏感词信息，请换一个问题"){
					msgData = []
				}
            } catch {

            }

            if (res.length < 2) {
                return true
            }
    }
}
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}



