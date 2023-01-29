import plugin from "../../../lib/plugins/plugin.js";
import fetch from "node-fetch";
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import Tools from "../model/tools.js";

export class DonateRank extends plugin {
  constructor() {
    super({
      name: "[土块插件]发电榜",
      dsc: "发电",
      event: "message",
      priority: 1146,
      rule: [
        {
          reg: "^#*(土块)?发电榜$",
          fnc: "fdrank",
        },
        {
          reg: "^#*最近发电$",
          fnc: "lately",
        },
      ],
    });
  }

  async fdrank() {
    const fetchData = await fetch(
      "https://afdian.net/api/creator/get-sponsors?user_id=f2ae58dcb94f11ec9f6852540025c377&type=amount&page=1"
    );
    const fetchPageTwoData = await fetch(
      "https://afdian.net/api/creator/get-sponsors?user_id=f2ae58dcb94f11ec9f6852540025c377&type=amount&page=2"
    );
    const resJsonData = await fetchData.json();

    const resPageTwoJsonData = await fetchPageTwoData.json();

    const data = await new Tools(this.e).getRankData([
      ...resJsonData.data.list,
      ...resPageTwoJsonData.data.list,
    ]);

    let img = await puppeteer.screenshot("fdrank", {
      ...data,
      type: "rank",
      limitTop: 20,
    });
    this.e.reply(img);
  }
  async lately() {
    const fetchData = await fetch(
      "https://afdian.net/api/creator/get-sponsors?user_id=f2ae58dcb94f11ec9f6852540025c377&type=new&page=1"
    );
    const resJsonData = await fetchData.json();

    const data = await new Tools(this.e).getRankData(resJsonData.data.list);

    let img = await puppeteer.screenshot("fdrank", {
      ...data,
      type: "lately",
      limitTop: 10,
    });
    this.e.reply(img);
  }
}
