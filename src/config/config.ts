import { defaultStudioOptions } from "./defaultStudioOptions";

const studioConfig = __GLOBAL_STUDIO_CONFIG__;

const fullConfig = {
  ...defaultStudioOptions,
  ...studioConfig
};

export default fullConfig;
