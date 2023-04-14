const path = require('path');
const { createServer } = require('vite');
// const { importMetaAssets } = require('@web/rollup-plugin-import-meta-assets');

module.exports = async (viteConfig,  callback) => {

  const relativeResolve = (requirePath) =>
    require.resolve(requirePath, { paths: [viteConfig.cwd] });

  const theirStudioConfig = require(path.resolve(viteConfig.cwd, 'studio.config.js'));

  try {
    const server = await createServer({
      // any valid user config options, plus `mode` and `configFile`
      configFile: false,
      root: path.resolve(__dirname, '../src'),
      server: {
        port: viteConfig.port,
        open: viteConfig.openBrowser,
        base: viteConfig.baseUrl || ''
      },
      resolve: {
        alias: {
          __STUDIO_COMPONENTS__: relativeResolve(
            theirStudioConfig.components
          ),
          __STUDIO_SNIPPETS__: theirStudioConfig.snippets
            ? relativeResolve(theirStudioConfig.snippets)
            : require.resolve('./default/snippets.js'),
          __STUDIO_CUSTOM_HINTS__: theirStudioConfig.customHints
            ? relativeResolve(theirStudioConfig.customHints)
            : require.resolve('./default/hints.js'),
        }
      },
      define: {
        __GLOBAL_STUDIO_CONFIG__: theirStudioConfig
      }
    })
    await server.listen()

    server.printUrls()
  }
  catch(e) {
    callback(e);
  }
};
