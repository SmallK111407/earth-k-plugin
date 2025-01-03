import fetch from 'node-fetch'
import plugin from '../../../lib/plugins/plugin.js'
import common from "../../../lib/common/common.js"
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import YAML from 'yaml'
import fs from 'fs'

let msg2 = ""
let kg = false
let wy = false
let qq = false
let zt = 0
let mid = []
let lb = "6"
let id = ""
let wyck = ""
export class ShareMusic extends plugin {
	constructor() {
		super({
			name: '[土块插件]点歌',
			dsc: '土块点歌',
			event: 'message',
			priority: 140,
			rule: [
				{
					reg: '^#点歌|#听[1-9][0-9]|#听[0-9]*$',
					fnc: 'shareMusic'
				},
				{
					reg: '^点歌|#听[1-9][0-9]|#听[0-9]*$',
					fnc: 'shareMusic'
				},
				{
					reg: "^#*点动漫(.*)$",
					fnc: 'kanpian'
				},
				{
					reg: "^#填写网易ck(.*)$",
					fnc: 'txck'
				},
				{
					reg: "^播放(.*)",
					fnc: 'bofang'
				},
				{
					reg: "^网易播放(.*)",
					fnc: 'wybofang'
				}


			]
		})
	}
async wybofang(e) {
		e.reply('正在下载音乐文件，请稍等~'); // 添加提示
		let ckxx = YAML.parse(
		fs.readFileSync('./plugins/earth-k-plugin/config/config.yaml', 'utf8')
	);
	wyck = ckxx.wyck

	let ge = e.msg.replace(/网易播放/g, "").trim()
	if (ge == '') return e.reply('请输入要播放的歌曲')
	let url = `https://music.itukuai.top/search?keywords=${ge}`
	let response2 = await fetch(url);
	const data2 = await response2.json();
	
	let ids = String(data2.result.songs[0].id)
	url = 'http://music.163.com/song/media/outer/url?id=' + ids

	let options = {
		method: 'POST',//post请求 
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; MI Build/SKQ1.211230.001)',
			'Cookie': 'versioncode=8008070; os=android; channel=xiaomi; ;appver=8.8.70; ' + "MUSIC_U=" + wyck
		},
		body: `ids=${JSON.stringify([ids])}&level=standard&encodeType=mp3`
	};
	let response = await fetch('https://music.163.com/api/song/enhance/player/url/v1', options); //调用接口获取数据
	let res = await response.json(); //结果json字符串转对象
	if (res.code == 200) {
		url = res.data[0]?.url;
		url = url ? url : '';
	}
	try {
		let msg = await uploadRecord(url, 0, false)
		e.reply(msg)
	} catch {
		let msg2 = await segment.record(url)

		await e.reply(msg2)
	}


	await SendMusicShare(e, { source: 'netease', name: data2.result.songs[0].name, artist: data2.result.songs[0].artists[0].name, pic: data2.result.songs[0].artists[0].img1v1Url, link: 'https://music.163.com/#/song?id=' + ids, url: url })

}
async bofang(e) {
		e.reply('正在下载音乐文件，请稍等~'); // 添加提示
		let ge = e.msg.replace(/播放/g, "").trim()
		if (ge == '') return e.reply('请输入要播放的歌曲')
		let url = `http://datukuai.top:1450/djs/API/QQ_Music/api.php?msg=${ge}&n=1&q=7`
		let response2 = await fetch(url);
		const data2 = await response2.json();
		try {
			try {
				let msg = await uploadRecord(data2.data.music, 0, false)
				e.reply(msg)
			} catch {
				let msg = await segment.record(data2.data.music)
				e.reply(msg)
			}
		} catch {
			e.reply('歌曲文件太大啦，发不出来，诶嘿')
		}
		await SendMusicShare(e, { name: data2.data.song, artist: data2.data.singer, pic: data2.data.picture, link: "https://y.qq.com/n/ryqq/songDetail/", url: data2.data.music })


	}
	async txck(e) {

		let ckxx = YAML.parse(
			fs.readFileSync('./plugins/earth-k-plugin/config/config.yaml', 'utf8')
		);
		let ck = e.msg.replace(/#填写网易ck/g, "").trim()
		ckxx.wyck = ck

		fs.writeFileSync('./plugins/earth-k-plugin/config/config.yaml', YAML.stringify(ckxx));
		e.reply('填写网易云ck成功')
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
		msg3 = "https://www.tukuai.one/m1907.html?m1907jx=" + "https:" + data3
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
		let ckxx = YAML.parse(
			fs.readFileSync('./plugins/earth-k-plugin/config/config.yaml', 'utf8')
		);
		wyck = ckxx.wyck


		const urlList = {
			qq: 'http://datukuai.top:1450/djs/API/QQ_Music/api.php?msg=paramsSearch&limit=30',
			kugou:
				'http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=paramsSearch&page=1&pagesize=10&showtype=1',
			wangyiyun: 'http://datukuai.top:3000/search?keywords=paramsSearch',//备用API：http://www.clearfor.xyz:3000/cloudsearch?keywords=paramsSearch
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

		if (e.msg.includes("qq")) {
			isQQ = 1
		} else if (e.msg.includes("酷狗")) {
			isKugou = 1
		} else {
			isWangYiyun = 1
		}

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

		msg = msg.replace(/[非VIP|点歌|qq|QQ|酷狗|网易云|网抑云]/g, "");
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


			}
			console.log(id)
			console.log(isWangYiyun)

			if (Number(id) > 0) {

				if (qq) {
					let url = urlList[apiName].replace("paramsSearch", msg2)
					url = url + '&n=' + String(id) + '&br=7'

					let response2 = await fetch(url);
					const data2 = await response2.json();



					try {
						try {
							let msg = await uploadRecord(data2.data.music, 0, false)
							e.reply(msg)
						} catch {
							let msg = await segment.record(data2.data.music)
							e.reply(msg)
						}


					} catch {
						e.reply('歌曲文件太大啦，发不出来，诶嘿')

					}

					await SendMusicShare(e, { name: data[id - 1].song, artist: data[id - 1].singers, pic: data[id - 1].picture, link: "https://y.qq.com/n/ryqq/songDetail/", url: data2.data.music })

					qq = 0
					zt = 0
					id = ""

					return



				}
				if (isKugou) {

					let url = `https://wenxin110.top/api/kugou_music?msg=${msg}&n=${id}`
					let res = await fetch(url)
					let jieguo = await res.text()
					jieguo = jieguo.replace(/±/g, "")
					jieguo = jieguo.replace(/\\/g, "")
					jieguo = jieguo.replace(/img=/g, "")
					//	jieguo = jieguo.replace(/歌名：/g, "")
					//	jieguo = jieguo.replace(/歌手：/g, "")
					jieguo = jieguo.replace(/播放地址：/g, "")
					let shuju = jieguo.split('n')

					let msg2 = await segment.record(shuju[3])


					e.reply(msg2)

					await SendMusicShare(e, { source: 'kugou', name: shuju[1], artist: shuju[2], pic: shuju[0], link: "http://www.kugou.com/song", url: shuju[3] })
					let mp3 = jieguo.match(/src="https(\S*).mp3/g);
					console.log(jieguo)
					console.log(shuju)
					zt = 0
					id = ""
					return


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



				bj = String(result)



				data1 = {
					tplFile: './plugins/earth-k-plugin/resources/html/ShareMusic/ShareMusic.html',
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



			if (isKugou & id == "") {
				for (let i = 0; i < data.info.length; i++) {
					xvhao = xvhao + String(i + 1) + ","
					song = song + data.info[i].songname + ","
					zuozhe = zuozhe + data.info[i].singername + ","
				}



				let data1 = {}
				let ml = process.cwd()
				let bj = ""
				const min = 1;                            //最小值
				const max = 13;                            //最大值
				const range = max - min;                         //取值范围差
				const random = Math.random();                     //小于1的随机数
				const result = min + Math.round(random * range);  //最小数加随机数*范围差 



				bj = String(result)



				data1 = {
					tplFile: './plugins/earth-k-plugin/resources/html/ShareMusic/ShareMusic.html',
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


				bj = String(result)

				data1 = {
					tplFile: './plugins/earth-k-plugin/resources/html/ShareMusic/ShareMusic.html',

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


			if (id != "" & isWangYiyun) {
				//let response = await fetch(`http://music.163.com/song/media/outer/url?id=${songList[Number(id) - 1].id}`);
				//const data = await response;
				//if (!data?.url) return true
				let ids = String(songList[Number(id) - 1].id)
				console.log(ids)
				let url = 'http://music.163.com/song/media/outer/url?id=' + ids



				let options = {
					method: 'POST',//post请求 
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; MI Build/SKQ1.211230.001)',
						'Cookie': 'versioncode=8008070; os=android; channel=xiaomi; ;appver=8.8.70; ' + "MUSIC_U=" + wyck
					},
					body: `ids=${JSON.stringify([ids])}&level=standard&encodeType=mp3`
				};
				let response = await fetch('https://music.163.com/api/song/enhance/player/url/v1', options); //调用接口获取数据

				let res = await response.json(); //结果json字符串转对象

				if (res.code == 200) {
					url = res.data[0]?.url;
					url = url ? url : '';
				}


				console.log(url)


				try {
					let msg = await uploadRecord(url, 0, false)
					e.reply(msg)
				} catch {
					let msg2 = await segment.record(url)

					await e.reply(msg2)
				}

				await SendMusicShare(e,{source: 'netease',name:songList[id-1].name,artist:songList[id-1].artists[0].name,pic:songList[id-1].artists[0].img1v1Url,link:'https://music.163.com/#/song?id='+ids,url:url})

				zt = 0
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

			nickname: e.bot.nickname,
			user_id: e.bot.uin,
		});
	}
	msgList.push({
		message: "请发送你要听的序列号的歌曲，例如 #听1",

		nickname: e.bot.nickname,
		user_id: e.bot.uin,
	})
	if (msgList.length == 0) {
		console.log(msgList.length)
		await e.reply(msgList[0].message);
	}
	else {


		await e.reply(await common.makeForwardMsg(e, msgList))
	}
	return;
}

async function SendMusicShare(e, data, to_uin = null) {
	if (!e.bot.sendOidb) return false

	let appid, appname, appsign, style = 4;
	switch (data.source) {
		case 'netease':
			appid = 100495085, appname = "com.netease.cloudmusic", appsign = "da6b069da1e2982db3e386233f68d76d";
			break;
		case 'kuwo':
			appid = 100243533, appname = "cn.kuwo.player", appsign = "bf9ff4ffb4c558a34ee3fd52c223ebf5";
			break;
		case 'kugou':
			appid = 205141, appname = "com.kugou.android", appsign = "fe4a24d80fcf253a00676a808f62c2c6";
			break;
		case 'migu':
			appid = 1101053067, appname = "cmccwm.mobilemusic", appsign = "6cdc72a439cef99a3418d2a78aa28c73";
			break;
		case 'qq':
		default:
			appid = 100497308, appname = "com.tencent.qqmusic", appsign = "cbd27cd7c861227d013a25b2d10f0799";
			break;
	}

	var title = data.name, singer = data.artist, prompt = '[分享]', jumpUrl, preview, musicUrl;

	let types = [];
	if (data.url == null) { types.push('url') };
	if (data.pic == null) { types.push('pic') };
	if (data.link == null) { types.push('link') };
	if (types.length > 0 && typeof (data.api) == 'function') {
		let { url, pic, link } = await data.api(data.data, types);
		if (url) { data.url = url; }
		if (pic) { data.pic = pic; }
		if (link) { data.link = link; }
	}

	typeof (data.url) == 'function' ? musicUrl = await data.url(data.data) : musicUrl = data.url;
	typeof (data.pic) == 'function' ? preview = await data.pic(data.data) : preview = data.pic;
	typeof (data.link) == 'function' ? jumpUrl = await data.link(data.data) : jumpUrl = data.link;

	if (typeof (musicUrl) != 'string' || musicUrl == '') {
		style = 0;
		musicUrl = '';
	}

	prompt = '[分享]' + title + '-' + singer;

	let recv_uin = 0;
	let send_type = 0;
	let recv_guild_id = 0;
	let ShareMusic_Guild_id = false;

	if (e.isGroup && to_uin == null) {//群聊
		recv_uin = e.group.gid;
		send_type = 1;
	} else if (e.guild_id) {//频道
		recv_uin = Number(e.channel_id);
		recv_guild_id = BigInt(e.guild_id);
		send_type = 3;
	} else if (to_uin == null) {//私聊
		recv_uin = e.friend.uid;
		send_type = 0;
	} else {//指定号码私聊
		recv_uin = to_uin;
		send_type = 0;
	}

	let body = {
		1: appid,
		2: 1,
		3: style,
		5: {
			1: 1,
			2: "0.0.0",
			3: appname,
			4: appsign,
		},
		10: send_type,
		11: recv_uin,
		12: {
			10: title,
			11: singer,
			12: prompt,
			13: jumpUrl,
			14: preview,
			16: musicUrl,
		},
		19: recv_guild_id
	};


	let payload = await e.bot.sendOidb("OidbSvc.0xb77_9", core.pb.encode(body));

	let result = core.pb.decode(payload);

	if (result[3] != 0) {
		e.reply('歌曲分享失败：' + result[3], true);
	}
}
