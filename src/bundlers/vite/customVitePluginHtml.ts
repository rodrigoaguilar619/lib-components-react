const { createHtmlPlugin } = require('vite-plugin-html');

function customHtmlPluginVite(userOptions = {}) {

  const originalPlugin = createHtmlPlugin(userOptions);

  let newPlugin: any[] = originalPlugin.map((plugin: any) => ({
    ...plugin,
    name: 'custom-vite-plugin-html',
    async closeBundle() {
        console.log('customHtmlPluginVite Skipping file move and cleanup in closeBundle');
      }
  }));

  return newPlugin;
}

module.exports = {
  customHtmlPlugin: customHtmlPluginVite.bind(this),
};