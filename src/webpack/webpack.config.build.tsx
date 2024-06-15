const commonConfigBuild = require('./webpack.common');

function executeConfigBuild(mode: string, args: Record<string, any>) {
  return commonConfigBuild.executeCommonConfig(mode, args);
}

module.exports = {
  executeConfigBuild: executeConfigBuild.bind(this)
};