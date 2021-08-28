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
            '@navigators': './navigators',
            '@config': './config',
            '@assets': './assets',
            '@screens': './screens',
            '@providers': './providers',
          },
        },
      ],
    ],
  };
};
