import fetch from "node-fetch";
import _ from 'lodash'
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
let MyUin
let cskg = 0
let sj = [{"name":"看这个","url":"https://api.xingzhige.com/API/Lookatthis/?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"抱","url":"https://api.xingzhige.com/API/baororo/?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"咬","url":"https://api.xingzhige.com/API/bite/?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"登记","url":"https://bh.ayud.top/img/jh.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"吞","url":"https://bg.suol.cc/API/chi/?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&uin="},
{"name":"顶一顶","url":"https://bg.suol.cc/API/ding/?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&uin="},
{"name":"拍","url":"https://api.xingzhige.com/API/paigua/?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"抓","url":"https://api.xingzhige.com/API/grab/?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"顶","url":"https://api.xingzhige.com/API/dingqiu/?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"一起笑","url":"https://api.xingzhige.com/API/LaughTogether/?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"搂","url":"https://api.xingzhige.com/API/FortuneCat/?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"摇摇","url":"https://api.xingzhige.com/API/DanceChickenLeg/?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"打拳","url":"https://api.andeer.top/API/gif_beat.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"捣","url":"https://api.xingzhige.com/API/pound/?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"撕","url":"https://api.caonm.net/api/sit/s?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"加框","url":"https://ovooa.caonm.net/API/head/?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&QQ="},
{"name":"小马赞","url":"https://ovooa.caonm.net/API/zan/api.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&QQ="},
{"name":"丢","url":"https://ovooa.caonm.net/API/diu/api.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&QQ="},
{"name":"遗照","url":"https://lkaa.top/API/yi/?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&QQ="},
{"name":"猫猫赞","url":"https://api.caonm.net/api/zt/zan2?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"彩遗","url":"https://api.caonm.net/api/zt/ji?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"背刺","url":"https://api.caonm.net/api/bei/b?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq=","liang":2},
{"name":"坏","url":"https://api.tangdouz.com/wz/py.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&q="},
{"name":"需要","url":"https://api.caonm.net/api/zt/need?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"鄙视","url":"https://xiaobai.klizi.cn/API/ce/bishi.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"捶","url":"https://xiaobai.klizi.cn/API/gif/hammer.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"报时","url":"https://xiaobai.klizi.cn/API/ce/msg.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"忘了他","url":"https://api.caonm.net/api/shoux/h?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"儿子","url":"https://api.caonm.net/api/wrz/r?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"拒绝","url":"https://api.caonm.net/api/wjj/j?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"原谅","url":"https://api.caonm.net/api/lmz/l?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"我老婆","url":"https://api.caonm.net/api/nmy/n?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"女儿","url":"https://api.caonm.net/api/wnr/n?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"让你","url":"https://api.caonm.net/api/bgz/g?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"广告牌","url":"https://api.caonm.net/api/dal/l?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"耍帅","url":"https://api.caonm.net/api/zhua/h?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"黑化","url":"https://api.caonm.net/api/whh/h?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"脆弱","url":"https://api.caonm.net/api/cuir/c?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"寄","url":"https://api.caonm.net/api/jim/j?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"坤投篮","url":"https://api.caonm.net/api/kunk/k?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"安妮亚","url":"https://api.caonm.net/api/any/any?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"估价","url":"https://api.caonm.net/api/qgj/index?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"心碎","url":"https://api.caonm.net/api/xins/x?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"最帅","url":"https://api.caonm.net/api/zuis/z?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"嫁我","url":"https://api.caonm.net/api/qiuh/q?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"okk","url":"https://api.caonm.net/api/okk/k?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"勾引","url":"https://api.caonm.net/api/gouy/g?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"比心","url":"https://api.caonm.net/api/bix/b?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"踹门","url":"https://api.caonm.net/api/zt/ti_2?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"跟我处对象","url":"https://api.caonm.net/api/xie/x?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"圈钱跑路","url":"https://api.caonm.net/api/pao/p?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"膜拜","url":"https://ovooa.caonm.net/API/face_worship/?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&QQ="},
{"name":"摸","url":"https://ovooa.caonm.net/API/face_petpet/?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&QQ="},
{"name":"幻想","url":"https://api.caonm.net/api/x_3/x?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"吃掉","url":"https://ovooa.caonm.net/API/face_bite/?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&QQ="},
{"name":"抱着哭","url":"https://api.caonm.net/api/bzk/index?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"什么东西","url":"https://api.caonm.net/api/peng/p?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"精神支柱","url":"https://api.caonm.net/api/zt/jing?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"2吃","url":"https://api.caonm.net/api/bgz/g?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"咀嚼","url":"https://api.caonm.net/api/chi/e?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"来一下","url":"https://api.caonm.net/api/pdl/c?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"平板","url":"https://api.caonm.net/api/wyx/p2?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"玩游戏","url":"https://api.caonm.net/api/wyx/p?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"拿着","url":"https://api.caonm.net/api/kan/kan_3?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"2举","url":"https://api.caonm.net/api/kan/kan_4?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"3举","url":"https://api.caonm.net/api/kan/kan_5?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"叽","url":"https://api.caonm.net/api/kan/kan_6?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"道歉","url":"https://api.caonm.net/api/kan/kan_8?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"手机","url":"https://api.caonm.net/api/kan/kan_9?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"4举","url":"https://api.caonm.net/api/kan/kan_11?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"拿牌","url":"https://api.caonm.net/api/kan/kan?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"警察","url":"https://api.caonm.net/api/jcz2/p?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"警官","url":"https://api.caonm.net/api/jcz/index?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"嘴","url":"https://api.caonm.net/api/jiujiu/jiujiu?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"舔屏幕","url":"https://api.caonm.net/api/tn/t?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"遮脸","url":"https://api.caonm.net/api/huanl/h?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"疑问","url":"https://api.caonm.net/api/mb/wh?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"上电视","url":"https://api.caonm.net/api/kds/k?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"这像画吗","url":"https://api.caonm.net/api/hua/h?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"推","url":"https://yysk.yitzu.cn.qingf.top/api/xb/api/roll.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"垃圾","url":"https://api.caonm.net/api/ljt/l?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"为什么艾特我","url":"https://api.caonm.net/api/why/at?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"墙纸","url":"https://api.caonm.net/api/bz/w?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"变黑","url":"https://yysk.yitzu.cn.qingf.top/api/xb/api/h.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"求婚","url":"https://ovooa.caonm.net/API/face_propose/?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&QQ="},
{"name":"感动哭了","url":"https://ovooa.caonm.net/API/face_touch/?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&QQ="},
{"name":"高质量","url":"https://ovooa.caonm.net/API/face_gao/?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&QQ="},
{"name":"咸鱼","url":"https://ovooa.caonm.net/API/face_yu/?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&QQ="},
{"name":"快逃","url":"https://xiaobai.klizi.cn/API/gif/escape.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"基友","url":"https://api.caonm.net/api/zhen/c1?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"高富帅","url":"https://api.caonm.net/api/zhen/c2?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"白富美","url":"https://api.caonm.net/api/zhen/c3?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"订婚","url":"https://api.caonm.net/api/zhen/c4?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"首富","url":"https://api.caonm.net/api/zhen/c5?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"帅哥","url":"https://api.caonm.net/api/zhen/c6?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"美女","url":"https://api.caonm.net/api/zhen/c7?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"屌丝","url":"https://api.caonm.net/api/zhen/c8?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"小仙女","url":"https://api.caonm.net/api/zhen/c9?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"老司机","url":"https://api.caonm.net/api/zhen/c10?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"光棍","url":"https://api.caonm.net/api/zhen/c11?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"女汉子","url":"https://api.caonm.net/api/zhen/c12?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"要钱钱","url":"https://api.caonm.net/api/wyqq/q?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"瑟瑟","url":"https://xiaobai.klizi.cn/API/gif/erotic.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"随机证书","url":"https://xiaobai.klizi.cn/API/ce/zs.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"滚出","url":"https://api.caonm.net/api/gun/index?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"教你做事","url":"https://api.fc520.top/API/bqb/jnzs/api.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"羡慕","url":"https://api.andeer.top/API/xianmu.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"摸狗狗","url":"https://api.caonm.net/api/wus/w?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"猎手","url":"https://api.fc520.top/API/bqb/ls/api.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"网络公主","url":"https://api.caonm.net/api/yyy/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"删库","url":"https://h.xiaocha.fun/api/pao.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"看电视","url":"https://h.xiaocha.fun/api/kan.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"美女抬","url":"https://h.xiaocha.fun/api/tai.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"难办","url":"https://h.xiaocha.fun/api/ban.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"女拿","url":"https://h.xiaocha.fun/api/na.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"拍死你","url":"https://h.xiaocha.fun/api/pai.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"4举","url":"https://h.xiaocha.fun/api/ju.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"快溜","url":"https://h.xiaocha.fun/api/liu/liu.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&QQ="},
{"name":"怒","url":"https://h.xiaocha.fun/api/nu/nu.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&QQ="},
{"name":"不想上学","url":"https://h.xiaocha.fun/api/xue/xue.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&QQ="},
{"name":"露脸","url":"https://h.xiaocha.fun/api/lou/lou.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&QQ="},
{"name":"滑稽捶","url":"https://h.xiaocha.fun/api/chui/chui.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&QQ="},
{"name":"咬2","url":"https://h.xiaocha.fun/api/yao/yao.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&QQ="},
{"name":"心碎2","url":"https://h.xiaocha.fun/api/sui/sui.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&QQ="},
{"name":"乡下人","url":"https://api.caonm.net/api/txmb/6?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"看这个","url":"https://api.caonm.net/api/txmb/5?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"灵动岛","url":"https://api.caonm.net/api/txmb/3?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"流汗","url":"https://api.caonm.net/api/txmb/1?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"纱雾举牌","url":"https://api.caonm.net/api/wus/w?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"整一个","url":"https://api.caonm.net/api/zyg/gei?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"老干妈","url":"https://api.caonm.net/api/lgm/index?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"纳西妲抱","url":"https://api.caonm.net/api/zt/na?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"拿手机","url":"https://h.xiaocha.fun/api/sj.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"我的人","url":"https://h.xiaocha.fun/api/wode.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"喝饮料","url":"https://h.xiaocha.fun/api/xi.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"看淡了","url":"https://h.xiaocha.fun/api/dan.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"坤证","url":"https://api.caonm.net/api/txmb/7?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"懒羊羊","url":"https://api.caonm.net/api/lyy/l?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"摇摆","url":"https://api.caonm.net/api/ajl/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"颜色","url":"https://api.caonm.net/api/sjbc/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"走路","url":"https://api.caonm.net/api/zoul/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"女装协议","url":"https://api.caonm.net/api/jqxy/n?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"进群协议","url":"https://api.caonm.net/api/jqxy/j?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"亲亲","url":"https://api.caonm.net/api/ddqq/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"按下","url":"https://api.caonm.net/api/anniu/a?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"50","url":"https://api.caonm.net/api/v50/b?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"涩图","url":"https://api.caonm.net/api/mstl/s?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"杜蕾斯","url":"https://api.caonm.net/api/byt/b?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"挥拳","url":"https://api.caonm.net/api/hq/chui?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"写代码","url":"https://free.wqwlkj.cn/wqwlapi/jwxdm.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"安排","url":"https://free.wqwlkj.cn/wqwlapi/anpai.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"萌新一个","url":"https://free.wqwlkj.cn/wqwlapi/wsmx.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"差评","url":"https://free.wqwlkj.cn/wqwlapi/cp.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"好评","url":"https://free.wqwlkj.cn/wqwlapi/hp.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"羡慕","url":"https://free.wqwlkj.cn/wqwlapi/xianmu.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"坤举旗","url":"https://free.wqwlkj.cn/wqwlapi/kunjuqi.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"开始摆烂","url":"https://api.luanmo.top/API/tu_bailan?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"保护","url":"https://api.luanmo.top/API/tu_dog2?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"地图头像","url":"https://free.wqwlkj.cn/wqwlapi/zgdt.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"找老婆","url":"https://api.fc520.top/API/bqb/zlaopo/api.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"大帅哥","url":"https://api.fc520.top/API/bqb/sg/api.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"摆烂","url":"https://api.fc520.top/API/bqb/bailan/api.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"小c酱","url":"https://api.caonm.net/api/xc/index?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&&"},
{"name":"mc酱","url":"https://api.caonm.net/api/mc/index?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&&"},
{"name":"兽猫酱","url":"https://api.caonm.net/api/smj/index?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&&"},
{"name":"柴郡","url":"https://api.caonm.net/api/chai/c?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&&"},
{"name":"ikun","url":"https://api.caonm.net/api/kun/k?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&&"},
{"name":"龙图","url":"https://api.caonm.net/api/long/l?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&&"},
{"name":"变魔术","url":"https://api.caonm.net/api/tax/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"⭕","url":"https://api.caonm.net/api/qqyk/q?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq=","liang":2},
{"name":"结婚","url":"https://api.caonm.net/api/jhzz/j?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq=","liang":2},
{"name":"两只猫","url":"https://api.caonm.net/api/xmmz/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"煮","url":"https://api.caonm.net/api/huos/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"画画","url":"https://api.caonm.net/api/huaa/h?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"打鸡蛋","url":"https://api.caonm.net/api/chaof/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"2舔","url":"https://api.caonm.net/api/chixg/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"枕头","url":"https://api.caonm.net/api/zhent/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"爱坤","url":"https://api.caonm.net/api/ikz/i?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"滚","url":"https://api.caonm.net/api/gund/g?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"注意身份","url":"https://api.caonm.net/api/zynsf/z?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"翻画板","url":"https://api.caonm.net/api/dakai/a?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"街舞","url":"https://api.caonm.net/api/tmcw/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"蹭","url":"https://api.caonm.net/api/cence/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"2拍","url":"https://api.caonm.net/api/paid/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"装高手","url":"https://www.xiaoqiandtianyi.tk/api/z.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"追","url":"https://api.caonm.net/api/zhuid/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"2敲","url":"https://api.caonm.net/api/qiaod/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"上吊","url":"https://api.caonm.net/api/shangd/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"跳舞","url":"https://api.caonm.net/api/tiaow/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"诈尸","url":"https://api.caonm.net/api/zhas/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"踢球","url":"https://api.caonm.net/api/tiqiu/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"骗子","url":"https://api.caonm.net/api/pianzi/c?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"导管","url":"https://api.caonm.net/api/daoguan/c?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"强行瑟瑟","url":"https://api.caonm.net/api/kapian/c?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"我牛子呢","url":"https://api.caonm.net/api/kapian/c2?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"恶魔","url":"https://api.caonm.net/api/kapian/c3?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"演员","url":"https://api.caonm.net/api/madou/c2?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"狗呢","url":"https://api.caonm.net/api/asc/c?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"不幸","url":"https://api.caonm.net/api/asc/c2?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"老实点","url":"https://api.caonm.net/api/asc/c3?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"动漫画画","url":"https://api.caonm.net/api/asc/c4?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"木鱼","url":"https://api.caonm.net/api/muyu/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"金钱攻击","url":"https://api.caonm.net/api/jingq/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"安全感","url":"https://api.caonm.net/api/anqg/c?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"陪睡券","url":"https://api.caonm.net/api/asc/c5?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"男同","url":"https://api.caonm.net/api/asc/c6?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"掀墙纸","url":"https://api.andeer.top/API/gif_wallpaper.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"胡桃咬","url":"https://api.andeer.top/API/gif_hutao_bite.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"可莉吃","url":"https://api.andeer.top/API/gif_klee_eat.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"崇拜","url":"https://api.andeer.top/API/gif_worship.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"嘎达","url":"https://api.andeer.top/API/img_tr.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"要亲亲","url":"https://api.andeer.top/API/img_kiss_1.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"宝可梦","url":"https://api.andeer.top/API/img_pokemon.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"可爱","url":"https://api.caonm.net/api/asc/kai?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"蒙娜丽莎","url":"https://api.andeer.top/API/img_mnls.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"精神涣散","url":"https://api.andeer.top/API/no_attention.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"击剑","url":"https://api.caonm.net/api/jijian/j?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq=","liang":2},
{"name":"正在加载","url":"https://api.andeer.top/API/img_loading.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"体操服","url":"https://api.caonm.net/api/jupai/m?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"技能","url":"https://api.caonm.net/api/jineng/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"GKD","url":"https://api.caonm.net/api/kapian/c5?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"无法瑟瑟","url":"https://api.caonm.net/api/kapian/c4?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"目录","url":"https://api.caonm.net/api/asc/c9?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"床上一躺","url":"https://api.caonm.net/api/asc/c8?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"啊！","url":"https://api.caonm.net/api/asc/c7?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"包夜","url":"https://api.caonm.net/api/guoy/g?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"报警了","url":"https://api.caonm.net/api/baon/1?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"超市","url":"https://api.caonm.net/api/chaop/j?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq=","liang":2},
{"name":"企鹅超","url":"https://api.caonm.net/api/chao/api?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq=","liang":2},
{"name":"星期四","url":"https://api.caonm.net/api/kfc/50?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"女同","url":"https://api.caonm.net/api/asc/c66?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"芙蓉王","url":"https://api.caonm.net/api/yan/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"望远镜","url":"https://api.caonm.net/api/wyj/w?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"完美","url":"https://api.caonm.net/api/meiyou/c?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"汤姆猫","url":"https://api.caonm.net/api/tmgx/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"一脚","url":"https://api.caonm.net/api/zjyj/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq1=","liang":2},
{"name":"大哭","url":"https://api.caonm.net/api/txmb/8?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"情侣","url":"https://api.caonm.net/api/mxbc/m?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"名片","url":"https://api.caonm.net/api/tp/m?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="}, 
{"name":"美女抱","url":"https://api.caonm.net/api/jupai/d?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"都是几把兄弟","url":"https://api.caonm.net/api/zt/j?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"坐上来","url":"https://api.caonm.net/api/lian/api?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"日记","url":"https://api.andeer.top/API/img_tg.php?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"美女电视","url":"https://api.caonm.net/api/dsjp/j?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"坤打球","url":"https://api.caonm.net/api/ikun/ikun?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"瑞克撕","url":"https://api.caonm.net/api/si/y?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"毒瘾","url":"https://api.caonm.net/api/duy/d?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="},
{"name":"玩原神","url":"https://api.caonm.net/api/asc/wys?key=JMHz65uMHMZ3WCpl4jQ1U1blRr&qq="}]
let ml = process.cwd();
export class emoticon extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '土块表情包合成',
            /** 功能描述 */
            dsc: '土块表情包合成',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级,数字越小等级越高 */
            priority: 145,
            rule: [{
                reg: '(.*?)',
                fnc: 'bqbhc',
				log: false
             
            }
            ]

        })
    }

	
    async bqbhc(e) {
        

        if(e.msg == '#表情包列表'){
            MyUin = e.user_id
            let bqname =[]
            console.log('长度是'+sj.length)
            for(let i=0;i<sj.length;i++){
                bqname.push(sj[i].name)

            }
            let data1 = {
                tplFile: './plugins/earth-k-plugin/resources/html/emoticon/ml.html',
                dz: ml,
                lb: bqname,
                qsid: 0

            }

            let img = await puppeteer.screenshot("123", {
                ...data1,
            });
            e.reply(img)
        }


        if(e.isGroup){
			



            let qq = e.at
      
            if(qq == undefined){
                return false
            }
    
            let n = sj.findIndex(item => item.name == e.msg) 
            if(n == -1){
                return false
            }
            
                let msg 
                let sjlx = sj[n].liang
                if(sjlx == 1){
                    msg = sj[n].url + e.user_id +'&qq='  + String(qq)
                }
                if(sjlx == 2){
                    msg = sj[n].url + e.user_id + '&qq2='  + String(qq)
                }
                if(sjlx == 3){
                    msg = sj[n].url + e.user_id + '&cqq='  + String(qq)
                }
                if(sjlx == undefined){
                    msg = sj[n].url + String(qq)
                }
                console.log(msg)
                
                e.reply(segment.image( msg))
             
            

            
           
        }
        


        return false
    }
}
