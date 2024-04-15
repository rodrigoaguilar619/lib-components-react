const pathDevServer = require('path');
const commonConfigDevServer = require('./webpack.common');

function executeConfigDevServer(mode: string, args: Record<string, any>) {
  let webpackConfig = commonConfigDevServer.executeCommonServerConfig(mode, args);
  webpackConfig.devServer = {
    static: {
      directory: pathDevServer.join(args.dirname, '../../dist'),
    },
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/index.html' },
        { from: /^\/subpage/, to: '/index.html' },
      ],
    },
    port: 3000,
    host: '0.0.0.0',
    hot: true
  }

  return webpackConfig;
}

module.exports = {
  executeConfigDevServer: executeConfigDevServer.bind(this)
};