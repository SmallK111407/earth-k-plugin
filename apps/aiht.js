import {
    segment
}
    from "oicq";
import fetch from "node-fetch";
import fs, { chownSync } from "fs";


import puppeteer from "../../../lib/puppeteer/puppeteer.js";
let data1 = {}
import {
    createRequire
}
    from 'module'
const require = createRequire(import.meta.url)

let ml = process.cwd()
var http = require('http');

let yushekg = 0
let kg = 0
let guimo = 5.5
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
let cd = 0
let t
let startTimeMS
let iscd = 0
let my
let dz
let sj1
let sj2
let shuju
let zt = 0
let gjc2
let sc = 0
let bushu = 28
let id = ""
let xsd = 0.4
let nr
let ycqx 
let jz = 0.2
let ss ="nai-diffusion"
let Path
let ys= []
let moxing = "k_euler"
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

            rule: [
                 {
                reg: "^#绘个图(.*)$|#土块画图预设(.*)$", //匹配消息正则，命令正则
                /** 执行方法 */
                fnc: 'huatu2'

            }, {
                reg: "^#取消画图$|^#所有人可画$|^#仅我可画$|^#土块画图撤回(.*)$|^#土块画图冷却(.*)$|^#土块画图涩涩开启|^#土块画图涩涩关闭", //匹配消息正则，命令正则
                /** 执行方法 */
                fnc: 'qvht'

            }, {
                reg: "^#新增屏蔽词(.*)$|#查看屏蔽词$|#删除屏蔽词$|#开启默认屏蔽词$", //匹配消息正则，命令正则
                /** 执行方法 */
                fnc: 'pbc',
            }, {
                reg: "^#以图生草(.*)$|(.*)", //匹配消息正则，命令正则
                /** 执行方法 */
                fnc: 'huatu3',
                log: false
            }, {
                reg: "^#查看所有预设$|#新增预设(.*)|(.*)", //匹配消息正则，命令正则
                /** 执行方法 */
                fnc: 'ysgn',
                log: false

            }, {
                reg: "^#土块画图规模(.*)", //匹配消息正则，命令正则
                /** 执行方法 */
                fnc: 'szgm'
            }, {
                reg: "^#土块画图模型(.*)|^#查看所有模型", //匹配消息正则，命令正则
                /** 执行方法 */
                fnc: 'szmx'
            }, {
                reg: "^#土块画图步数(.*)|^#查看画图设置", //匹配消息正则，命令正则
                /** 执行方法 */
                fnc: 'szbs'
            }

            ]

        })
    }


    async szbs(e) {
        if(e.msg == "#查看画图设置"){
            console.log(guimo)
            let msg  = ['模型：',moxing,'\n规模：',guimo.toString(),'\n步数：',bushu.toString(),'\n相似度：',xsd.toString(),'\n降噪：',jz.toString()]
            e.reply(msg)
            return
        }
        if(e.msg.includes('#土块画图步数')){
            bushu =  e.msg.replace(/#土块画图步数/g, "").trim()
        bushu = Number(bushu)
        if( bushu< 0 | bushu >28){
            e.reply('步数不在合理范围内，28以下为合理范围')
            return
        }else{
            e.reply('步数已设置为'+String(bushu))
        }

        }


        



    }

    async szmx(e) {
        if(e.msg == '#查看所有模型'){
            let msg = ["1：k_euler_ancestral,\n2：k_euler,\n3：k_lms,\n4：plms,\n5：ddim"]
            e.reply(msg)
            return
        }

        


        moxing =  e.msg.replace(/#土块画图模型/g, "").trim()
        moxing = Number( moxing)
        if( moxing< 0 |  moxing >5){
            e.reply('模型不在合理范围内，1-5为合理范围')
            return
        }
        if(moxing == 1){
            moxing = "k_euler_ancestral"
            e.reply('模型已设置为k_euler_ancestral')
        }
        if(moxing == 2){
            moxing = "k_euler"
            e.reply('模型已设置为k_euler')
        }
        if(moxing == 3){
            moxing = "k_lms"
            e.reply('模型已设置为k_lms')
        }
        if(moxing == 4){
            moxing = "plms"
            e.reply('模型已设置为plms')
        }
        if(moxing == 5){
            moxing = "ddim"
            e.reply('模型已设置为ddim')
        }


    }

    async szgm(e) {


        guimo =  e.msg.replace(/#土块画图规模/g, "").trim()
        guimo = Number(guimo)
        if(guimo< 3 | guimo >12){
            e.reply('规模不在合理范围内，3-12为合理范围')
            return
        }else{
            e.reply('规模已设置为'+String(guimo))
        }

    }

    async ysgn(e) {


        if(yushekg == 0 & e.msg.includes('#查看预设') == false & e.msg.includes('#新增预设') == false & e.msg.includes('#删除预设') == false){
            
            return false
        }
        let jsonFile = ml + '/plugins/earth-k-plugin/resources/htys/ys.json'
        let yushe1 = ""

        await fs.readFile(jsonFile, (err, data) => {
            

            if (err) throw err;
            //从json文件中读取，并转换为对象
            var yushe = data.toString() != "" ? JSON.parse(data.toString()) : [];//解析json文件数据为对象


            shuju = yushe


            for (let i = 0; i < shuju.shuju.length; i++) {
                yushe1 = yushe1 + shuju.shuju[i].name + ','

            }

        })
        
        
        


        await sleep(500)
       
        if (e.msg == "#查看预设"  & e.isMaster) {
            yushe1 = yushe1.split(',')
           
            data1 = {
                tplFile: './plugins/earth-k-plugin/resources/aiht/ml.html',
                dz: ml,
                lb: yushe1,
                qsid:0
     
            }
    
            let img = await puppeteer.screenshot("123", {
                ...data1,
            });
            e.reply(img)
            
            return

             



            e.reply('当前预设有：\n' + yushe1 )
        }

         if (e.msg.includes('#删除预设') & e.isMaster ) {
            let n = e.msg.replace(/#删除预设/g, "").trim()
            n = Number(n)
           
            if(n < shuju.shuju.length+1){
                
                shuju.shuju.splice(n-1, 1);
              
                var jsonStr = JSON.stringify(shuju);
             

            } 
           
    
              //然后再把数据写进去
              fs.writeFile(jsonFile, jsonStr, function(err) {
                if (err) {
                  console.error(err);
                }
                e.reply('删除预设成功')
              
              })
     
         }


        if (e.msg.includes('#新增预设') & e.isMaster & yushekg ==0) {
            
            yushekg = 1
             ys[0] = e.msg.replace(/#新增预设/g, "").trim()
             e.reply('请添加预设关键词')
             return
             }

             if(yushekg == 1 & e.isMaster){

                yushekg = 0
                ys[1] = e.msg
                let zjsj = { "name": ys[0], "gjc": ys[1] }
            shuju.shuju.push(zjsj)
           
            var jsonStr = JSON.stringify(shuju);

            fs.writeFile(jsonFile, jsonStr, (err) => {
                if (err) throw err;
                console.log("文件写入成功！");
                e.reply('新增预设成功')
            })
            return


             }

             
           
            
        
    }
    
    async pbc(e) {
        if (e.msg.includes('#新增屏蔽词') & e.isMaster) {
            e.reply('新增屏蔽词成功')
            pc = e.msg.replace(/#新增屏蔽词/g, "").trim()
        }
        if (e.msg == '#查看屏蔽词' & e.isMaster) {
            e.reply(['当前屏蔽词有：', pc])

        }
        if (e.msg.includes('#删除屏蔽词') & e.isMaster) {
            e.reply('删除屏蔽词成功' + '我知道你要干嘛！注意身体！')
            pc = ""
        }
        if (e.msg.includes('#开启默认屏蔽词') & e.isMaster) {
            e.reply('已经开启默认屏蔽词')
            pc = "lowres,nude, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, owres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry"
        }
    }
    async qvht(e) {
        if(e.msg =='#土块画图涩涩开启'  & e.isMaster){
            e.reply('好的，已开启，请注意身体哦')
             ss ="nai-diffusion"

        }
        if(e.msg =='#土块画图涩涩关闭'  & e.isMaster){
            e.reply('好的，已关闭了')
             ss ="safe-diffusion"

        }
        await dqpz()


        if (e.msg.includes('#土块画图冷却关闭') & e.isMaster) {
            nr[3] = 0
           
            nr[0] = 0
            fs.writeFileSync(Path,nr.toString(), 'utf-8');
            cd = 0
            kg2 =0
            kg = 0
            sc = 0
            iscd=0
            e.reply('已关闭画图冷却')
            return
        }
        if (e.msg.includes('#土块画图冷却开启') & e.isMaster) {
            nr[0] = 30000
            nr[3] = 1
            fs.writeFileSync(Path,nr.toString(), 'utf-8');
            

            cd = 30000
            e.reply('已开启画图冷却，冷却时间为30秒')
            return
        }
        if (e.msg.includes('#土块画图冷却') & e.isMaster) {
            

            let time = e.msg.replace(/#土块画图冷却/g, "").trim()
           
            cd = Number(time) * 1000
            nr[0] = cd
            nr[3] = 1
            fs.writeFileSync(Path,nr.toString(), 'utf-8');
            e.reply('已设置冷却时间为' + time + '秒')
        }
        if (e.msg.includes('#土块画图撤回关闭') & e.isMaster) {
            nr[2] = 0
            fs.writeFileSync(Path,nr.toString(), 'utf-8');
            isch = 0
            e.reply('已关闭画图撤回')
            return
        }
        if (e.msg.includes('#土块画图撤回开启') & e.isMaster) {
            isch = 1
            nr[1] = 30000
            nr[2] = 1
            fs.writeFileSync(Path,nr.toString(), 'utf-8');
            timeout = 30000
            e.reply('已开启画图撤回，撤回时间为30秒')
            return
        }
        if (e.msg.includes('#土块画图撤回') & e.isMaster) {
            isch = 1
            
            let time = e.msg.replace(/#土块画图撤回/g, "").trim()
           
            timeout = Number(time) * 1000
            nr[1] = timeout
            nr[2] = 1
            fs.writeFileSync(Path,nr.toString(), 'utf-8');
            e.reply('已设置撤回时间为' + time + '秒')
        }
        if (e.msg == '#取消画图') {
            kg = 0
			sc = 0
            zt =0
            id =""
            console.log('已经取消')

            kg2 = 0
            e.reply('已取消当前画图')
        }
        if (e.msg == '#所有人可画'  & e.isMaster) {
            e.reply('好吧，那就一起来吧！')
            zr = 0
        }
        if (e.msg == '#仅我可画'  & e.isMaster) {
            e.reply('好的，权限已经关闭，只有你能画了')
            zr = 1
        }
    }
    async huatu3(e) {
        
        





        if (e.img == undefined & e.msg != undefined) {
            if (e.msg.includes('#以图生草') == false & e.img == undefined & zt == 0) {
                return false
            }
        }

        if (e.img == undefined & zt == 1) {
            return false
        }

        if (e.img == undefined & e.msg != undefined) {
            dqpz()
            if(e.msg.includes('#以图生草相似度') & e.isMaster){
                xsd = Number(e.msg.replace(/#以图生草相似度/g, "").trim()) / 100
                e.reply('当前相似度'+ String( xsd))
                console.log(xsd)
                return
            }
            if(e.msg.includes('#以图生草降噪') & e.isMaster){
                jz = Number(e.msg.replace(/#以图生草降噪/g, "").trim()) / 100
                e.reply('当前降噪'+ String(jz))
                console.log(jz)
                return
            }
           
          
            if (zt == 0 && sc == 0 && e.msg.includes('#以图生草')) {
                if(e.isPrivate){
                    e.reply('以图生草暂不支持私聊')
                    return
                }

               

		    
		    


                console.log('以图生草')
                id = e.user_id


                gjc2 = e.msg.replace(/#以图生草/g, "").trim()
                var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");

                if (reg.test(gjc2)) {
                    console.log('包含中文')
                    let url = `https://api.sdgou.cc/api/fanyi/?msg=${gjc2}`;
                    let response = await fetch(url);

                    let jieguo = await response.text();

                    jieguo = jieguo.replace(/有道翻译查询结果/g, "").trim()
                    jieguo = jieguo.replace(/翻译后/g, "").trim()
                    jieguo = jieguo.replace(/翻译前/g, "").trim()
                    jieguo = jieguo.replace(/：/g, "").trim()
                    jieguo = jieguo.replace(new RegExp(gjc2, 'g'), "");

                    gjc2 = jieguo
                    console.log(gjc2)

                } else {
                    console.log('是英文')

                }
               
                zt = 1
                ycqx =   setTimeout(() => {
                  if(zt == 1){
                    zt = 0
                    e.reply('30秒还未发图，以图生草已取消')
                    return
                  }
                }, 30000);

               
                e.reply([segment.at(id), '请发送图片'])
                return
            }
        }
       
        if (sc == 0 & e.isGroup & zt == 1 & e.img != undefined ) {
            clearTimeout(ycqx)

            let jsonFilePath = ml + '/plugins/earth-k-plugin/resources/my/my.json'
        let yh 
        await fs.readFile(jsonFilePath, (err, data) => {

            //从json文件中读取，并转换为对象
            my = JSON.parse(data.toString()) //解析json文件数据为对象
            dz = my.miyao2
           
            yh = my.yh2
        })
        await sleep(500)
       



           
            if (e.user_id == id & zt == 1) {
                sc = 1
                let base64 = await imgUrlToBase64(e.img[0].replace(/https/g, "http").trim())
              
                //  let a = "data:image/jpeg;base64,"+base64.base64Img
                let a = base64.base64Img
                // let session_hash = Math.random().toString(36).substring(2);
                // console.log('哈希哈希哈希哈希', session_hash)
                
                let i = Math.floor(Math.random() * 3067080848);
                var data2 = {
                    "prompt": "masterpiece, best quality," + gjc2,
                    "width": 384,
                    "height": 512,
                    "scale": guimo,
                    "sampler": moxing,
                    "steps": 50,
                    "seed": i,
                    "n_samples": 1,
                    "strength":1-xsd,
                    "noise": jz,
                    "ucPreset": 0,
                    "image": a,
                    "uc": pc
                }
                e.reply('好的，我开始以图生草了')
                zt = 0

                try {
                    res = await fetch(dz, {
                        method: "post",
                        body: JSON.stringify(data2),
                        headers: {
                            'Content-Type': "application/json",
                            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'
                        }

                    })
                } catch (err) {
                    console.log(err)
                    console.log('没有访问成功');
                    kg = 0
                    return
                }
                let res2 = await res.text();
                // res2 = res2.replace(/data:image/g, "").trim()
                //   res2 = res2.replace(/png;base64,/g, "").trim()
                //  res2 = res2.replace(/\//, "").trim()
                res2 = res2.replace(/id: 1/g, "").trim()
                res2 = res2.replace(/event: newImage/g, "").trim()
                res2 = res2.replace(/data:/g, "").trim()

                if(res == '' ){
                    e.reply('我没画成功，再来一次吧。')
                    return
                }
                e.reply('成功了！')
                await fs.writeFile('./3.jpg', res2.toString(), 'base64', (err) => {
                    if (err) {
                        console.log('写入文件错误')
                    } else {
                        console.log('写入文件成功')
                    }
                })
                msg2 = [segment.at(e.user_id), segment.image(ml + '/3.jpg')]
                await sleep(500)
                let msgRes = await e.reply(msg2)
               
                iscd = 1
    
    
                console.log(msgRes.message_id, isch)
                if (msgRes && msgRes.message_id && isch == 1 && e.isGroup) {
                    let target = e.group;
                    setTimeout(() => {
                        target.recallMsg(msgRes.message_id);
                    }, timeout);
                }
    
                startTimeMS = (new Date()).getTime();
    
                t = setTimeout(() => {
                    iscd = 0
                    sc = 0
                    id = ""
                }, cd);

                







               
            }
        } else if (e.img == undefined & e.msg != undefined) {


            if (e.msg.includes('#以图生草')) {
                if (iscd == 1) {
                    console.log(iscd)

                    let sysj = cd - ((new Date()).getTime() - startTimeMS)
                    sysj = Math.round(sysj / 1000)
                    if(sysj < 0){
                       sc = 0
		       id = ""
                        return
                    }
                    e.reply('我在cd中，还有' + String(sysj) + '秒可画')
                } else {
                    e.reply('正在生草中，我知道你很急，先别急')
                }
            }
        }

    }
    async huatu2(e) {
        dqpz()
        let jsonFilePath = ml + '/plugins/earth-k-plugin/resources/my/my.json'
        let yh 
        let dz2
        let yh2
        await fs.readFile(jsonFilePath, (err, data) => {

            //从json文件中读取，并转换为对象
            my = JSON.parse(data.toString()) //解析json文件数据为对象
            dz = my.miyao
            sj1 = my.sj1
            sj2 = my.sj2
            yh = my.yh
            dz2 = my.miyao2
            yh2 = my.yh2
        })
        await sleep(500)
        if (dz == '') {
            e.reply('你还不可以用该功能哦')
            return
        }

        if (e.msg.includes('#土块画图预设')  & !e.isMaster) {
            e.reply('你不是主人，不能用预设哦')
            return
        }
        
        let ys
        let name1
        let gjc
        if (e.msg.includes('#土块画图预设') == false) {
            gjc = e.msg.replace(/#绘个图/g, "").trim()
        }
       
        if (kg2 == 0 & e.isGroup | e.isMaster) {
            if (kg2 == 1) {
                e.reply('你是主人，没有cd，欸嘿')
            }

            if (zr == 1 & !e.isMaster) {
                e.reply('对不起，你不可画哦')
                return
            }
        //   let session_hash = Math.random().toString(sj1).substring(sj2);
         //   console.log('哈希哈希哈希哈希', session_hash)
            kg2 = 1
            let data1 = gjc
            var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
            if (reg.test(data1)) {
                console.log('包含中文')

                 let url = `https://api.sdgou.cc/api/fanyi/?msg=${data1}`;
             let response = await fetch(url);

                 let jieguo = await response.text();

                  jieguo = jieguo.replace(/有道翻译查询结果/g, "").trim()
                     jieguo = jieguo.replace(/翻译后/g, "").trim()
                 jieguo = jieguo.replace(/翻译前/g, "").trim()
                    jieguo = jieguo.replace(/：/g, "").trim()
                   jieguo = jieguo.replace(new RegExp(data1, 'g'), "");
             
               res4 = jieguo
               if(res4 == ''){
                let url3= ' http://www.iinside.cn:7001/api_req?reqmode=nmt_mt5_jez&password=3652&text='+ gjc +'&order=zh2en'
                res4 = await fetch(url3)

              res4 = await res4.json()
                 res4 = res4.data
               }
            	
                   
                   if(res4 == ''){
                    let url3 = 'https://api.66mz8.com/api/translation.php?info=' + gjc
                    res4 = await fetch(url3)
                    res4 = await res4.json()
                    res4 = res4.fanyi

                   }
               
                console.log(res4)
            } else {
                console.log('是英文')
                res4 = data1
               
            }
            let n
            let shuju
            if (e.msg.includes('#土块画图预设')  & e.isMaster) {
                name1 = e.msg.replace(/#土块画图预设/g, "").trim()
                let jsonFile = ml + '/plugins/earth-k-plugin/resources/htys/ys.json'
                await fs.readFile(jsonFile, (err, data) => {

                    //从json文件中读取，并转换为对象
                    ys = JSON.parse(data.toString()) //解析json文件数据为对象
                    shuju = ys.shuju
                    var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
            if (reg.test(name1)) {
                console.log('预设包含中文')
                n = shuju.findIndex(item => item.name == name1)

            }else{
                n = Number(name1)-1
                if(n > shuju.length){
                    n=-1
                    return

                }
              
            }
                
                
                  
                   
                })
                await sleep(500)
                console.log(n)

                if (n != -1){
                   
                    res4 = shuju[n].gjc
                    
    
                }else{
                    e.reply('没有这个预设哦')
                 
    
                    return 
                }



            }
           
            await sleep(500)
            e.reply('好的，我开始画图了，请稍等哦')
            let i = Math.floor(Math.random() * 2);
            if (i == 0) {
                changdu = 512
                kuandu = 768
            }
            if (i == 1) {
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
          //  let url = dz
        //    try {
          //      res = await fetch(url, {
           //         method: "post",
           //         body: JSON.stringify({
            //            data: data,
            //            fn_index: 11,
            //            session_hash: session_hash
            //        }),
             //       headers: {
             //           'Content-Type': "application/json",
             //           'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'
               //     }

            //    })
             //   res = await res.json();
         //   } catch (err) {
        //        console.log('没有访问成功');
        //        kg = 0
        //        return
       //     }

            let url4 = dz
            let i2 = Math.floor(Math.random() * 3067080848);
           
            try {
                res = await fetch(url4, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization':  yh
                    },
                    body: JSON.stringify(

                        //{"input":"masterpiece, best quality, loli","model":"safe-diffusion","parameters":{"width":512,"height":768,"scale":12,"sampler":"k_euler_ancestral","steps":28,"seed":2867080848,"n_samples":1,"ucPreset":0,"uc":"lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry"}}

                        {
                            "input": "masterpiece, best quality, " + res4,
                            "model": ss,
                            "parameters": {
                                "width": kuandu,
                                "height": changdu,
                                "scale": guimo,
                                "sampler": moxing,
                                "steps": bushu,
                                "seed": i2,
                                "n_samples": 1,
                                "ucPreset": 0,
                                "uc": pc
                            }
                        })

                });
                console.log('访问成功了')
              
            } catch (err) {
                console.log(err)
                console.log('没有访问成功,尝试换接口');
                url4 = dz2
                let i4 = Math.floor(Math.random() * 2);
                if (i4 == 0) {
                    changdu = 512
                    kuandu = 384
                }
                if (i4 == 1) {
                    changdu = 384
                    kuandu = 512
                }
                console.log(i4)
            
                try {
                    res = await fetch(url4, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization':  yh2
                        },
                        body: JSON.stringify(
    
                            //{"input":"masterpiece, best quality, loli","model":"safe-diffusion","parameters":{"width":512,"height":768,"scale":12,"sampler":"k_euler_ancestral","steps":28,"seed":2867080848,"n_samples":1,"ucPreset":0,"uc":"lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry"}}
    
                        {"prompt":"masterpiece, best quality,"+res4,"width":kuandu,"height":changdu,"scale":guimo,"sampler":moxing,
                        "steps":20,"seed":i2,"n_samples":1,"ucPreset":0,"uc":"lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry"})
    
                    });
                  
                } catch (err) {
                    console.log(err)
                    e.reply('没有访问成功哦')
                    kg2 = 0
                    return
                }
                


            
                
            }






          //  let res2 = res.data[0][0]
            //data:image/png;base64,
          //  res2 = res2.replace(/data:image/g, "").trim()
           // res2 = res2.replace(/png;base64,/g, "").trim()
          //  res2 = res2.replace(/\//, "").trim()
          
            res = await res.text();
          
            if(res == '{"error":"unknown error"}'){
                console.log('没有访问成功,尝试换接口');
               url4 = dz2
            
                try {
                    res = await fetch(url4, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization':  yh2
                        },
                        body: JSON.stringify(
    
                            //{"input":"masterpiece, best quality, loli","model":"safe-diffusion","parameters":{"width":512,"height":768,"scale":12,"sampler":"k_euler_ancestral","steps":28,"seed":2867080848,"n_samples":1,"ucPreset":0,"uc":"lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry"}}
    
                        {"prompt":"masterpiece, best quality,"+res4,"width":kuandu,"height":changdu,"scale":guimo,"sampler":"k_euler_ancestral",
                        "steps":20,"seed":i2,"n_samples":1,"ucPreset":0,"uc":"lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry"})
    
                    });
                  
                } catch (err) {
                    console.log(err)
                    e.reply('没有访问成功哦')
                    kg2 = 0
                    return
                }
                return
            }

            if(!res.includes('event: newImage')){
                e.reply('我没画成功，再来一次吧。')
                kg2 =0
                return
            }
           


            res = res.replace(/id: 1/g, "").trim()
            res = res.replace(/event: newImage/g, "").trim()
            res= res.replace(/data:/g, "").trim()
            if(res == '' ){
                e.reply('我没画成功，再来一次吧。')
                kg2 =0
                return
            }


            e.reply('成功了！')

            // 	if(res.data[0] instanceof Array){
            // 		console.log('base64646464',res.data[0][0])
            // 	}
            await fs.writeFile('./2.png', res.toString(), 'base64', (err) => {
                if (err) {
                    console.log('写入文件错误')
                } else {
                    console.log('写入文件成功')

                }
            })

            msg2 = [segment.at(e.user_id), segment.image(ml + '/2.png')]
            await sleep(500)
            let msgRes = await e.reply(msg2)
            iscd = 1


            console.log(msgRes.message_id, isch)
            if (msgRes && msgRes.message_id && isch == 1  && e.isGroup) {
                let target = e.group;
                setTimeout(() => {
                    target.recallMsg(msgRes.message_id);
                }, timeout);
            }

            startTimeMS = (new Date()).getTime();

            t = setTimeout(() => {
                kg2 = 0
                iscd = 0
            }, cd);
        } else if (iscd == 1) {

            let sysj = cd - ((new Date()).getTime() - startTimeMS)
            sysj = Math.round(sysj / 1000)
            if(sysj < 0){
                kg2 = 0
                return
            }
            e.reply('我在cd中，还有' + String(sysj) + '秒可画')
        } else {
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

async function dqpz(){
     Path = ml + '/plugins/earth-k-plugin/resources/pz/pz.txt'
      
        await fs.readFile(Path, (err, data) => {
            nr = data.toString()
            nr = nr.split(',')
            cd = nr[0]
            timeout = nr[1]
            isch = nr[2]
            iscd = nr[3]
            
            console.log(cd,timeout,isch,iscd)
                     
        })
        await sleep(500)
}
