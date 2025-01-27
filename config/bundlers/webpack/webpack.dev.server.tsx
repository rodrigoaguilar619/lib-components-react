const configServer = require("../../../src/bundlers/webpack/webpack.config.server.tsx");

module.exports = (arg: Record<string, any>, env: Record<string, any>) => {

  const mode = "development";
  const htmlTitle = "html title dev server";
  const dirname = __dirname;

  let mainWebpack = configServer.executeConfigServer(mode, { htmlTitle: htmlTitle, dirname: dirname });

  console.log("Webpack config dev server", JSON.stringify(mainWebpack, null, 2));
  return mainWebpack;
}