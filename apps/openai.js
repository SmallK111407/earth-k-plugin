import _ from 'lodash'
import fetch from "node-fetch";
import gsCfg from "../../genshin/model/gsCfg.js";
let bot = "#机器人"//这里是你要触发的关键词
let msgData = []
let res = ""
let sign = ""
let js = '纳西妲'
let lb = [
    "安柏", "艾尔海森", "艾丝妲", "爱莉希雅", "爱衣", 
    "八重神子", "八重樱", "芭芭拉", "班尼特", "布洛妮娅", 
    "布洛妮娅_次生银翼", "丹恒", "戴因斯雷布", "达达利亚", "德丽莎", 
    "德丽莎_月下初拥", "德丽莎_月下誓约", "德丽莎_朔夜观星", "迪卢克", "迪奥娜", 
    "迪娜泽黛", "迪希雅", "多莉", "幼兰黛尔", "法露珊", 
    "菲米尼", "菲谢尔", "风子", "黑塔", "黑天鹅", 
    "黑希", "荧", "荒泷一斗", "芙卡洛斯", "芙宁娜", 
    "干露露", "赫丽娅", "嘉明", "简尼", "卡卡瓦夏", 
    "卡维", "卡芙卡", "卡莲", "卡萝尔", "克拉拉", 
    "克洛琳德", "凯亚", "凯瑟琳", "凝光", "刃", 
    "刻晴", "雷泽", "雷电将军", "灵梦", "林尼", 
    "萌新", "霓裳", "诺艾尔", "南希", "娜塔莎", 
    "娜维娅", "纳西妲", "南烟", "佩拉", "铺砖", 
    "启点", "奇卡", "琪亚娜", "琪亚娜_空之律者", "琪亚娜天穹游侠薪炎之律者终焉之律者", 
    "乔治", "清米", "情趣", "秋山", "青雀", 
    "邱惠", "薪灵", "瑶瑶", "逸品", "雪衣", 
    "银狼", "悠羽", "遇见", "运气", "咏叹调", 
    "云堇", "月下"
];

let sj = 0
const renLIST = [
    "安柏", "艾尔海森", "艾丝妲", "爱莉希雅", "爱衣", 
    "八重神子", "八重樱", "芭芭拉", "班尼特", "布洛妮娅", 
    "布洛妮娅_次生银翼", "丹恒", "戴因斯雷布", "达达利亚", "德丽莎", 
    "德丽莎_月下初拥", "德丽莎_月下誓约", "德丽莎_朔夜观星", "迪卢克", "迪奥娜", 
    "迪娜泽黛", "迪希雅", "多莉", "幼兰黛尔", "法露珊", 
    "菲米尼", "菲谢尔", "风子", "黑塔", "黑天鹅", 
    "黑希", "荧", "荒泷一斗", "芙卡洛斯", "芙宁娜", 
    "干露露", "赫丽娅", "嘉明", "简尼", "卡卡瓦夏", 
    "卡维", "卡芙卡", "卡莲", "卡萝尔", "克拉拉", 
    "克洛琳德", "凯亚", "凯瑟琳", "凝光", "刃", 
    "刻晴", "雷泽", "雷电将军", "灵梦", "林尼", 
    "萌新", "霓裳", "诺艾尔", "南希", "娜塔莎", 
    "娜维娅", "纳西妲", "南烟", "佩拉", "铺砖", 
    "启点", "奇卡", "琪亚娜", "琪亚娜_空之律者", "琪亚娜天穹游侠薪炎之律者终焉之律者", 
    "乔治", "清米", "情趣", "秋山", "青雀", 
    "邱惠", "薪灵", "瑶瑶", "逸品", "雪衣", 
    "银狼", "悠羽", "遇见", "运气", "咏叹调", 
    "云堇", "月下"
];

let dyr = 0
let dyjs = '纳西妲'
let dygq = 0
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
            priority: 2250,
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
                }, {
                    /** 命令正则匹配 */
                    reg: `^#(.*)说(.*)`, //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'yyhc'
                }
            ]
        })
    }

    async yyhc(e) {
        let kw = e.msg.replace(/#/, "").trim();
        kw = kw.replace(/说/, "**$").trim();
        let zon = kw.split('**$');
        let ren = zon[0];
        let nr = zon[1];
    
        if (!renLIST.includes(ren)) {
            return e.reply('角色名不正确，请检查！');
        }
    
        try {
            let url = `https://api.lolimi.cn/API/yyhc/y.php?msg=${encodeURIComponent(nr)}&name=${encodeURIComponent(ren)}`;
    
            let res = await fetch(url);
            res = await res.json();
    
            if (res.code !== 200) {
                return e.reply('请求失败: ' + res.msg);
            }
    
            let msg = await uploadRecord(res.url, 0, false);
            e.reply(msg);
        } catch (error) {
            e.reply(`${encodeURIComponent(ren)}语音生成失败，请稍后再试！`);
        }
    }
    
    
    async czdg(e) {
        msgData = []
        res = { "id": 0 }
        e.reply('重置聊天对话啦')
    }

    async sjha(e) {
        if (e.isMaster || e.isGroup) {
            let msg = _.trimStart(e.msg, bot);
            try {
                msgData.push({ role: "user", content: msg });
                let res = await zaiwen("gpt4_o_mini", msgData, "admin/chatbot")

                e.reply(res, true);
                msgData.push({ role: 'assistant', content: res });
            } catch (error) {
                console.error('Error:', error);
                e.reply('请求失败', true);
            }
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
async function zaiwen(model, history, version) {
    try {
        const response = await fetch("https://aliyun.zaiwen.top/" + version, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "token": "null",
                "Referer": "https://www.zaiwen.top/"
            },
            body: JSON.stringify({
                "message": history,
                "mode": model,
                "key": null
            })
        });
        if (!response.ok) {
            return undefined
        } else {
            let result = await response.text()
            console.log(result)
            if (result.startsWith(`"您的内容中有不良信息，请您新建会话重新提问`)) {
                return '内容中有不良信息，请新建会话重新提问'
            } else {
                return result.trim();
            }
        }
    } catch {
        return undefined
    }
}
