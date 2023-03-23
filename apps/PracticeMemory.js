import fetch from 'node-fetch'
import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from "../../../lib/puppeteer/puppeteer.js";

let result2 = null
let zqlb = []
let ks = 0
let zuo = ""
let ding = ""
let sz = ""
let data1 = {}
let ml = process.cwd()
let wj = []
let fs = []
let wjname = []

export class PracticeMemory extends plugin {
	constructor() {
		super({
			name: '[土块插件]练习记忆力',
			dsc: '练习记忆力',
			event: 'message',
			priority: 1146,
			rule: [
				{
					reg: '^#练习记忆力',
					fnc: 'jyl'
				},
				{
					reg: '^我猜(.*)$',
					fnc: 'wc'
				},
				{
					reg: '^#重置分数',
					fnc: 'czfs'
				}
			]
		})
	}

	async czfs(e) {
		if (e.user_id == 1142407413) {
			wj = []
			fs = []
			wjname = []
			e.reply('重置成功')
		}
	}

	async wc(e) {
		if (wj.indexOf(e.user_id) == -1 & ks == 1) {
			wj[wj.length] = e.user_id
			fs[fs.length] = 0
			wjname[wjname.length] = e.member.card
			console.log(wjname[0])
		}

		let shuzi = e.msg.replace(/我猜/g, "").trim()
		console.log(shuzi)
		console.log(result2)
		console.log(zqlb)
		if (zqlb[result2] == shuzi & ks == 1) {
			e.reply([segment.at(e.user_id), "恭喜你回答正确"])
			ks = 0
			sz = "0,1,2,3,4,5,6,7,8,"
			data1 = {
				tplFile: './plugins/earth-k-plugin/resources/html/Memory/Memory.html',
				zuo: zuo,
				ding: ding,
				sz: sz,
				da: result2,
				dz: ml
			}

			let img = await puppeteer.screenshot("123", {
				...data1,
			});
			e.reply(img)
			let msg = ""

			for (let i = 0; i < wj.length; i++) {

				if (e.user_id == wj[i]) {
					fs[i] = fs[i] + 1
				}
				msg = '\n' + wjname[i] + '     ' + String(fs[i]) + '分' + msg
			}
			e.reply(['当前分数为：\n' + msg]);
		}
	}

	async jyl(e) {
		sz = ""
		let data1 = {}
		let ml = process.cwd()
		let bj = ""
		let min = 100;                            //最小值
		let max = 900;                            //最大值
		let range = max - min;                         //取值范围差
		//小于1的随机数
		zuo = ""
		ding = ""
		for (var i = 0; i < 10; i++) {
			let random = Math.random();                     //小于1的随机数
			zuo = zuo + Math.round(random * range) + ","
			random = Math.random();
			ding = ding + Math.round(random * range) + ","
			sz = sz + i + ","

		}
		console.log("生成的随机数：" + zuo);
		console.log("生成的随机数：" + ding);
		data1 = {
			tplFile: './plugins/earth-k-plugin/resources/html/Memory/Memory.html',
			zuo: zuo,
			ding: ding,
			sz: sz,
			da: -1,
			dz: ml

		}
		let img = await puppeteer.screenshot("123", {
			...data1,
		});
		let msgRes = await e.reply(img)

		if (e.isGroup && msgRes && msgRes.message_id) {
			let target = e.group;
			setTimeout(() => {
				target.recallMsg(msgRes.message_id);
			}, 10000);
		}
		e.reply("请观察下面数字10秒")
		await sleep(10000)

		let sz2 = ""
		let szlist = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
		sz = ""
		for (var i = 0; i <= 8; i++) {
			let random = Math.random();
			min = 0
			max = szlist.length - 1;                            //最大值
			range = max - min;
			random = Math.random();                     //小于1的随机数
			let xb = Math.round(random * range)
			sz = sz + szlist[xb] + ","
			szlist.splice(xb, 1);
		}
		console.log(sz)

		zqlb = sz.split(",");

		data1 = {
			tplFile: './plugins/earth-k-plugin/resources/html/Memory/Memory.html',
			zuo: zuo,
			ding: ding,
			sz: sz,
			da: -1,
			dz: ml
		}

		img = await puppeteer.screenshot("123", {
			...data1,
		});

		e.reply(img)

		const min2 = 0;                            //最小值
		const max2 = 8;                            //最大值
		const range2 = max2 - min2;                         //取值范围差
		const random2 = Math.random();                     //小于1的随机数
		result2 = min2 + Math.round(random2 * range2);  //最小数加随机数*范围差 

		console.log("生成的随机数：" + result2);
		e.reply("请问" + result2 + "是哪个字母")
		ks = 1
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}