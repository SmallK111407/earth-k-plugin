import plugin from '../../../lib/plugins/plugin.js'
import _ from 'lodash'
import fetch from "node-fetch";

import BingAIClient from '../model/BingAIClient.js'

let cs = 0

let bot = "机机人" //你要触发的前缀
let msgData = []
let response
let i = 0
let bingAIClient = new BingAIClient({
    // Necessary for some people in different countries, e.g. China (https://cn.bing.com)
    host: 'https://cn.bing.com',
    // "_U" cookie from bing.com
    userToken: '',
    // If the above doesn't work, pro vide all your cookies as a string instead
    cookies: '_U=' ,
    // A proxy string like "http://<ip>:<port>"
    proxy: '',
    // (Optional) S et to true to enable `console.debug()` logging
    debug: false,
});
let xx = ""
let conversationId
let clientId
let conversationSignature
export class example extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '土块bing',
            /** 功能描述 */
            dsc: '土块bing',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1145,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: '^必应.*$', //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'bing'
                }, {
                    /** 命令正则匹配 */
                    reg: '^#重置必应对话$', //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'chongzhi'
                }

            ]
        })
    }

    async chongzhi(e) {
        e.reply('已经重置必应对话')
        cs = 0
    }
    async bing(e) {
        xx = ""
        e.reply('马上马上！')
        let msg = _.trimStart(e.msg, '必应')
        if (cs == 18) {
            cs = 0
            e.reply('已重置对话')
            return
        }
        if (cs == 0) {
            xx = ""
            try {
                response = await bingAIClient.sendMessage(msg, {
                    onProgress: (token) => {
                        process.stdout.write(token);
                        xx = xx + token
                    },
                });
                cs = cs + 1
                console.log(response.details.text);
                await sleep(1000)
                if (response.details.text == undefined) {
                    e.reply(xx, true)
                    return
                }
                e.reply(response.details.text, true)
                return
            } catch {
                e.reply('必应已开启对话，再问一次吧')
            }
        }
        if ( cs < 18) {
            try {
                response = await bingAIClient.sendMessage(msg, {
                    toneStyle: 'balanced', //or creative, precise
                    conversationSignature: response.conversationSignature,
                    conversationId: response.conversationId,
                    clientId: response.clientId,
                    invocationId: response.invocationId,
                    onProgress: (token) => {
                        process.stdout.write(token);
                        xx = xx + token
                    },
                });
                console.log(response.details.text);
                await sleep(1000)
                if (response.details.text == undefined) {
                    e.reply(xx+ '\n已对话'+String(cs)+'/18', true)
                    return
                }
                e.reply(response.details.text + '\n已对话'+String(cs)+'/18',true)
                cs = cs + 1
                console.log(cs)
            }
            catch {
                e.reply('必应请求失败了')
            }
        }}

}
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
