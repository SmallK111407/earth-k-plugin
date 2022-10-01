import {
    segment
}
from "oicq";
import fetch from "node-fetch";
import fs from "fs";
import puppeteer from "../../..//lib/puppeteer/puppeteer.js";
let data1 = {}
let ml = process.cwd()
let wj = []
let fen = []
let wjname = []
let ks = 0
let huihe = 0
 let daan =""
    export class genshinSpeak extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '土块原神角色语音',
            /** 功能描述 */
            dsc: '简单开发示例',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 4999,
            rule: [
                {
                    reg: "^#角色语音汇总$", //匹配消息正则，命令正则
                    /** 执行方法 */
                    fnc: 'zonlb'
                }, {
                    reg: "^#(.*)语音(.*)$", //匹配消息正则，命令正则
                    /** 执行方法 */
                    fnc: 'tingyy'
                }, {
                    reg: "^原神猜语$|#我猜(.*)|^重置分数|猜语音|#公布答案", //匹配消息正则，命令正则
                    /** 执行方法 */
                    fnc: 'cyy'
                }

            ]

        })
    }
	 async cyy(e) {
		 
		 if(e.msg =='重置分数'  ){
			  e.reply('猜语音分数已重置')
			 ks=0
			 wj = []
             fen = []
             wjname = []
		 }
		 
		 
		 if(e.msg =='#公布答案' & ks==1 ){
			  e.reply('答案为' + daan + '\n很遗憾没有人答对')
			 ks=0
		 }
		 
		 
		 if(e.msg =='原神猜语' & ks==1| e.msg=='猜语音' & ks==1 ){
			 e.reply('当前猜语音已开始，如果猜不出来可以发送#公布答案')
		 }
		 
		
		 if (wj.indexOf(e.user_id) == -1 & ks == 1) {
			wj[wj.length] = e.user_id
			fen[fen.length] = 0
			wjname[wjname.length] = e.member.card
			console.log(wjname[0])
		}
		
		 if(e.msg =='原神猜语'| e.msg=='猜语音' & ks==0 ){
			 
			 ks=1
			  const dir = './plugins/earth-k-plugin/resources/yy/name/';
		
        let name = "总列表"
            let filelist = ""
            let wenj2 = ""
            let n = 0
            // list all files in the directory
            try {
                const files = fs.readdirSync(dir);

                // files object contains all files names
                // log them on console
                files.forEach(file => {

                    wenj2 = wenj2 + file.replace(/.txt/g, "") + "," + ","

                        filelist = filelist + String(n) + "." + file + "\n"
                        n = n + 1
                });
                wenj2 = wenj2.split(",")
				wenj2 =wenj2.filter(n => n)

            } catch (err) {
                console.log(err);
            }
		 
		
		 
		 let i = Math.floor(Math.random()*48);
		 console.log(wenj2[i])
		 
		  let jsdz = ml + "/plugins/earth-k-plugin/resources/yy/" + "name/" + wenj2[i] + ".txt"
            let wb = ""

            let jieguo = fs.readFileSync(jsdz.toString(), 'utf-8')

            wb = jieguo.match(/src="https(\S*).mp3/g);
			
			 for (let a = 0; a < wb.length; a++) {
                wb[a] = wb[a].replace(/src="/g, "").trim();

            }
			
			
			 let z = Math.floor(Math.random()*wb.length);
			 console.log(z)
			
			let msg2 = await segment.record(wb[Number(z)])
            e.reply(msg2)
			daan = wenj2[i]
		 }
		
			if(e.msg.includes('#我猜') &ks==1){
				
				
				
				
				
				let caice = e.msg.replace(/#我猜/g, "").trim()
				
				if(caice=='绫华'|caice=='龟龟'){
					caice='神里绫华'
					
				}
				if(caice=='九条裟罗'){
					caice='九条'
					
				}
				if(caice=='雷电将军'|caice=='影'|caice=='煮饭婆'){
					caice='雷神'
					
				}
				if(caice=='火神'|caice=='倒霉蛋'|caice=='六星真神'){
					caice='班尼特'
					
				}
				if(caice=='卖唱的'|caice=='风神'|caice=='特瓦林'){
					caice='温迪'
					
				}
				if(caice=='落魄'|caice=='卢锅巴'){
					caice='迪卢克'
					
				}
				if(caice=='绫人'|caice=='大舅哥'){
					caice='神里绫人'
					
				}
				if(caice=='女仆'|caice=='高达'|caice=='人形高达'){
					caice='诺艾尔'
					
				}
				if(caice=='锅巴'){
					caice='香菱'
					
				}
				if(caice=='水神'){
					caice='行秋'
					
				}
				if(caice=='空'|caice=='荧'|caice=='派蒙'|caice=='海王'){
					caice='旅行者'
					
				}
				if(caice=='公子'|caice=='达达利鸭'|caice=='达达鸭'|caice=='玩具推销员'){
					caice='达达利亚'
					
				}
				if(caice=='猫猫'|caice=='dio'){
					caice='迪奥娜'
					
				}
				if(caice=='叶天帝'|caice=='天帝'){
					caice='万叶'
					
				}
				if(caice=='小天使'){
					caice='安柏'
					
				}
				if(caice=='神子'|caice=='八重'|caice=='八重寄子'|caice=='寄子'){
					caice='八重神子'
					
				}
				
				if(caice=='小姨'){
					caice='申鹤'
					
				}
				if(caice=='椰羊'|caice=='王小美'){
					caice='甘雨'
					
				}
				
				
				
				
				
				console.log(caice)
				console.log(daan)
				if(caice == daan){
					ks=0
					console.log('答对了')
					e.reply([segment.at(e.user_id), "恭喜你回答正确"])
					huihe = huihe + 1
					let	msg4=""
				for (let i = 0; i < wj.length; i++) {

				if (e.user_id == wj[i]) {
					fen[i] = fen[i] + 1
				}
			msg4 = '\n' + wjname[i] + '     ' + String(fen[i]) + '分' +  msg4
			}
			//e.reply(['当前分数为：\n' + msg4 +'\n当前为第'+String(huihe)+'回合\n共10回合']);
			
			
			data1 = {
                    tplFile: './plugins/earth-k-plugin/resources/yy/cyy.html',
                    dz: ml,
                    wjname: wjname,
                    fen: fen,
					huihe:huihe

                }
                let img = await puppeteer.screenshot("123", {
                    ...data1,
                });
                e.reply(img)
			
			
			
			if(huihe ==10){
			
			  
			  
			e.reply(['游戏结束\n，最终得分为：\n' + msg4 ]);
			wj = []
			fen = []
			wjname = []
			e.reply('分数已重置')
			huihe = 0
		
		 
		 }
		
			}
				}
				
	 
	 }

    async tingyy(e) {
		
		if(e.msg == "#猜语音"){
			e.reply('你干嘛哎哟，命令是猜语音，没有#，哼哼啊啊啊啊啊啊啊~。')
			return
		}
		
        let reg = /[\u4e00-\u9FA5]+/;
        let name = e.msg
            let name1 = name.replace(/语音/g, "").trim()
         
            let name2 = name1.replace(/#/g, "").trim()

           

            let name3 = String(name2).match(reg)
            let name4 = name3[0]
            let i = name2.replace(new RegExp(name3, 'g'), "");
			
       
       

        if (e.msg.includes("语音列表")) {
            name4 = name4.replace(/列表/g, "").trim()
              
        }

        //https://wiki.biligame.com/ys/%E5%8F%AF%E8%8E%89%E8%AF%AD%E9%9F%B3
        let jsdz = ml + "/plugins/earth-k-plugin/resources/yy/" + "name/" + name4 + ".txt"
            let wb = ""

            let jieguo = fs.readFileSync(jsdz.toString(), 'utf-8')

            wb = jieguo.match(/src="https(\S*).mp3/g);
        let liebiao = jieguo.match(/pre-wrap;">(\S*)</g);
        
            
            let liebiao2 = ""
            //'pre-wrap;">元素爆发·其一</p><',
            for (let b = 0; b < liebiao.length; b++) {
                liebiao[b] = liebiao[b].replace(/pre-wrap;"/g, "").trim();
                liebiao[b] = liebiao[b].replace(/\/p/g, "").trim();
                liebiao[b] = liebiao[b].replace(/\>/g, "").trim();
                liebiao[b] = liebiao[b].replace(/\</g, "").trim();
            }
           
            liebiao2 = liebiao2.split(",")
            for (let a = 0; a < wb.length; a++) {
                wb[a] = wb[a].replace(/src="/g, "").trim();

            }
            if (e.msg.includes("语音列表")) {

                data1 = {
                    tplFile: './plugins/earth-k-plugin/resources/yy/index.html',
                    dz: ml,
                    nr2: liebiao,
                    name: name4

                }
                let img = await puppeteer.screenshot("123", {
                    ...data1,
                });
                e.reply(img)

                return
            }
			 
			 let shuliang = liebiao.length/2
			 
			if(i==""){
				i = Math.floor(Math.random()*shuliang)
				
			}

            let msg2 = await segment.record(wb[Number(i - 1)])
			
            e.reply(liebiao[(i-1)*2])
			
			e.reply(msg2)
		

    }

    async zonlb(e) {
        const dir = './plugins/earth-k-plugin/resources/yy/name/';
        let name = "总列表"
            let filelist = ""
            let wenj2 = ""
            let n = 0
            // list all files in the directory
            try {
                const files = fs.readdirSync(dir);

                // files object contains all files names
                // log them on console
                files.forEach(file => {

                    wenj2 = wenj2 + file.replace(/.txt/g, "") + "," + ","

                        filelist = filelist + String(n) + "." + file + "\n"
                        n = n + 1
                });
                wenj2 = wenj2.split(",")

            } catch (err) {
                console.log(err);
            }
            name = "角色"
            data1 = {
            tplFile: './plugins/earth-k-plugin/resources/yy/index.html',
            dz: ml,
            nr2: wenj2,
            name: name
        }
        let img = await puppeteer.screenshot("123", {
            ...data1,
        });
        e.reply(img)

    }
    async liebiao(e) {
        let reg = /[\u4e00-\u9FA5]+/;
        let n = 1
            let filelist = ""
            let wenj2 = ""

            let name = e.msg.replace(/语音列表/g, "").trim()
            name = name.replace(/#/g, "").trim()
            console.log(name)
            const dir = './plugins/earth-k-plugin/resources/yy/角色/' + name + '/';

        // list all files in the directory
        try {
            const files = fs.readdirSync(dir);
            // files object contains all files names
            // log them on console
            files.forEach(file => {
                wenj2 = wenj2 + file.match(reg) + ","
                    filelist = filelist + String(n) + "." + file + "\n"
                    n = n + 1
            });
            wenj2 = wenj2.split(",")
        } catch (err) {
            console.log(err);
        }
        data1 = {
            tplFile: './plugins/earth-k-plugin/resources/yy/index.html',
            dz: ml,
            nr2: wenj2,
            name: name
        }
        let img = await puppeteer.screenshot("123", {
            ...data1,
        });
        e.reply(img)
    }
}
