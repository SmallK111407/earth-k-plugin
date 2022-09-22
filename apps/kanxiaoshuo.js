import fetch from 'node-fetch'
import { segment } from 'oicq'
import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from "../../..//lib/puppeteer/puppeteer.js";


let msg3 = []
	let  k = ""
	let name = ""
	let data3 = ""
	let msg = ""
	let msg2 = []
	let img2 = []
	let nr2 = {}
	let js = {}
	let js2 = {}
	let data1 = {}
	let data = ""
	let ml = process.cwd()
	let bt = ""
	let zzss = 0
	let url = ""
	 let response= ""
export class kanxiaoshuo extends plugin {
  constructor () {
    super({
      name: '土块点小说',
      dsc: '土块点小说',
      event: 'message',
      priority: 4998,
      rule: [
        
		{
			reg:"^#点小说(.*)$|#看(.*)|#选(.*)|#取消搜索$",
			fnc:'kanpian'
		}
		

      ]
    })
  }
  
async kanpian(e){
 
	k = ""
	if(e.msg.includes("#取消搜索")& zzss == 1){
		
		zzss = 0
		e.reply('已取消当前'+name+'搜索')
	}
	
	if(zzss==1){
		e.reply('当前正在搜索中...请勿重复搜索')
		return
	}
	if(e.msg.includes("#点小说")& zzss == 0){
		zzss = 1
		msg2 = []
	msg3 = []
	img2 = []
	
	
	
		k = e.msg.replace(/#点小说/g,"").trim()
		name = k
		e.reply('正在搜索中...请稍后')
		console.log(k)
		try{ 
    // 文件不存在
   url = 'http://lry.pingcc.cn:9010/fiction/search/title/' +  k  +"/1/10"
   response = await fetch(url);
  
    data= await response.json()
		console.log(data.data[0].videoId)
		
		nr2 = data.data
		
		
		
		if(nr2 != undefined){
			data1 = {
  tplFile: './plugins/earth-k-plugin/resources/xh/dxs.html',
  dz:  ml,
  nr2:nr2
 
 
}

		let img = await puppeteer.screenshot("123", {
        ...data1,
    });
	e.reply(img)
	zzss = 0
			
			
		}
	 
		
		
 } catch (err){ 
    e.reply('未能搜索到 '+name+'，抱歉')
	zzss = 0
	return
 } 
 
		
	    
       
	   
		
	}
	
	if(e.msg.includes("#看")){	
	k = e.msg.replace(/#看/g,"").trim()
	let url = 'http://api.pingcc.cn/fictionChapter/search/' + data.data[Number(k)-1].fictionId
	let response = await fetch(url);
	let data2 = await response.json()
	let lb = data2.data.chapterList
	js = data2.data
	
	bt = js.title
	for(var i=0;i < lb.length;i++ ){
		msg2[i] =  data2.data.chapterList[i].title 
		msg3[i] = data2.data.chapterList[i].chapterId
		
	}
	data1 = {
  tplFile: './plugins/earth-k-plugin/resources/xh/djs.html',
  
  name: js.title,
  dz:  ml,
  js:js
 
}
	 let img = await puppeteer.screenshot("123", {
        ...data1,
    });
	e.reply(img)			       
	}
		
		
		//'http://api.pingcc.cn/videoChapter/search/'
		
	
		
		if(e.msg.includes("#选")){
			k = e.msg.replace(/#选/g,"").trim()
			console.log(msg3[Number(k)-1])
			let url2 = 'http://api.pingcc.cn/fictionContent/search/' + msg3[Number(k)-1]
	let response2 = await fetch(url2);
	let data3 = await response2.json()
	let lb2 = data3.data
	
	
    data1 = {
  tplFile: './plugins/earth-k-plugin/resources/xh/xs.html',
  
  name: msg2[Number(k)-1],
  dz:  ml,
  lb:lb2
 
}
	 let img = await puppeteer.screenshot("123", {
        ...data1,
    });
	e.reply(img)			       
	
	
	
	
			
			
			
			
			//msg = bt + msg2[Number(k)-1] + '\n' + msg3[Number(k)-1]
			//e.reply(msg)
			
			
		}
		
		
		

  return true;//返回true 阻挡消息不再往下
}


}
function sleep(ms) {
    return new Promise(resolve=>setTimeout(resolve, ms))
}
async function ForwardMsg(e, data) {
    console.log(data[1]);
    let msgList = [];
    for (let i=0; i<msg2.length;i++) {
        msgList.push({
            message: k+msg2[i]+ "\n" + msg3[i],
            nickname: Bot.nickname,
            user_id: Bot.uin,
        });
    }
    if (msgList.length == 10) {
        await e.reply(msgList[0].message);
    }
    else {
        //console.log(msgList);
        await e.reply(await Bot.makeForwardMsg(msgList));
    }
    return;
}
