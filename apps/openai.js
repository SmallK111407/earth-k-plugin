import fetch from "node-fetch";
import YAML from 'yaml';
import _ from 'lodash';
import fs from 'fs';

let bot = "机器人" //这里是你要触发的关键词
let msgData = []
let res = ""
let sign = ""
let js = '纳西妲'
let keycx = YAML.parse(
  fs.readFileSync('./plugins/earth-k-plugin/config/config.yaml', 'utf8')
);
let key = keycx.key

export class example extends plugin {
  constructor() {
    super({
      /** 功能名称 */
      name: 'openai',
      /** 功能描述 */
      dsc: 'chatgpt from openai',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message',
      /** 优先级，数字越小等级越高 */
      priority: 1150,
      rule: [{
        /** 命令正则匹配 */
        reg: `^${bot}`, //匹配消息正则,命令正则
        /** 执行方法 */
        fnc: 'sjha'
      }, {
        /** 命令正则匹配 */
        reg: "#结束对话", //匹配消息正则,命令正则
        /** 执行方法 */
        fnc: 'czdg'
      }, {
        /** 命令正则匹配 */
        reg: `^老度(.*)`, //匹配消息正则,命令正则
        /** 执行方法 */
        fnc: 'ld'
      }, {
        /** 命令正则匹配 */
        reg: `^老星(.*)`, //匹配消息正则,命令正则
        /** 执行方法 */
        fnc: 'xx'
      }, {
        /** 命令正则匹配 */
        reg: `^老原(.*)`, //匹配消息正则,命令正则
        /** 执行方法 */
        fnc: 'ly'
      }, {
        reg: "^#填写key(.*)$",
        fnc: 'txkey'
      }]
    })
  }

  async txkey(e) {
    let keycx = YAML.parse(
      fs.readFileSync('./plugins/earth-k-plugin/config/config.yaml', 'utf8')
    )
    let txkey = e.msg.replace(/#填写key/g, "").trim()
    keycx.key = txkey
    fs.writeFileSync('./plugins/earth-k-plugin/config/config.yaml', YAML.stringify(keycx));
    e.reply('填写桑帛云key成功')
  }

  async ly(e) {
    if(e.msg.includes('老原角色')) {
      js = e.msg.replace(/老原角色/, "").trim()
      e.reply('角色切换至' + js)
      return
    }
    let kw = e.msg.replace(/老原/, "").trim()
    let url = 'https://api.caonm.net/api/ai/ya?key=' + key + '&length=1.1&speaker=' + js + '&msg=' + kw
    let res = await fetch(url)
    res = await res.json()
    console.log
    let msg2 = await uploadRecord(res.data.output, 0, false)
    //msg2 = await segment.record(res.data.output)
    e.reply(msg2)
  }

  //https://api.caonm.net/api/ai/ya?key='+key+'&msg=%E4%BD%A0%E5%A5%BD
  async xx(e) {
    let kw = e.msg.replace(/老星/, "").trim()
    let url = 'https://api.caonm.net/api/ai/hx?key=' + key + '&message=' + kw
    let res = await fetch(url)
    res = await res.json()
    if(res.code == 203) {
      e.reply('呵，不想回答', true)
      return
    }
    e.reply(res.answer, true)
  }


  async ld(e) {
    let kw = e.msg.replace(/老度/, "").trim()
    let url = 'https://chat-ws.baidu.com/lg/api/use_stream?body={"app_id":"570f2782aa964cd4b30de5662e380424","input":"' + kw + '","input_type":"text"}'
    let res = await fetch(url, {
      "headers": {
        "cookie": 'BIDUPSID=5CD1694DA72789663587138D6D007AAF; PSTM=1666595150; BAIDUID=5CD1694DA72789663F398B6A48F39556:FG=1; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; H_WISE_SIDS=234020_216837_213346_214797_110085_243890_244715_254833_259298_261721_236312_256419_256223_264479_265615_265883_266361_266761_266188_265776_266847_256154_267898_259033_266714_268593_268695_268636_268031_268843_265986_259642_269391_200596_269731_269782_268237_269904_269770_270084_267066_256739_270340_270460_270517_264424_267529_270597_270548_270821_270922_270322_271019_270793_271120_270443_271173_271177_271193_268728_268987_269034_271226_267659_269296_271320_271350_265825_271470_266028_270482_269609_270102_271607_271727_271806_271865_270158_271986_268415_271813_269875_271938_271952_269289_269211_234295_234208_272082_271188_179347_272227_272230_270054_272278_271463_263618_266565_272054_272334_272366_267558_271145_272443_253022_271545_272078_271904_272675_270186_272609_272817_260335; H_PS_PSSID=36550_39226_39223_39097_39193_39040_39199_26350_39138_39224_39137_39100; BDUSS=NxVjU2aUtiaFUzQ2RCZ3dyU0tjZndINUtFQXVaSjR3Y1REcW80bzRqUEc1d3hsRVFBQUFBJCQAAAAAAAAAAAEAAAAoXjVOsa--57XEzbS4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMZa5WTGWuVkcG; BDUSS_BFESS=NxVjU2aUtiaFUzQ2RCZ3dyU0tjZndINUtFQXVaSjR3Y1REcW80bzRqUEc1d3hsRVFBQUFBJCQAAAAAAAAAAAEAAAAoXjVOsa--57XEzbS4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMZa5WTGWuVkcG; BDSFRCVID=e14OJexroG0JCA3fTJKquRPXJg57tPoTDYLEOwXPsp3LGJLVFXSxEG0Pts1-dEub6j3eogKK3mOTHR8F_2uxOjjg8UtVJeC6EG0Ptf8g0M5; H_BDCLCKID_SF=tbC8VCDKJDD3HnRv5t8_-4_tbh_X5-RLfa7gBh7F54nKDp0xyxbNDPK7y4cD-ljTygQM_C32Ln7xsMTsQJ5dBURQXxOU5tntQecvb-nN3KJmf-8lqtOp5tjBMGb-2-biWb7L2MbdLDnP_IoG2Mn8M4bb3qOpBtQmJeTxoUJ25DnJhhCGe6-aejcLjGDDq-jeHDrKBRbaHJOoDDvNDjOcy4LbKxnxJUTm0R7h-pcc-45CVMn_bT_b5h8e3-OkWUQ9babTQ-tbBp3k8MQDWhbWQfbQ0hOeJCrb36Ta_JFb5R7JOpkRhfnxyhjbQRPH-Rv92DQMVU52QqcqEIQHQT3m5-5bbN3ut6T2-DA_oKtaJIoP; ab_sr=1.0.1_ZTVmMDE3MDUwMjgwZDMzOTJmNTc4NzEyYmViZGYyNDA3MjM5MDIzMTIxYTNkYWQxNmJlZDA4MjJlMGZiZWRiMWQwOWZmYTZiNTJiMjVjOTNhNjNkNTliOGUyY2E3YTFjZGRhMDI2Y2ZlOGM4ZjBjYmQ3ZjUzYTdiZWY1ZGEwNmNmYzA4NGU2ODVjNDc3OGZmYTU3NzJjOGQyNGI3ZjFjMA==; delPer=0; PSINO=3; BA_HECTOR=810h0521aha0ak8124ah840f1iean6i1p; ZFY=lvQ69nY5oGIgWxcSQlv:AyH6:BuiF2ayk7SUuQRqgEhkY:C; BAIDUID_BFESS=5CD1694DA72789663F398B6A48F39556:FG=1; BDSFRCVID_BFESS=e14OJexroG0JCA3fTJKquRPXJg57tPoTDYLEOwXPsp3LGJLVFXSxEG0Pts1-dEub6j3eogKK3mOTHR8F_2uxOjjg8UtVJeC6EG0Ptf8g0M5; H_BDCLCKID_SF_BFESS=tbC8VCDKJDD3HnRv5t8_-4_tbh_X5-RLfa7gBh7F54nKDp0xyxbNDPK7y4cD-ljTygQM_C32Ln7xsMTsQJ5dBURQXxOU5tntQecvb-nN3KJmf-8lqtOp5tjBMGb-2-biWb7L2MbdLDnP_IoG2Mn8M4bb3qOpBtQmJeTxoUJ25DnJhhCGe6-aejcLjGDDq-jeHDrKBRbaHJOoDDvNDjOcy4LbKxnxJUTm0R7h-pcc-45CVMn_bT_b5h8e3-OkWUQ9babTQ-tbBp3k8MQDWhbWQfbQ0hOeJCrb36Ta_JFb5R7JOpkRhfnxyhjbQRPH-Rv92DQMVU52QqcqEIQHQT3m5-5bbN3ut6T2-DA_oKtaJIoP; RT="z=1&dm=baidu.com&si=6596daa3-94e1-4608-b37c-953b7462e843&ss=lln15ajb&sl=h&tt=jxh&bcn=https%3A%2F%2Ffclog.baidu.com%2Flog%2Fweirwood%3Ftype%3Dperf&ld=k1ky&nu=5dcxbb5g&cl=23qj"'
      }
    })
    let nr = await res.text()
    let msg = ''
    let nr2 = nr.match(/result":"(.*?)"}/g)
    for(let i = 0; i < nr2.length; i++) {
      nr2[i] = nr2[i].replace(/result":"/g, "").trim();
      nr2[i] = nr2[i].replace(/"}/g, "").trim();
      nr2[i] = nr2[i].replace(/\\n/g, "\n").trim();
      msg = msg + nr2[i]
    }
    console.log(nr2)
    e.reply(msg, true)
  }

  async czdg(e) {
    msgData = []
    res = {
      "id": 0
    }
    e.reply('重置聊天对话啦')
  }

  async sjha(e) {
    if(e.isMaster | e.isGroup) {
      let msg = _.trimStart(e.msg, bot)
      res = ''
      console.log('接口1')
      try {
        let msg = _.trimStart(e.msg, bot)
        msgData.push({
          role: "user",
          content: msg
        })
        let data = {
          messages: JSON.stringify(msgData),
          temperature: 1
        }
        let url = await fetch("https://chat.miaorun.dev/api/chat-stream", {
          "headers": {
            "content-type": "application/json",
          },
          "body": JSON.stringify(data),
          "method": "POST"
        });
        url = await url.text()
        //console.log(op)
        e.reply(url, true)
        msgData.push({
          "role": "assistant",
          "content": url
        })
        if(url == "抱歉，该问题含有敏感词信息，请换一个问题") {
          msgData = []
        }
      } catch {}
      if(res.length < 2) {
        return true
      }
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
