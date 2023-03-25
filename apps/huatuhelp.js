import YAML from 'yaml'
import fetch from "node-fetch";
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import {
    createRequire
}
    from 'module'
import fs from "fs";
const ml = process.cwd();
let msg = []
let data1




//1.定义命令规则
export class huatuhelp extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '#土块画图帮助',
            /** 功能描述 */
            dsc: '#土块画图帮助',
            event: 'message',
            /** 优先级,数字越小等级越高 */
            priority: 1145,
            rule: [{
                /** 命令正则匹配 */
                reg: '#画图帮助', //匹配消息正则,命令正则
                /** 执行方法 */
                fnc: 'bangzhu'
            }
            ]

        })
    }
    async bangzhu(e) {
        let bangzhu = YAML.parse(
            fs.readFileSync('./plugins/earth-k-plugin/resources/aiht/bangzhu.yaml', 'utf8')
        );

        bangzhu = bangzhu.bangzhu


        data1 = {
            tplFile: './plugins/earth-k-plugin/resources/aiht/index.html',
            dz: ml,
            nr2: bangzhu,


        }
        let img = await puppeteer.screenshot("123", {
            ...data1,
        });
        e.reply(img)
        let jcxx = YAML.parse(
            fs.readFileSync('./plugins/earth-k-plugin/config/config.yaml', 'utf8')
        );
        if (jcxx.jhft == undefined) {
            jcxx.jhft = 1
        }
        if (jcxx.sesequn == undefined) {
            jcxx.sesequn = []
        }
        if (jcxx.blackqun == undefined) {
            jcxx.blackqun = []
        }
        if (jcxx.blackqq == undefined) {
            jcxx.blackqq = []
        }

        fs.writeFileSync('./plugins/earth-k-plugin/config/config.yaml', YAML.stringify(jcxx));


    }
}