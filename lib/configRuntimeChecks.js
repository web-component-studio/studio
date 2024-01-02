
export const checkPublicAssets = (publicAssetsConfig) => {
  const publicAssetsConfigError = 'There was a problem parsing publicAssetsRoots. Either the array is empty, or one of the configuration objects is misconfigured.'
  const conditions = [
    Array.isArray(publicAssetsConfig),
    publicAssetsConfig.length > 0,
    publicAssetsConfig.every((asset) => typeof asset.src === 'string' && typeof asset.dest === 'string')
  ]

  if(conditions.every((condition) => condition)) {
    // has correctly configured public assets
    return { hasPublicAssets: true, publicAssetRoots: publicAssetsConfig, error: false };
  }
  return { hasPublicAssets: false, publicAssetRoots: undefined, error: publicAssetsConfigError}
}
