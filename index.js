import fs from "node:fs";
import xxCfg from "./model/xxCfg.js";

const versionData = xxCfg.getdefSet("version", "version");

logger.info(`--------------------------`);
logger.info(`土块插件${versionData[0].version}初始化~`);
logger.info(`--------------------------`);

const files = fs
  .readdirSync("./plugins/earth-k-plugin/apps")
  .filter((file) => file.endsWith(".js"));

let apps = {};
for (let file of files) {
  let name = file.replace(".js", "");
  apps[name] = (await import(`./apps/${file}`))[name];
}

export { apps };
