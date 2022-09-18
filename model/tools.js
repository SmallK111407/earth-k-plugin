import base from "./base.js";

export default class Tools extends base {
  constructor(e) {
    super(e);
    this.model = "tools";
  }

  async getRankData(rankData) {
    this.model = "fdrank";
    return {
      ...this.screenData,
      saveId: "fdrank",
      rankData,
    };
  }
}
