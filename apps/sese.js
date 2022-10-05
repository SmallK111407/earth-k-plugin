import plugin from '../../../lib/plugins/plugin.js'
import { segment } from 'oicq'
import fetch from "node-fetch";
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const blacklist = []
let CD = {};// 命令CD
let isR18 = true;//群聊R18默认值
let isR18s = true;//私聊R18默认值
let interval= 10000;//连发模式的间隔时间，默认为10秒，由于图片质量不同导致发送时间不同，实际间隔可能有误差
let num = 3; //默认连发数量为3
let timeout = 10000
let msgRes =[]
let kg = 0
let r18=0
let url = ""
let sl = 2
export class sese extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '土块隐藏涩涩',
            /** 功能描述 */
            dsc: '',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1145,
            rule: [
               
                {
                    reg: '^搜索.*$|#搜索.*$',
                    fnc: 'acgs'
                },
				{
                    reg: '^#设置图片数量(.*)|#开启18$|#关闭18$',
                    fnc: 'ycmm'
                }
				
            ]
     
        })
    }


async ycmm(e) {
	if(e.isMaster){
		
		if(e.msg.includes('#设置图片数量')){
			let keyword = e.msg.replace("#设置图片数量", "");
			sl = Number(keyword)
			e.reply('当前返回'+keyword+'张图')
			
		}
		
		
		
	if(e.msg == "#开启18" ){
		e.reply("已开启R18模式，请注意身体")
		r18=1
	}
	if(e.msg == "#关闭18" ){
		e.reply("已关闭R18模式，进入养生模式")
		r18=0
	}
	}
	
	
	
	
	
}

async acgs(e) {
	let img = []
	 msgRes=[]

	 let keyword = e.msg.replace("#", "");
         keyword = keyword.replace("搜索", "");
		 if(r18==0){
			 url = `https://api.lolicon.app/setu/v2?tag=${keyword}&proxy=i.pixiv.re&r18=0&size=regular`;
		 }
		 if(r18==1){
			 url = `https://api.lolicon.app/setu/v2?tag=${keyword}&proxy=i.pixiv.re&r18=1&size=regular`;
		 }
		   
		
			let response = ""; //调用接口获取数据
            let res =""; //结果json字符串转对象
            let imgurl = "";
			for(let i=0;i<sl;i++){
				
				response = await fetch(url);
				res = await response.json();
				img[i] = res.data[0].urls.regular;
		

			 }
			
			console.log(img)
		
            if (res.data.length == 0) {
                e.reply("暂时没有搜到哦！换个关键词试试吧！");
                return true;
            }
            let TagNumber = res.data[0].tags.length;
            let Atags;
            let Btags;
            let qwq = 0;
            while (TagNumber--) {
                Atags = res.data[0].tags[TagNumber];
                if (qwq == 0) {
                    Btags = "";
                }
                Btags = Btags + " " + Atags;
                qwq++;
            }
            let msg;
            let pid = res.data[0].pid;
            //最后回复消息
            msg = [

                res.data[0].urls.original,
            ];
            //发送消息		
			
			
			 const puppeteer = require('puppeteer');

        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-setuid-sandbox',
                '--no-first-run',
                '--no-sandbox',
                '--no-zygote',
                '--single-process'
              ]
        });
		let n =0
		for(let i=0;i<img.length;i++){
			const page = await browser.newPage();
			 await page.goto(img[i]);
        await page.setViewport({
            width: 1372,
            height: 756
        });
        msgRes[i] =segment.image(await page.screenshot({
            fullPage: true
        }))
		
		
		
		
		}
        
       
		let msg2 =  ForwardMsg(e,msgRes)
		
		
		
}


  
}

async function ForwardMsg(e, data) {
   
    let msgList = [];
    for (let i=0;i<msgRes.length;i++) {
        msgList.push({
            message: msgRes[i],
            nickname: Bot.nickname,
            user_id: Bot.uin,
        });
    }
    if (msgList.length == 10) {
        await e.reply(msgList[0].message);
    }
    else {
        //console.log(msgList);
        let msg2  = await e.reply(await Bot.makeForwardMsg(msgList));
		 if (msg2 && msg2.message_id) {
			 setTimeout(() => {
			    let target = e.group;
                    target.recallMsg(msg2.message_id);
                }, 30000);
		 }
		
    }
    return;
}
