const react = require('@vitejs/plugin-react');
const pathVite = require('path');
const dotenv = require('dotenv');
const { visualizer } = require('rollup-plugin-visualizer');
const customHtmlPlugin = require('./customVitePluginHtml').customHtmlPlugin;
const fs = require('fs');
const { checker } = require('vite-plugin-checker');

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
      /*fs.rmdirSync(dirPath); // Remove the now-empty folder
      console.log("Deleted folder: ".concat(dirPath));*/
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
function updateIndexHtml(oldPath: string, newPath: string, buildFilesPath: string) {
  fs.readFile(oldPath, 'utf8', function (err: any, data: any) {
      if (err) {
          console.error('Error reading file:', err);
          return;
      }
      let regex = new RegExp("..\/" + buildFilesPath, "g");
      var updatedData = data.replace(regex, buildFilesPath);

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
  var buildFilesPath = "bundles";
  var dirNameLibs = pathVite.resolve(__dirname, '../../../');
  var removeWarning = true;
  
  var envFilePath = pathVite.resolve(args.dirname, "./config/env/.env.".concat(mode));
  dotenv.config({ path: envFilePath });
  
  var distPath = pathVite.resolve(args.dirname, 'dist');
  var distEnvironmentPath = pathVite.join(distPath, 'dist_' + mode);
  var packageJson = JSON.parse(fs.readFileSync(pathVite.resolve(args.dirname, 'package.json'), 'utf-8'));
  
  var localHtmlPath = pathVite.resolve(args.dirname, 'public/indexVite.html');
  var publicHtmlPath = (dirNameLibs === args.dirname)
      ? pathVite.resolve(dirNameLibs, 'public/indexVite.html')
      : pathVite.resolve(args.dirname, 'node_modules/lib-components-react/lib/public/indexVite.html');
  
  copyFiles(publicHtmlPath, localHtmlPath);
  
  return {
      plugins: [
          react(),
          checker({ 
            typescript: true,
            overlay: isProduction ? false : removeWarning, // Prevents errors from showing in the browser overlay
            terminal: true, // Ensures errors appear only in the terminal 
          }),
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
                  updateIndexHtml(oldPath, newPath, buildFilesPath);
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
          'process.env': { ...process.env, APP_VERSION: packageJson.version }
      },
      optimizeDeps: {
        exclude: [dirNameLibs], // Avoid processing the library itself
      },
      build: {
          outDir: distEnvironmentPath,
          assetsDir: buildFilesPath,
          sourcemap: isProduction ? false : true,
          minify: isProduction ? 'esbuild' : false,
          rollupOptions: {
              output: {
                  entryFileNames: buildFilesPath + "/js/[name].js",
                  chunkFileNames: buildFilesPath + "/js/[name]-[hash].js",
                  assetFileNames: function ({ name }: any) {
                      if (/\.(gif|jpe?g|png|svg)$/.test(name !== null && name !== void 0 ? name : '')) {
                          return buildFilesPath + '/images/[name]-[hash][extname]';
                      }
                      if (/\.css$/.test(name !== null && name !== void 0 ? name : '')) {
                          return buildFilesPath + '/css/[name]-[hash][extname]';
                      }
                      return buildFilesPath + '/assets/[name]-[hash][extname]';
                  },
                  manualChunks: function (id: string) {
                      if (id.includes('node_modules')) {
                          if (id.includes('primereact/datatable'))
                              return 'vendor-primereact-datatable';
                          if (id.includes('highcharts'))
                              return 'vendor-highcharts';
                          if (id.includes('primereact'))
                              return 'vendor-primereact';
                          if (id.includes('@fortawesome'))
                              return 'vendor-fontawesome';
                          if (id.includes('moment'))
                              return 'vendor-moment';
                          if (id.includes('axios'))
                              return 'vendor-axios';
                          if (id.includes('core-js'))
                              return 'vendor-core-js';
                          if (id.includes('lodash'))
                              return 'vendor-lodash';

                          return 'vendor'; // Other vendor libraries
                      }
                  },
              },
          },
          commonjsOptions: {
            include: [/node_modules/], // Ensure dependencies come from main project
          },
      },
      css: {
        preprocessorOptions: {
          scss: {
            quietDeps: removeWarning, // Suppresses warnings from dependencies
          },
        },
      },
      base: './',
      server: {
          port: 3000,
          open: true,
          host: 'localhost',
          fs: {
            allow: [
              args.dirname, // Allow access to the main project
              pathVite.resolve(dirNameLibs, 'node_modules') // Allow the library’s own dependencies
            ]
          }
      },
  };
}

module.exports = {
  executeCommonConfig: executeViteCommonConfig.bind(this),
};