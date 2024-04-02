import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import fetch from "node-fetch";
import fs from "fs";

let ks = 0
let data1 = {}
let ml = process.cwd()
let user_id2 = ""

let ks2 = 0
let ren = []
let renmin = []
export class MarryGroupFriends extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '[土块插件]娶群友',
            /** 功能描述 */
            dsc: '',
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1145,
            rule: [

                {
                    reg: '^娶群友|闹离婚$|^强娶(.*)|^我对象呢|^抢群友(.*)',
                    fnc: 'jrlp'
                }, {
                    reg: '^#群对象列表',
                    fnc: 'dxlb'
                }

            ]

        })
    }

    async dxlb(e) {

        data1 = {
            tplFile: './plugins/earth-k-plugin/resources/html/Marry/Marry.html',
            dz: ml,
            rm: renmin,
            rmqq: ren

        }

        let img = await puppeteer.screenshot("123", {
            ...data1,
        });
        e.reply(img)


    }

    async jrlp(e) {
        if (e.msg.includes('抢群友')) {
            let user_id2 = e.at
            let name = e.bot.pickMember(e.group_id, user_id2).card



            if (user_id2 == undefined) {
                e.reply('你到底想抢谁？抢空气吗？')
                return
            }

            let i1 = ren.findIndex(item => item.man == e.user_id) + 1
            let i2 = ren.findIndex(item => item.woman == e.user_id) + 1
            let i3 = ren.findIndex(item => item.man == user_id2) + 1
            let i4 = ren.findIndex(item => item.woman == user_id2) + 1

            if (i1 > 0 | i2 > 0) {
                e.reply('你都已经有对象了，还想抢呢？搞啥呢这是，三妻四妾是吧？爬！')
                return

            }
            if (i3 + i4 == 0) {
                e.reply('她还没有对象呢，你直接强娶就好了呀')
                return

            }


            let gailv = Math.floor(Math.random() * 100);

            if (gailv < 70) {
                e.reply('没抢着呢，欸嘿')
                return
            }
            if (i3 > 0) {
                ren.splice(i3 - 1, 1)
                renmin.splice(i3 - 1, 1)

            }
            if (i4 > 0) {
                ren.splice(i4 - 1, 1)
                renmin.splice(i4 - 1, 1)

            }

            let dx = { "man": e.user_id, "woman": user_id2 }
            let lm = { "man": e.member.card, "woman": name }
            ren.push(dx)
            renmin.push(lm)

            let a = 'http://q2.qlogo.cn/headimg_dl?dst_uin=' + user_id2 + '&spec=5'
            let msg = [segment.at(e.user_id), '\n你成功的抢到了她', segment.image(a), name, '(' + String(user_id2) + ')', '\n运气不错嘛']
            await e.reply(msg)
            return
        }

        if (e.msg == '我对象呢') {
            let i1 = ren.findIndex(item => item.man == e.user_id) + 1
            let i2 = ren.findIndex(item => item.woman == e.user_id) + 1

            if (i1 == 0 & i2 == 0) {
                e.reply('醒醒吧，你还没对象呢')
                return
            }

            if (i1 > 0) {
                let a = 'http://q2.qlogo.cn/headimg_dl?dst_uin=' + ren[i1 - 1].woman + '&spec=5'
                let msg = [segment.at(e.user_id), '\n你今天的老婆是', segment.image(a), renmin[i1 - 1].woman, '(' + String(ren[i1 - 1].woman) + ')', '\n看好她哦，别让她被抢走了。']
                await e.reply(msg)
                return

            }
            if (i2 > 0) {
                let a = 'http://q2.qlogo.cn/headimg_dl?dst_uin=' + ren[i2 - 1].man + '&spec=5'
                let msg = [segment.at(e.user_id), '\n你今天的老公是', segment.image(a), renmin[i2 - 1].man, '(' + String(ren[i2 - 1].man) + ')', '\n看好她哦，别让她被抢走了。']
                await e.reply(msg)
                return

            }

            return

        }


        if (e.msg == '闹离婚') {

            let i1 = ren.findIndex(item => item.man == e.user_id) + 1
            let i2 = ren.findIndex(item => item.woman == e.user_id) + 1



            if (i1 == 0 & i2 == 0) {
                e.reply('醒醒吧，你连对象都没有，跟锤子离婚呢。')
                return
            }

            if (i1 + i2 != 0) {

                if (i1 != 0) {


                    ren.splice(i1 - 1, 1)
                    renmin.splice(i1 - 1, 1)
                    e.reply('没想到你们走到了这一步，那就将来再会吧')
                }
                if (i2 != 0) {


                    ren.splice(i2 - 1, 1)
                    renmin.splice(i2 - 1, 1)
                    e.reply('没想到你们走到了这一步，那就将来再会吧')
                }
                return

            }


        }
        if (e.msg.includes('强娶')) {

            user_id2 = e.at
            if (user_id2 == undefined) {
                e.reply('真可惜，娶老婆失败了，嘤嘤嘤')
                return
            }


            if (e.user_id == user_id2) {
                e.reply('你个自恋狂，是想自己和自己结婚吗？真够离谱的')
                return
            }


            let name = e.bot.pickMember(e.group_id, user_id2).card
            


            let i1 = ren.findIndex(item => item.man == e.user_id) + 1
            let i2 = ren.findIndex(item => item.woman == e.user_id) + 1
            let i3 = ren.findIndex(item => item.man == user_id2) + 1
            let i4 = ren.findIndex(item => item.woman == user_id2) + 1

            if (i3 + i4 != 0) {
                e.reply('她今天已经被娶走了，你想干嘛呢。')
                return

            }


            if (i1 + i2 != 0) {

                if (i1 != 0) {
                    let a = 'http://q2.qlogo.cn/headimg_dl?dst_uin=' + ren[i1 - 1].woman + '&spec=5'
                    let msg = [segment.at(e.user_id), '\n你今天已经有老婆啦', segment.image(a), renmin[i1 - 1].woman, '(' + String(ren[i1 - 1].woman) + ')', "\n别三心二意了！好好珍惜她！"]
                    e.reply(msg)
                    return
                }
                if (i2 != 0) {
                    let a = 'http://q2.qlogo.cn/headimg_dl?dst_uin=' + ren[i2 - 1].man + '&spec=5'
                    let msg = [segment.at(e.user_id), '\n你今天已经被他娶走啦', segment.image(a), renmin[i2 - 1].man, '(' + String(ren[i2 - 1].man) + ')', "\n别三心二意了！好好珍惜她！"]
                    e.reply(msg)
                    return
                }



            }

            let dx = { "man": e.user_id, "woman": user_id2 }
            let lm = { "man": e.member.card, "woman": name }
            ren.push(dx)
            renmin.push(lm)
            let a = 'http://q2.qlogo.cn/headimg_dl?dst_uin=' + user_id2 + '&spec=5'
            let msg = [segment.at(e.user_id), '\n你今天的老婆是', segment.image(a), name, '(' + String(user_id2) + ')', '\n看好她哦，别让她被抢走了。']
            await e.reply(msg)
            return

        }
        if (e.msg == '娶群友') {
            let i1 = 0
            let i2 = 0
            let gailv = Math.floor(Math.random() * 100);

            if (gailv < 30) {
                e.reply('真可惜，娶老婆失败了，嘤嘤嘤')
                return
            }



            i1 = ren.findIndex(item => item.man == e.user_id) + 1
            i2 = ren.findIndex(item => item.woman == e.user_id) + 1





            if (i1 + i2 != 0) {

                if (i1 != 0) {
                    let a = 'http://q2.qlogo.cn/headimg_dl?dst_uin=' + ren[i1 - 1].woman + '&spec=5'
                    let msg = [segment.at(e.user_id), '\n你今天已经有老婆啦', segment.image(a), renmin[i1 - 1].woman, '(' + String(ren[i1 - 1].woman) + ')', "\n别三心二意了！好好珍惜她！"]
                    e.reply(msg)
                }
                if (i2 != 0) {
                    let a = 'http://q2.qlogo.cn/headimg_dl?dst_uin=' + ren[i2 - 1].man + '&spec=5'
                    let msg = [segment.at(e.user_id), '\n你今天已经他被娶走啦', segment.image(a), renmin[i2 - 1].man, '(' + String(ren[i2 - 1].man) + ')', "\n别三心二意了！好好珍惜她！"]
                    e.reply(msg)
                }



                return

            }

            let lb = ""
            lb = e.group.getMemberMap()

            let mmap = await e.group.getMemberMap();


            let arrMember = Array.from(mmap.values()).filter(member => member.level == 1);;

            let qcy = []
            for (let i = 0; i < arrMember.length; i++) {
                qcy[i] = arrMember[i].user_id
            }

            var QAurl3 = "./resources/Earth-K-Plugin-" + "娶群友列表" + ".txt";

            fs.writeFile(QAurl3, qcy.toString(), function (err) {
                // 如果err为true，则文件写入失败，并返回失败信息
                if (err) {
                    return console.log('文件写入失败！' + err.message)
                }
                // 若文件写入成功，将显示“文件写入成功”
                console.log('文件写入成功！')
            })


            let n = Math.floor(Math.random() * arrMember.length);

            i1 = ren.findIndex(item => item.man == arrMember[n].user_id) + 1
            i2 = ren.findIndex(item => item.woman == arrMember[n].user_id) + 1



            if (i1 + i2 != 0) {

                e.reply(['你娶到的人是', segment.at(arrMember[n].user_id), ',但是她已经被娶走了。'])
                return
            }

            //let a = 'http://xiaobapi.top/api/xb/api/qqlogo.php?&qq='+arrMember[n].user_id+'&s=100'
            if (e.user_id == arrMember[n].user_id) {
                let msg = [segment.at(e.user_id), '你今天是单身贵族哦']
                e.reply(msg)
                return
            }
            let dx = { "man": e.user_id, "woman": arrMember[n].user_id }
            let lm = { "man": e.member.card, "woman": arrMember[n].nickname }
            ren.push(dx)
            renmin.push(lm)




            let a = 'http://q2.qlogo.cn/headimg_dl?dst_uin=' + arrMember[n].user_id + '&spec=5'
            let msg = [segment.at(e.user_id), '\n你今天的老婆是', segment.image(a), arrMember[n].nickname, '(' + String(arrMember[n].user_id) + ')', '\n看好她哦，别让她被抢走了。']
            await e.reply(msg)


        }
    }

    async dawo(e) {

        let i = Math.floor(Math.random() * 3);

    }

}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
