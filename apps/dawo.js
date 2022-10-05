
import {
    segment
}
from 'oicq'
import fetch from "node-fetch";
let ks = 0
    let user_id2 = ""
    let ks2 = 0
    export class dawo extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '打我',
            /** 功能描述 */
            dsc: '',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1146,
            rule: [
                {
                    reg: '^#打我|石头|剪刀|布$|(.*)#打他(.*)$',
                    fnc: 'dawo'
                }, {
                    reg: '^#挑选幸运儿$',
                    fnc: 'jrlp'
                }
            ]

        })
    }

    async jrlp(e) {
        let lb = ""
            lb = e.group.getMemberMap()

            let mmap = await e.group.getMemberMap();

        let arrMember = Array.from(mmap.values()).filter(member => member.level == 1); ;

        for (let i = 0; i < arrMember.length; i++) {}
        let n = Math.floor(Math.random() * arrMember.length);
        //let a = 'http://xiaobapi.top/api/xb/api/qqlogo.php?&qq='+arrMember[n].user_id+'&s=100'
        let a = 'http://q2.qlogo.cn/headimg_dl?dst_uin=' + arrMember[n].user_id + '&spec=5'
            let msg = ['今天的幸运儿是', segment.image(a), arrMember[n].nickname, '(' + String(arrMember[n].user_id) + ')' + '恭喜！恭喜获得一张涩图！']
            await e.reply(msg)
            console.log(arrMember[n].user_id)
            let msg2 = [segment.image('http://ovooa.com/API/meizi/api.php?type=image')]

            sleep(2000)
            e.reply(msg2)

    }

    async dawo(e) {

        let i = Math.floor(Math.random() * 3);
        let cq = ""
            if (i == 0 & ks == 1) {
                cq = "石头"
            }
            if (i == 1 & ks == 1) {
                cq = "剪刀"
            }
            if (i == 2 & ks == 1) {
                cq = "布"
            }
            console.log(i)

            if (e.msg.includes('#打他') & e.isMaster & ks2 == 0) {
                user_id2 = e.at;

                console.log(user_id2)

                e.reply([segment.at(user_id2), '给你20秒，跟我来把猜拳，赢了我就不打你，输了看我不打死你！你先发,石头，剪刀，布，出吧'])

                ks2 = 1

                    setTimeout(function () {

                        if (ks2 == 1) {
                            e.reply('20秒已过，还不出，给我寄！')
                            e.group.muteMember(user_id2, 10)
                            ks2 = 0

                        }

                    }, 20000);

            }
            console.log(user_id2)
            if (e.msg == "石头" & e.user_id == user_id2) {
                if (i == 0) {
                    e.reply('我出石头，平局，饶你一回')

                }
                if (i == 1) {
                    let msg = ['我出剪刀，我输了，给你张涩图吧。快谢谢我！', segment.image('http://ovooa.com/API/meizi/api.php?type=image')]
                    e.reply(msg)
                    //https://iw233.cn/API/Random.php


                }
                if (i == 2) {
                    e.reply('我出布，你输了，给我寄！')
                    e.group.muteMember(e.user_id, 10)

                }

                ks2 = 0

            }
            if (e.msg == "剪刀" & e.user_id == user_id2) {
                if (i == 0) {
                    e.reply('我出石头，你输了，给我寄！')
                    e.group.muteMember(e.user_id, 10)
                }
                if (i == 1) {
                    e.reply('我出剪刀，平局，饶你一回')

                }
                if (i == 2) {
                    let msg = ['我出布，我输了，给你张涩图吧。快谢谢我！', segment.image('http://ovooa.com/API/meizi/api.php?type=image')]
                    e.reply(msg)

                }
                ks2 = 0
            }
            if (e.msg == "布" & e.user_id == user_id2) {
                if (i == 0) {
                    let msg = ['我出石头，我输了，给你张涩图吧。快谢谢我！', segment.image('http://ovooa.com/API/meizi/api.php?type=image')]
                    e.reply(msg)

                }
                if (i == 1) {
                    e.reply('我出剪刀，你输了，给我寄！')
                    e.group.muteMember(e.user_id, 10)
                }
                if (i == 2) {
                    e.reply('我出布，平局，饶你一回')

                }
                ks2 = 0
            }

            if (e.msg == "#打我" & ks == 1) {
                e.reply('我正在打别人，没空，你待会再挨打。')
            }

            if (e.msg == "#打我" & ks == 0) {

                e.reply([segment.at(e.user_id), '给你20秒，跟我来把猜拳，赢了我就不打你，输了看我不打死你！你先发,石头，剪刀，布，出吧'])
                ks = 1

                    setTimeout(function () {

                        if (ks == 1) {
                            e.reply('20秒已过，还不出，给我寄！')
                            e.group.muteMember(e.user_id, 10)
                            ks = 0
                        }

                    }, 20000);

            }

            if (e.msg == "石头" & ks == 1) {
                if (i == 0) {
                    e.reply('我出石头，平局，饶你一回')

                }
                if (i == 1) {
                    let msg = ['我出剪刀，我输了，给你张涩图吧。快谢谢我！', segment.image('http://ovooa.com/API/meizi/api.php?type=image')]
                    e.reply(msg)
                    //https://iw233.cn/API/Random.php


                }
                if (i == 2) {
                    e.reply('我出布，你输了，给我寄！')
                    e.group.muteMember(e.user_id, 10)

                }
                ks = 0

            }

            if (e.msg == "剪刀" & ks == 1) {
                if (i == 0) {
                    e.reply('我出石头，你输了，给我寄！')
                    e.group.muteMember(e.user_id, 10)
                }
                if (i == 1) {
                    e.reply('我出剪刀，平局，饶你一回')

                }
                if (i == 2) {
                    let msg = ['我出布，我输了，给你张涩图吧。快谢谢我！', segment.image('http://ovooa.com/API/meizi/api.php?type=image')]
                    e.reply(msg)

                }
                ks = 0
            }
            if (e.msg == "布" & ks == 1) {
                if (i == 0) {
                    let msg = ['我出石头，我输了，给你张涩图吧。快谢谢我！', segment.image('http://ovooa.com/API/meizi/api.php?type=image')]
                    e.reply(msg)

                }
                if (i == 1) {
                    e.reply('我出剪刀，你输了，给我寄！')
                    e.group.muteMember(e.user_id, 10)
                }
                if (i == 2) {
                    e.reply('我出布，平局，饶你一回')

                }
                ks = 0
            }

    }

}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
