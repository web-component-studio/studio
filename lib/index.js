const start = require('./start');
const build = require('./build');
const preview = require('./preview');
const defaultViteConfig = require('./defaultConfig');

module.exports = (userConfig) => {
  const viteConfig = defaultViteConfig(userConfig);

  return {
    start: (callback) => start(viteConfig, callback),
    build: (callback) => build(viteConfig, callback),
    preview: (callback) => preview(viteConfig, callback),
  };
};
