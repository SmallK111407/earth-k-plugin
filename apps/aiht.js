import {
    segment
}
from "oicq";
import fetch from "node-fetch";
import fs from "fs";
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
let data1 = {}
import {
    createRequire
}
from 'module'
const require = createRequire(import.meta.url)
    let ml = process.cwd()
    var http = require('http');
let kg = 0
    let kg2 = 0
    let res4
    let res5
	 let res
     let zr = 0
     let changdu = 512
     let kuandu = 512
     let msg2
     let timeout = 30000
     let isch = 1
     let cd = 30000
     let t 
     let startTimeMS
     let iscd = 0
     let my
     let dz
     let sj1
     let sj2
     let pc = "lowres,nude, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, owres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry"
    export class aiht extends plugin {

    constructor() {
        super({
            /** 功能名称 */
            name: '土块AI画图',
            /** 功能描述 */
            dsc: '土块AI画图',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1145,
            rule: [{
                    reg: "^#画图(.*)$", //匹配消息正则，命令正则
                    /** 执行方法 */
                    fnc: 'huatu'
                }, {
                    reg: "^#绘个图(.*)$|#土块画图预设(.*)$", //匹配消息正则，命令正则
                    /** 执行方法 */
                    fnc: 'huatu2'
                }, {
                    reg: "^#取消画图$|#所有人可画$|#仅我可画$|#土块画图撤回(.*)$|#土块画图冷却(.*)$", //匹配消息正则，命令正则
                    /** 执行方法 */
                    fnc: 'qvht'
                }, {
                    reg: "^#新增屏蔽词(.*)$|#查看屏蔽词$|#删除屏蔽词$|#开启默认屏蔽词$", //匹配消息正则，命令正则
                    /** 执行方法 */
                    fnc: 'pbc'
                }

            ]

        })
    }
    async pbc(e) {
       



        if(e.msg.includes('#新增屏蔽词')  & e.isMaster){
            e.reply('新增屏蔽词成功')
            pc = e.msg.replace(/#新增屏蔽词/g, "").trim()
        }
        if(e.msg == '#查看屏蔽词'  & e.isMaster){
            e.reply(['当前屏蔽词有：',pc])

        }
        if(e.msg.includes('#删除屏蔽词')  &  e.isMaster){
            e.reply('删除屏蔽词成功'+'我知道你要干嘛！注意身体！')
            pc = ""
        }
        if(e.msg.includes('#开启默认屏蔽词')  &  e.isMaster){
            e.reply('已经开启默认屏蔽词')
            pc = "lowres,nude, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, owres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry"
        }



    }

    async qvht(e) {
        if(e.msg.includes('#土块画图冷却关闭') & e.isMaster){
            cd = 0
            e.reply('已关闭画图冷却')
            return
        }
        if(e.msg.includes('#土块画图冷却开启')  & e.isMaster){
           
            cd = 30000
            e.reply('已开启画图冷却，冷却时间为30秒')
            return
        }


        if(e.msg.includes('#土块画图冷却')  & e.isMaster){
           
           let time = e.msg.replace(/#土块画图冷却/g, "").trim()
           cd = Number(time)*1000
           e.reply('已设置冷却时间为'+time+'秒')


        }

        if(e.msg.includes('#土块画图撤回关闭') & e.isMaster){
            isch = 0
            e.reply('已关闭画图撤回')
            return
        }
        if(e.msg.includes('#土块画图撤回开启')  & e.isMaster){
            isch = 1
            timeout = 30000
            e.reply('已开启画图撤回，撤回时间为30秒')
            return
        }


        if(e.msg.includes('#土块画图撤回')  & e.isMaster){
            isch = 1
           let time = e.msg.replace(/#土块画图撤回/g, "").trim()
           timeout = Number(time)*1000
           e.reply('已设置撤回时间为'+time+'秒')


        }


        if (e.msg == '#取消画图吧'){
            kg = 0

            kg2 = 0
            e.reply('已取消当前画图')
        }
       

            if (e.msg == '#所有人可画' & e.isMaster){
                e.reply('好吧，那就一起来吧！')
                zr = 0
            }

            if (e.msg == '#仅我可画' & e.isMaster){
                e.reply('好的，权限已经关闭，只有你能画了')
                zr = 1
            }



    }

    async huatu2(e) {
       

        let jsonFilePath = ml + '/plugins/earth-k-plugin/resources/my/my.json'
        await fs.readFile(jsonFilePath,(err,data)=>{
           
            //从json文件中读取，并转换为对象
            my = JSON.parse(data.toString()) //解析json文件数据为对象
            
            dz = my.miyao
            sj1 = my.sj1
            sj2 = my.sj2
           
          
            })
            await sleep(1000)

            if(dz == ''){
                e.reply('你还不可以用该功能哦')
                return
            }
             let ys
        let name1
        let gjc
       
      
        if(e.msg.includes('#土块画图预设')==false  ){
          
            gjc = e.msg.replace(/#绘个图/g, "").trim()

        }

       
        console.log(e.isMaster)
            if (kg2 == 0 & e.isGroup |  e.isMaster ) {
                if(kg2==1){
                    e.reply('你是主人，没有cd，欸嘿')
                }

                if(zr == 1 & !e.isMaster){
                    e.reply('对不起，你不可画哦')
                    return

                }




                let session_hash = Math.random().toString(sj1).substring(sj2);
                console.log('哈希哈希哈希哈希', session_hash)
                
                kg2 = 1

                    let data1 = gjc

                    var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
                if (reg.test(data1)) {
                    console.log('包含中文')

               //     let url = `https://api.sdgou.cc/api/fanyi/?msg=${data1}`;
                   // let response = await fetch(url);

                  //  let jieguo = await response.text();

                //   jieguo = jieguo.replace(/有道翻译查询结果/g, "").trim()
                  //      jieguo = jieguo.replace(/翻译后/g, "").trim()
                   //     jieguo = jieguo.replace(/翻译前/g, "").trim()
                   //     jieguo = jieguo.replace(/：/g, "").trim()
                    //    jieguo = jieguo.replace(new RegExp(data1, 'g'), "");
                  //  console.log(jieguo)
                 //   res4 = jieguo
				//	 let url3= ' http://www.iinside.cn:7001/api_req?reqmode=nmt_mt5_jez&password=3652&text='+ gjc +'&order=zh2en'
				 //  res4 = await fetch(url3)

                 //   res4 = await res4.json()
                //  res4 = res4.data
                 //   console.log(res4)
					

                        let url3 = 'https://api.66mz8.com/api/translation.php?info='+gjc
                        	res4 = await fetch(url3)

                        res4 = await res4.json()
                        	res4 = res4.fanyi
						
                        console.log(res4)
                } else {
                    console.log('是英文')
                    res4 = data1
                        console.log(res4)
						

                }
				e.reply('好的，我开始画图了，请稍等')

                if(e.msg.includes('#土块画图预设')  ){
                    name1 = e.msg.replace(/#土块画图预设/g, "").trim()
                     let jsonFile = ml + '/plugins/earth-k-plugin/resources/htys/ys.json'
                     await fs.readFile(jsonFile,(err,data)=>{
                        
                         //从json文件中读取，并转换为对象
                          ys = JSON.parse(data.toString()) //解析json文件数据为对象
                         
                       
                        let shuju = ys.shuju
                        console.log(shuju)
                        console.log(name1)
                        let n = shuju.findIndex(item => item.name == name1)
                       
                        res4 = shuju[n].gjc
                       

                        
                       
                         })
                 
         
                 }
                 await sleep(1000)
                    







                let i = Math.floor(Math.random() * 3);
                
                if(i == 0 ){
                    changdu = 512
                    kuandu = 768
                }
                if(i == 1 ){
                    changdu = 768
                    kuandu = 512
                }
                
                console.log(i)
                console.log(res4)
                


                var str = "abc";

                
                    var data = [
                        res4, pc, 'None', 'None', 20, "Euler a", false, false, 1, 1, 7, -1, -1, 0, 0, 0, false, changdu, kuandu, false, false, 0.7, 'None', false, false, null, '', "Seed", '', "Steps", '', true, false, null, '', ''
                    ]
                    var data2 = [
                        res4, pc, "None", "None", 28, "Euler a", false, false, 1, 1, 11, -1, -1, 0, 0, 0, false, 512, 512, false, false, 0.7, "None", false, false, null, "", "Seed", "", "Steps", "", true, false, null, '', ''
                    ]
                    
                    let url = dz

                    try {
                        res = await fetch(url, {
                        method: "post",
                        body: JSON.stringify({
                            data: data,
                            fn_index: 11,
                            session_hash: session_hash
                        }),
                        headers: {
                            'Content-Type': "application/json",
                            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'
                        }

                    })

                    res = await res.json();
					   
                    } catch (err) {
                        console.log('没有访问成功');
						kg= 0
						return
                    }

                   
                let res2 = res.data[0][0]

                    //data:image/png;base64,

                    res2 = res2.replace(/data:image/g, "").trim()
                    res2 = res2.replace(/png;base64,/g, "").trim()
                    res2 = res2.replace(/\//, "").trim()

                    // 	if(res.data[0] instanceof Array){
                    // 		console.log('base64646464',res.data[0][0])
                    // 	}
                    await fs.writeFile('./2.png', res2.toString(), 'base64', (err) =>  {
                        if (err) {
                            console.log('写入文件错误')
                        } else {
                            console.log('写入文件成功')
                           
                            
                           
                        }
                    })

                            msg2 = [segment.at(e.user_id),  segment.image(ml + '/2.png')]
                            await sleep(1000)
                            let msgRes = await e.reply(msg2)
                            iscd = 1
                            
                   
                            console.log(msgRes.message_id,isch)
                            if ( msgRes && msgRes.message_id && isch == 1 && e.isGroup){
                                let target = e.group;
                                setTimeout(() => {
                                    target.recallMsg(msgRes.message_id);
                                 }, timeout);
                              }

                              startTimeMS = (new Date()).getTime();

                              t =  setTimeout(() => {
                                kg2 = 0
                                iscd = 0
                             }, cd);


        
                            
                   







            } else if(iscd == 1) {
              
               let sysj = cd - ( (new Date()).getTime() - startTimeMS)
               sysj =  Math.round(sysj/1000)
                e.reply('我在cd中，还有'+String(sysj)+'秒可画')
            }else{
                e.reply('正在画图中，我知道你很急，但是你先别急。')
            }

    }

    async huatu(e) {
        let gjc = e.msg.replace(/#画图/g, "").trim()

            if (kg == 0 & e.isGroup) {
                console.log(zr)

              

                if(zr == 1 & !e.isMaster){
                    e.reply('对不起，你不可画哦')
                    return

                }
                kg = 1

                    let data1 = gjc

                    var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
                if (reg.test(data1)) {
                    console.log('包含中文')
                    let url3 = 'https://api.66mz8.com/api/translation.php?info=' + gjc
                        res5 = await fetch(url3)

                        res5 = await res5.json()
                        res5 = res5.fanyi
                        console.log(res5)
                } else {
                    console.log('是英文')
                    res5 = data1

                }

                let url4 = 'https://api.nya.la/ai/generate-image'
                    let i = Math.floor(Math.random() * 3067080848);
                e.reply('收到!,正在准备开始了')


                let response4 = await fetch(url4, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ing0djVwQ3dLZmR3WjdvTVNTTTd0NiIsIm5jIjoibnd5Rm9JR1ZLeldZT1RDd3BDTEVxIiwiaWF0IjoxNjY1MzgyNDc0LCJleHAiOjE2Njc5NzQ0NzR9.Ky5li8ZKtlTvPDMHkDxsB9Sl5RnzINcmX8sJl7_TlAs'
                    },
                    body: JSON.stringify(

                        //{"input":"masterpiece, best quality, loli","model":"safe-diffusion","parameters":{"width":512,"height":768,"scale":12,"sampler":"k_euler_ancestral","steps":28,"seed":2867080848,"n_samples":1,"ucPreset":0,"uc":"lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry"}}

                    {
                        "input": "masterpiece, best quality, " + res5,
                        "model": "safe-diffusion",
                        "parameters": {
                            "width": 512,
                            "height": 768,
                            "scale": 12,
                            "sampler": "k_euler_ancestral",
                            "steps": 28,
                            "seed": i,
                            "n_samples": 1,
                            "ucPreset": 0,
                            "uc": "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry"
                        }
                    })

                });

                let res4 = await response4.text();

                if (res4 == '{"error":"Too many requests currently processing, please try again later"}') {
                    e.reply('对面服务器很忙，等等')
                    kg = 0
                        return
                }

                //{"error":"请求太多了，稍等一会吧。"}
                if (res4 == '{"error":"请求太多了，稍等一会吧。"}') {
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
                  

                    await fs.writeFile('./1.jpg', res4.toString(), 'base64', (err) =>  {
                        if (err) {
                            console.log('写入文件错误')
                        } else {
                            console.log('写入文件成功')
                           
                            
                           
                        }
                    })

                            msg2 = [segment.at(e.user_id),  segment.image(ml + '/1.jpg')]
                            await sleep(1000)
                            let msgRes = await e.reply(msg2)
                            iscd = 1
                            
                   
                            console.log(msgRes.message_id,isch)
                            if ( msgRes && msgRes.message_id && isch == 1 && e.isGroup){
                                let target = e.group;
                                setTimeout(() => {
                                    target.recallMsg(msgRes.message_id);
                                 }, timeout);
                              }

                              startTimeMS = (new Date()).getTime();

                              t =  setTimeout(() => {
                                kg = 0
                                iscd = 0
                             }, cd);



            } else if(iscd == 1) {
              
                let sysj = cd - ( (new Date()).getTime() - startTimeMS)
                sysj =  Math.round(sysj/1000)
                 e.reply('我在cd中，还有'+String(sysj)+'秒可画')
             }else{
                 e.reply('正在画图中，我知道你很急，但是你先别急。')
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
