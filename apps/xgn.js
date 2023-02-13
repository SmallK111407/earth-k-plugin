import { segment } from "oicq";
import fetch from "node-fetch";
import { core } from "oicq";
import {
    createRequire
}


    from 'module'
    import fs from "fs";
const require = createRequire(import.meta.url)
const _path = process.cwd();
var http = require('http');
let msg = []
import _ from 'lodash'
import uploadRecord from '../../earth-k-plugin/model/uploadRecord.js'
var tempMsg = ""
let jieguo
let kg = 0
let beisu = 3.3
//1.定义命令规则
export class xgn extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '土块小功能',
            /** 功能描述 */
            dsc: '土块小功能',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级,数字越小等级越高 */
            priority: 1145,
            rule: [{
                    /** 命令正则匹配 */
                    reg: '#今日运势', //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'jrys'
                },{
                    /** 命令正则匹配 */
                    reg: '#酷我(.*)', //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'kuwo'
                },{
                    /** 命令正则匹配 */
                    reg: '#查车牌(.*)', //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'cha'
                },{
                    /** 命令正则匹配 */
                    reg: '#钢琴(.*)', //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'hebing'
                },{
                    /** 命令正则匹配 */
                    reg: '#吹箫(.*)', //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'chui'
                },{
                    /** 命令正则匹配 */
                    reg: '#倍速(.*)', //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'beishu'
                },{
                    /** 命令正则匹配 */
                    reg: '#八音盒(.*)', //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'bayinhe'
                },{
                    /** 命令正则匹配 */
                    reg: '#小提琴(.*)', //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'ti'
                },{
                    /** 命令正则匹配 */
                    reg: '#吉他(.*)', //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'jita'
                },{
                    /** 命令正则匹配 */
                    reg: '#西域琴(.*)', //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'xiyu'
                },{
                    /** 命令正则匹配 */
                    reg: '#萨克斯(.*)', //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'sakesi'
                },{
                    /** 命令正则匹配 */
                    reg: '#古筝(.*)', //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'gu'
                },{
                    /** 命令正则匹配 */
                    reg: '#弹琴说明', //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'tqbz'
                }, {
                    /** 命令正则匹配 */
                    reg: '^机器人(.*)$', //匹配消息正则,命令正则
                    /** 执行方法 */
                    fnc: 'jiji'
                  }
            ]

        })
    }
    async tqbz(e) {
        let msg = "有以下几种乐器\n，1.钢琴2.八音盒3.古筝4.吉他5.萨克斯6.小提琴7.吹箫8.西域琴，\n有以下几种音调-1到-7，1到7，+1到+7，钢琴有++1到++7，\n每个音符要用空格隔开或者逗号，例如 #钢琴1 2 3 1 1 2 3 1\n设置倍速为#倍速+数字，例如#倍速4"
      e.reply(msg)
    }
    async jiji (e) {
        let msg = _.trimStart(e.msg, "机器人")
        tempMsg = tempMsg + "\nHuman: " + msg
    
       
          let url = "https://api.caonm.net/api/ai/o.php?img="+tempMsg
          let res3 = await fetch(url)
       
       
        jieguo = await res3.json()
        
          
       
        jieguo = jieguo.data.html
        
        if(jieguo == null | jieguo == "余额没钱了,晚点试试吧"){
         url = "https://v1.apigpt.cn/?q="+msg
         res3 = await fetch(url)
       
       
          jieguo = await res3.json()
          jieguo = jieguo.ChatGPT_Answer
          console.log(jieguo)

          if(jieguo == null){
            e.reply('重置聊天对话啦')
            return
          }


         tempMsg = ""

         
      

          
        }
        jieguo = jieguo.replace(/\n/, "").trim()
              jieguo = jieguo.replace(/答：/, "").trim()
              jieguo = jieguo.replace(/Bot:/, "").trim()
              jieguo = jieguo.replace(/robot:/, "").trim()
              jieguo = jieguo.replace(/Robot:/, "").trim()
              jieguo = jieguo.replace(/Computer:/, "").trim()
              jieguo = jieguo.replace(/computer:/, "").trim()
              jieguo = jieguo.replace(/AI:/, "").trim()
    
        e.reply(jieguo,true)
        tempMsg = tempMsg + "\nAI: " + jieguo
       
         
        
      }
    
      
    
  

    async gu(e) {
        try{
            fs.unlinkSync('./plugins/earth-k-plugin/resources/tanqin/gu/output.mp3',)
        }catch{

        }
        e.reply('好嘞，我开始弹了，等我一哈')
    
       
        const { spawn } = require('child_process');
        let xiaoxi = e.msg.replace(/#古筝/g, "").trim()
        let zifu = xiaoxi.split(' ')
        
        let msg = []
        let xx = ""
        for(let i=0;i<zifu.length;i++){
            msg.push('-i')
            msg.push('./plugins/earth-k-plugin/resources/tanqin/gu/'+ String(zifu[i]) + '.mp3')
            xx = xx+'['+String(i)+':a'+']'


        }
        xx = xx + 'concat=n='+String(zifu.length)+':v=0:a=1[out]'
        msg.push('-filter_complex')
        msg.push(xx)
        msg.push('-map')
        msg.push('[out]')
        msg.push('./plugins/earth-k-plugin/resources/tanqin/gu/output.mp3')
        
        

try{
    let ffmpeg = ""
    try{
        ffmpeg = spawn('ffmpeg',msg);
    }catch{
        e.reply('请安装依赖命令：cnpm install fluent-ffmpeg -w 或者 pnpm add fluent-ffmpeg -w ，并且需要配置ffmpeg')
        return
    }

    
    ffmpeg.stdout.on('data', (data) => {
        
    });
    
    ffmpeg.stderr.on('data', (data) => {
        
    });
    
    ffmpeg.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      if(fs.existsSync('./plugins/earth-k-plugin/resources/tanqin/gu/output.mp3') == false){
        e.reply('你输入的不对')
        return
      }

      
    
      let ffmpeg = ""
	  try{
		    ffmpeg = require('fluent-ffmpeg');
	  }catch{
		  e.reply('请安装依赖命令：cnpm install fluent-ffmpeg -w 或者 pnpm add fluent-ffmpeg -w ，并且需要配置ffmpeg')
		  return
	  }
     
    ffmpeg('./plugins/earth-k-plugin/resources/tanqin/gu/output.mp3')
      .audioFilters('atempo='+beisu)
      .save('./plugins/earth-k-plugin/resources/tanqin/gu/output2.mp3');
      
    
      kg = 1
    
    
    });

}catch{}


let time = zifu.length * 100
   
await sleep(time)
if(kg == 1){
    let msg2 = await uploadRecord('./plugins/earth-k-plugin/resources/tanqin/gu/output2.mp3',0,false)


    e.reply(msg2)
}
kg = 0
//let msg2 =  segment.record('./plugins/earth-k-plugin/resources/tanqin/ti/output2.mp3')

}
    async sakesi(e) {
        try{
            fs.unlinkSync('./plugins/earth-k-plugin/resources/tanqin/sa/output.mp3',)
        }catch{

        }
        e.reply('好嘞，我开始弹了，等我一哈')
    
       
        const { spawn } = require('child_process');
        let xiaoxi = e.msg.replace(/#萨克斯/g, "").trim()
        let zifu = xiaoxi.split(' ')
        
        let msg = []
        let xx = ""
        for(let i=0;i<zifu.length;i++){
            msg.push('-i')
            msg.push('./plugins/earth-k-plugin/resources/tanqin/sa/'+ String(zifu[i]) + '.mp3')
            xx = xx+'['+String(i)+':a'+']'


        }
        xx = xx + 'concat=n='+String(zifu.length)+':v=0:a=1[out]'
        msg.push('-filter_complex')
        msg.push(xx)
        msg.push('-map')
        msg.push('[out]')
        msg.push('./plugins/earth-k-plugin/resources/tanqin/sa/output.mp3')
        
        

try{
    let ffmpeg = ""
        try{
            ffmpeg = spawn('ffmpeg',msg);
        }catch{
            e.reply('请安装依赖命令：cnpm install fluent-ffmpeg -w 或者 pnpm add fluent-ffmpeg -w ，并且需要配置ffmpeg')
            return
        }
   
    
    ffmpeg.stdout.on('data', (data) => {
        
    });
    
    ffmpeg.stderr.on('data', (data) => {
        
    });
    
    ffmpeg.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      if(fs.existsSync('./plugins/earth-k-plugin/resources/tanqin/sa/output.mp3') == false){
        e.reply('你输入的不对')
        return
      }

      
    
      let ffmpeg = ""
	  try{
		    ffmpeg = require('fluent-ffmpeg');
	  }catch{
		  e.reply('请安装依赖命令：cnpm install fluent-ffmpeg -w 或者 pnpm add fluent-ffmpeg -w ，并且需要配置ffmpeg')
		  return
	  }
     
    ffmpeg('./plugins/earth-k-plugin/resources/tanqin/sa/output.mp3')
      .audioFilters('atempo='+beisu)
      .save('./plugins/earth-k-plugin/resources/tanqin/sa/output2.mp3');
      kg = 1
    
      
    
    
    });

}catch{}


let time = zifu.length * 100
   
await sleep(time)
if(kg == 1){
    let msg2 = await uploadRecord('./plugins/earth-k-plugin/resources/tanqin/sa/output2.mp3',0,false)


e.reply(msg2)
}
kg = 0
//let msg2 =  segment.record('./plugins/earth-k-plugin/resources/tanqin/ti/output2.mp3')

}


    async jita(e) {
        try{
            fs.unlinkSync('./plugins/earth-k-plugin/resources/tanqin/jita/output.mp3',)
        }catch{

        }
        e.reply('好嘞，我开始弹了，等我一哈')
    
       
        const { spawn } = require('child_process');
        let xiaoxi = e.msg.replace(/#吉他/g, "").trim()
        let zifu = xiaoxi.split(' ')
        
        let msg = []
        let xx = ""
        for(let i=0;i<zifu.length;i++){
            msg.push('-i')
            msg.push('./plugins/earth-k-plugin/resources/tanqin/jita/'+ String(zifu[i]) + '.mp3')
            xx = xx+'['+String(i)+':a'+']'


        }
        xx = xx + 'concat=n='+String(zifu.length)+':v=0:a=1[out]'
        msg.push('-filter_complex')
        msg.push(xx)
        msg.push('-map')
        msg.push('[out]')
        msg.push('./plugins/earth-k-plugin/resources/tanqin/jita/output.mp3')
        
        

try{
    let ffmpeg = ""
        try{
            ffmpeg = spawn('ffmpeg',msg);
        }catch{
            e.reply('请安装依赖命令：cnpm install fluent-ffmpeg -w 或者 pnpm add fluent-ffmpeg -w ，并且需要配置ffmpeg')
            return
        }
   
    
    ffmpeg.stdout.on('data', (data) => {
        
    });
    
    ffmpeg.stderr.on('data', (data) => {
        
    });
    
    ffmpeg.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      if(fs.existsSync('./plugins/earth-k-plugin/resources/tanqin/jita/output.mp3') == false){
        e.reply('你输入的不对')
        kg = 0
        return
      }

      
    
      let ffmpeg = ""
	  try{
		    ffmpeg = require('fluent-ffmpeg');
	  }catch{
		  e.reply('请安装依赖命令：cnpm install fluent-ffmpeg -w 或者 pnpm add fluent-ffmpeg -w ，并且需要配置ffmpeg')
		  return
	  }
    ffmpeg('./plugins/earth-k-plugin/resources/tanqin/jita/output.mp3')
      .audioFilters('atempo='+beisu)
      .save('./plugins/earth-k-plugin/resources/tanqin/jita/output2.mp3');
      
      kg = 1
      
    
    
    });

}catch{}


let time = zifu.length * 100
   
await sleep(time)
//let msg2 =  segment.record('./plugins/earth-k-plugin/resources/tanqin/ti/output2.mp3')
if(kg == 1){
    let msg2 = await uploadRecord('./plugins/earth-k-plugin/resources/tanqin/jita/output2.mp3',0,false)


    e.reply(msg2)
}
kg = 0

}



    async xiyu(e) {
        try{
            fs.unlinkSync('./plugins/earth-k-plugin/resources/tanqin/xiyu/output.mp3',)
        }catch{

        }
        e.reply('好嘞，我开始弹了，等我一哈')
    
       
        const { spawn } = require('child_process');
        let xiaoxi = e.msg.replace(/#西域琴/g, "").trim()
        let zifu = xiaoxi.split(' ')
        
        let msg = []
        let xx = ""
        for(let i=0;i<zifu.length;i++){
            msg.push('-i')
            msg.push('./plugins/earth-k-plugin/resources/tanqin/xiyu/'+ String(zifu[i]) + '.mp3')
            xx = xx+'['+String(i)+':a'+']'


        }
        xx = xx + 'concat=n='+String(zifu.length)+':v=0:a=1[out]'
        msg.push('-filter_complex')
        msg.push(xx)
        msg.push('-map')
        msg.push('[out]')
        msg.push('./plugins/earth-k-plugin/resources/tanqin/xiyu/output.mp3')
        
        

try{
    let ffmpeg = ""
        try{
            ffmpeg = spawn('ffmpeg',msg);
        }catch{
            e.reply('请安装依赖命令：cnpm install fluent-ffmpeg -w 或者 pnpm add fluent-ffmpeg -w ，并且需要配置ffmpeg')
            return
        }
   
    ffmpeg.stdout.on('data', (data) => {
        
    });
    
    ffmpeg.stderr.on('data', (data) => {
        
    });
    
    ffmpeg.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      if(fs.existsSync('./plugins/earth-k-plugin/resources/tanqin/xiyu/output.mp3') == false){
        e.reply('你输入的不对')
        kg = 0
        return
      }

      
    
      let ffmpeg = ""
	  try{
		    ffmpeg = require('fluent-ffmpeg');
	  }catch{
		  e.reply('请安装依赖命令：cnpm install fluent-ffmpeg -w 或者 pnpm add fluent-ffmpeg -w ，并且需要配置ffmpeg')
		  return
	  }
     
    ffmpeg('./plugins/earth-k-plugin/resources/tanqin/xiyu/output.mp3')
      .audioFilters('atempo='+beisu)
      .save('./plugins/earth-k-plugin/resources/tanqin/xiyu/output2.mp3');
      kg = 1
    
      
    
    
    });

}catch{}


let time = zifu.length * 100
   
await sleep(time)
//let msg2 =  segment.record('./plugins/earth-k-plugin/resources/tanqin/ti/output2.mp3')

   if(kg == 1){
    let msg2 = await uploadRecord('./plugins/earth-k-plugin/resources/tanqin/xiyu/output2.mp3',0,false)


    e.reply(msg2)
    
   }
   kg = 0

}


    async jita(e) {
        try{
            fs.unlinkSync('./plugins/earth-k-plugin/resources/tanqin/jita/output.mp3',)
        }catch{

        }
        e.reply('好嘞，我开始弹了，等我一哈')
    
       
        const { spawn } = require('child_process');
        let xiaoxi = e.msg.replace(/#吉他/g, "").trim()
        let zifu = xiaoxi.split(' ')
        
        let msg = []
        let xx = ""
        for(let i=0;i<zifu.length;i++){
            msg.push('-i')
            msg.push('./plugins/earth-k-plugin/resources/tanqin/jita/'+ String(zifu[i]) + '.mp3')
            xx = xx+'['+String(i)+':a'+']'


        }
        xx = xx + 'concat=n='+String(zifu.length)+':v=0:a=1[out]'
        msg.push('-filter_complex')
        msg.push(xx)
        msg.push('-map')
        msg.push('[out]')
        msg.push('./plugins/earth-k-plugin/resources/tanqin/jita/output.mp3')
        
        

try{
    let ffmpeg = ""
        try{
            ffmpeg = spawn('ffmpeg',msg);
        }catch{
            e.reply('请安装依赖命令：cnpm install fluent-ffmpeg -w 或者 pnpm add fluent-ffmpeg -w ，并且需要配置ffmpeg')
            return
        }
   
    ffmpeg.stdout.on('data', (data) => {
        
    });
    
    ffmpeg.stderr.on('data', (data) => {
        
    });
    
    ffmpeg.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      if(fs.existsSync('./plugins/earth-k-plugin/resources/tanqin/jita/output.mp3') == false){
        e.reply('你输入的不对')
        kg = 0
        return
      }

      
    
      let ffmpeg = ""
	  try{
		    ffmpeg = require('fluent-ffmpeg');
	  }catch{
		  e.reply('请安装依赖命令：cnpm install fluent-ffmpeg -w 或者 pnpm add fluent-ffmpeg -w ，并且需要配置ffmpeg')
		  return
	  }
    ffmpeg('./plugins/earth-k-plugin/resources/tanqin/jita/output.mp3')
      .audioFilters('atempo='+beisu)
      .save('./plugins/earth-k-plugin/resources/tanqin/jita/output2.mp3');
      kg = 1
    
      
    
    
    });

}catch{}


let time = zifu.length * 100
   
await sleep(time)
//let msg2 =  segment.record('./plugins/earth-k-plugin/resources/tanqin/ti/output2.mp3')

if(kg == 1){
    let msg2 = await uploadRecord('./plugins/earth-k-plugin/resources/tanqin/jita/output2.mp3',0,false)


    e.reply(msg2)
}
kg = 0
}


    async ti(e) {
        try{
            fs.unlinkSync('./plugins/earth-k-plugin/resources/tanqin/ti/output.mp3',)
        }catch{

        }
        e.reply('好嘞，我开始弹了，等我一哈')
    
       
        const { spawn } = require('child_process');
        let xiaoxi = e.msg.replace(/#小提琴/g, "").trim()
        let zifu = xiaoxi.split(' ')
        
        let msg = []
        let xx = ""
        for(let i=0;i<zifu.length;i++){
            msg.push('-i')
            msg.push('./plugins/earth-k-plugin/resources/tanqin/ti/'+ String(zifu[i]) + '.mp3')
            xx = xx+'['+String(i)+':a'+']'


        }
        xx = xx + 'concat=n='+String(zifu.length)+':v=0:a=1[out]'
        msg.push('-filter_complex')
        msg.push(xx)
        msg.push('-map')
        msg.push('[out]')
        msg.push('./plugins/earth-k-plugin/resources/tanqin/ti/output.mp3')
        
        

try{
    let ffmpeg = ""
    try{
        ffmpeg = spawn('ffmpeg',msg);
    }catch{
        e.reply('请安装依赖命令：cnpm install fluent-ffmpeg -w 或者 pnpm add fluent-ffmpeg -w ，并且需要配置ffmpeg')
        return
    }

    
    ffmpeg.stdout.on('data', (data) => {
        
    });
    
    ffmpeg.stderr.on('data', (data) => {
        
    });
    
    ffmpeg.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      if(fs.existsSync('./plugins/earth-k-plugin/resources/tanqin/ti/output.mp3') == false){
        e.reply('你输入的不对')
        kg = 0
        return
      }

      
    
      let ffmpeg = ""
	  try{
		    ffmpeg = require('fluent-ffmpeg');
	  }catch{
		  e.reply('请安装依赖命令：cnpm install fluent-ffmpeg -w 或者 pnpm add fluent-ffmpeg -w ，并且需要配置ffmpeg')
		  return
	  }
     
    ffmpeg('./plugins/earth-k-plugin/resources/tanqin/ti/output.mp3')
      .audioFilters('atempo='+beisu)
      .save('./plugins/earth-k-plugin/resources/tanqin/ti/output2.mp3');
      
      kg = 1
      
    
    
    });

}catch{}


let time = zifu.length * 100
   
await sleep(time)
//let msg2 =  segment.record('./plugins/earth-k-plugin/resources/tanqin/ti/output2.mp3')

if(kg == 1){
    let msg2 = await uploadRecord('./plugins/earth-k-plugin/resources/tanqin/ti/output2.mp3',0,false)


    e.reply(msg2)
}
kg = 0



}

    async bayinhe(e) {
        try{
            fs.unlinkSync('./plugins/earth-k-plugin/resources/tanqin/ba/output.mp3',)
        }catch{

        }
        e.reply('好嘞，我开始弹了，等我一哈')
    
       
        const { spawn } = require('child_process');
        let xiaoxi = e.msg.replace(/#八音盒/g, "").trim()
        let zifu = xiaoxi.split(' ')
        
        let msg = []
        let xx = ""
        for(let i=0;i<zifu.length;i++){
            msg.push('-i')
            msg.push('./plugins/earth-k-plugin/resources/tanqin/ba/'+ String(zifu[i]) + '.mp3')
            xx = xx+'['+String(i)+':a'+']'


        }
        xx = xx + 'concat=n='+String(zifu.length)+':v=0:a=1[out]'
        msg.push('-filter_complex')
        msg.push(xx)
        msg.push('-map')
        msg.push('[out]')
        msg.push('./plugins/earth-k-plugin/resources/tanqin/ba/output.mp3')
        
        

try{
    let ffmpeg = ""
        try{
            ffmpeg = spawn('ffmpeg',msg);
        }catch{
            e.reply('请安装依赖命令：cnpm install fluent-ffmpeg -w 或者 pnpm add fluent-ffmpeg -w ，并且需要配置ffmpeg')
            return
        }
   
    
    ffmpeg.stdout.on('data', (data) => {
        
    });
    
    ffmpeg.stderr.on('data', (data) => {
        
    });
    
    ffmpeg.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      if(fs.existsSync('./plugins/earth-k-plugin/resources/tanqin/ba/output.mp3') == false){
        e.reply('你输入的不对')
        kg = 0
        return
      }

      
    
      let ffmpeg = ""
	  try{
		    ffmpeg = require('fluent-ffmpeg');
	  }catch{
		  e.reply('请安装依赖命令：cnpm install fluent-ffmpeg -w 或者 pnpm add fluent-ffmpeg -w ，并且需要配置ffmpeg')
		  return
	  }
     
    ffmpeg('./plugins/earth-k-plugin/resources/tanqin/ba/output.mp3')
      .audioFilters('atempo='+beisu)
      .save('./plugins/earth-k-plugin/resources/tanqin/ba/output2.mp3');
      
      kg = 1 
      
    
    
    });

}catch{}


let time = zifu.length * 100
   
await sleep(time)
//let msg2 =  segment.record('./plugins/earth-k-plugin/resources/tanqin/ba/output2.mp3')

if(kg==1){
    let msg2 = await uploadRecord('./plugins/earth-k-plugin/resources/tanqin/ba/output2.mp3',0,false)
e.reply(msg2)
}
kg = 0





        }

    async beishu(e) {
        beisu = e.msg.replace(/#倍速/g, "").trim()
        beisu = String(beisu)
        e.reply(['已设置倍速为',beisu,'倍'])


    }
    
    async chui(e) {
        try{
            fs.unlinkSync('./plugins/earth-k-plugin/resources/tanqin/xiao/output.mp3',)
        }catch{

        }
        e.reply('好嘞，我开始吹了，等我一哈')
    
       
        const { spawn } = require('child_process');
        let xiaoxi = e.msg.replace(/#吹箫/g, "").trim()
        let zifu = xiaoxi.split(' ')
        
        let msg = []
        let xx = ""
        for(let i=0;i<zifu.length;i++){
            msg.push('-i')
            msg.push('./plugins/earth-k-plugin/resources/tanqin/xiao/'+ String(zifu[i]) + '.mp3')
            xx = xx+'['+String(i)+':a'+']'


        }
        xx = xx + 'concat=n='+String(zifu.length)+':v=0:a=1[out]'
        msg.push('-filter_complex')
        msg.push(xx)
        msg.push('-map')
        msg.push('[out]')
        msg.push('./plugins/earth-k-plugin/resources/tanqin/xiao/output.mp3')
        
        

try{
    let ffmpeg = ""
    try{
        ffmpeg = spawn('ffmpeg',msg);
    }catch{
        e.reply('请安装依赖命令：cnpm install fluent-ffmpeg -w 或者 pnpm add fluent-ffmpeg -w ，并且需要配置ffmpeg')
        return
    }

    
    ffmpeg.stdout.on('data', (data) => {
      
    });
    
    ffmpeg.stderr.on('data', (data) => {
     
    });
    
    ffmpeg.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      if(fs.existsSync('./plugins/earth-k-plugin/resources/tanqin/xiao/output.mp3') == false){
        e.reply('你输入的不对')
        kg = 0
        return
      }

      kg = 1
    
      let ffmpeg = ""
	  try{
		    ffmpeg = require('fluent-ffmpeg');
	  }catch{
		  e.reply('请安装依赖命令：cnpm install fluent-ffmpeg -w 或者 pnpm add fluent-ffmpeg -w ，并且需要配置ffmpeg')
		  return
	  }
     
    ffmpeg('./plugins/earth-k-plugin/resources/tanqin/xiao/output.mp3')
      .audioFilters('atempo='+beisu)
      .save('./plugins/earth-k-plugin/resources/tanqin/xiao/output2.mp3');
      
    
      
    
    
    });

}catch{}


let time = zifu.length * 80
   
await sleep(time)
//let msg2 =  segment.record('./plugins/earth-k-plugin/resources/tanqin/xiao/output2.mp3')
if(kg == 1){
    let msg2 = await uploadRecord('./plugins/earth-k-plugin/resources/tanqin/xiao/output2.mp3',0,false)
    e.reply(msg2)
    kg = 0
}




    }


    async hebing(e) {
        try{
            fs.unlinkSync('./plugins/earth-k-plugin/resources/tanqin/gangqin/output4.mp3',)
        }catch{

        }
        e.reply('好嘞，我开始弹了，等我一哈')
        
       
        const { spawn } = require('child_process');

        let xiaoxi = e.msg.replace(/#钢琴/g, "").trim()
         xiaoxi = xiaoxi .replace(/，/g, " ").trim()
         xiaoxi = xiaoxi .replace(/,/g, " ").trim()
         xiaoxi = xiaoxi .replace(/  /g, " ").trim()
        let zifu = xiaoxi.split(' ')
        
        let msg = []
        let xx = ""
        for(let i=0;i<zifu.length;i++){
            msg.push('-i')
            msg.push('./plugins/earth-k-plugin/resources/tanqin/gangqin/'+ String(zifu[i]) + '.mp3')
            xx = xx+'['+String(i)+':a'+']'


        }
        xx = xx + 'concat=n='+String(zifu.length)+':v=0:a=1[out]'
        msg.push('-filter_complex')
        msg.push(xx)
        msg.push('-map')
        msg.push('[out]')
        msg.push('./plugins/earth-k-plugin/resources/tanqin/gangqin/output4.mp3')
       
        

        let ffmpeg = ""
        try{
            ffmpeg = spawn('ffmpeg',msg);
        }catch{
            e.reply('请安装依赖命令：cnpm install fluent-ffmpeg -w 或者 pnpm add fluent-ffmpeg -w ，并且需要配置ffmpeg')
            return
        }
   
    
	
    ffmpeg.stdout.on('data', (data) => {
     
    });
    
    ffmpeg.stderr.on('data', (data) => {
    
    });
    
     ffmpeg.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      if(fs.existsSync('./plugins/earth-k-plugin/resources/tanqin/gangqin/output4.mp3') == false){
        e.reply('你输入的不对')
        kg = 0
        return
      }

      kg = 1
      let ffmpeg = ""
	  try{
		    ffmpeg = require('fluent-ffmpeg');
	  }catch{
		  e.reply('请安装依赖命令：cnpm install fluent-ffmpeg -w 或者 pnpm add fluent-ffmpeg -w ，并且需要配置ffmpeg')
		  return
	  }
    
     
     
    ffmpeg('./plugins/earth-k-plugin/resources/tanqin/gangqin/output4.mp3')
      .audioFilters('atempo='+beisu)
      .save('./plugins/earth-k-plugin/resources/tanqin/gangqin/output2.mp3');
     
      
    
    
    });
    let time = zifu.length * 100
   
    await sleep(time)
      if(kg == 1){
       // let msg2 =  segment.record('./plugins/earth-k-plugin/resources/tanqin/output2.mp3')
        let msg2 = await uploadRecord('./plugins/earth-k-plugin/resources/tanqin/gangqin/output2.mp3',0,false)
        e.reply(msg2)
    
        console.log(time)

      }
      kg = 0
   





    }




    async cha(e) {
        if(!e.isMaster){
            return
        }
        msg = []
        let name = e.msg.replace(/#查车牌/g, "").trim()
        let url = "https://www.tukuai.one/laoshi.php?name="+ name
        let res = await fetch(url)
        res = await res.json()
        let ren = res.name[0]
        let tu = res.tu
        msg.push(name+"\n")
      
        for(let i=0;i<ren.length;i++){
            msg.push(ren[i])
            msg.push(segment.image("https://"+tu[i]))
        }
        e.reply(msg)
        
       
        console.log(ren,tu)
        
        


    }
    async kuwo(e) {
        let mz = e.msg.replace(/#酷我/g, "").trim()
        let url = "https://xiaobai.klizi.cn/API/music/kwmv.php?msg="+ encodeURI(mz) +"&n=1"
        let res = await fetch(url)
        let res2 = await res.json()

        res = res2.url
        await SendMusicShare(e,{source: 'kuwo',name:res2.name,artist:res2.artist,link:res,pic:res2.img})
       
        console.log(res)

        
        









    }
    async jrys(e) {
//https://api.fanlisky.cn/api/qr-fortune/get/随意
       let url = 'https://api.fanlisky.cn/api/qr-fortune/get/'+ String(e.user_id)
       let res = await fetch(url)
       res = await res.json()
      
       let fortuneSummary = res.data.fortuneSummary
       let luckyStar = res.data.luckyStar
       let signText = res.data.signText
       let unSignText = res.data.unSignText
       let msg = ["运势：",fortuneSummary,
                  "\n星级：",luckyStar, 
                  "\n点评：",signText, 
                  "\n解读：",unSignText,  ]
       e.reply(msg)
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
                        size += chunk.length;
                        //累加缓冲数据的长度
                    });
                    res.on('end', function (err) {
                        var data = Buffer.concat(chunks, size);
                        base64Img = data.toString('base64');
                        resolve({
                            success: true,
                            base64Img
                        });
                    });
                })
                req.on('error', (e) => {
                    resolve({
                        success: false,
                        errmsg: e.message
                    });
                });
                req.end();
            })
        }
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        }

        

async function SendMusicShare(e,data,to_uin = null){
	let appid, appname, appsign, style = 4;
	switch(data.source){
		case 'mys':
			appid = 1109288517, appname = "com.mihoyo.hyperion", appsign = "abdcfbc2380da2413c1e0be7a118dd9e";
			break;
		case 'netease':
			appid = 100495085, appname = "com.netease.cloudmusic", appsign = "da6b069da1e2982db3e386233f68d76d";
			break;
		case 'kuwo':
			appid = 100243533, appname = "cn.kuwo.player", appsign = "bf9ff4ffb4c558a34ee3fd52c223ebf5";
			break;
		case 'kugou':
			appid = 205141, appname = "com.kugou.android", appsign = "fe4a24d80fcf253a00676a808f62c2c6";
			break;
		case 'migu':
			appid = 1101053067, appname = "cmccwm.mobilemusic", appsign = "6cdc72a439cef99a3418d2a78aa28c73";
			break;
		case 'qq':
		default:
			appid = 100497308, appname = "com.tencent.qqmusic", appsign = "cbd27cd7c861227d013a25b2d10f0799";
			break;
	}
	
	var title = data.name, singer = data.artist, prompt = '[分享]', jumpUrl, preview, musicUrl;
	
	let types = [];
	if(data.url == null){types.push('url')};
	if(data.pic == null){types.push('pic')};
	if(data.link == null){types.push('link')};
	if(types.length > 0 && typeof(data.api) == 'function'){
		let {url,pic,link} = await data.api(data.data,types);
		if(url){data.url = url;}
		if(pic){data.pic = pic;}
		if(link){data.link = link;}
	}
	
	typeof(data.url) == 'function' ? musicUrl = await data.url(data.data) : musicUrl = data.url;
	typeof(data.pic) == 'function' ? preview = await data.pic(data.data) : preview = data.pic;
	typeof(data.link) == 'function' ? jumpUrl = await data.link(data.data) : jumpUrl = data.link;
	
	if(typeof(musicUrl) != 'string' || musicUrl == ''){
		style = 0;
		musicUrl = '';
	}
	
	prompt = '[分享]' + title + '-' + singer;
	
	let recv_uin = 0;
	let send_type = 0;
	let recv_guild_id = 0;
	let ShareMusic_Guild_id = false;
	
	if(e.isGroup && to_uin == null){//群聊
		recv_uin = e.group.gid;
		send_type = 1;
	}else if(e.guild_id){//频道
		recv_uin = Number(e.channel_id);
		recv_guild_id = BigInt(e.guild_id);
		send_type = 3;
	}else if(to_uin == null){//私聊
		recv_uin = e.friend.uid;
		send_type = 0;
	}else{//指定号码私聊
		recv_uin = to_uin;
		send_type = 0;
	}
	
	let body = {
		1: appid,
		2: 1,
		3: style,
		5: {
			1: 1,
			2: "0.0.0",
			3: appname,
			4: appsign,
		},
		10: send_type,
		11: recv_uin,
		12: {
			10: title,
			11: singer,
			12: prompt,
			13: jumpUrl,
			14: preview,
			16: musicUrl,
		},
		19: recv_guild_id
	};
	
	
	let payload = await Bot.sendOidb("OidbSvc.0xb77_9", core.pb.encode(body));
	
	let result = core.pb.decode(payload);

	if(result[3] != 0){
		e.reply('歌曲分享失败：'+result[3],true);
	}
}
async function upload_image(file){
	return (await Bot.pickFriend(Bot.uin)._preprocess(segment.image(file,true))).imgs[0];
}


