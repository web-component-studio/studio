
export const defaultViteConfig = ({ storageKey, ...restConfig }) => ({
  port: 9000,
  openBrowser: true,
  storageKey: storageKey || 'wc_studio_storage',
  baseUrl: '',
  ...restConfig,
});
