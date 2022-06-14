const webpackConfig = require('../webpack-config.js')
const path = require('path');
module.exports = {
  "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/addon-actions"],
  "framework": "@storybook/vue3",
  features: {
    interactionsDebugger: true, // 👈 enable playback controls
  },
  core: {
    builder: "webpack5"
  },
  "webpackFinal": async(cfg, {configType}) => {
    cfg.module.rules.push({
      test: /\.(styl|stylus)$/,
      use: ['style-loader', 'css-loader', 'stylus-loader'],
    });
    cfg = webpackConfig(cfg)
    // cfg.plugins.push(
    //   new ESLintPlugin(options)
    // )
    // cfg.plugins.push(new ESLintPlugin({
    //   extensions: [ 'js', 'vue' ],
    //   fix: true,
    //   formatter: 'stylish',
    //   threads: false
    // }))
    return cfg;
  },
  env: (config) => ({
    ...config,
    WSS: process.env.CHROMATIC_WSS
  })
};
