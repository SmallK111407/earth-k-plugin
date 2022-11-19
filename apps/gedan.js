import fetch from 'node-fetch'
import { segment } from 'oicq'
import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import uploadRecord from '../../earth-k-plugin/model/uploadRecord.js'
import { core } from "oicq";
import fs from 'fs'
let ml = process.cwd()

let msg2 = ""
let kg = false
let wy = false
let qq = false
let zt = 0
let mid = []
let lb = "6"
let id = ""
let n = 0
export class gedan extends plugin {
	constructor() {
		super({
			name: '土块歌单',
			dsc: '土块歌单',
			event: 'message',
			priority: 1145,
			rule: [
				{
					reg: '^#我的歌单',
					fnc: 'wdgd'
				},{
                    reg: '^#顺序播放|#下一首|#上一首|#播歌单(.*)',
					fnc: 'sxbf'
                },{
                    reg: '^#新增歌单|#去除歌单',
					fnc: 'tjgd'
                }


			]
		})
	}

    async tjgd(e) {
        let mulu = ml+'/plugins/earth-k-plugin/resources/gd/'+String(e.user_id)+'.txt'
     

        
        fs.access(mulu.toString(), fs.constants.R_OK, (err) => { 
            if (err) {
            let mulu = ml+'/plugins/earth-k-plugin/resources/gd/'+String(e.user_id)+'.txt'
            fs.writeFileSync(mulu.toString(),'大鱼,起风了', 'utf-8');
          
        } else
              console.log(e.user_id.toString()+'跳过创建'); 
          
          }); 
          await sleep(500)

        let gd = fs.readFileSync(mulu.toString(),'utf-8')
        gd = gd.split(',')
        if(e.msg.includes('#去除歌单')){
            let g = e.msg.replace(/#去除歌单/g, "").trim()
            g = Number(g)
            console.log(g)
            let gq1 = gd[g-1]
            gd.splice(g-1,1)
            console.log(gd)
            
            fs.writeFile(mulu.toString(),gd.toString(),err=>{
           
            })
            e.reply('去除歌单'+gq1+'成功')
            return

        }
        let gq = e.msg.replace(/#新增歌单/g, "").trim()
        gd.push(gq)
      
        fs.writeFile(mulu.toString(),gd.toString(),err=>{
           
        })
        e.reply('新增歌单'+gq+'成功')






    }

	async wdgd(e) {
        let mulu = ml+'/plugins/earth-k-plugin/resources/gd/'+String(e.user_id)+'.txt'
     

        
fs.access(mulu.toString(), fs.constants.R_OK, (err) => { 
    if (err) {
    let mulu = ml+'/plugins/earth-k-plugin/resources/gd/'+String(e.user_id)+'.txt'
    fs.writeFileSync(mulu.toString(),'大鱼,起风了', 'utf-8');
  
} else
      console.log(e.user_id.toString()+'的歌曲日志已存在，跳过创建'); 
  
  }); 
  await sleep(500)


        let gd = fs.readFileSync(mulu.toString(),'utf-8')
        gd = gd.split(',')
        let msg = ""
        let xvhao= ""
        let zuozhe=""
        let song = ""
        
        
        for(let i=0;i<gd.length;i++){
            msg = msg + String(i+1)+ '.' + gd[i] + '\n'
            song = song + gd[i] + ","
            xvhao = xvhao + String(i + 1) + ","
            zuozhe = zuozhe + '鸡哥' + ","


        }
        msg = '你的歌单列表如下：\n' + msg
       
        let data1 = {}
				let ml2 = process.cwd()
				let bj = ""
				const min = 1;                            //最小值
				const max = 13;                            //最大值
				const range = max - min;                         //取值范围差
				const random = Math.random();                     //小于1的随机数
				const result = min + Math.round(random * range);  //最小数加随机数*范围差 

				

				bj = String(result)
        data1 = {
            tplFile: './plugins/earth-k-plugin/resources/html2/2.html',
            xvhao: xvhao,
            song: song,
            zuozhe: zuozhe,
            dz: ml2,
            bj: bj
        }

        let img = await puppeteer.screenshot("123", {
            ...data1,
        });
        e.reply(img)

		
}
async sxbf(e) {
    let mulu = ml+'/plugins/earth-k-plugin/resources/gd/'+String(e.user_id)+'.txt'
    if(e.msg == '#下一首'){
        n = n + 1
    }
    if(e.msg == '#上一首'){
        n = n - 1
        if(n<0){
            n=0
        }
    }
    if(e.msg.includes('#播歌单')){
        let i  = e.msg.replace(/#播歌单/g, "").trim()
        n = Number(i-1)
        console.log(23123)

    }
   

    if(e.msg == '#顺序播放'|e.msg == '#下一首'|e.msg == "#上一首"|e.msg.includes('#播歌单')){
        let gd = fs.readFileSync(mulu.toString(),'utf-8')
        gd = gd.split(',')
        if(n>gd.length-1){
            n=0

        }
        let geqv = gd[n]
        let url2 = 'http://110.41.21.181:3000/search?keywords='+geqv
        let res2 = await fetch(url2)
        let jieguo = await res2.json()
        jieguo = jieguo.result.songs[0].id
        console.log(jieguo)
       
        let url = 'http://music.163.com/song/media/outer/url?id=' + String(jieguo)
				
					
						
						let options = {
							method: 'POST',//post请求 
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded',
								'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; MI Build/SKQ1.211230.001)',
								'Cookie': 'versioncode=8008070; os=android; channel=xiaomi; ;appver=8.8.70; ' +"MUSIC_U=0030DEDA925049F41970C749F55456EE50A2AA8BBF2044560D80D6184B742F81EE1553F095E2BC104567EFA3938588A6BF43E09B7C9218C8D5141D29CFC2F2C9DF6689EEC8244F611A30B615CE64B00E7CF8000187F7ED6F3C059944BAEAD1D2208B75AB9BFEF09FF00DB93C1AD6371AEBE6CDB9FF631CA3796F40612C4D35B54B0E8813AA72E538BDF26409B2EB78AF9C49F780A2C16CA400F70FB3A49E1FD4AAD9780BF333AD8C92B966D5FBFAD0D8495EA91D3A2745AB87C7DD6C3BDF3B1449F3A113E0D283BEA49BED1E9D29971AF1794CE5D2AE938A6A43BD07BBF0FC6F0FFC87E30E9FF5CA055FF5C7CAA971106A27A2E57E885B6E3EB8CB56BDDCC60BF2B157CBB988B7D7774903E5E0DE2ED3DD6A994E2A354F1FA884BE0839ACAC7EA1A66480B8B9A691DCF4380C3DE1B8FCF62A82491D904CC8BFE4EC12A7026F342B7A1915BEF70AFC9401EA1EAD3A5E9C3F"
							},
							body: `ids=${JSON.stringify([String(jieguo)])}&level=standard&encodeType=mp3`
						};
						let response = await fetch('https://music.163.com/api/song/enhance/player/url/v1',options); //调用接口获取数据
						
						let res = await response.json(); //结果json字符串转对象
						
						if(res.code == 200){
							url = res.data[0]?.url;
							url = url ? url : '';
						}
					
				
				console.log(url)
				
				
				
				const music = await segment.record(url)
				let msg2 = await uploadRecord(url,0,false)
                e.reply( '当前歌曲：'+geqv)

                e.reply( msg2)





    }
   




}



}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
