import { defaultStudioOptions } from "./defaultStudioOptions";

// rollup plugin virtual module for callback functions
// @ts-expect-error
import { darkModeCallback } from 'callbacks';

const studioConfig = __GLOBAL_STUDIO_CONFIG__;

// add callbacks to config
studioConfig.darkModeCallback = darkModeCallback;

const fullConfig = {
  ...defaultStudioOptions,
  ...studioConfig
};

export default fullConfig;
