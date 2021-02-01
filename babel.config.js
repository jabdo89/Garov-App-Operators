module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@components': './components',
            '@config': './config',
            '@assets': './assets',
            '@graphql': './graphql',
            '@screens': './screens',
            '@providers': './providers',
            '@hooks': './hooks',
            '@utils': './utils',
          },
        },
      ],
    ],
  };
};
