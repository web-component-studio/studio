import start from './start.js';
import build from './build.js';
import preview from './preview.js';
import { defaultViteConfig } from './defaultConfig.js';

export default (userConfig) => {
  const viteConfig = defaultViteConfig(userConfig);

  return {
    start: (callback) => start(viteConfig, callback),
    build: (callback) => build(viteConfig, callback),
    preview: (callback) => preview(viteConfig, callback),
  };
};
