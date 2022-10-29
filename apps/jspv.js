import {
    segment
}
from "oicq";
import fetch from "node-fetch";
import fs from "fs";
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
let data1 = {}
    let kg = 0
    let ml = process.cwd()
    export class jspv extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '土块原神视频',
            /** 功能描述 */
            dsc: '简单开发示例',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1146,
            rule: [{
                    reg: "^#角色视频列表$|^#角色视频(.*)$", //匹配消息正则，命令正则
                    /** 执行方法 */
                    fnc: 'cspv'
                }, {
                    reg: "^#过场动画列表$|^#过场动画(.*)$", //匹配消息正则，命令正则
                    /** 执行方法 */
                    fnc: 'gcdh'
                }

            ]

        })

    }

    async gcdh(e) {
        let url2 = 'https://api-static.mihoyo.com/common/blackboard/ys_obc/v1/home/content/list?app_sn=ys_obc&channel_id=80'
            let res2 = await fetch(url2)
            let response2 = await res2.json()

            let jslb = response2.data.list[0].children[2].list

            if (e.msg == '#过场动画列表') {

                data1 = {
                    tplFile: './plugins/earth-k-plugin/resources/gs/ml.html',
                    dz: ml,
                    lb: jslb,
                    qsid: 0

                }
                let img = await puppeteer.screenshot("123", {
                    ...data1,
                });
                e.reply(img)
                return

            }

            if (e.msg.includes('#过场动画')) {
                let sp = []
                if (kg == 1) {
                    e.reply('我知道你很急，但你别急，今天又是谁想陷害我啊，QAQ')
                    return
                }

                kg = 1

                    let id = e.msg.replace(/#过场动画/g, "").trim()

                    if (Number(id) < 1) {
                        e.reply('你这不行，不对')
                        return
                        kg = 0
                    }
                    let id2 = jslb[Number(id - 1)].content_id
                    let spmz = jslb[Number(id - 1)].title
                    id = String(id)
                    console.log(id)
                    let url = 'https://api-static.mihoyo.com/common/blackboard/ys_obc/v1/content/info?app_sn=ys_obc&content_id=' + id2

                    let res = await fetch(url)
                    let response = await res.json()
                    console.log(response.data.content.contents[0])

                    if (response.data.content.contents[0] != undefined) {
                        console.log(response.data.content.contents[0].text)
                        let jieguo = response.data.content.contents[0].text
                            sp = jieguo.match(/<video src="(.*?).mp4/g);
                        sp = sp[0].replace(/<video src="/g, "").trim()

                            console.log(sp)

                    } else {
                        console.log(response.data.content.content)
                        let jieguo = response.data.content.content
                            sp = jieguo.match(/<video src="(.*?).mp4/g);
                        sp = sp[0].replace(/<video src="/g, "").trim()

                    }
					
					 if (kg == 1) {
                    e.reply('我知道你很急，但你别急，先看这个吧')
					e.reply(sp)
                    return
                }
                    e.reply(spmz + '王大队长，等一下，视频马上就来,你可以先看这个')
                    e.reply(sp)
                    //	console.log(response.data.content.content)
                    //let jieguo = response.data.content.content
                    //let sp = jieguo.match(/<video src="(.*?).mp4/g);
                    //sp = sp[0].replace(/<video src="/g, "").trim()

                    //console.log(sp)


                    //e.reply('好的，请稍等哦')


                    await fetch(sp, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/octet-stream'
                        },
                    }).then(res => res.buffer()).then(_ => {
                        fs.writeFile("./resources/pv.mp4", _, "binary", function (err) {
                            if (err)
                                console.error(err);
                            else
                                console.log("下载成功");
                        });
                    })

                    let msg = segment.video('./resources//pv.mp4')

                    await e.reply(msg)
                    e.reply('哎诶诶，视频来咯~~~')
                    kg = 0
            }

    }
    async cspv(e) {
        let url2 = 'https://api-static.mihoyo.com/common/blackboard/ys_obc/v1/home/content/list?app_sn=ys_obc&channel_id=80'
            let res2 = await fetch(url2)
            let response2 = await res2.json()

            let jslb = response2.data.list[0].children[0].list

            if (e.msg == '#角色视频列表') {

                data1 = {
                    tplFile: './plugins/earth-k-plugin/resources/gs/ml.html',
                    dz: ml,
                    lb: jslb,
                    qsid: 0
                }
                let img = await puppeteer.screenshot("123", {
                    ...data1,
                });
                e.reply(img)
                return
            }

            if (e.msg.includes('#角色视频')) {
                let sp = []
                

                kg = 1

                    let id = e.msg.replace(/#角色视频/g, "").trim()

                    if (Number(id) < 1) {
                        e.reply('你这不行，不对')
                        return
                        kg = 0
                    }
                    let id2 = jslb[Number(id - 1)].content_id
                    let spmz = jslb[Number(id - 1)].title
                    id = String(id)
                    console.log(id)
                    let url = 'https://api-static.mihoyo.com/common/blackboard/ys_obc/v1/content/info?app_sn=ys_obc&content_id=' + id2

                    let res = await fetch(url)
                    let response = await res.json()
                    console.log(response.data.content.contents[0])

                    if (response.data.content.contents[0] != undefined) {
                        console.log(response.data.content.contents[0].text)
                        let jieguo = response.data.content.contents[0].text
                            sp = jieguo.match(/<video src="(.*?).mp4/g);
                        sp = sp[0].replace(/<video src="/g, "").trim()

                            console.log(sp)

                    } else {
                        console.log(response.data.content.content)
                        let jieguo = response.data.content.content
                            sp = jieguo.match(/<video src="(.*?).mp4/g);
                        sp = sp[0].replace(/<video src="/g, "").trim()

                    }
					if (kg == 1) {
                    e.reply('我知道你很急，但你别急，先看这个吧，QAQ')
					e.reply(sp)
                    return
                }

                    e.reply(spmz + '王大队长，等一下，视频马上就来,你可以先看这个')
                    e.reply(sp)
                    //	console.log(response.data.content.content)
                    //let jieguo = response.data.content.content
                    //let sp = jieguo.match(/<video src="(.*?).mp4/g);
                    //sp = sp[0].replace(/<video src="/g, "").trim()

                    //console.log(sp)


                    //e.reply('好的，请稍等哦')


                    await fetch(sp, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/octet-stream'
                        },
                    }).then(res => res.buffer()).then(_ => {
                        fs.writeFile("./resources/pv.mp4", _, "binary", function (err) {
                            if (err)
                                console.error(err);
                            else
                                console.log("下载成功");
                        });
                    })

                    let msg = await segment.video('./resources/pv.mp4')

                    await e.reply(msg)
                    e.reply('哎诶诶，视频来咯~~~')
                    kg = 0

              

            }

    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
