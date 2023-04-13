module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,  // 重要：指定 runtime-corejs3 版本
        helpers: true,
        useESModules: false,
      },
    ],
  ],
};