import fetch from "node-fetch";
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import fs from "fs";
let jg
let ml = process.cwd();
let ym = 1
let name = ""
export class xgn extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: 'b站视频',
            /** 功能描述 */
            dsc: 'b站视频',
            event: 'message',
            /** 优先级,数字越小等级越高 */
            priority: 1145,
            rule: [{
                reg: 'https://www.bilibili.com(.*)|https://b23.tv(.*)',
                fnc: 'bzjx'
            }, {
                reg: '#点(b|哔)站视频(.*)|#(b|哔)站下一页|#(b|哔)站上一页',
                fnc: 'dbzsp'
            }, {
                reg: '#看(b|哔)站视频(.*)',
                fnc: 'kbzsp'
            }
            ]

        })
       
    }
    async kbzsp(e) {
        let id = e.msg.replace(/#看(b|哔)站视频/, "").trim()
        e.reply('正在解析中，请稍等片刻')
        id = Number(id)
        let bvid = jg[id - 1].bvid
        let url3 = `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`;
        let response3 = await fetch(url3);
        let res4 = await response3.json();
        let avid = res4.data.aid
        let cid = res4.data.cid
        url3 = `https://api.bilibili.com/x/player/playurl?avid=${avid}&cid=${cid}&qn=16&type=mp4&platform=html5`
        response3 = await fetch(url3);
        res4 = await response3.json();
        url3 = res4.data.durl[0].url
        let adsj1 = await fetch(url3, {
            headers: {

                'referer': 'https://www.bilibili.com/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'
            }
        })
        adsj1 = await adsj1.buffer()
        fs.writeFileSync('./resources/v.mp4', adsj1)
        await sleep(1000)
        let msg6 = segment.video('./resources/v.mp4')
        e.reply(msg6)

    }
    async dbzsp(e) {
        if (e.msg == '#b站下一页') {
            ym = ym + 1
        } else if (e.msg == '#b站上一页' & ym != 1) {
            ym = ym - 1
        } else {
            ym = 1
            name = e.msg.replace(/#点(b|哔)站视频/, "").trim()
        }
        e.reply('好的，正在搜索')
        let url = `https://api.bilibili.com/x/web-interface/wbi/search/type?__refresh__=true&_extra=&context=&page=${ym}&page_size=42&from_source=&from_spmid=333.337&platform=pc&highlight=1&single_column=0&keyword=${encodeURI(name)}&qv_id=ZINfg344aj8e6MOSKXaaIcBPyKJsU07m&ad_resource=5654&source_tag=3&gaia_vtoken=&category_id=&search_type=video&dynamic_offset=36&w_rid=57354046d4011cae09e94c624e9dc9ba&wts=1678541433`
        let res = await fetch(url, {
            headers: {
                'host': 'api.bilibili.com',
                'referer': 'https://www.bilibili.com/',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36 Edg/110.0.1587.69',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
                'cache-control': 'max-age=0',
                'cookie': 'buvid3=6829F39D-B4B1-FDCD-DFC0-34E341EFBA4E64841infoc; b_nut=1677304264; i-wanna-go-back=-1; b_ut=7; _uuid=6F4F105A1-2445-DB2E-17AB-8D52C3F4BBDB67317infoc; buvid_fp=3a11e8757b0856fc15101db31864f7ee; home_feed_column=5; buvid4=D03D8B5C-16EB-315C-AA4A-40C00B6C974E65920-023022513-KgCR0q7P7AkYpmrkRcxcKQ%3D%3D; nostalgia_conf=-1; CURRENT_FNVAL=4048; rpdid=|(RYJ|mYmul0J'

            }
        })
        res = await res.json()
        jg = res.data.result
        for (let i = 0; i < jg.length; i++) {
            jg[i].title = jg[i].title.replace(/<em class="keyword">/g, "").trim()
            jg[i].title = jg[i].title.replace(/<\/em>/g, "").trim()
        }
        let data1 = {
            tplFile: './plugins/earth-k-plugin/resources/html/WatchVideo/WatchVideo2.html',
            dz: ml,
            nr2: jg
        }
        let img = await puppeteer.screenshot("123", {
            ...data1,
        });
        e.reply(img)
    }
    async bzjx(e) {
        let bvid = ''
        let bvid1 = e.msg

        let cs = bvid1.indexOf('BV')
        console.log(cs)





        if(cs != -1){
            e.reply('正在解析b站视频，请稍等')
        }else{
            let cs2 = bvid1.indexOf('tv/')
            let id = bvid1.substring(cs2+3, cs2+10)
            
            //https://b23.tv/IbOEi0K
            let url = 'https://b23.tv/'+id
            let res = await fetch(url)

           
            bvid1 = res.url

           cs = bvid1.indexOf('BV')
          
            if(cs == -1){
                e.reply('解析失败')
                return
            }
         



           // 
           
        }
      
        bvid = bvid1.substring(cs, cs+12);
        console.log(bvid)
   
       
       


        let url3 = `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`;
        let response3 = await fetch(url3);
        
        let res4 = await response3.json();

        let img = res4.data.pic
        let bt = res4.data.title
        let zz = res4.data.owner.name
        let jj = res4.data.desc
        let dz = res4.data.stat.like
        let sc = res4.data.stat.favorite
        let tb = res4.data.stat.coin
        let zf = res4.data.stat.share
        console.log(img,bt,zz,jj)
        let msg = [segment.image(img),'标题:',bt+'\n','简介:',jj+'\n','作者:',zz+'\n',`\n点赞:${dz}      收藏:${sc}  \n投币:${tb}      转发:${zf}`,'正在解析b站视频，请稍等']
        
        e.reply(msg)

        
    
        let avid = res4.data.aid
        let cid = res4.data.cid
        
        url3 = `https://api.bilibili.com/x/player/playurl?avid=${avid}&cid=${cid}&qn=16&type=mp4&platform=html5`
        response3 = await fetch(url3);
        res4 = await response3.json();
        url3 = res4.data.durl[0].url

        

        let adsj1 = await fetch(url3, {
            headers: {

                'referer': 'https://www.bilibili.com/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'
            }
        })
        
        adsj1 = await adsj1.buffer()

        fs.writeFileSync('./resources/v.mp4', adsj1)

       await sleep(1000)
       let msg6 = segment.video('./resources/v.mp4')
       e.reply(msg6)
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}