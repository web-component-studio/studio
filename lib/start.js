import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createServer, normalizePath } from 'vite';
import virtual from '@rollup/plugin-virtual';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { checkPublicAssets } from './configRuntimeChecks.js';
import { parseManifest } from './config/manifest.js';

export default async (viteConfig,  callback) => {

  const relativeResolve = (requirePath) => normalizePath(resolve(viteConfig.cwd, requirePath));

  const {default: theirStudioConfig } = await import(normalizePath(resolve(viteConfig.cwd, 'studio.config.js')));

  // handle publicAssets config
  console.log('Resolving public asset paths');
  const { hasPublicAssets, publicAssetRoots, error } = checkPublicAssets(theirStudioConfig.publicAssetsRoots);
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
    const server = await createServer({
      // any valid user config options, plus `mode` and `configFile`
      configFile: false,
      mode: 'production',
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
            : import.meta.resolve('./default/snippets.js')
        }
      },
      define: {
        __GLOBAL_STUDIO_CONFIG__: theirStudioConfig,
        __STUDIO_HINTS__: finalHints
      },
      plugins: [
        virtual({
          callbacks: `export const darkModeCallback = ${theirStudioConfig.darkModeCallback.toString()};`
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
