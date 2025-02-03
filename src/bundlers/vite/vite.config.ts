const { PluginOption } = require('vite');
const react = require('@vitejs/plugin-react');
const pathVite = require('path');
const dotenv = require('dotenv');
const { visualizer } = require('rollup-plugin-visualizer');
var customHtmlPlugin = require('./customVitePluginHtml').customHtmlPlugin;
const fs = require('fs');

function removeDir(dirPath: string) {
  if (fs.existsSync(dirPath)) {
      fs.readdirSync(dirPath).forEach(function (file: string) {
          var curPath = pathVite.join(dirPath, file);
          if (fs.lstatSync(curPath).isDirectory()) {
              //removeDir(curPath); // Recursively delete subfolders
          }
          else {
              removeFile(dirPath, file); // Delete files
          }
      });
      //fs.rmdirSync(dirPath); // Remove the now-empty folder
      console.log("Deleted folder: ".concat(dirPath));
  }
}
function removeFile(distPath: string, fileName: string) {
  try {
    if (fs.existsSync(distPath + '/' + fileName)) {
      fs.unlinkSync(distPath + '/' + fileName);
      console.log("File \"".concat(fileName, "\" deleted successfully."));
    }
  }
  catch (error) {
      console.error("Error deleting file \"".concat(fileName, "\":"), error);
  }
}
function copyFiles(publicHtmlPath: string, localHtmlPath: string) {
  var localDir = pathVite.dirname(localHtmlPath);
  if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
  }
  if (!fs.existsSync(localHtmlPath)) {
      fs.copyFileSync(publicHtmlPath, localHtmlPath);
  }
}
function updateIndexHtml(oldPath: string, newPath: string) {
  fs.readFile(oldPath, 'utf8', function (err: any, data: any) {
      if (err) {
          console.error('Error reading file:', err);
          return;
      }
      var updatedData = data.replace(/\/assets/g, 'assets').replace(/\/css/g, 'css').replace(/\/js/g, 'js');
      fs.writeFile(newPath, updatedData, 'utf8', function (err: any) {
          if (err) {
              console.error('Error writing to file:', err);
              return;
          }
          console.log('File successfully updated');
      });
  });
}
function executeViteCommonConfig(enviroment: string, args: Record<string, any>) {
  
  console.log("Vite is running in ".concat(enviroment, " mode"));

  var mode = enviroment;
  var isProduction = mode === 'production';
  var dirNameLibs = pathVite.resolve(__dirname, '../../../');
  
  var envFilePath = pathVite.resolve(args.dirname, "./config/env/.env.".concat(mode));
  dotenv.config({ path: envFilePath });
  
  var distPath = pathVite.resolve(args.dirname, 'dist');
  var distEnvironmentPath = pathVite.join(distPath, 'dist_' + mode);
  
  var localHtmlPath = pathVite.resolve(args.dirname, 'public/indexVite.html');
  var publicHtmlPath = (dirNameLibs === args.dirname)
      ? pathVite.resolve(dirNameLibs, 'public/indexVite.html')
      : pathVite.resolve(args.dirname, 'node_modules/lib-components-react/lib/public/indexVite.html');
  
  copyFiles(publicHtmlPath, localHtmlPath);
  
  return {
      plugins: [
          react(),
          visualizer({
              open: false,
              filename: 'dist/report_' + mode + '.html',
              gzipSize: true,
              brotliSize: true,
          }),
          customHtmlPlugin({
              minify: isProduction,
              entry: '/src/index.tsx',
              template: 'public/indexVite.html',
              inject: {
                  data: {
                      title: args.htmlTitle,
                  },
              },
          }),
          {
              name: 'rename-index-html',
              closeBundle: function () {
                  var distPath = pathVite.resolve(args.dirname, distEnvironmentPath);
                  var oldPath = pathVite.join(distPath, 'public/indexVite.html');
                  var newPath = pathVite.join(distPath, 'index.html');
                  updateIndexHtml(oldPath, newPath);
                  removeDir(pathVite.join(distPath, 'public'));
                  removeFile(distPath, 'indexWebpack.html');
                  removeFile(distPath, 'indexVite.html');
              },
          },
      ],
      resolve: {
          alias: {
              '@app': pathVite.resolve(args.dirname, './src'),
              src: pathVite.resolve(args.dirname, './src'),
          },
      },
      define: {
          'process.env': process.env,
      },
      build: {
          outDir: distEnvironmentPath,
          assetsDir: 'assets',
          sourcemap: isProduction ? false : true,
          minify: isProduction ? 'esbuild' : false,
          rollupOptions: {
              output: {
                  entryFileNames: "js/[name].js",
                  chunkFileNames: "js/[name]-[hash].js",
                  assetFileNames: function ({ name }: any) {
                      if (/\.(gif|jpe?g|png|svg)$/.test(name !== null && name !== void 0 ? name : '')) {
                          return 'images/[name]-[hash][extname]';
                      }
                      if (/\.css$/.test(name !== null && name !== void 0 ? name : '')) {
                          return 'css/[name]-[hash][extname]';
                      }
                      return 'assets/[name]-[hash][extname]';
                  },
              },
          },
      },
      server: {
          port: 3000,
          open: true,
          host: 'localhost',
      },
  };
}

module.exports = {
  executeCommonConfig: executeViteCommonConfig.bind(this),
};