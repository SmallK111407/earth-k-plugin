 从‘lodash’导入_  
 从“node-fetch”导入fetch ； 
 从“../../genshin/model/gsCfg.js”导入gsCfg ； 
let  bot = "机器人" //这里是你要触发的关键词
让 msgData = [ ]
让 res = “”
让 符号= “”
let  js = '纳西妲'
let  lb = [ "空" , "荧" , "派蒙" , "纳西妲" , "阿贝多" , "温迪" , "枫原万叶" , "钟离" , "荒泷一斗" , 《八重神子》、《艾尔海森》、《提纳里》、《迪希雅》 、《卡维》、《宵宫》、《莱依拉》、《赛诺》、《诺艾尔》 , "托马" , "凝光" ,《莫娜》、《北斗》、《神里绫华》、《雷电将军》、"妮露" , "辛焱" , "珐露珊" , "魈" , "香菱" , "达达利亚" , "砂糖" , "早柚" , "云堇" , "刻晴" , "丽莎" , "迪卢克"、"烟绯"、"重云"、"珊瑚宫心海"、"胡桃"、"可莉", "流浪者" , "久岐忍" , "神里绫人" , "甘雨" , "戴因斯雷布" , "优菈" , "菲谢尔" , "行秋" , "白术" , "九条裟罗" , "雷泽" , "申鹤" , "迪娜泽黛" , "凯瑟琳" , "多莉" , "坎蒂丝" , "萍姥姥" , "罗莎莉亚” , “留云借风真君” , “绮良良” , “瑶瑶”, "七七" , "奥兹" , "米卡" , "夏洛蒂" , "埃洛伊", "博士" , "女士" , "大慈树王" , "三月七" , "娜塔莎" , "希露瓦" , "虎克" , "克拉拉" , "丹恒" , "希儿”、“布洛妮娅”、“瓦尔特”、“杰帕德”、“佩拉”、“姬子”、“艾丝妲”、“白露”、“星”、“穹窿”、“桑博" , "伦纳德" ,《停云》、《罗刹》、《卡芙卡》、《彦卿》、《史瓦罗》、“螺丝咕姆”、“阿兰”、“银狼”、“素裳”、“丹枢”、“黑塔”、“景元”、“帕姆”、“可可利亚”、“半夏” , "符玄" , "公输师傅" , "奥列格" , "青雀" , "大毫" , "青镞" , "费斯曼" , "绿芙蓉" , "镜流" , "信使”、“丽塔”、“落失迷迭" , "缭乱星棘" , "伊甸" , "伏特加女孩" , "狂热蓝调" ,"、", "、", "、", "、", "、", "、", "、", "、", "、", "、", "、", "、", "、", "、", "、", "、", "、", "、", "、", "、", "、", "、", "、", "、", "、", "李素裳", "格蕾修" , "梅比乌斯" , "渡鸦" , "人之律者" , "爱莉希雅" , "爱衣" , "天穹游侠" , "琪亚娜" , "空之律者”、“终焉之律者” 、“薪炎之律者”、“云墨丹心”、“符华”、“识之律者”、“维尔薇”、“始源之律”者" , "芽衣" , "雷之律者" , "苏莎娜" , "阿波尼亚" , "陆景和", "莫弈" , "夏彦" , "左然" ]
令 sj = 0

const  renLIST = [ "丹恒" , "克拉拉" , "穹" , "信使" , "史瓦罗" , "彦卿" , "晴霓" , "杰帕德" , "素裳"、《绿芙蓉》、《罗刹》、《艾丝妲》、《黑塔》、《丹枢》、《希露瓦》、《白露》、《费斯曼》、《停云》、《可可》利亚" , "景元" ,《螺丝咕姆》、《青镞》、《公输师傅》、《卡芙卡》、" , "卡波特" , "帕姆" , "帕斯卡" , "青雀" , "三月七" , "刃" , "姬子" , "布洛妮娅" , "希儿" , "星”、“符玄”、“虎克”, "银狼" , "镜流" , "博士"" , "大肉丸"、"九条裟罗"、"佐西摩斯"、"刻晴"、"博易"、"卡维"、"可莉"、"嘉玛"、"埃舍尔"、"塔杰·拉德卡尼"、"大慈树王"、"宵宫"、"康纳"、"影"、"枫原万叶"、"欧菲妮"、"玛乔丽"、"珊瑚" ,"田铁嘴" ,"砂糖" ,"神里绫华" ,"罗莎莉亚"、"荒泷一斗"、"莎拉"、"迪希雅"、"钟离"、"阿圆" ,"阿娜耶" ,"阿拉夫" ,"雷泽" ,"香菱" ,"龙二" " ,"「公子」" ,"「白老先生」" ,"优菈" ,"凯瑟琳"、"哲平"、"夏洛蒂"、"安柏"、"巴达维"、"式大将"、"斯坦利"” 、"毗伽尔"、"海妮耶"、"爱德琳"、"纳西妲"、"老孟"、"芙宁娜" ,"阿守" ,"阿祇" ,"丹吉尔" ,"丽莎" ,"五郎"、"元太"、"克列门特"、"克罗索"、"北斗"、"埃勒曼"、"天目十五"、"奥兹"、"恶龙"、"早柚"、"杜拉夫"、"松浦"、"柊千里"、"甘雨"、"石头"、"纯水精灵？"、"羽生田千鹤"、"莱依拉"、"菲谢尔" ,"言笑" ,"诺艾尔" ,"赛诺" ,"辛焱" ,"迪娜泽黛" ,"那维莱特" ,"八重神子" ,"凯亚", "吴船长" , "埃德" , "天叔" , "女士" , "恕筠" , "提纳里" , "派蒙" , "流浪者" , "深渊使徒" , "玛格丽特" , "珐露莫珊" , "琴" , "瑶瑶" , "留云借风真君" , "绮良良" , "舒伯特" , "荧" , "行秋" ”、“迈勒斯”、“阿佩普”、“鹿野奈奈" , "七七" , "伊迪娅" , "博来" , " ," , " ,", " ,", " ,", " ,", " ,", " ,", " ,", "、", "、", "、", "、", "、", "” 、", "、", "、", "、", " ,", " ,", " ,", " ,", "、", "、", "、", "、", "妮露", "娜维娅", "宛烟", "慧心", "托克", "托马", "掇星攫辰天君", "旁白", "浮游水蕈兽·元素生命", "烟绯", "玛塞勒", "百闻", "知易", "米卡", "西拉杰", "迪卢克", "重云", "阿扎尔", "霍夫曼", "上杉", "久利须", "嘉良", "回声海螺", "多莉", "安西", "德沃沙克", "拉赫曼", "、", "、", "、", "、", "、", "、", "、", "、", "、", "、", "、", "、", "、", "、", "" 、", "、", "、", "、", "、", "”、“伊利亚斯”、“埃洛伊”、“塞塔蕾”、“拉齐”、“昆钧", "柯莱", "沙扎曼", "海芭夏", "白术", "空", "艾文", "芭芭拉", "莫塞伊思", "莺儿”、“达达利亚”、“迈蒙”、“长生”、“阿巴图伊”、“陆景和”、“莫弈”、“夏彦”、“左然”]", "伊利亚斯", "埃洛伊", "塞塔蕾", "拉齐", "昆钧", "柯莱", "沙扎曼", "海芭夏", "白术", "空", "艾文", "芭芭拉", "莫塞伊思", "莺儿", "达达利亚", "迈蒙", "长生", "阿巴图伊", "陆景和", "莫弈", "夏彦", "左然"]
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
            priority: 1150,
            rule: [
                {{
                    /** 命令则匹配 *//** 命令正则匹配 */
                    reg: `^${bot}`, //匹配消息正则,命令正则reg: `^${bot}`, //匹配消息正则,命令正则
                    /** 执行方法 *//** 执行方法 */
                    fnc: ‘sjha’fnc: 'sjha'
                }，{}, {
                    /** 命令则匹配 *//** 命令正则匹配 */
                    reg: "#结束对话", //匹配消息正则,命令正则reg: "#结束对话", //匹配消息正则,命令正则
                    /** 执行方法 *//** 执行方法 */
                    fnc: ‘czdg’fnc: 'czdg'
                }，{}, {
                    /** 命令则匹配 *//** 命令正则匹配 */
                    reg: `^#(.*)说(.*)`, //匹配消息正则,命令正则reg: `^#(.*)说(.*)`, //匹配消息正则,命令正则
                    /** 执行方法 *//** 执行方法 */
                    fnc: ‘yyhc’fnc: 'yyhc'
                }}
            ]]
        }）})
    }}

    异步 yyhc(e) { yyhce 
        让 kw = e.msg.replace(/#/, "").trim()let kw = e.msg.replace(/#/, "").trim()
        kw = kw.replace(/说/, "**$").trim()replace(/说/, "**$").trim()
        让 zon = kw.split('**$')let zon = kw.split('**$')
        控制台.log（zon）log(zon)
        让 ren = zon[0]let ren = zon[0]
        让 nr = zon[1]let nr = zon[1]
        const nameArr = gsCfg.getAllAbbr();const nameArr = gsCfg.getAllAbbr();
        对于（Object.values（nameArr）的const角色名称）{for (const rolename of Object.values(nameArr)) {
          如果（角色名称.包括（ren））{if (rolename.includes(ren)) {
            ren = 角色名称[0][0]
            休息break
          }}
        }}
        如果 (!renLIST.includes(ren)) 返回 falseif (!renLIST.includes(ren)) return false
让 url = `https://api.lolimi.cn/API/yyhc/y.php?msg=${encodeURI(nr)}&speaker=${encodeURI(ren)}&Length=1&noisew=0.8&sdp=0.4&noise=0.6&type=`let url = `https://api.lolimi.cn/API/yyhc/y.php?msg=${encodeURI(nr)}&speaker=${encodeURI(ren)}&Length=1&noisew=0.8&sdp=0.4&noise=0.6&type=`
        let res = await fetch(url)
		res = await res.json()
		
	    
        try {
            let msg = await uploadRecord(res.music, 0, false)
            e.reply(msg)
        } catch {
            let msg2 = await segment.record(res.music)
            //msg2 = await segment.record(res.data.output)
            e.reply(msg2)
        }



     


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
                msgData.push({ role: "user", content: msg })

                 const url = 'https://yuanpluss.online:3000/v2/free35/completions';
                    const data = {
                      model: "gpt-3.5-turbo",
                      messages: msgData,
                      presence_penalty: 0
                    };
                    let response = await fetch(url, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(data)
                    })
                    let res = await response.text()
                   
				
              
               
                e.reply(res,true)
                res = res.replace(/data:/g, "").replace(/\[DONE\]/g, "").replace(/\s+/g, ",")
                let inputString = `${res}`
                let arrayString = `[${inputString}]`;
                arrayString = arrayString.replace(',', '')
                let lastCommaIndex = arrayString.lastIndexOf(','); if (lastCommaIndex !== -1) {
                    arrayString = arrayString.substring(0, lastCommaIndex) + arrayString.substring(lastCommaIndex + 1);
                }
                let json = JSON.parse(arrayString)
                let content = ""
                for (var i = 0; i < json.length; i++) {
                    if (json[i].choices[0].delta.content) {
                        let data = json[i].choices[0].delta.content
                        content += data
                    }
                }
                content = content.replace(/,/g, ' ')
                e.reply(content, true)
                msgData.push({ role: 'assistant', content: content })
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



