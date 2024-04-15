const commonConfigDev = require('./webpack.common');

function executeConfigDev(mode: string, args: Record<string, any>) {
  return commonConfigDev.executeCommonConfig(mode, args);
}

module.exports = {
  executeConfigDev: executeConfigDev.bind(this)
};