import fetch, { File, FormData } from 'node-fetch'
import fs from "fs"
import _ from 'lodash'
import {
    createRequire
}
    from 'module'
const require = createRequire(import.meta.url)
var http = require('http');
let ml = process.cwd()
let args
let kg = 1

export class dailyNoteByWidget extends plugin {
    constructor(e) {
        super({
            name: '土块表情包',
            dsc: '土块表情包',
            event: 'message',
            priority: 1145,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: '(.*)$',
                    /** 执行方法 */
                    fnc: 'ce',
                    log: false
                }
            ]
        })
    }
    async ce(e) {
        
       
        if(e.msg == undefined){
            return false
        }

        if(e.msg == '#表情包开启'){
            kg = 1
            e.reply('表情包功能已开启')

        }
        if(e.msg == '#表情包关闭'){
            kg = 0
            e.reply('表情包功能已关闭')

        }
        if(kg == 0){
            return false
        }

        if (e.msg == '#表情包列表') {
            
           
            let res2 = fs.readFileSync(ml + '/plugins/earth-k-plugin/resources/bqlb.json')
            res2 = await JSON.parse(res2);
            let url = 'http://124.70.4.227:8085/memes/render_list'
            let response4 = await fetch(url, {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer'
                },
                body: JSON.stringify(res2)

            });

            const resultBlob = await response4.blob()
            const resultArrayBuffer = await resultBlob.arrayBuffer()
            const resultBuffer = Buffer.from(resultArrayBuffer)
            let resultFileLoc = './data/render_list1.jpg'
            fs.writeFileSync(resultFileLoc, resultBuffer)
            await e.reply(segment.image(resultFileLoc))
          
            return


        }

        let res
        try{
            res = fs.readFileSync(ml + '/plugins/earth-k-plugin/resources/bq.json')
            res= await JSON.parse(res);
        }catch{

        }
      

        let keyword = e.msg
        let nr = keyword.split(' ')
       
        keyword = nr[0]

        // 遍历jsonObj的键
        Object.values(res).forEach(async item => {
            // 检查当前项的keywords是否包含目标关键词
            if (item.keywords.includes(keyword)) {
                // 输出对应的key和params
              
                let msg = `该表情至少需要${item.params.min_images}张图片,${item.params.min_texts}个文字描述`
                let url = `http://124.70.4.227:8085/memes/${item.key}/`
                let formData = new FormData()

                let reply;
                let imgUrl
                if (e.source) {
                    if (e.isGroup) {
                        reply = (await e.group.getChatHistory(e.source.seq, 1)).pop()?.message;
                    } else {
                        reply = (await e.friend.getChatHistory(e.source.time, 1)).pop()
                            ?.message;
                    }
                    if (reply) {
                        for (let val of reply) {
                            if (val.type == "image") {
                                e.img = [val.url];
                                break;
                            }
                        }
                    }
                }
                let base64


                if (!e.img) {
                    if (!e.img) {
                        let user_id2 = e.at

                        imgUrl = 'http://q2.qlogo.cn/headimg_dl?dst_uin=' + user_id2 + '&spec=5'

                    }
                } else {

                    imgUrl = e.img[0]
                }
                
                const imageResponse = await fetch(imgUrl)
                const fileType = imageResponse.headers.get('Content-Type').split('/')[1]
                const blob = await imageResponse.blob()
                const arrayBuffer = await blob.arrayBuffer()
                const buffer = Buffer.from(arrayBuffer)
                await fs.writeFileSync('./data/render1.jpg', buffer)
                let user_id2 = e.at
                let name = await Bot.pickMember(e.group_id, user_id2).card
               
                if (item.params.min_images == 2) {
                    let  imgUrl = 'http://q2.qlogo.cn/headimg_dl?dst_uin=' + e.user_id + '&spec=5'
                    const imageResponse = await fetch(imgUrl)
                    const fileType = imageResponse.headers.get('Content-Type').split('/')[1]
                    const blob = await imageResponse.blob()
                    const arrayBuffer = await blob.arrayBuffer()
                    const buffer2 = Buffer.from(arrayBuffer)
                    await fs.writeFileSync('./data/render2.jpg', buffer)


                    formData.append('images', new File([buffer2], `avatar_${2}.jpg`, { type: 'image/jpeg' }))
                }
                if(item.params.min_images !=0){
                    formData.append('images', new File([buffer], `avatar_${1}.jpg`, { type: 'image/jpeg' }))
                }
                

                if(item.params.min_texts != 0){
                   
                    for(let i=0;i<nr.length-1;i++){
                        formData.append('texts', nr[i+1])

                    }
                }
                args = handleArgs(item.key, '', [{ text: name, gender: 'unknown' }])
                if (args) {
                    formData.set('args', args)
                }
                await sleep(1000)

            

                let response = await fetch(url, {
                    method: 'POST',
                    body: formData
                    // headers: {
                    // 'Content-Type': 'multipart/form-data'
                    // }
                })
                // console.log(response.status)
                if (response.status > 299) {
                

                    await e.reply(msg, true)
                    return false
                }
                const resultBlob = await response.blob()
                const resultArrayBuffer = await resultBlob.arrayBuffer()
                const resultBuffer = Buffer.from(resultArrayBuffer)
                let resultFileLoc = './data/1.jpg'
                fs.writeFileSync(resultFileLoc, resultBuffer)
                await e.reply(segment.image(resultFileLoc))
             
                return false



            }
        });
        return false


    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


function handleArgs(key, args, userInfos) {
    if (!args) {
        args = ''
    }
    let argsObj = {}
    switch (key) {
        case 'look_flat': {
            argsObj = { ratio: parseInt(args || '2') }
            break
        }
        case 'crawl': {
            argsObj = { number: parseInt(args) ? parseInt(args) : _.random(1, 92, false) }
            break
        }
        case 'symmetric': {
            let directionMap = {
                左: 'left',
                右: 'right',
                上: 'top',
                下: 'bottom'
            }
            argsObj = { direction: directionMap[args.trim()] || 'left' }
            break
        }
        case 'petpet':
        case 'jiji_king':
        case 'kirby_hammer': {
            argsObj = { circle: args.startsWith('圆') }
            break
        }
        case 'my_friend': {
            if (!args) {
                args = _.trim(userInfos[0].text, '@')
            }
            argsObj = { name: args }
            break
        }
        case 'looklook': {
            argsObj = { mirror: args === '翻转' }
            break
        }
        case 'always': {
            let modeMap = {
                '': 'normal',
                循环: 'loop',
                套娃: 'circle'
            }
            argsObj = { mode: modeMap[args] || 'normal' }
            break
        }
        case 'gun':
        case 'bubble_tea': {
            let directionMap = {
                左: 'left',
                右: 'right',
                两边: 'both'
            }
            argsObj = { position: directionMap[args.trim()] || 'right' }
            break
        }
    }
    argsObj.user_infos = userInfos.map(u => {
        return {
            name: _.trim(u.text, '@'),
            gender: u.gender
        }
    })
    return JSON.stringify(argsObj)
}

