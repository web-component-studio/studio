import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { build, normalizePath } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { checkPublicAssets } from './configRuntimeChecks.js';

export default async (viteConfig,  callback) => {
  const relativeResolve = (requirePath) => normalizePath(resolve(viteConfig.cwd, requirePath));

  const theirStudioConfig = await import(normalizePath(resolve(viteConfig.cwd, 'studio.config.js')));

  // handle publicAssets config
  console.log('Resolving public asset paths');
  const { hasPublicAssets, publicAssetRoots, error } = checkPublicAssets(theirStudioConfig.default.publicAssetsRoots);
  if(error) {
    throw new Error(error);
  }

  let hintsFromManifest;
  if(theirStudioConfig.componentManifest) {
    console.log('Parsing custom-elements.json');
    const { path, classFilter, globalAttrs } = theirStudioConfig.componentManifest;
    if(path) {
      try {
        const manifestContents = JSON.parse(readFileSync(normalizePath(resolve(viteConfig.cwd, path)), { encoding: 'utf-8'}));
        hintsFromManifest = parseManifest(manifestContents, classFilter, globalAttrs);
      } catch (e) {
        console.log(e);
        console.log('There was a problem importing your custom element manifest. Ensure that the path is correct and the file contents are parseable as JSON.')
      }
    }
  }
  // get all hints from either the manifest hints or custom hints or both
  const customHintsPath = theirStudioConfig.customHints ? relativeResolve(theirStudioConfig.customHints) : resolve( dirname(fileURLToPath(import.meta.url)), './default/hints.js');
  const customHints = await import(customHintsPath);
  const finalHints = Object.assign({}, customHints, hintsFromManifest);

  try {
    /** @type {import('vite').UserConfig} */
    await build({
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
          }
        },
        define: {
          __GLOBAL_STUDIO_CONFIG__: theirStudioConfig.default,
          __STUDIO_HINTS__: finalHints
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
