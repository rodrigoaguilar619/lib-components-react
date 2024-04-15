const configDev = require("../../src/webpack/webpack.config.dev.tsx");

module.exports = (arg: Record<string, any>, env: Record<string, any>) => {

  const mode = "development";
  const htmlTitle = "html title dev";
  const dirname = __dirname;

  let mainWebpack = configDev.executeConfigDev(mode, { htmlTitle: htmlTitle, dirname: dirname });

  console.log("Webpack config dev", JSON.stringify(mainWebpack, null, 2));
  return mainWebpack;
}