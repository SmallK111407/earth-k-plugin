import fetch from 'node-fetch'
import { segment } from 'oicq'
import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from "../../..//lib/puppeteer/puppeteer.js";
/*
 *搜索并分享歌曲，使用方法发送#点歌 歌曲名 歌手 或者网易云 歌曲名
 *地球生物改写于2022/09/15
 *【未经授权，不得转载】
*/
let msg2 = ""
let kg = false
let wy = false
let qq = false
let zt = 0
let mid = []
let lb = "6"
let id = ""

export class shareMusic extends plugin {
	constructor() {
		super({
			name: '土块点歌',
			dsc: '土块点歌',
			event: 'message',
			priority: 5000,
			rule: [
				{
					reg: '^#*(点歌|kugou|酷狗|网易云|网抑云|网易)(.*)|#听[1-9][0-9]|#听[0-9]*$$',
					fnc: 'shareMusic'
				},
				{
					reg: '^#设置列表长度',
					fnc: 'lbcd'
				},
				{
					reg: "^#*点动漫(.*)$",
					fnc: 'kanpian'
				},
				{
					reg: "^#*点电视(.*)$",
					fnc: 'kandianying'
				}


			]
		})
	}

	async kandianying(e) {
		let msg3 = ""
		let k = ""
		let data3 = ""
		if (e.msg.includes("点电视")) {

			k = e.msg.replace(/#点电视/g, "").trim()
		}
		let url = 'https://so.iqiyi.com/so/q_' + k + "?"
		let response = await fetch(url);
		const data = await response.text()
		let data2 = data.match(/href="(\S*) title/g);
		data3 = data2[3].replace(/href=/g, "")
		data3 = data3.replace(/\"/g, "");
		data3 = data3.replace(/title/g, "")
		msg3 = "https://www.bavei.com/vip/?url=" + "https:" + data3
		e.reply(msg3);
		e.reply(["以上是" + k + "的信息，请到浏览器中打开"]);
		return true;//返回true 阻挡消息不再往下
	}
	async kanpian(e) {
		let msg3 = ""
		let k = ""
		let data3 = ""
		if (e.msg.includes("点动漫")) {
			k = e.msg.replace(/#点动漫/g, "").trim()
		}
		let url = 'https://search.bilibili.com/all?vt=92884847&keyword=' + k
		let response = await fetch(url);
		const data = await response.text()
		let data2 = data.match(/href="(\S*) title/g);
		data3 = data2[0].replace(/href=/g, "")
		data3 = data3.replace(/\"/g, "");
		data3 = data3.replace(/title/g, "")
		msg3 = "https://www.bavei.com/vip/?url=" + "https:" + data3
		e.reply(msg3);
		e.reply(["以上是" + k + "的信息，请到浏览器中打开"]);
		return true;//返回true 阻挡消息不再往下
	}

	async lbcd(e) {
		lb = e.msg.replace(/#设置列表长度/g, "").trim()
		console.log(lb)
		e.reply("设置成功，当前点歌显示" + lb + "首")
	}

	async shareMusic(e) {
		const urlList = {
			qq: 'https://ovooa.com/API/QQ_Music/?Skey=&uin=&msg=paramsSearch&n=',
			kugou:
				'http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=paramsSearch&page=1&pagesize=20&showtype=1',
			wangyiyun: 'https://autumnfish.cn/search?keywords=paramsSearch',//备用API：http://www.clearfor.xyz:3000/cloudsearch?keywords=paramsSearch
			//https://autumnfish.cn/search?keywords=paramsSearch
			//https://music.cyrilstudio.top/search?keywords=paramsSearch
		}

		logger.info('[用户命令]', e.msg)
		let msg = e.msg.replace(/\s*/g, "");
		let isQQReg = new RegExp("^[非VIP]*点歌*(qq|QQ)(.*)$");
		let isKugouReg = new RegExp("^[非VIP]*点歌*(kugou|酷狗)(.*)$");
		let isWangYiyunReg = new RegExp("^[非VIP]*点歌*(网易云|网抑云)(.*)$");

		let isQQ = isQQReg.test(msg);
		let isKugou = isKugouReg.test(msg);
		let isWangYiyun = isWangYiyunReg.test(msg);

		if (!isQQ && !isKugou && !isWangYiyun) isWangYiyun = true;
		if (msg.includes("点歌")) {
			zt = 0
		}

		if (zt == 1) {
			isKugou = kg
			isQQ = qq
			isWangYiyun = wy
		}
		let isPay = msg.includes("非VIP");

		msg = msg.replace(/[非VIP|点歌|qq|QQ|kugou|酷狗|网易云|网抑云]/g, "");
		msg = msg.replace(/#/g, "").trim()

		if (e.msg.includes("#听")) {
			msg = msg2
		} else {
			msg2 = msg
		}

		try {
			msg = encodeURI(msg);
			const params = { search: msg };
			let apiName = isQQ ? "qq" : isKugou ? "kugou" : "wangyiyun";
			let url = urlList[apiName].replace("paramsSearch", msg);
			let response = await fetch(url);
			const { data, result } = await response.json();

			let songList = [];

			if (isKugou) songList = isPay ? data.info.filter((item) => !item.pay_type_sq) : data.info;
			else songList = result?.songs?.length ? result.songs : [];
			if (zt == 0) {
				kg = isKugou
				qq = isQQ
				wy = isWangYiyun
			}

			if (e.msg.includes("#听")) {

				id = e.msg.replace(/#听/g, "").trim()

				console.log("id为" + id)
			}

			if (Number(id) > 0) {
				console.log(qq)
				if (qq) {
					let url = urlList[apiName].replace("paramsSearch", msg2)
					url = url + String(id)
					console.log(url)
					let response2 = await fetch(url);
					const data2 = await response2.json();

					url = "https://y.qq.com/n/ryqq/songDetail/" + data2.data.Mid; //接口地址	
					let response3 = await fetch(url); //调用接口获取数据
					let res = await response3.text(); //结果json字符串转对象
					let n1 = res.indexOf('","id":') + 7
					let n2 = res.indexOf(',', n1)
					console.log(n1, n2)

					if (e.isPrivate) {
						e.friend.shareMusic("qq", Number(res.slice(n1, n2)))
						e.reply(segment.record(data2.data.music))
						console.log("结果是：" + res.slice(n1, n2))
						qq = 0
						zt = 0
						id = ""

						zt = 0
					} else if (e.isGroup) {
						e.group.shareMusic("qq", Number(res.slice(n1, n2)))
						e.reply(segment.record(data2.data.music))
						console.log("结果是：" + res.slice(n1, n2))
						qq = 0
						zt = 0
						id = ""
					}
				}
				if (e.isPrivate) {

					await e.friend.shareMusic(
						isKugou ? "kugou" : "163",
						isKugou ? songList[id - 1].hash : songList[id - 1].id
					);
					zt = 0
				} else if (e.isGroup) {
					e.group.shareMusic(
						isKugou ? "kugou" : "163",
						isKugou ? songList[id - 1].hash : songList[id - 1].id
					);
					zt = 0
				}
			}
			msg = ""
			let zz = ""
			let msg4 = []
			let song = ""
			let zuozhe = ""
			let xvhao = ""
			if (isQQ & id == "") {
				for (let i = 0; i < data.length; i++) {
					xvhao = xvhao + String(i + 1) + ","
					song = song + data[i].song + ","
					zuozhe = zuozhe + data[i].singers + ","
				}

				let data1 = {}
				let ml = process.cwd()
				let bj = ""
				const min = 1;                            //最小值
				const max = 13;                            //最大值
				const range = max - min;                         //取值范围差
				const random = Math.random();                     //小于1的随机数
				const result = min + Math.round(random * range);  //最小数加随机数*范围差 

				console.log("生成的随机数：" + result);

				bj = String(result)

				console.log(bj)

				data1 = {
					tplFile: './plugins/earth-k-plugin/resources/sharemusic/sharemusic.html',

					xvhao: xvhao,
					song: song,
					zuozhe: zuozhe,
					dz: ml,
					bj: bj
				}

				let img = await puppeteer.screenshot("123", {
					...data1,
				});
				e.reply(img)
				console.log("结果是：" + data[0].song + data[0].singers)
				zt = 1
			}



			if (isKugou & id == "") {
				for (let i = 0; i < data.info.length; i++) {
					xvhao = xvhao + String(i + 1) + ","
					song = song + data.info[i].songname + ","
					zuozhe = zuozhe + data.info[i].singername + ","
				}

				console.log(song)

				let data1 = {}
				let ml = process.cwd()
				let bj = ""
				const min = 1;                            //最小值
				const max = 13;                            //最大值
				const range = max - min;                         //取值范围差
				const random = Math.random();                     //小于1的随机数
				const result = min + Math.round(random * range);  //最小数加随机数*范围差 

				console.log("生成的随机数：" + result);

				bj = String(result)

				console.log(bj)

				data1 = {
					tplFile: './plugins/earth-k-plugin/resources/sharemusic/sharemusic.html',
					xvhao: xvhao,
					song: song,
					zuozhe: zuozhe,
					dz: ml,
					bj: bj
				}

				let img = await puppeteer.screenshot("123", {
					...data1,
				});
				e.reply(img)

				zt = 1
			}

			if (isWangYiyun & id == "") {
				for (let i = 0; i < songList.length; i++) {
					xvhao = xvhao + String(i + 1) + ","
					song = song + songList[i].name + ","
					zuozhe = zuozhe + songList[i].artists[0].name + ","
				}

				let data1 = {}
				let ml = process.cwd()
				let bj = ""
				const min = 1;                            //最小值
				const max = 13;                            //最大值
				const range = max - min;                         //取值范围差
				const random = Math.random();                     //小于1的随机数
				const result = min + Math.round(random * range);  //最小数加随机数*范围差 

				console.log("生成的随机数：" + result);
				bj = String(result)
				console.log(bj)
				data1 = {
					tplFile: './plugins/earth-k-plugin/resources/sharemusic/sharemusic.html',

					xvhao: xvhao,
					song: song,
					zuozhe: zuozhe,
					dz: ml,
					bj: bj
				}

				let img = await puppeteer.screenshot("123", {
					...data1,
				});
				e.reply(img)
				zt = 1
			}

			if (Number(id) > 0) {
				let response = await fetch(`http://music.163.com/song/media/outer/url?id=${songList[Number(id) - 1].id}`);
				const data = await response;
				if (!data?.url) return true
				const music = await segment.record(data?.url)
				await e.reply(music)
				id = ""
			}

		} catch (error) {
			console.log(error);
		}
		return true;
	}


}
async function ForwardMsg(e, data) {
	let msgList = [];
	for (let i in data) {

		msgList.push({
			message: segment.text(data[i]),

			nickname: Bot.nickname,
			user_id: Bot.uin,
		});
	}
	msgList.push({
		message: "请发送你要听的序列号的歌曲，例如 #听1",

		nickname: Bot.nickname,
		user_id: Bot.uin,
	})
	if (msgList.length == 0) {
		console.log(msgList.length)
		await e.reply(msgList[0].message);
	}
	else {



		await e.reply(await Bot.makeForwardMsg(msgList));
	}
	return;
}