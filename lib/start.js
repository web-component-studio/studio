import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createServer, normalizePath } from 'vite';
import virtual from '@rollup/plugin-virtual';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { checkPublicAssets } from './configRuntimeChecks.js';


export default async (viteConfig,  callback) => {

  const relativeResolve = (requirePath) => normalizePath(resolve(viteConfig.cwd, requirePath));

  const {default: theirStudioConfig } = await import(normalizePath(resolve(viteConfig.cwd, 'studio.config.js')));

  // handle callback function
  if(theirStudioConfig.darkModeCallback) {
    theirStudioConfig.darkModeCallback = theirStudioConfig.darkModeCallback.toString();
  }

  // handle publicAssets config
  const { hasPublicAssets, publicAssetRoots, error } = checkPublicAssets(theirStudioConfig.publicAssetsRoots);
  if(error) {
    throw new Error(error);
  }

  try {
    const server = await createServer({
      // any valid user config options, plus `mode` and `configFile`
      configFile: false,
      root: resolve( dirname(fileURLToPath(import.meta.url)), '../src'),
      server: {
        port: viteConfig.port,
        open: viteConfig.openBrowser,
        base: viteConfig.baseUrl || ''
      },
      resolve: {
        alias: {
          __STUDIO_COMPONENTS__: relativeResolve(theirStudioConfig.components),
          __STUDIO_SNIPPETS__: theirStudioConfig.snippets
            ? relativeResolve(theirStudioConfig.snippets)
            : import.meta.resolve('./default/snippets.js'),
          __STUDIO_CUSTOM_HINTS__: theirStudioConfig.customHints
            ? relativeResolve(theirStudioConfig.customHints)
            : import.meta.resolve('./default/hints.js'),
        }
      },
      define: {
        __GLOBAL_STUDIO_CONFIG__: theirStudioConfig
      },
      plugins: [
        virtual({
          'callbacks': `export const darkModeCallback = ${theirStudioConfig.darkModeCallback.toString()};`
        }),
        viteStaticCopy({
          targets: hasPublicAssets ? publicAssetRoots
            .map(root => {
              root.src = normalizePath(resolve(viteConfig.cwd, root.src));
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
