
import plugin from '../../../../lib/plugins/plugin.js'
import puppeteer from "../../../../lib/puppeteer/puppeteer.js";
import Help from "../../model/help.js";
import md5 from "md5";

let helpData = {
    md5: "",
    img: "",
};

export class BotHelp extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '土块help',
            /** 功能描述 */
            dsc: '土块帮助',
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 400,
            rule: [
                {
                    reg: '^#修仙帮助$',
                    fnc: 'EKhelp'
                }

            ]
        })
    }



    /**
     * rule - 土块帮助
     * @returns
     */
    async EKhelp(e) {
        let data = await Help.get(e);
        if (!data) return;
        let img = await this.cache(data);
        await e.reply(img);
    }

    async cache(data) {
        let tmp = md5(JSON.stringify(data));
        if (helpData.md5 == tmp) return helpData.img;

        helpData.img = await puppeteer.screenshot("help", data);
        helpData.md5 = tmp;
        return helpData.img;
    }

}