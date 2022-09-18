import moment from "moment";
import lodash from "lodash";
import base from "./base.js";

export default class Version extends base {
  constructor(e) {
    super(e);
    this.model = "version";
  }

  /** 生成版本信息图片 */
  async getData(versionData) {
    const version =
      (versionData && versionData.length && versionData[0].version) || "1.0.0";
    let data = {
      ...this.screenData,
      userId: version,
      quality: 100,
      saveId: version,
      versionData: versionData,
    };
    return data;
  }
}
