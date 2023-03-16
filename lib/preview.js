const path = require('path');
const { startDevServer } = require('@web/dev-server');


module.exports = async (config,  callback) => {
  console.log();
  try {
    const server = await startDevServer({
      config: {
        rootDir: path.resolve(config.cwd, config.outputPath || 'dist'),
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


