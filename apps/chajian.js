import plugin from '../../../lib/plugins/plugin.js'
import _ from 'lodash'
import {
  createRequire
}
  from 'module'
import fs from 'fs'
const require = createRequire(import.meta.url)
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import path from 'path'
import PluginsLoader from '../model/loader.js'
let jsonData = []
let mulu = []
let ml = process.cwd()
export class example extends plugin {
  constructor() {
    super({
      /** 功能名称 */
      name: '土块插件管理1',
      /** 功能描述 */
      dsc: '土块插件管理',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message',
      /** 优先级，数字越小等级越高 */
      priority: 1145,
      rule: [
        {
          /** 命令正则匹配 */
          reg: "^#查看安装插件|#查看所有插件|#查看未装插件", //匹配消息正则,命令正则
          /** 执行方法 */
          fnc: 'guanli'
        }, {
          reg: "^#安装插件", //匹配消息正则,命令正则
          /** 执行方法 */
          fnc: 'azcj'
        }, {
          reg: "^#插件详细", //匹配消息正则,命令正则
          /** 执行方法 */
          fnc: 'cjxx'
        }
      ]
    })
  }
  /**

   */
  async cjxx(e) {

    const fs = require('fs');
    const folderPath = './plugins/';
    const items = fs.readdirSync(folderPath);
    let n = e.msg.replace(/#插件详细/g, "").trim()
    let cjsj = await PluginsLoader.load()

    const folderNames = items.filter(item => fs.statSync(`${folderPath}/${item}`).isDirectory());
    mulu = folderNames
    let bt = mulu[n - 1]
    let id = ''
    id = cjsj.filter(obj => obj.key.includes(bt));
    //   console.log(id)
    if (e.msg == '#插件详细目录') {
      bt = '插件详细目录'
      let data1 = {
        tplFile: './plugins/earth-k-plugin/resources/html/cjb/cjxqml.html',
        dz: ml,
        shuju: mulu,
        url: "https://www.loliapi.com/acg/pe",
        bt: bt
      }
      let img = await puppeteer.screenshot("123", {
        ...data1,
      });
      e.reply(img)
      return
    }
    let data1 = {
      tplFile: './plugins/earth-k-plugin/resources/html/cjb/cjxq.html',
      dz: ml,
      shuju: id,
      url: "https://www.loliapi.com/acg/pe",
      bt: bt
    }
    let img = await puppeteer.screenshot("123", {
      ...data1,
    });
    e.reply(img)

    // console.log(PluginsLoader.priority)

  }
  async azcj(e) {
    if(!e.isMaster){
      return false
    }

    fs.readFile('./plugins/earth-k-plugin/resources/html/cjb/zsj.json', 'utf8', async (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }

      jsonData = JSON.parse(data);
      let n = e.msg.replace(/#安装插件/g, "").trim()
      let lj = jsonData[n - 1].lianjie

      let cmd = `cd ${ml}/plugins/ && git clone ${lj}.git`
      console.log(cmd)

      var os = new chuli();
      e.reply(`正在安装${jsonData[n - 1].chajian}中`)
      try {
        let shuchu = await os.execCommand(cmd)


      } catch {
        e.reply('安装失败，可能你已经安装了这个插件，或者连不上github')
        return
      }


      e.reply('安装完成，正在安装依赖')

      cmd = `pnpm i`
      await os.execCommand(cmd)
      e.reply('依赖安装完成，重启后生效')



    })



    return


  }
  async guanli(e) {
    const fs = require('fs');

    const folderPath = './plugins/';


    try {
      const items = fs.readdirSync(folderPath);
      const folderNames = items.filter(item => fs.statSync(`${folderPath}/${item}`).isDirectory());


      mulu = folderNames
      console.log(mulu);
      let shuju = []
      fs.readFile('./plugins/earth-k-plugin/resources/html/cjb/zsj.json', 'utf8', async (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }



        jsonData = JSON.parse(data);


        let bt = ''
        if (e.msg == "#查看所有插件") {

          for (let i = 0; i < mulu.length; i++) {
            let id = ''
            id = jsonData.findIndex(obj => obj.chajian.includes(mulu[i]));
            if(id != -1){
              jsonData[id].yz = 1
            }
            shuju = jsonData
            

        
           console.log(id)
         
          }



          shuju = jsonData
          bt = "所有插件"
        }
        if (e.msg == "#查看安装插件") {
          for (let i = 0; i < mulu.length; i++) {
            let id = ''
            id = jsonData.filter(obj => obj.chajian.includes(mulu[i]));

            if (id != '') {

              shuju.push(id[0])
            }
          }
          bt = "已安装插件"
        }
        if (e.msg == "#查看未装插件") {
          //console.log(jsonData)
          for (let i = 0; i < mulu.length; i++) {
            let id = ''
            id = jsonData.findIndex(obj => obj.chajian.includes(mulu[i]));
            if(id != -1){
              jsonData.splice(id, 1);
            }
            

        
           console.log(id)
         
          }
          shuju = jsonData
          bt = "未安装插件"
        }



        


        let data1 = {
          tplFile: './plugins/earth-k-plugin/resources/html/cjb/cjb.html',
          dz: ml,
          shuju: shuju,
          url: "https://www.loliapi.com/acg/pe",
          bt: bt


        }

        let img = await puppeteer.screenshot("123", {
          ...data1,
        });
        e.reply(img)








        console.log(shuju);
      });


    } catch (err) {
      console.error(err);
    }




  }

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function getFolders(dir) {
  let folders = [];

  const files = fs.readdirSync(dir);
  files.forEach(function (file) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      folders.push(filePath);
      // 递归获取子文件夹
      const childFolders = getFolders(filePath);
      folders = folders.concat(childFolders);
    }
  });

  return folders;
}


class chuli {
  constructor() {
    const { exec } = require("child_process")
    this.execCommand = async (command) => {

      await new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`执行错误: ${error}`)
            reject(error)
            return error
          }
          //  console.log(`标准输出：${stdout}`)
          resolve()
        })
      })
    }
  }
}
