import path from 'path';
const configDev = require("../../../src/bundlers/vite/vite.config.ts");

module.exports = (arg: Record<string, any>, env: Record<string, any>) => {

  console.log("Vite config dev");

  const mode = "development";
  const htmlTitle = "html title dev";
  const dirname = path.resolve(__dirname, '../../../');

  let mainVite = configDev.executeCommonConfig(mode, { htmlTitle: htmlTitle, dirname: dirname });

  return mainVite;
};  