const { resolve } = require('path');
const { build, normalizePath } = require('vite');
const { html } = require('@rollup/plugin-html');
const { viteStaticCopy } =  require('vite-plugin-static-copy');
const { checkPublicAssets } = require('./configRuntimeChecks.js');

module.exports = async (viteConfig,  callback) => {
  const theirStudioConfig = require(normalizePath(resolve(viteConfig.cwd, 'studio.config.js')));

  const relativeResolve = (requirePath) =>
  normalizePath(require.resolve(requirePath, { paths: [viteConfig.cwd] }));

  // handle publicAssets config
  const { hasPublicAssets, publicAssetRoots, error } = checkPublicAssets(theirStudioConfig.publicAssetsRoots);
  if(error) {
    throw new Error(error);
  }

  try {
    /** @type {import('vite').UserConfig} */
    await build({
      mode: 'production',
      root: resolve(__dirname, '../src'),
      base: viteConfig.baseUrl || '',
      build: {
        emptyOutDir: true,
        outDir: viteConfig.outputPath ? resolve(viteConfig.cwd, viteConfig.outputPath) : resolve(viteConfig.cwd, '/dist'),
        rollupOptions: {
          input: {
            main: resolve(__dirname, '../src/index.html'),
            frame: resolve(__dirname, '../src/frame.html'),
            preview: resolve(__dirname, '../src/preview/index.html')
          }
        }
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
              root.src = normalizePath(resolve(viteConfig.cwd, root.src))
              return root;
            })
            : []
        })
      ]
    })
  } catch (e) {
    callback(e)
  }

};
