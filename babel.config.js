module.exports = function (api) {
  api.cache(false);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      '@babel/transform-runtime',
      ['transform-inline-environment-variables', {
        // If not excluded, this will attempt to transform
        // `process.env.BABEL_ENV` used by the react-native jest transformer
        exclude: ['BABEL_ENV', 'DEBUG'],
      }],
      ['module-resolver', {
        root: ['.'],
        alias: {
          src: './src'
        }
      }],
      ['jsx-property-alias', {
        includeInEnvironments: ['QA'],
        properties: {
          testID: 'accessibilityLabel'
        }
      }],
    ],
    sourceMaps: 'inline',
  }
};
