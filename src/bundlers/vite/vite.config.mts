import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { visualizer } from 'rollup-plugin-visualizer';
import { checker } from 'vite-plugin-checker';
import { customHtmlPlugin } from './customVitePluginHtml.mjs';

// __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vendorMap = [
  { key: 'primereact/datatable', label: 'vendor-primereact-datatable' },
  { key: 'highcharts', label: 'vendor-highcharts' },
  { key: 'primereact', label: 'vendor-primereact' },
  { key: '@fortawesome', label: 'vendor-fontawesome' },
  { key: 'moment', label: 'vendor-moment' },
  { key: 'axios', label: 'vendor-axios' },
  { key: 'core-js', label: 'vendor-core-js' },
  { key: 'lodash', label: 'vendor-lodash' },
];

// File/folder utilities
function removeDir(dirPath: string) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file: string) => {
      const curPath = path.join(dirPath, file);
      if (!fs.lstatSync(curPath).isDirectory()) {
        removeFile(dirPath, file);
      }
    });
  }
}

function removeFile(distPath: string, fileName: string) {
  try {
    const fullPath = path.join(distPath, fileName);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`File "${fileName}" deleted successfully.`);
    }
  } catch (error) {
    console.error(`Error deleting file "${fileName}":`, error);
  }
}

function copyFiles(publicHtmlPath: string, localHtmlPath: string) {
  const localDir = path.dirname(localHtmlPath);
  if (!fs.existsSync(localDir)) {
    fs.mkdirSync(localDir, { recursive: true });
  }
  if (!fs.existsSync(localHtmlPath)) {
    fs.copyFileSync(publicHtmlPath, localHtmlPath);
  }
}

function updateIndexHtml(oldPath: string, newPath: string, buildFilesPath: string) {
  fs.readFile(oldPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    const regex = new RegExp(`../${buildFilesPath}`, 'g');
    const updatedData = data.replace(regex, buildFilesPath);
    fs.writeFile(newPath, updatedData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return;
      }
      console.log('File successfully updated');
    });
  });
}

// Main exported config function
export function executeCommonConfig(enviroment: string, args: Record<string, any>) {
  console.log(`Vite is running in ${enviroment} mode`);

  const mode = enviroment;
  const isProduction = mode === 'production';
  const buildFilesPath = 'bundles';
  const dirNameLibs = path.resolve(__dirname, '../../../');
  const removeWarning = true;

  const envFilePath = path.resolve(args.dirname, `./config/env/.env.${mode}`);
  dotenv.config({ path: envFilePath });

  const distPath = path.resolve(args.dirname, 'dist');
  const distEnvironmentPath = path.join(distPath, 'dist_' + mode);
  const packageJson = JSON.parse(fs.readFileSync(path.resolve(args.dirname, 'package.json'), 'utf-8'));

  const localHtmlPath = path.resolve(args.dirname, 'public/indexVite.html');
  const publicHtmlPath = dirNameLibs === args.dirname
    ? path.resolve(dirNameLibs, 'public/indexVite.html')
    : path.resolve(args.dirname, 'node_modules/lib-components-react/lib/public/indexVite.html');

  copyFiles(publicHtmlPath, localHtmlPath);

  return {
    plugins: [
      react(),
      checker({
        typescript: true,
        overlay: isProduction ? false : removeWarning,
        terminal: true,
      }),
      visualizer({
        open: false,
        filename: `dist/report_${mode}.html`,
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
        closeBundle() {
          const distPathResolved = path.resolve(args.dirname, distEnvironmentPath);
          const oldPath = path.join(distPathResolved, 'public/indexVite.html');
          const newPath = path.join(distPathResolved, 'index.html');
          updateIndexHtml(oldPath, newPath, buildFilesPath);
          removeDir(path.join(distPathResolved, 'public'));
          removeFile(distPathResolved, 'indexWebpack.html');
          removeFile(distPathResolved, 'indexVite.html');
        },
      },
    ],
    resolve: {
      alias: {
        '@app': path.resolve(args.dirname, './src'),
        src: path.resolve(args.dirname, './src'),
      },
    },
    define: {
      'process.env': {
        ...process.env,
        APP_VERSION: packageJson.version,
      },
    },
    optimizeDeps: {
      exclude: [dirNameLibs],
    },
    build: {
      outDir: distEnvironmentPath,
      assetsDir: buildFilesPath,
      sourcemap: !isProduction,
      minify: isProduction ? 'esbuild' : false,
      rollupOptions: {
        output: {
          entryFileNames: `${buildFilesPath}/js/[name].js`,
          chunkFileNames: `${buildFilesPath}/js/[name]-[hash].js`,
          assetFileNames({ name }: { name?: string }) {
            if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
              return `${buildFilesPath}/images/[name]-[hash][extname]`;
            }
            if ((name ?? '').endsWith('.css')) {
              return `${buildFilesPath}/css/[name]-[hash][extname]`;
            }
            return `${buildFilesPath}/assets/[name]-[hash][extname]`;
          },
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              const match = vendorMap.find(({ key }) => id.includes(key));
              return match ? match.label : 'vendor';
            }
          },
        },
      },
      commonjsOptions: {
        include: [/node_modules/],
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: removeWarning,
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
          args.dirname,
          path.resolve(dirNameLibs, 'node_modules'),
        ],
      },
    },
  };
}