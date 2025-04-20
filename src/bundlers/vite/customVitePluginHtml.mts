import { createHtmlPlugin } from 'vite-plugin-html';

export function customHtmlPlugin(userOptions: Record<string, any> = {}) {
  const originalPlugin = createHtmlPlugin(userOptions);

  const newPlugin = originalPlugin.map((plugin: any) => ({
    ...plugin,
    name: 'custom-vite-plugin-html',
    async closeBundle() {
      console.log('customHtmlPluginVite Skipping file move and cleanup in closeBundle');
    }
  }));

  return newPlugin;
}
