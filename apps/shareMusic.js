import fetch from 'node-fetch'
import { segment } from 'oicq'
import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from "../../..//lib/puppeteer/puppeteer.js";
import uploadRecord from '../../earth-k-plugin/model/uploadRecord.js'
import { core } from "oicq";
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
			priority: 1145,
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
			wangyiyun: 'http://110.41.21.181:3000/search?keywords=paramsSearch',//备用API：http://www.clearfor.xyz:3000/cloudsearch?keywords=paramsSearch
			//https://autumnfish.cn/search?keywords=paramsSearch
			//https://music.cyrilstudio.top/search?keywords=paramsSearch
			//自己的接口http://110.41.21.181:3000/search?keywords=
		}

		logger.info('[用户命令]', e.msg)
		
		
		let msg = e.msg.replace(/\s*/g, "");
		let isQQReg = new RegExp("^[非VIP]*点歌*(qq|QQ)(.*)$");
		let isKugouReg = new RegExp("^[非VIP]*点歌*(kugou|酷狗)(.*)$");
		let isWangYiyunReg = new RegExp("^[非VIP]*点歌*(网易云|网抑云)(.*)$");

		let isQQ = isQQReg.test(msg);
		let isKugou = isKugouReg.test(msg);
		let isWangYiyun = isWangYiyunReg.test(msg);
		
		
		
		
		if(e.msg.includes("qq")){
			isQQ =1
		}else if(e.msg.includes("酷狗")){
			isKugou =1
		}else{
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

			if (Number(id) > 0 ) {
				
				if (qq) {
					let url = urlList[apiName].replace("paramsSearch", msg2)
					url = url + String(id)
				
					let response2 = await fetch(url);
					const data2 = await response2.json();
					let ids = data2.data.Mid

					url = "https://y.qq.com/n/ryqq/songDetail/" + data2.data.Mid; //接口地址	
					let response3 = await fetch(url); //调用接口获取数据
					let res = await response3.text(); //结果json字符串转对象
					let n1 = res.indexOf('","id":') + 7
					let n2 = res.indexOf(',', n1)
					

					if (e.isPrivate) {
						e.friend.shareMusic("qq", Number(res.slice(n1, n2)))
						e.reply(segment.record(data2.data.music))
					
						qq = 0
						zt = 0
						id = ""

						zt = 0
						return
					} else if (e.isGroup) {
						let msg2 = await segment.record(data2.data.music)
					
						
						e.reply(msg2)
						
						await SendMusicShare(e,{name:data[id-1].song,artist:data[id-1].singers,pic:'',link:"https://y.qq.com/n/ryqq/songDetail/" + ids,url:data2.data.music})
					
						qq = 0
						zt = 0
						id = ""
						return
					}
				}
				if (e.isPrivate  & isKugou) {

					await e.friend.shareMusic(
						"kugou" ,
						 songList[id - 1].hash 
					);
					zt = 0
					id = ""
					return
				} else if (e.isGroup & isKugou) {
					e.group.shareMusic(
						 "kugou",
						songList[id - 1].hash 
						
						
					);
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
					zuozhe = zuozhe + songList[i].ar[0].name + ","
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
  

			if (id != "" & isWangYiyun) {
				//let response = await fetch(`http://music.163.com/song/media/outer/url?id=${songList[Number(id) - 1].id}`);
				//const data = await response;
				//if (!data?.url) return true
				let ids = String(songList[Number(id) - 1].id)
				 let url = 'http://music.163.com/song/media/outer/url?id=' + ids
				
					
						
						let options = {
							method: 'POST',//post请求 
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded',
								'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; MI Build/SKQ1.211230.001)',
								'Cookie': "MUSIC_U=f11856b5e1e0733298dfd65db11da2dc52682470c5f45b97aee0c42e58d7dcf4993166e004087dd3b034f4856c9c28f2f68e0d979b03f8bd54fc2ae22511ad8e85a5c329c77f5dcdd4dbf082a8813684"
							},
							body: `ids=${JSON.stringify([ids])}&level=standard&encodeType=mp3`
						};
						let response = await fetch('https://music.163.com/api/song/enhance/player/url/v1',options); //调用接口获取数据
						
						let res = await response.json(); //结果json字符串转对象
						
						if(res.code == 200){
							url = res.data[0]?.url;
							url = url ? url : '';
						}
					
				
				console.log(url)
				
				
				
				const music = await segment.record(url)
				let msg2 = await uploadRecord(url,0,false)
					
						
						
				
				await SendMusicShare(e,{source: 'netease',name:songList[id-1].name,artist:songList[id-1].ar[0].name,pic:songList[id-1].al.picUrl,link:'https://music.163.com/#/song?id='+ids,url:url})
				await e.reply(msg2)
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

async function SendMusicShare(e,data,to_uin = null){
	let appid, appname, appsign, style = 4;
	switch(data.source){
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
	if(data.url == null){types.push('url')};
	if(data.pic == null){types.push('pic')};
	if(data.link == null){types.push('link')};
	if(types.length > 0 && typeof(data.api) == 'function'){
		let {url,pic,link} = await data.api(data.data,types);
		if(url){data.url = url;}
		if(pic){data.pic = pic;}
		if(link){data.link = link;}
	}
	
	typeof(data.url) == 'function' ? musicUrl = await data.url(data.data) : musicUrl = data.url;
	typeof(data.pic) == 'function' ? preview = await data.pic(data.data) : preview = data.pic;
	typeof(data.link) == 'function' ? jumpUrl = await data.link(data.data) : jumpUrl = data.link;
	
	if(typeof(musicUrl) != 'string' || musicUrl == ''){
		style = 0;
		musicUrl = '';
	}
	
	prompt = '[分享]' + title + '-' + singer;
	
	let recv_uin = 0;
	let send_type = 0;
	let recv_guild_id = 0;
	let ShareMusic_Guild_id = false;
	
	if(e.isGroup && to_uin == null){//群聊
		recv_uin = e.group.gid;
		send_type = 1;
	}else if(e.guild_id){//频道
		recv_uin = Number(e.channel_id);
		recv_guild_id = BigInt(e.guild_id);
		send_type = 3;
	}else if(to_uin == null){//私聊
		recv_uin = e.friend.uid;
		send_type = 0;
	}else{//指定号码私聊
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
	
	
	let payload = await Bot.sendOidb("OidbSvc.0xb77_9", core.pb.encode(body));
	
	let result = core.pb.decode(payload);

	if(result[3] != 0){
		e.reply('歌曲分享失败：'+result[3],true);
	}
}


