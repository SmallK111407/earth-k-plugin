import {
    segment
}
from "oicq";
import fetch from "node-fetch";
import fs from "fs";
import puppeteer from "../../..//lib/puppeteer/puppeteer.js";
let data1 = {}
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
let ml = process.cwd()
var http = require('http');
let kg = 0
let kg2 = 0
let res4 
let res5
export class aiht extends plugin {
	
    constructor() {
        super({
            /** 功能名称 */
            name: 'AI画图',
            /** 功能描述 */
            dsc: 'AI画图',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 4500,
            rule: [
                {
                    reg: "^#画图(.*)$", //匹配消息正则，命令正则
                    /** 执行方法 */
                    fnc: 'huatu'
                }


            ]

        })
    }
	
	
	
	
	async huatu(e) {
		let gjc = e.msg.replace(/#画图/g, "").trim()
		
		
		
		if(kg == 0 & e.isGroup){
			kg = 1
			
			let data1 = gjc
			
		var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
        if(reg.test(data1))
		{
			console.log('包含中文') 
	let url3 = 'https://api.66mz8.com/api/translation.php?info='+gjc
			res5 = await fetch(url3)
			
			res5 = await res5.json()
			res5 = res5.fanyi
			console.log(res5)
	}else{
		console.log('是英文') 
		res5 = data1
		
	}
			
			
			
		
		let url4 = 'https://api.nya.la/ai/generate-image'
		 let i = Math.floor(Math.random() * 3067080848);
		 e.reply('收到!,正在准备开始了')
	
		 let response4 = await fetch(url4,{
			 method: 'post',
			 headers: {
                'Content-Type': 'application/json',
				'authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ing0djVwQ3dLZmR3WjdvTVNTTTd0NiIsIm5jIjoibnd5Rm9JR1ZLeldZT1RDd3BDTEVxIiwiaWF0IjoxNjY1MzgyNDc0LCJleHAiOjE2Njc5NzQ0NzR9.Ky5li8ZKtlTvPDMHkDxsB9Sl5RnzINcmX8sJl7_TlAs'
			 },
			 body: JSON.stringify(
				
				//{"input":"masterpiece, best quality, loli","model":"safe-diffusion","parameters":{"width":512,"height":768,"scale":12,"sampler":"k_euler_ancestral","steps":28,"seed":2867080848,"n_samples":1,"ucPreset":0,"uc":"lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry"}}
				
				{"input":"masterpiece, best quality, " + res5,"model":"safe-diffusion","parameters":{"width":512,"height":768,"scale":12,"sampler":"k_euler_ancestral","steps":28,"seed":i,"n_samples":1,"ucPreset":0,"uc":"lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry"}}
		
            )	
    
			 }		 
		 );
		  
		   let res4 = await response4.text();
		  
		   if(res4 == '{"error":"Too many requests currently processing, please try again later"}'){
			   e.reply('对面服务器很忙，等等')
			   kg = 0
			   return
		   }
		   
		   //{"error":"请求太多了，稍等一会吧。"}
		    if(res4 == '{"error":"请求太多了，稍等一会吧。"}'){
			   e.reply('对面服务器很忙，等等')
			   kg = 0
			   return
		   }
		   res4 = res4.replace(/id: 1/g, "").trim()
		   res4 = res4.replace(/event: newImage/g, "").trim()
		   res4 = res4.replace(/data:/g, "").trim()
		   e.reply('成功了！')
		   
		   
		   
		 
		 
		 
		 
		// let base64 = await imgUrlToBase64(e.img[0].replace(/https/g, "http").trim())
		 
		 
		 console.log('成功了')
	await fs.writeFile('./plugins/earth-k-plugin/resources/1.jpg', res4, 'base64', (err) => {
     if (err) {
      console.log('写入文件错误')
    } else {
      console.log('写入文件成功')
	  sleep(2000)
	   let msg2 =[ segment.at(e.user_id),res5,segment.image(ml+'/plugins/earth-k-plugin/resources/1.jpg')]
	   e.reply(msg2)
	   
	   kg = 0
     }
    })
	}else{
		e.reply('请勿重复发起，正在画呢')
	}
	

	}
}

async function imgUrlToBase64(url) {
  let base64Img
  return new Promise(function (resolve, reject) {
    let req = http.get(url, function (res) {
      var chunks = [];
      var size = 0;
      res.on('data', function (chunk) {
        chunks.push(chunk);
        size += chunk.length;　　//累加缓冲数据的长度
      });
      res.on('end', function (err) {
        var data = Buffer.concat(chunks, size);
        base64Img = data.toString('base64');
        resolve({ success: true, base64Img });
      });
    })
    req.on('error', (e) => {
      resolve({ success: false, errmsg: e.message });
    });
    req.end();
  })
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
