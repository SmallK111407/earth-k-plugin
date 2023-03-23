// 地球写的本地图片，后续有时间改成直接获取图片吧@曉K
import fetch from "node-fetch";
import fs from "fs"

const _path = process.cwd();

export class KnowAboutCharacter extends plugin {
  constructor() {
    super({
      name: '[土块插件]了解人物-本地图片',
      dsc: '了解人物',
      event: 'message',
      priority: 1145,
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
    dz = _path + "/plugins/earth-k-plugin/resources/img/KnowAboutCharacter-IMG/" + dz + ".jpg"


    fs.access(dz, fs.constants.F_OK | fs.constants.W_OK, (err) => {

      if (err) {

        e.reply('该角色正在筹备中，欸嘿')

      } else {

        let msg = segment.image(dz)
        e.reply(msg)
      }
    });
  }
}