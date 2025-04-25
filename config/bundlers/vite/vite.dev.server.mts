import path from 'path';
import { fileURLToPath } from 'url';

// __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use an async function to dynamically import the config
export default async function devServerConfig(arg: Record<string, any>, env: Record<string, any>) {
  console.log("Vite config dev server");

  const mode = "development";
  const htmlTitle = "html title dev server";
  const dirname = path.resolve(__dirname, '../../../');

  // Dynamic import of the vite config module
  const configDev = await import('../../../src/bundlers/vite/vite.config.mts');

  const mainVite = configDev.executeCommonConfig(mode, { htmlTitle, dirname });
  return mainVite;
}
