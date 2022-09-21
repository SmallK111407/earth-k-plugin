import { segment } from "oicq";
import fetch from "node-fetch";

const _path = process.cwd();

export class ljrw extends plugin {
	constructor() {
		super({
			name: '了解人物',
			dsc: '了解人物',
			event: 'message',
			priority: 1000,
			rule: [
				{
					reg: "^#了解(.*)$",
					fnc: 'liaojie'
				}

			]
		})
	}

	async liaojie(e) {
		let dz = ""
		if (e.msg.includes("了解")) {

			dz = e.msg.replace(/#了解/g, "").trim()
		}
		console.log(dz)
		dz = _path + "/plugins/earth-k-plugin/resources/juese/" + dz + "/" + dz + ".png"
		let msg = segment.image(dz)
		e.reply(msg)
	}
}