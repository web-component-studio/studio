import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { build, normalizePath } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { checkPublicAssets } from './configRuntimeChecks.js';

export default async (viteConfig,  callback) => {
  const relativeResolve = (requirePath) => normalizePath(resolve(viteConfig.cwd, requirePath));

  const theirStudioConfig = await import(normalizePath(resolve(viteConfig.cwd, 'studio.config.js')));

  // handle publicAssets config
  const { hasPublicAssets, publicAssetRoots, error } = checkPublicAssets(theirStudioConfig.default.publicAssetsRoots);
  if(error) {
    throw new Error(error);
  }

  try {
    /** @type {import('vite').UserConfig} */
    await build({
      mode: 'production',
      root: resolve( dirname(fileURLToPath(import.meta.url)), '../src'),
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
            theirStudioConfig.default.components
          ),
          __STUDIO_SNIPPETS__: theirStudioConfig.default.snippets
            ? relativeResolve(theirStudioConfig.default.snippets)
            : import.meta.resolve('./default/snippets.js'),
          __STUDIO_CUSTOM_HINTS__: theirStudioConfig.default.customHints
            ? relativeResolve(theirStudioConfig.default.customHints)
            : import.meta.resolve('./default/hints.js'),
        }
      },
      define: {
        __GLOBAL_STUDIO_CONFIG__: theirStudioConfig.default
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
