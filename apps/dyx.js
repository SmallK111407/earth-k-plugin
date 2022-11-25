import {
    segment
}
    from "oicq";
import fetch from "node-fetch";
import fs from "fs";
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
let data1 = {}
let ml = process.cwd()
let lb =[]
let tpj =[]
let yema = 1
export class dyx extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '土块点游戏',
            /** 功能描述 */
            dsc: '简单开发示例',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1145,
            rule: [{
                reg: "^#点游戏$|#玩游戏(.*)$|#下一页游戏|#上一页游戏", //匹配消息正则，命令正则
                /** 执行方法 */
                fnc: 'youxi'
            }

            ]

        })
    }

    async youxi(e) {

        if(e.msg == '#下一页游戏' & yema*30 < 100){
            yema = yema +1
        }
        
        if( e.msg == '#下一页游戏' & yema*30 >100){
            e.reply('没有下一页游戏了')
            return
        }
        if(e.msg == '#上一页游戏' & yema == 1){
            e.reply('没有上一页游戏了')
            return
            
        }

        if(e.msg == '#上一页游戏' & yema != 1){
            yema = yema -1
            
        }
       

      
        



        if(e.msg == '#点游戏' | e.msg == '#下一页游戏' | e.msg =='#上一页游戏'){
           
            let url = 'https://code.haiyong.site/moyu/'
        console.log('点游戏')
        let res = await fetch(url)
        let response = await res.text()
        
        //<a href="(.*?)"><
        lb = response.match(/<a href="(.*?)"></g);
       
        tpj = response.match(/src="(.*?)" class/g);



        for (let n = 0; n < lb.length; n++) {
            lb[n] = lb[n].replace(/<a href="/g, "").trim();
            lb[n] = lb[n].replace(/"></g, "").trim();
            lb[n] = lb[n].replace(/ alt/g, "").trim();

        }
        for (let n = 0; n < tpj.length; n++) {
            tpj[n] = tpj[n].replace(/src="/g, "").trim();
            tpj[n] = tpj[n].replace(/" class/g, "").trim();
           
           
		   
            tpj[n] = 'https://code.haiyong.site/moyu/'+tpj[n]
           

        }
        tpj =tpj.filter(value => Object.keys(value) != 'https://code.haiyong.site/moyu/img/.png')
        lb =lb.filter(value => Object.keys(value) != '')
        


     
     
        lb.splice(0,1)
        tpj.splice(0,1)
        
       
        data1 = {
            tplFile: './plugins/earth-k-plugin/resources/yx/dyx.html',
            dz: ml,
            lb: lb.slice(yema*30-30,yema*30),
            tp: tpj.slice(yema*30-30,yema*30)

        }
        let img = await puppeteer.screenshot("123", {
            ...data1,
        });
        e.reply(img)

        }

        if(e.msg.includes('#玩游戏')){
            let id  =e.msg.replace(/#玩游戏/g,"").trim()
            id = Number(id)
            
            let tp = segment.image(tpj[yema*30-30+ id-1])
            e.reply([tp,lb[yema*30-30 + id-1]])
        }

    }

}
