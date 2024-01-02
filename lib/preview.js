import { resolve } from 'path';
import { startDevServer } from '@web/dev-server';


export default async (config,  callback) => {
  try {
    await startDevServer({
      config: {
        rootDir: resolve(config.cwd, config.outputPath || 'dist'),
        port: config.port || '9000',
        open: config.openBrowser || true,
        watch: true
      },
      readCliArgs: false,
      readFileConfig: false,
    });
  } catch (e) {
    callback(e)
  }
};


