
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
            name: '土块机器人',
            /** 功能描述 */
            dsc: 'chatgpt from openai',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1045,
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
                let data = { "prompt": msg }
                let url = await fetch("https://linglu.pro/api/generate", {
                    "headers": {
                        "Referer": "https://linglu.pro/zh",
                        "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                    "body": JSON.stringify(data),
                    "method": "POST"
                });
                url = await url.text()

                //console.log(op)
                e.reply('接口1:'+ url,true)
            } catch {

            }

            if (res.length < 2) {
                return true
            }
            console.log('接口2')
            try {
                let msg = _.trimStart(e.msg, bot)
                let data ={"prompt":msg,"network":true,"apikey":"","system":"","withoutContext":false}
                let url = await fetch("https://api.aichatos.cloud/api/generateStream", {
                    headers:{
                        'accept': 'application/json, text/plain, */*',
                        'content-type': 'application/json',
                        'referer': 'https://fwg08.aichatos.com/',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
                    },
                    
                    "body": JSON.stringify(data),
                    "method": "POST"
                });
                url = await url.text()

                //console.log(op)
                e.reply('接口2:'+ url,true)
            } catch (e){console.log(e.message)

            }



            if (msgData.length > 30) {
                msgData = []
                e.reply('已重置对话')
            }
            let data

            console.log('接口3')
            res = ''
            try {
                let msg = _.trimStart(e.msg, bot)
                msgData.push({ "role": "user", "content": msg })
                let data = { "model": { "id": "gpt-3.5-turbo", "name": "Default (GPT-3.5)" }, "messages": msgData, "key": "", "prompt": "你叫小土块，不喜欢涩涩" }
                let response4 = await
                    fetch("https://zjrwtx.top/api/chat", {
                        "headers": {

                            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.34"
                        },
                        "body": JSON.stringify(data),
                        "method": "POST"
                    });
                res = await response4.text()
                if (res != 'Error') {
                    e.reply('接口3:' + res, true)
                }

            } catch (e) { console.log(e.message) }




            if (res != 'Error') {
                return true
            }
            console.log('接口4')
            res = '1'




            try {
                let response4 = await fetch('https://api.caonm.net/api/ai/o.php?msg=' + msg);
                res = await response4.json()
                res = res.Output
                console.log(res)
                if (res != null) {
                    e.reply('接口4:' + res, true)
                }

            } catch {
            }
            if (res != null) {
                return true
            }

            console.log('接口5')
            //https://hub.onmicrosoft.cn/chat?q=你好
            try {
                let response4 = await fetch('https://hub.onmicrosoft.cn/chat?q=' + msg);
                res = await response4.json()
                res = res.answer
                console.log(res)
                if (res != null) {
                    e.reply('接口5:' + res, true)
                }

            } catch {
            }
            if (res != null) {
                return true
            }
            console.log('接口6')
            try {
                msgData.push({ "role": "user", "content": msg })
                let data = { "prompt": msg, "options": {} }
                let response4 = await fetch('https://chat2.wuguokai.cn/api/chat-process', {
                    method: 'POST',
                    headers: {
                        "accept": "application/json, text/plain, */*",
                        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                        "content-type": "application/json",
                        "Referer": "https://chat.wuguokai.cn/",
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.34"


                    },
                    body: JSON.stringify(data)
                });
                res = await response4.text()

                e.reply('接口6:' + res, true)


                msgData.push({ "role": "assistant", "content": res })
            } catch (e) { console.log(e.message) }

            if (res.length > 3) {
                return true
            }

            if (msgData.length > 20) {
                msgData = []
                e.reply('已重置对话')
            }
            console.log('接口7')
            msgData.push({ "role": "user", "content": msg })
            data = { "messages": msgData, "stream": true, "model": "gpt-3.5-turbo", "temperature": 1, "presence_penalty": 0 }
            let response4 = await fetch('https://chatgpt.letsearches.com/api/chat-stream', {
                method: 'POST',
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54",
                    'path': 'v1/chat/completions',
                    'origin': 'https://chatgpt.letsearches.com',
                    'referer': 'https://chatgpt.letsearches.com/'
                },
                body: JSON.stringify(data)
            });
            res = await response4.text()
            e.reply('接口7:' + res, true)
            msgData.push({ "role": "assistant", "content": res })
        }
    }
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}



