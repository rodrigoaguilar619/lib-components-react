const configProd = require("../../src/webpack/webpack.config.build.tsx");

module.exports = (arg: Record<string, any>, env: Record<string, any>) => {

  const mode = "production";
  const htmlTitle = "html title prod";
  const dirname = __dirname;

  let mainWebpack = configProd.executeConfigBuild(mode, { htmlTitle: htmlTitle, dirname: dirname });

  console.log("Webpack config prod", JSON.stringify(mainWebpack, null, 2));
  return mainWebpack;
}