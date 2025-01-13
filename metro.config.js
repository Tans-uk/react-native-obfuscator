const { getDefaultConfig } = require('metro-config');
const obfuscatorTransformer = require('./lib/metroPlugin').default;

module.exports = (async () => {
  const config = await getDefaultConfig();

  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve('./lib/metroPlugin'),
  };

  return config;
})();
