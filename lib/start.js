const { resolve } = require('path');
const { createServer, normalizePath } = require('vite');
const { viteStaticCopy } =  require('vite-plugin-static-copy');
const { checkPublicAssets } = require('./configRuntimeChecks.js');


module.exports = async (viteConfig,  callback) => {

  const relativeResolve = (requirePath) =>
    normalizePath(require.resolve(requirePath, { paths: [viteConfig.cwd] }));

  const theirStudioConfig = require(normalizePath(resolve(viteConfig.cwd, 'studio.config.js')));

  // handle publicAssets config
  const { hasPublicAssets, publicAssetRoots, error } = checkPublicAssets(theirStudioConfig.publicAssetsRoots);
  if(error) {
    throw new Error(error);
  }
  console.log(publicAssetRoots)

  try {
    const server = await createServer({
      // any valid user config options, plus `mode` and `configFile`
      configFile: false,
      root: resolve(__dirname, '../src'),
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
      },
      plugins: [
        viteStaticCopy({
          targets: hasPublicAssets ? publicAssetRoots
            .map(root => {
              root.src = normalizePath(resolve(viteConfig.cwd, root.src));
              console.log(root.src);
              return root;
            })
            : []
        })
      ]
    })
    await server.listen()

    server.printUrls()
  }
  catch(e) {
    callback(e);
  }
};
