
module.exports = ({ storageKey, ...restConfig }) => ({
  port: 9000,
  openBrowser: true,
  storageKey: storageKey || 'wc_studio_storage',
  baseUrl: '',
  ...restConfig,
});
