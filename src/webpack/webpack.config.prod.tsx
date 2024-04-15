const commonConfigProd = require('./webpack.common');

function executeConfigProd(mode: string, args: Record<string, any>) {
  return commonConfigProd.executeCommonConfig(mode, args);
}

module.exports = {
  executeConfigProd: executeConfigProd.bind(this)
};