import fetch from 'node-fetch'
import { segment } from 'oicq'
import plugin from '../../../lib/plugins/plugin.js'
const genshinSpeakers = ['派蒙', '凯亚', '安柏', '丽莎', '琴', '香菱', '枫原万叶', '迪卢克', '温迪', '可莉', '早柚', '托马', '芭芭拉', '优菈', '云堇', '钟离', '魈', '凝光', '雷电将军', '北斗', '甘雨', '七七', '刻晴', '神里绫华', '戴因斯雷布', '雷泽', '神里绫人', '罗莎莉亚', '阿贝多', '八重神子', '宵宫', '荒泷一斗', '九条裟罗', '夜兰', '珊瑚宫心海', '五郎', '散兵', '女士', '达达利亚', '莫娜', '班尼特', '申鹤', '行秋', '烟绯', '久岐忍', '辛焱', '砂糖', '胡桃', '重云', '菲谢尔', '诺艾尔', '迪奥娜', '鹿野院平藏']
// 生成时使用的 noise_factor，可用于控制感情等变化程度。默认为0.667。
const noise = 0.667
// 生成时使用的 noise_factor_w，可用于控制音素发音长度变化程度。默认为0.8。
const noisew = 0.8
// 生成时使用的 length_factor，可用于控制整体语速。默认为1.2。
const length = 1.3
export class fdyy extends plugin {
  constructor () {
    super({
      name: '复读',
      dsc: '复读用户发送的内容',
    
      event: 'message',
      priority: 6001,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^(.*?)',
          /** 执行方法 */
          fnc: 'repeat'
        }
      ]
    })
  }

  /** 复读 */
  async repeat (e) {
	  const min    = 0;                            //最小值
let max    = genshinSpeakers.length;                            //最大值
let range  = max - min;                         //取值范围差
let random = Math.random();                     //小于1的随机数
let result = min + Math.round(random * range);  //最小数加随机数*范围差 
let js = genshinSpeakers[result-1]

max = 5
range  = max - min; 
random = Math.random();
let cf =  Math.round(random * range)
console.log(cf)
let msg = e.msg
console.log(js)
	console.log(msg)	 
	  if(cf == 1 & msg != undefined){
		  
		  
	  
	  
          e.reply([segment.record(`http://233366.proxy.nscc-gz.cn:8888/?text=${encodeURI(msg)}&speaker=${encodeURI(js)}&noise=${noise}&noisew=${noisew}&length=${length}`)])
      
    
	  }
	  
	  
	  
	  
}
}
